"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Démonstration illustrative : chiffres fictifs, aucune donnée réelle.
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

export function AgentDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState(0); // 0 question, 1 réflexion, 2 réponse

  useEffect(() => {
    if (!inView || reduce) return;
    setPhase(0);
    const t1 = setTimeout(() => setPhase(1), QUESTION.length * 28 + 300);
    const t2 = setTimeout(() => setPhase(2), QUESTION.length * 28 + 1500);
    const t3 = setTimeout(() => setCycle((c) => c + 1), QUESTION.length * 28 + 1500 + ANSWER.length * 14 + 6000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [inView, cycle, reduce]);

  const q = useTyping(QUESTION, inView && !reduce, 28, cycle);
  const a = useTyping(ANSWER, phase === 2, 14, cycle);
  const question = reduce ? QUESTION : q;
  const answer = reduce ? ANSWER : phase === 2 ? a : "";

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_80px_-40px_rgba(21,27,35,0.35)]">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-tech-soft text-sm font-bold text-tech">IA</span>
          <div>
            <p className="font-bold leading-tight">Agent de pilotage commercial</p>
            <p className="text-xs text-muted">Snowflake Cortex · rapport quotidien</p>
          </div>
        </div>
        <span className="rounded-full bg-surface px-3 py-1 text-[0.7rem] font-bold tracking-wider text-faint uppercase">
          Démo illustrative
        </span>
      </div>

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
            <path d={toPath(objective, 220, 80)} fill="none" stroke="#8a96a3" strokeWidth="1.5" strokeDasharray="3 3" />
            <motion.path
              d={toPath(actual, 220, 80)}
              fill="none"
              stroke="#1e8c6e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.4 }}
            />
            {months.map((m, i) => (
              <text key={i} x={(i * 220) / 11} y="90" textAnchor="middle" fontSize="7" fill="#8a96a3">
                {m}
              </text>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

function Caret() {
  return <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-ink" />;
}
