"use client";

import { motion } from "motion/react";
import { coursework, education, school } from "@/lib/content";
import { CompanyLogo } from "./CompanyLogo";
import { Reveal } from "./Reveal";

const chip = {
  tech: "bg-tech-soft text-tech",
  business: "bg-business-soft text-business",
  ink: "bg-surface text-slate",
} as const;

const label = { tech: "text-tech", business: "text-business", ink: "text-ink" } as const;

export function Education() {
  return (
    <Reveal>
      <div className="mt-16 rounded-3xl border border-line p-6 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="eyebrow !text-[0.7rem] text-business">Formation</p>
            <p className="mt-2 text-xl font-bold text-ink">{school.faculty}</p>
            <p className="text-sm text-muted">
              {school.name} · {school.today}
            </p>
          </div>
          <CompanyLogo company={school.name} height={40} />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          <ol className="relative space-y-7 pl-7">
            <span className="absolute top-2 bottom-2 left-[5px] w-px bg-gradient-to-b from-business to-business/15" />
            {education.map((e, i) => (
              <motion.li
                key={e.degree}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative"
              >
                <span
                  className={`absolute top-[5px] -left-7 h-[11px] w-[11px] rounded-full border-2 border-business ${
                    i === 0 ? "bg-business" : "bg-canvas"
                  }`}
                />
                <p className="text-sm font-bold text-business tabular-nums">{e.period}</p>
                <p className="mt-0.5 text-lg leading-snug font-bold text-ink">{e.degree}</p>
                {e.focus && <p className="mt-1 text-slate">{e.focus}</p>}
                {e.details && (
                  <ul className="mt-2 space-y-1">
                    {e.details.map((d) => (
                      <li key={d} className="flex gap-2 text-sm leading-snug text-muted">
                        <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-faint" />
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.li>
            ))}
          </ol>

          <div>
            <p className="mb-5 font-bold text-ink">Au programme du master</p>
            <div className="space-y-5">
              {coursework.map((g) => (
                <div key={g.group}>
                  <p className={`mb-2 text-sm font-bold ${label[g.tone]}`}>{g.group}</p>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((t, i) => (
                      <motion.li
                        key={t}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03, type: "spring", stiffness: 300, damping: 22 }}
                        className={`rounded-full px-3 py-1.5 text-sm font-bold ${chip[g.tone]}`}
                      >
                        {t}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
