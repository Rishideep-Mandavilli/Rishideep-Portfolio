// Measures whether the contact name field moves on a beat grid: a pulse that
// travels down the rows, a downbeat that thickens the whole field, and rows that
// hold still between steps instead of jittering.
import { spawn } from "node:child_process";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = process.argv[2] || "9370";
const URL_ARG = process.argv[3] || "http://127.0.0.1:4173/";

const STEPS_PER_BAR = 16;

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
};
const send = (method, params) =>
  new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });

const sample = `(() => {
  const wrap = document.querySelector(".signal-field");
  const rows = [...document.querySelectorAll(".signal-row")];
  return JSON.stringify({
    step: Number(wrap.dataset.step),
    lengths: rows.map((r) => r.textContent.length),
    text: rows.map((r) => r.textContent).join("|"),
  });
})()`;

await send("Page.enable", {});
await send("Runtime.enable", {});
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: URL_ARG });
await sleep(5000);
await send("Runtime.evaluate", {
  expression: `document.getElementById("contact").scrollIntoView({behavior:"instant",block:"center"});"ok"`,
});

// Wait until the beat clock is actually ticking before sampling.
const readStep = `Number(document.querySelector(".signal-field").dataset.step)`;
let lastStep = -1;
for (let i = 0; i < 60; i++) {
  const now = Number((await send("Runtime.evaluate", { expression: readStep, returnByValue: true })).result.result.value);
  if (now > lastStep + 2) break;
  lastStep = now;
  await sleep(100);
}

const seen = new Map();
for (let i = 0; i < 120; i++) {
  const s = JSON.parse((await send("Runtime.evaluate", { expression: sample, returnByValue: true })).result.result.value);
  if (!seen.has(s.step)) seen.set(s.step, s);
  await sleep(25);
}

const steps = [...seen.keys()].sort((a, b) => a - b);
const frames = steps.map((k) => seen.get(k));

// Rows must be frozen within a single step: two reads of the same step match.
let intraStepChanges = 0;
for (let i = 0; i < 40; i++) {
  const a = JSON.parse((await send("Runtime.evaluate", { expression: sample, returnByValue: true })).result.result.value);
  const b = JSON.parse((await send("Runtime.evaluate", { expression: sample, returnByValue: true })).result.result.value);
  if (a.step === b.step && a.text !== b.text) intraStepChanges += 1;
  await sleep(20);
}

// Glitch density: how many rows visibly change from one step to the next.
const rowLists = frames.map((f) => f.text.split("|"));
const churn = [];
for (let i = 1; i < rowLists.length; i++) {
  const a = rowLists[i - 1];
  const b = rowLists[i];
  if (a.length !== b.length) continue;
  churn.push(a.filter((line, r) => line !== b[r]).length);
}
const meanChurn = churn.length ? churn.reduce((x, y) => x + y, 0) / churn.length : 0;

// Model-agnostic checks: does the field pulse on the bar, and does the band of
// widest rows travel down the field over time.
const totals = frames.map((f) => f.lengths.reduce((a, b) => a + b, 0));
const onBeat = [];
const offBeat = [];
frames.forEach((f, i) => (f.step % STEPS_PER_BAR === 0 ? onBeat : offBeat).push(totals[i]));
const lift =
  onBeat.length && offBeat.length
    ? onBeat.reduce((a, b) => a + b, 0) / onBeat.length /
      (offBeat.reduce((a, b) => a + b, 0) / offBeat.length)
    : 0;

const ROWS = frames[0].lengths.length;
const argmax = frames.map((f) => f.lengths.indexOf(Math.max(...f.lengths)));
let travelled = 0;
for (let i = 1; i < argmax.length; i++) {
  const d = ((argmax[i] - argmax[i - 1]) % ROWS + ROWS) % ROWS;
  if (d >= 1 && d <= 6) travelled += 1;
}
const travelRate = argmax.length > 1 ? travelled / (argmax.length - 1) : 0;

console.log("steps observed:", steps.length, "| monotonic:", steps[steps.length - 1] - steps[0] === steps.length - 1);
console.log("glitch density (rows changed per step):", meanChurn.toFixed(1), "of", ROWS);
console.log("downbeat lift (bar width vs off-beat):", lift.toFixed(2), "x");
console.log("band travels downward:", (travelRate * 100).toFixed(0) + "% of steps");
console.log("intra-step jitter (same step, different text):", intraStepChanges, "of 40");
console.log("page exceptions:", errors.length ? errors.slice(0, 3) : "none");

ws.close();
chrome.kill();
// Headless Chrome sometimes parks the page's timers entirely; exit non-zero so
// the caller retries instead of reading a frozen clock as a broken animation.
process.exit(steps.length < 10 ? 2 : 0);
