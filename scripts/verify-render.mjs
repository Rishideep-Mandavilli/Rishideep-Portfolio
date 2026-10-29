import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = process.argv[2] || "9340";
const URL_ARG = process.argv[3] || "http://127.0.0.1:4173/";
const SHOT = process.argv[4] || "";
const SCROLL_TO = process.argv[5] || "";

const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars",
  `--remote-debugging-port=${PORT}`, "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 40 && !target; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    target = list.find((t) => t.type === "page");
  } catch {}
  if (!target) await sleep(250);
}

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
const errors = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === "Runtime.exceptionThrown") {
    errors.push(m.params.exceptionDetails?.exception?.description || "exception");
  }
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
    errors.push((m.params.args || []).map((a) => a.value ?? a.description).join(" "));
  }
};
const send = (method, params) =>
  new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });

await send("Page.enable", {});
await send("Runtime.enable", {});
await send("Log.enable", {});
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: URL_ARG });
await sleep(7000);

const expr = `(() => JSON.stringify({
  title: document.title,
  canvas: !!document.querySelector("canvas"),
  tabs: document.querySelectorAll('[role="tab"]').length,
  selected: document.querySelector('[role="tab"][aria-selected="true"]')?.textContent.replace(/\\s+/g," ").trim(),
  panels: document.querySelectorAll('[role="tabpanel"]').length,
  contactAnchors: document.querySelectorAll('a[href^="https://github"], a[href^="https://linkedin"]').length,
  bodyChars: document.body.innerText.length,
  scrollWidth: document.documentElement.scrollWidth,
  revealOpacity: getComputedStyle(document.getElementById("contact").parentElement).opacity,
}, null, 1))()`;
const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
console.log(r.result?.result?.value ?? JSON.stringify(r));
console.log("js errors:", errors.length ? errors.slice(0, 5) : "none");

if (SHOT) {
  if (SCROLL_TO) {
    await send("Runtime.evaluate", {
      expression: `document.documentElement.style.scrollBehavior="auto";document.getElementById(${JSON.stringify(SCROLL_TO)}).scrollIntoView({behavior:"instant",block:"center"});"ok"`,
    });
    await sleep(3000);
  }
  const s = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(SHOT, Buffer.from(s.result.data, "base64"));
  console.log("shot:", SHOT);
}
ws.close();
chrome.kill();
process.exit(0);
