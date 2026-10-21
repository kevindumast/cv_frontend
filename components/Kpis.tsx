"use client";

import { motion, useReducedMotion } from "motion/react";
import { kpiStages } from "@/lib/content";
import { Reveal, WordReveal } from "./Reveal";

// Couleur d'étape : du violet business au vert tech, comme la courbe de l'accueil
const FROM = [0x6a, 0x4f, 0xc2];
const TO = [0x1e, 0x8c, 0x6e];
function stageColor(i: number, n: number) {
  const t = n > 1 ? i / (n - 1) : 0;
  const c = FROM.map((f, k) => Math.round(f + (TO[k] - f) * t));
  return `rgb(${c.join(",")})`;
}

// Entonnoir : large à gauche (potentiel), resserré à droite (portefeuille)
const FUNNEL = "M0 8 C 380 8, 620 44, 1000 44 L1000 96 C 620 96, 380 132, 0 132 Z";
const AXIS = "M0 70 L1000 70";

export function Kpis() {
  const reduce = useReducedMotion();
  const n = kpiStages.length;

  return (
    <section id="kpis" className="mx-auto max-w-7xl px-4 pb-24 sm:px-8 sm:pb-32">
      <Reveal>
        <p className="eyebrow mb-5 text-business">Les KPIs que je pilote</p>
      </Reveal>
      <WordReveal
        text="Du *potentiel* au ~portefeuille~, chaque étape a son KPI."
        className="max-w-3xl text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-5xl"
      />
      <Reveal delay={0.15}>
        <p className="mt-6 max-w-2xl text-lg text-slate">
          Ce que je mesure, explique et fais progresser chaque mois avec le réseau de courtiers, de la détection du
          potentiel jusqu&apos;à la rentabilité du portefeuille.
        </p>
      </Reveal>

      {/* Entonnoir animé (desktop) */}
      <div className="relative mt-14 hidden lg:block" aria-hidden>
        <svg viewBox="0 0 1000 140" preserveAspectRatio="none" className="h-32 w-full overflow-visible">
          <defs>
            <linearGradient id="kpi-funnel" x1="0" x2="1">
              <stop offset="0" stopColor="#6a4fc2" stopOpacity="0.16" />
              <stop offset="1" stopColor="#1e8c6e" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="kpi-axis" x1="0" x2="1">
              <stop offset="0" stopColor="#6a4fc2" />
              <stop offset="1" stopColor="#1e8c6e" />
            </linearGradient>
            <clipPath id="kpi-reveal">
              <motion.rect
                x="0"
                y="0"
                height="140"
                initial={{ width: reduce ? 1000 : 0 }}
                whileInView={{ width: 1000 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
              />
            </clipPath>
          </defs>
          <g clipPath="url(#kpi-reveal)">
            <path d={FUNNEL} fill="url(#kpi-funnel)" />
            <path d={AXIS} stroke="url(#kpi-axis)" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>
        {/* Billes en HTML : le SVG est étiré en largeur, des cercles SVG deviendraient ovales */}
        {!reduce && (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
            {[0, 1.2, 2.4].map((b) => (
              <motion.span
                key={b}
                className="absolute top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/70"
                initial={{ left: "0%", opacity: 0 }}
                animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{
                  left: { duration: 3.6, delay: 2 + b, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 3.6, delay: 2 + b, repeat: Infinity, times: [0, 0.05, 0.95, 1] },
                }}
              />
            ))}
          </div>
        )}
        {/* Points d'étape posés sur l'axe, centrés sur chaque colonne */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 grid -translate-y-1/2 grid-cols-5">
          {kpiStages.map((s, i) => (
            <motion.span
              key={s.stage}
              initial={{ scale: reduce ? 1 : 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.3, type: "spring", stiffness: 300, damping: 18 }}
              className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border-[3px] bg-white text-xs font-bold tabular-nums"
              style={{ borderColor: stageColor(i, n), color: stageColor(i, n) }}
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Étapes : colonnes en desktop, frise verticale en mobile */}
      <ol className="relative mt-10 grid gap-8 pl-10 lg:mt-6 lg:grid-cols-5 lg:gap-5 lg:pl-0">
        <span className="absolute top-2 bottom-2 left-[13px] w-px bg-gradient-to-b from-business to-tech lg:hidden" />
        {kpiStages.map((s, i) => {
          const color = stageColor(i, n);
          return (
            <motion.li
              key={s.stage}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ delay: reduce ? 0 : 0.2 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span
                className="absolute top-0.5 -left-10 flex h-7 w-7 items-center justify-center rounded-full border-[3px] bg-white text-[10px] font-bold tabular-nums lg:hidden"
                style={{ borderColor: color, color }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl leading-tight font-bold" style={{ color }}>
                {s.stage}
              </h3>
              <p className="mt-1 text-sm text-muted">{s.caption}</p>
              <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap">
                {s.kpis.map((k) => (
                  <li
                    key={k.k}
                    className="rounded-xl px-3 py-2 text-sm leading-tight font-bold lg:w-full"
                    style={{ color, backgroundColor: color.replace("rgb", "rgba").replace(")", ",0.09)") }}
                  >
                    {k.k}
                    {k.hint && <span className="mt-0.5 block text-xs font-normal text-slate">{k.hint}</span>}
                  </li>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
