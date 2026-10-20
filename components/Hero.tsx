"use client";

import { motion } from "motion/react";
import { profile } from "@/lib/content";
import { BridgeCurve } from "./BridgeCurve";
import { WordReveal } from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const signals = [
  { k: "Pipeline", v: "Snowflake → dbt → Cortex" },
  { k: "Agents IA", v: "en production" },
  { k: "Réseau", v: "courtage IARD" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="eyebrow mb-6 text-business"
          >
            {profile.firstName} {profile.lastName}
            <span className="hidden sm:inline"> · {profile.role}</span>
            <span className="sm:hidden"> · Performance commerciale IARD</span>
          </motion.p>

          <h1 className="sr-only">
            {profile.firstName} {profile.lastName} : le pont entre la tech et le business
          </h1>
          <WordReveal
            as="h2"
            text="Le pont entre la ~tech~ et le *business*."
            className="text-[2.9rem] leading-[0.98] font-bold tracking-[-0.035em] text-ink sm:text-7xl lg:text-[5.4rem]"
            delay={0.15}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-slate sm:text-xl"
          >
            {profile.pitch}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-bold text-white transition hover:bg-business"
            >
              Me contacter sur LinkedIn
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#parcours"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 font-bold text-ink transition hover:border-tech hover:text-tech"
            >
              Voir le parcours
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
          >
            {profile.tagline.map((t, i) => (
              <li key={t} className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-business" : i === 1 ? "bg-tech" : "bg-ink"}`} />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute right-0 bottom-0 z-10 hidden rounded-xl border border-line bg-white/80 px-4 py-3 text-xs backdrop-blur sm:block"
          >
            <p className="eyebrow mb-1.5 flex items-center gap-2 !text-[0.68rem] text-tech">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tech opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-tech" />
              </span>
              Chaîne active
            </p>
            {signals.map((s) => (
              <p key={s.k} className="leading-5 text-muted">
                <span className="text-faint">{s.k} :</span> {s.v}
              </p>
            ))}
          </motion.div>
          <div className="aspect-[640/440] w-full pt-10">
            <BridgeCurve />
          </div>
        </div>
      </div>

      <FlowStrip />
    </section>
  );
}

const flow = [
  { k: "Donnée", d: "Collecter et fiabiliser" },
  { k: "Modèle", d: "Objectifs, segmentation" },
  { k: "Pilotage", d: "KPIs, Business Review" },
  { k: "Décision", d: "Actions commerciales" },
];

function FlowStrip() {
  return (
    <div className="relative mx-auto mt-14 max-w-7xl px-4 sm:px-8 lg:mt-10">
      <div className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-4">
        <div className="absolute top-[7px] right-0 left-0 hidden h-px bg-line sm:block" />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
          className="absolute top-[7px] right-0 left-0 hidden h-px origin-left bg-gradient-to-r from-tech to-business sm:block"
        />
        {flow.map((f, i) => (
          <motion.div
            key={f.k}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + i * 0.5, duration: 0.6 }}
            className="relative"
          >
            <span
              className={`mb-4 block h-[15px] w-[15px] rounded-full border-[3px] bg-white ${
                i < 2 ? "border-tech" : "border-business"
              }`}
            />
            <p className="font-bold text-ink">{f.k}</p>
            <p className="text-sm text-muted">{f.d}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
