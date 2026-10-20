"use client";

import { stats } from "@/lib/content";
import { CountUp, Reveal } from "./Reveal";

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-32">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s, i) => {
          const color = s.tone === "business" ? "text-business" : "text-tech";
          return (
            <Reveal key={s.label} delay={i * 0.08} className="h-full">
              <div
                className={`group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-1 sm:p-7 ${
                  s.tone === "business" ? "bg-business-soft" : "bg-tech-soft"
                }`}
              >
                <p className={`text-4xl leading-none font-bold tracking-tight sm:text-6xl ${color}`}>
                  {s.value !== undefined ? <CountUp to={s.value} /> : s.word}
                </p>
                <p className={`mt-2 text-base leading-tight font-bold sm:mt-3 sm:text-xl ${color}`}>{s.label}</p>
                <p className="mt-2 text-sm leading-snug text-muted sm:mt-3 sm:text-base">{s.detail}</p>
                <span
                  className={`absolute -right-8 -bottom-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-60 ${
                    s.tone === "business" ? "bg-business" : "bg-tech"
                  }`}
                />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
