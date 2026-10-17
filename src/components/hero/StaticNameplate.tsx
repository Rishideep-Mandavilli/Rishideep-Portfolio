"use client";

function StaticNameplate() {
  return (
    <div className="noise-surface relative flex h-[min(58vw,300px)] min-h-[220px] items-center justify-center overflow-hidden border border-line bg-well md:h-[360px]">
      <div className="px-6 text-center font-semibold leading-[1.05] tracking-tight text-signal text-[clamp(1.6rem,6vw,2.75rem)]">
        RISHIDEEP
        <br />
        MANDAVILLI
      </div>
      <div className="absolute inset-x-0 bottom-3 text-center font-terminal text-[10px] uppercase tracking-widest text-faint">
        name field · static render
      </div>
    </div>
  );
}

export { StaticNameplate };
