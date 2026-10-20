"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { experiences, type Tone } from "@/lib/content";
import { Reveal, WordReveal } from "./Reveal";

export function Experience() {
  const [current, ...past] = experiences;
  const [side, setSide] = useState<Tone>("business");
  const items = side === "business" ? current.business! : current.tech!;

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
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold sm:text-3xl">{current.title}</h3>
              <p className="mt-1 text-slate">
                <span className="font-bold text-ink">{current.company}</span> · {current.place}
              </p>
            </div>
            <span className="rounded-full bg-tech-soft px-3 py-1 text-sm font-bold text-tech">{current.period}</span>
          </div>

          <div role="tablist" aria-label="Volet du poste" className="relative mt-8 inline-flex rounded-full bg-surface p-1">
            {(["business", "tech"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={side === t}
                onClick={() => setSide(t)}
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
              {items.map((b) => (
                <motion.li
                  key={b}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  className="flex gap-3 leading-snug text-slate"
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
        </article>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {past.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <article className="group h-full rounded-3xl border border-line bg-white p-6 transition-colors duration-500 hover:border-business/30 sm:p-8">
              <p className="text-sm font-bold text-muted">{e.period}</p>
              <h3 className="mt-3 text-xl leading-tight font-bold">{e.title}</h3>
              <p className="mt-1 text-sm text-slate">
                <span className="font-bold text-ink">{e.company}</span> · {e.place}
              </p>
              <ul className="mt-5 space-y-3">
                {e.bullets!.map((b) => (
                  <li key={b} className="flex gap-3 text-[0.95rem] leading-snug text-slate">
                    <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-faint transition-colors group-hover:bg-business" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
