"use client";

import { motion } from "motion/react";
import { profile } from "@/lib/content";
import { Reveal, WordReveal } from "./Reveal";

export function Contact() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <motion.div
        aria-hidden
        className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-business opacity-30 blur-[120px]"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-40 -bottom-40 h-[28rem] w-[28rem] rounded-full bg-tech opacity-30 blur-[120px]"
        animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="eyebrow mb-6 text-white/60">Contact</p>
        </Reveal>
        <WordReveal
          text="Structurons ensemble une équipe data & performance."
          className="max-w-4xl text-4xl leading-[1.02] font-bold tracking-[-0.03em] sm:text-6xl"
        />
        <Reveal delay={0.2}>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-lg font-bold text-ink transition hover:bg-business-soft"
          >
            Échangeons sur LinkedIn
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>

        <div className="mt-24 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName} · {profile.location}
          </p>
          <p>Next.js · Motion · Vercel</p>
        </div>
      </div>
    </footer>
  );
}
