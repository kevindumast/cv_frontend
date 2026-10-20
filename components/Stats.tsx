"use client";

import { stats } from "@/lib/content";
import { CountUp, Reveal } from "./Reveal";

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div
              className={`group relative h-full overflow-hidden rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1 ${
                s.tone === "business" ? "bg-business-soft" : "bg-tech-soft"
              }`}
            >
              <p
                className={`text-6xl leading-none font-bold tracking-tight ${
                  s.tone === "business" ? "text-business" : "text-tech"
                }`}
              >
                {s.value === null ? s.label : <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />}
              </p>
              {s.value !== null && (
                <p className={`mt-2 text-xl font-bold ${s.tone === "business" ? "text-business" : "text-tech"}`}>
                  {s.label}
                </p>
              )}
              <p className="mt-3 leading-snug text-muted">{s.detail}</p>
              <span
                className={`absolute -right-8 -bottom-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-60 ${
                  s.tone === "business" ? "bg-business" : "bg-tech"
                }`}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
