"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Démonstrations illustratives : chiffres et code fictifs, aucune donnée réelle.
type Tab = "prod" | "dev";

const tabs: { id: Tab; label: string }[] = [
  { id: "prod", label: "En production" },
  { id: "dev", label: "En développement" },
];

const heads: Record<Tab, { icon: string; title: string; sub: string; tone: string }> = {
  prod: { icon: "IA", title: "Agent de pilotage commercial", sub: "Snowflake Cortex · rapport quotidien", tone: "bg-tech-soft text-tech" },
  dev: { icon: ">_", title: "Claude Code", sub: "Mon binôme de développement", tone: "bg-business-soft text-business" },
};

export function AgentDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -120px 0px" });
  const reduce = useReducedMotion() ?? false;
  const [tab, setTab] = useState<Tab>("prod");
  const head = heads[tab];

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-line bg-canvas shadow-[0_30px_80px_-40px_rgba(21,27,35,0.35)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-6 py-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex min-w-0 items-center gap-3"
          >
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${head.tone}`}>
              {head.icon}
            </span>
            <div className="min-w-0">
              <p className="truncate leading-tight font-bold">{head.title}</p>
              <p className="truncate text-xs text-muted">{head.sub}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <span className="shrink-0 rounded-full bg-surface px-3 py-1 text-[0.7rem] font-bold tracking-wider text-faint uppercase">
          Démo illustrative
        </span>
      </div>

      <div className="px-6 pt-4">
        <div role="tablist" aria-label="Démonstration" className="relative grid grid-cols-2 rounded-full bg-surface p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`relative z-10 rounded-full px-3 py-2 text-sm font-bold transition-colors ${
                tab === t.id ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="demo-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-canvas shadow-[0_1px_4px_rgba(21,27,35,0.12)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Les deux panneaux occupent la même cellule : la carte garde la hauteur du plus grand */}
      <div className="grid">
        <Panel active={tab === "prod"}>
          <ProductionPanel active={inView && tab === "prod"} reduce={reduce} />
        </Panel>
        <Panel active={tab === "dev"}>
          <TerminalPanel active={inView && tab === "dev"} reduce={reduce} />
        </Panel>
      </div>
    </div>
  );
}

function Panel({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      role="tabpanel"
      aria-hidden={!active}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`[grid-area:1/1] ${active ? "" : "pointer-events-none invisible"}`}
    >
      {children}
    </motion.div>
  );
}

function useTyping(text: string, start: boolean, speed: number, run = 0) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed, run]);
  return text.slice(0, n);
}

function Caret({ className = "bg-ink" }: { className?: string }) {
  return <span className={`ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse ${className}`} />;
}

/* ---------- En production : agent Cortex ---------- */

const QUESTION = "Quelles gammes décrochent par rapport à l'objectif ce mois-ci ?";
const ANSWER =
  "Deux gammes sont sous l'objectif saisonnalisé : RC Décennale et 2-roues. L'écart vient surtout de 3 courtiers du segment « potentiel ». Je propose une action ciblée avant le prochain checkpoint.";

const bars = [
  { k: "Auto", v: 104 },
  { k: "Habitation", v: 98 },
  { k: "RC Décennale", v: 86 },
  { k: "2-roues", v: 81 },
  { k: "Immobilier", v: 101 },
];

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const objective = [40, 46, 58, 62, 66, 60, 50, 44, 64, 70, 66, 74];
const actual = [42, 47, 55, 64, 68, 58, 52, 43, 62, 66];

function toPath(vals: number[], w: number, h: number) {
  const step = w / (months.length - 1);
  return vals.map((v, i) => `${i ? "L" : "M"} ${i * step} ${h - (v / 80) * h}`).join(" ");
}

function ProductionPanel({ active, reduce }: { active: boolean; reduce: boolean }) {
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState(0); // 0 question, 1 réflexion, 2 réponse

  useEffect(() => {
    if (!active || reduce) return;
    setPhase(0);
    const t1 = setTimeout(() => setPhase(1), QUESTION.length * 28 + 300);
    const t2 = setTimeout(() => setPhase(2), QUESTION.length * 28 + 1500);
    const t3 = setTimeout(() => setCycle((c) => c + 1), QUESTION.length * 28 + 1500 + ANSWER.length * 14 + 6000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [active, cycle, reduce]);

  const q = useTyping(QUESTION, active && !reduce, 28, cycle);
  const a = useTyping(ANSWER, active && phase === 2, 14, cycle);
  const question = reduce ? QUESTION : q;
  const answer = reduce ? ANSWER : phase === 2 ? a : "";

  return (
    <>
      <div className="space-y-4 px-6 py-6">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-business-soft px-4 py-3 text-[0.95rem] text-ink">
          {question}
          {!reduce && question.length < QUESTION.length && <Caret />}
        </div>
        <div className="min-h-[110px] max-w-[92%] rounded-2xl rounded-bl-sm bg-tech-soft px-4 py-3 text-[0.95rem] text-ink">
          {phase === 1 && !reduce ? (
            <span className="flex gap-1.5 py-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-tech"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </span>
          ) : (
            <>
              {answer}
              {!reduce && phase === 2 && answer.length < ANSWER.length && <Caret />}
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 border-t border-line px-6 py-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-bold">Atteinte de l&apos;objectif par gamme</p>
          <ul className="space-y-2.5">
            {bars.map((b, i) => (
              <li key={b.k} className="grid grid-cols-[88px_1fr_36px] items-center gap-2 text-xs">
                <span className="text-muted">{b.k}</span>
                <span className="relative h-2 rounded-full bg-surface">
                  <motion.span
                    className={`absolute inset-y-0 left-0 rounded-full ${b.v >= 95 ? "bg-tech" : "bg-business"}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min(b.v, 110) / 1.1}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="absolute -top-1 bottom-[-4px] left-[90.9%] w-px bg-ink/30" />
                </span>
                <span className={`text-right font-bold tabular-nums ${b.v >= 95 ? "text-tech" : "text-business"}`}>
                  {b.v}%
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 flex items-center justify-between text-sm font-bold">
            Objectif saisonnalisé
            <span className="flex gap-3 text-[0.7rem] font-normal text-muted">
              <span className="flex items-center gap-1"><i className="h-0.5 w-3 bg-faint" /> objectif</span>
              <span className="flex items-center gap-1"><i className="h-0.5 w-3 bg-tech" /> réalisé</span>
            </span>
          </p>
          <svg viewBox="0 0 220 90" className="w-full overflow-visible">
            <path d={toPath(objective, 220, 80)} fill="none" style={{ stroke: "var(--color-faint)" }} strokeWidth="1.5" strokeDasharray="3 3" />
            <motion.path
              d={toPath(actual, 220, 80)}
              fill="none"
              style={{ stroke: "var(--color-tech)" }}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.4 }}
            />
            {months.map((m, i) => (
              <text key={i} x={(i * 220) / 11} y="90" textAnchor="middle" fontSize="7" style={{ fill: "var(--color-faint)" }}>
                {m}
              </text>
            ))}
          </svg>
        </div>
      </div>
    </>
  );
}

/* ---------- En développement : session Claude Code ---------- */

const PROMPT = "Ajoute la saisonnalité au moteur d'objectifs, avec un test dbt";

type Line = { kind: "step" | "file" | "del" | "add" | "cmd" | "ok" | "say"; text: string };

const SCRIPT: Line[] = [
  { kind: "step", text: "Lecture de models/objectifs/fct_objectifs.sql" },
  { kind: "step", text: "Historique N-1 et N-2 → coefficients saisonniers par gamme" },
  { kind: "step", text: "Mise à jour du modèle et ajout d'un test : Σ mois = objectif annuel" },
  { kind: "file", text: "fct_objectifs.sql" },
  { kind: "del", text: "obj_mois = obj_annuel / 12" },
  { kind: "add", text: "obj_mois = obj_annuel * coef_saison[mois]" },
  { kind: "add", text: "join {{ ref('coef_saison_gamme') }} using (gamme)" },
  { kind: "cmd", text: "dbt build --select fct_objectifs+" },
  { kind: "ok", text: "12 tests passés · 0 erreur" },
  { kind: "say", text: "Saisonnalité en place, prête pour la prochaine Business Review." },
];

const TYPE_SPEED = 30;
const LINE_GAP = 520;

function TerminalPanel({ active, reduce }: { active: boolean; reduce: boolean }) {
  const [cycle, setCycle] = useState(0);
  const [shown, setShown] = useState(0);
  const typed = useTyping(PROMPT, active && !reduce, TYPE_SPEED, cycle);
  const prompt = reduce ? PROMPT : typed;
  const done = prompt.length >= PROMPT.length;

  useEffect(() => {
    if (!active || reduce) return setShown(reduce ? SCRIPT.length : 0);
    setShown(0);
    const start = PROMPT.length * TYPE_SPEED + 500;
    const timers = SCRIPT.map((_, i) => setTimeout(() => setShown(i + 1), start + i * LINE_GAP));
    timers.push(setTimeout(() => setCycle((c) => c + 1), start + SCRIPT.length * LINE_GAP + 5500));
    return () => timers.forEach(clearTimeout);
  }, [active, cycle, reduce]);

  return (
    <div className="px-6 py-6">
      <div className="overflow-hidden rounded-2xl bg-night font-mono ring-1 ring-white/5 text-[12px] leading-relaxed text-white/80 sm:text-[13px]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-canvas/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-canvas/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-canvas/20" />
          <span className="ml-2 text-[11px] text-white/40">claude · pilotage-data</span>
        </div>

        <div className="min-h-[360px] space-y-1 px-4 py-4 whitespace-pre-wrap [overflow-wrap:anywhere]">
          <p className="pl-[2ch] -indent-[2ch]">
            <span className="text-[#b8a6f0]">&gt; </span>
            <span className="text-white">{prompt}</span>
            {!reduce && active && !done && <Caret className="bg-canvas/70" />}
          </p>

          {SCRIPT.slice(0, shown).map((l, i) => (
            <motion.div
              key={`${cycle}-${i}`}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <TermLine line={l} pending={!reduce && l.kind === "step" && i === shown - 1} />
            </motion.div>
          ))}

          {!reduce && active && done && shown < SCRIPT.length && (
            <span className="inline-block h-[1em] w-[0.55em] translate-y-[2px] animate-blink bg-canvas/50" />
          )}
        </div>
      </div>
    </div>
  );
}

function TermLine({ line, pending }: { line: Line; pending: boolean }) {
  switch (line.kind) {
    case "step":
      return (
        <p className="pl-[2ch] -indent-[2ch]">
          <span className={pending ? "text-white/40" : "text-[#5fd3ae]"}>{pending ? "○" : "●"} </span>
          {line.text}
        </p>
      );
    case "file":
      return <p className="mt-3 text-white/50">  {line.text}</p>;
    case "del":
      return <p className="rounded bg-[#f08b8b]/10 py-px pr-2 pl-[calc(0.5rem+2ch)] -indent-[2ch] text-[#f4a3a3]">- {line.text}</p>;
    case "add":
      return <p className="rounded bg-[#5fd3ae]/10 py-px pr-2 pl-[calc(0.5rem+2ch)] -indent-[2ch] text-[#8fe6c6]">+ {line.text}</p>;
    case "cmd":
      return (
        <p className="mt-3">
          <span className="text-white/40">$ </span>
          {line.text}
        </p>
      );
    case "ok":
      return <p className="text-[#5fd3ae]">✓ {line.text}</p>;
    case "say":
      return <p className="mt-3 pl-[2ch] -indent-[2ch] text-white">● {line.text}</p>;
  }
}
