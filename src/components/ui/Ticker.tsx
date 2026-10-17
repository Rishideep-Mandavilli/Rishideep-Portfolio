const ITEMS = [
  "on-device speech",
  "retrieval pipelines",
  "full-stack products",
  "native macOS & Android",
  "interactive frontend",
  "design systems",
  "measured latency",
];

export function Ticker() {
  return (
    <div
      aria-hidden
      className="select-none overflow-hidden border-y border-line bg-panel/40 py-3"
    >
      <div className="flex w-max animate-[ticker_30s_linear_infinite] hover:[animation-play-state:paused]">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 whitespace-nowrap pr-8 font-terminal text-xs uppercase tracking-[0.25em] text-faint"
          >
            {item}
            <span className="text-signal">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
