"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { pipeline } from "@/lib/content";
import { Reveal, WordReveal } from "./Reveal";
import { AgentDemo } from "./AgentDemo";

export function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="chaine" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 text-tech">La chaîne data</p>
            </Reveal>
            <WordReveal
              text="De ~Snowflake~ aux agents ~IA~, conçue et opérée seul."
              className="max-w-xl text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-5xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg text-lg text-slate">
                Chaque maillon sert une décision commerciale. La donnée part de l&apos;entrepôt et finit sur la table de la
                direction, sous forme d&apos;objectifs, de segments et de Business Reviews.
              </p>
            </Reveal>

            <div ref={ref} className="relative mt-12 space-y-8 pl-10">
              <span className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />
              <motion.span
                style={{ height }}
                className="absolute top-2 left-[7px] w-px bg-gradient-to-b from-tech to-business"
              />
              {pipeline.map((p, i) => (
                <Reveal key={p.step} delay={i * 0.04} y={16}>
                  <div className="relative">
                    <span
                      className={`absolute top-1 -left-10 h-[15px] w-[15px] rounded-full border-[3px] bg-white ${
                        p.tone === "tech" ? "border-tech" : "border-business"
                      }`}
                    />
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h3 className="text-xl font-bold">{p.step}</h3>
                      <span
                        className={`text-sm font-bold ${p.tone === "tech" ? "text-tech" : "text-business"}`}
                      >
                        {p.tools}
                      </span>
                    </div>
                    <p className="mt-1 text-muted">{p.output}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={0.1}>
              <AgentDemo />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
