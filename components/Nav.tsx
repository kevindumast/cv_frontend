"use client";

import { AnimatePresence, motion, useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { href: "#chaine", label: "Chaîne data" },
  { href: "#parcours", label: "Parcours" },
  { href: "#competences", label: "Compétences" },
  { href: "#profil", label: "Profil" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Nav() {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Échap ferme le menu ; repasser en desktop aussi
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-white/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <a href="#top" onClick={() => setOpen(false)} className="text-[0.95rem] font-bold tracking-[0.28em] text-ink">
          K<span className="text-business">.</span>DUMAST
        </a>
        <ul className="hidden items-center gap-8 text-[0.95rem] text-slate md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="group relative py-2 transition-colors hover:text-ink">
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-business to-tech transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-business"
          >
            LinkedIn
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white md:hidden"
          >
            <motion.span
              className="absolute h-[2px] w-4 rounded bg-ink"
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.3, ease }}
            />
            <motion.span
              className="absolute h-[2px] w-4 rounded bg-ink"
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.3, ease }}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <ul className="px-4 py-4">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line py-4 text-2xl font-bold text-ink last:border-0"
                  >
                    {l.label}
                    <span className={i % 2 ? "text-business" : "text-tech"}>→</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-gradient-to-r from-business to-tech" />
    </header>
  );
}
