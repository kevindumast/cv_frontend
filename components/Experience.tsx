"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { experiences, studentJobs, type Experience as Exp, type Tone } from "@/lib/content";
import { Reveal, WordReveal } from "./Reveal";
import { CompanyLogo } from "./CompanyLogo";
import { useExpandable } from "./Expandable";

export function Experience() {
  const [current, ...past] = experiences;
  const [side, setSide] = useState<Tone>("business");
  const items = side === "business" ? current.business! : current.tech!;
  const more = useExpandable(items.length, 4);

  return (
    <section id="parcours" className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p className="eyebrow mb-5 text-business">Expériences professionnelles</p>
      </Reveal>
      <WordReveal
        text="Dix ans entre *finance*, *assurance* et ~data~."
        className="max-w-3xl text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-5xl"
      />

      <Reveal delay={0.1}>
        <article className="mt-14 rounded-3xl border border-line bg-white p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CompanyLogo company={current.company} height={36} />
            <span className="rounded-full bg-tech-soft px-3 py-1 text-sm font-bold text-tech">{current.period}</span>
          </div>
          <h3 className="mt-6 text-2xl font-bold sm:text-3xl">{current.title}</h3>
          <p className="mt-1 text-slate">
            <span className="font-bold text-ink">{current.company}</span> · {current.place}
          </p>

          <div role="tablist" aria-label="Volet du poste" className="relative mt-8 inline-flex rounded-full bg-surface p-1">
            {(["business", "tech"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={side === t}
                onClick={() => {
                  setSide(t);
                  more.reset();
                }}
                className={`relative z-10 rounded-full px-5 py-2 text-sm font-bold tracking-[0.15em] uppercase transition-colors ${
                  side === t ? (t === "business" ? "text-business" : "text-tech") : "text-muted hover:text-ink"
                }`}
              >
                {side === t && (
                  <motion.span
                    layoutId="side-pill"
                    className={`absolute inset-0 -z-10 rounded-full ${t === "business" ? "bg-business-soft" : "bg-tech-soft"}`}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                Côté {t}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={side}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2"
            >
              {items.map((b, i) => (
                <motion.li
                  key={b}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  className={`${more.itemClass(i)} gap-3 leading-snug text-slate`}
                >
                  <span
                    className={`mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full ${
                      side === "business" ? "bg-business" : "bg-tech"
                    }`}
                  />
                  {b}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
          {more.toggle}
        </article>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {past.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <PastRole e={e} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-col gap-6 rounded-3xl bg-surface p-6 sm:p-8 lg:flex-row lg:items-center">
          <div className="lg:w-64 lg:shrink-0">
            <p className="eyebrow !text-[0.7rem] text-business">Pendant mes études</p>
            <p className="mt-1 text-sm font-bold text-muted tabular-nums">
              {studentJobs[studentJobs.length - 1].year} — {studentJobs[0].year}
            </p>
            <p className="mt-2 leading-snug text-slate">Jobs étudiants et stages en banque et en assurance.</p>
          </div>
          <ul className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
            {studentJobs.map((j, i) => (
              <motion.li
                key={j.company}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                className="flex h-full flex-col gap-4 rounded-2xl bg-white p-4"
              >
                <div className="flex h-10 items-start justify-between gap-2">
                  <span className="flex h-10 items-center">
                    <CompanyLogo company={j.company} height={36} />
                  </span>
                  <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-bold text-slate tabular-nums">
                    {j.year}
                  </span>
                </div>
                <div>
                  <p className="min-h-[2.5em] leading-tight font-bold text-ink">{j.company}</p>
                  <p className={`text-sm ${j.sector === "Assurance" ? "text-tech" : "text-business"}`}>
                    {j.sector}
                    {j.note && <span className="text-muted"> · {j.note}</span>}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

function PastRole({ e }: { e: Exp }) {
  const more = useExpandable(e.bullets!.length, 2);
  return (
    <article className="group h-full rounded-3xl border border-line bg-white p-6 transition-colors duration-500 hover:border-business/30 sm:p-8">
      <div className="flex h-11 items-center justify-between gap-3">
        <CompanyLogo company={e.company} height={44} />
        <p className="text-right text-sm font-bold text-muted">{e.period}</p>
      </div>
      <h3 className="mt-3 text-xl leading-tight font-bold">{e.title}</h3>
      <p className="mt-1 text-sm text-slate">
        <span className="font-bold text-ink">{e.company}</span> · {e.place}
      </p>
      <ul className="mt-5 space-y-3">
        {e.bullets!.map((b, i) => (
          <li key={b} className={`${more.itemClass(i)} gap-3 text-[0.95rem] leading-snug text-slate`}>
            <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-faint transition-colors group-hover:bg-business" />
            {b}
          </li>
        ))}
      </ul>
      {more.toggle}
    </article>
  );
}
