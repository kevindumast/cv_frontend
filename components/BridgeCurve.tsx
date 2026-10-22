"use client";

import { motion, useReducedMotion } from "motion/react";

// Deux flux (business en violet, tech en vert) qui convergent puis montent ensemble.
const BUSINESS = "M 0 70 C 110 70, 170 110, 220 160 S 290 236, 330 236";
const TECH = "M 0 380 C 110 380, 170 330, 220 290 S 290 236, 330 236";
const BRIDGE = "M 330 236 C 400 236, 430 280, 480 250 S 560 120, 640 90";

// Particules à positions déterministes (pas d'écart d'hydratation)
function particles(n: number) {
  let s = 7;
  const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  return Array.from({ length: n }, () => ({
    x: Math.round(r() * 640),
    y: Math.round(20 + r() * 400),
    d: 3 + r() * 5,
    o: r(),
  }));
}
const DOTS = particles(34);

export function BridgeCurve() {
  const reduce = useReducedMotion();
  const draw = (delay: number) => ({
    initial: { pathLength: reduce ? 1 : 0 },
    animate: { pathLength: 1 },
    transition: { duration: 1.8, delay, ease: [0.65, 0, 0.35, 1] as const },
  });

  return (
    <svg viewBox="0 0 640 440" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="bridge" x1="0" x2="1">
          <stop offset="0" style={{ stopColor: "var(--color-business)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-tech)" }} />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" style={{ stopColor: "var(--color-tech)" }} stopOpacity="0.35" />
          <stop offset="1" style={{ stopColor: "var(--color-tech)" }} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glowV">
          <stop offset="0" style={{ stopColor: "var(--color-business)" }} stopOpacity="0.22" />
          <stop offset="1" style={{ stopColor: "var(--color-business)" }} stopOpacity="0" />
        </radialGradient>
      </defs>

      {DOTS.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.o > 0.85 ? 2.2 : 1.4}
          style={{ fill: p.x < 320 ? (p.y < 220 ? "var(--color-business)" : "var(--color-tech)") : "var(--color-faint)" }}
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 0.4 } : { opacity: [0, 0.6, 0], y: [0, -14, 0] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.o * 4, ease: "easeInOut" }}
        />
      ))}

      <circle cx="330" cy="236" r="70" fill="url(#glowV)" />
      <motion.circle
        cx="640"
        cy="90"
        r="80"
        fill="url(#glow)"
        animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: "640px 90px" }}
      />

      <motion.path d={BUSINESS} fill="none" style={{ stroke: "var(--color-business)" }} strokeWidth="2.5" strokeLinecap="round" {...draw(0.2)} />
      <motion.path d={TECH} fill="none" style={{ stroke: "var(--color-tech)" }} strokeWidth="2.5" strokeLinecap="round" {...draw(0.35)} />
      <motion.path d={BRIDGE} fill="none" stroke="url(#bridge)" strokeWidth="3.5" strokeLinecap="round" {...draw(1.6)} />

      {!reduce && (
        <>
          <circle r="4" style={{ fill: "var(--color-business)" }}>
            <animateMotion dur="3.2s" repeatCount="indefinite" path={BUSINESS} begin="2s" />
          </circle>
          <circle r="4" style={{ fill: "var(--color-tech)" }}>
            <animateMotion dur="3.2s" repeatCount="indefinite" path={TECH} begin="2.6s" />
          </circle>
          <circle r="4.5" style={{ fill: "var(--color-ink)" }}>
            <animateMotion dur="3.6s" repeatCount="indefinite" path={BRIDGE} begin="3.4s" />
          </circle>
        </>
      )}

      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{ transformOrigin: "330px 236px" }}
      >
        <circle cx="330" cy="236" r="9" style={{ fill: "var(--color-canvas)", stroke: "var(--color-ink)" }} strokeWidth="2.5" />
        <circle cx="330" cy="236" r="3.5" style={{ fill: "var(--color-ink)" }} />
      </motion.g>
      <motion.circle cx="640" cy="90" r="6" style={{ fill: "var(--color-tech)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2, duration: 0.6 }} />

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        fontWeight="700"
        className="text-[22px] tracking-[0.18em] sm:text-[13px] sm:tracking-[0.2em]"
      >
        <text x="6" y="50" style={{ fill: "var(--color-business)" }}>BUSINESS</text>
        <text x="6" y="416" style={{ fill: "var(--color-tech)" }}>TECH</text>
        <text x="330" y="284" textAnchor="middle" style={{ fill: "var(--color-ink)" }}>LE PONT</text>
      </motion.g>
      <motion.text
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4 }}
        x="640"
        y="52"
        textAnchor="end"
        style={{ fill: "var(--color-tech)" }}
        fontWeight="700"
        className="text-[22px] tracking-[0.18em] sm:text-[13px] sm:tracking-[0.2em]"
      >
        DÉCISION
      </motion.text>
    </svg>
  );
}
