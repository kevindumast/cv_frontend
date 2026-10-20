"use client";

import { motion } from "motion/react";
import { expertise, stack } from "@/lib/content";
import { Reveal, WordReveal } from "./Reveal";

export function Skills() {
  return (
    <section id="competences" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-5 text-ink">Compétences</p>
        </Reveal>
        <WordReveal
          text="Parler *business* aux équipes tech, et ~tech~ aux directions."
          className="max-w-4xl text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-5xl"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-white p-6 sm:p-10">
              <p className="eyebrow mb-6 text-business">Expertise métier</p>
              <ul className="divide-y divide-line">
                {expertise.map((e, i) => {
                  const [head, rest] = e.split(" : ");
                  return (
                    <motion.li
                      key={e}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.5 }}
                      className="py-3.5 leading-snug"
                    >
                      <span className="font-bold text-ink">{head}</span>
                      {rest && <span className="text-slate"> : {rest}</span>}
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl bg-white p-6 sm:p-10">
              <p className="eyebrow mb-6 text-tech">Stack technique</p>
              <div className="space-y-6">
                {stack.map((g) => (
                  <div key={g.group}>
                    <p className="mb-2.5 font-bold text-ink">{g.group}</p>
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((t, i) => (
                        <motion.li
                          key={t}
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.035, type: "spring", stiffness: 300, damping: 22 }}
                          className="cursor-default rounded-full bg-tech-soft px-3 py-1.5 text-sm font-bold text-tech transition-colors hover:bg-tech hover:text-white"
                        >
                          {t}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
