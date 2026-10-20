import { marquee } from "@/lib/content";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <section aria-label="Stack technique" className="border-y border-line bg-surface/60 py-6">
      <p className="eyebrow mb-4 text-center !text-[0.7rem] text-faint">Une stack opérée de bout en bout</p>
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <li
              key={i}
              aria-hidden={i >= marquee.length}
              className="flex items-center gap-12 text-xl font-bold whitespace-nowrap text-slate/70 sm:text-2xl"
            >
              {t}
              <span className={`h-1.5 w-1.5 rounded-full ${i % 2 ? "bg-business/50" : "bg-tech/50"}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
