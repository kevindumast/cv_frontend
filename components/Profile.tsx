"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  certification,
  education,
  interests,
  languages,
  profile,
  sideProject,
  strengths,
} from "@/lib/content";
import { Reveal, WordReveal } from "./Reveal";

export function Profile() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <section id="profil" className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div ref={ref} className="relative mx-auto w-full max-w-sm">
          <motion.div style={{ y, rotate }} className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-business to-tech opacity-90" />
            <Image
              src="/kevin.png"
              alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
              width={496}
              height={499}
              className="relative aspect-square w-full rounded-[1.6rem] object-cover"
              priority={false}
            />
            <div className="absolute -right-4 -bottom-5 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_50px_-20px_rgba(21,27,35,0.4)]">
              <p className="font-bold leading-tight">{profile.firstName} {profile.lastName}</p>
              <p className="text-sm text-muted">{profile.location}</p>
            </div>
          </motion.div>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow mb-5 text-business">Profil</p>
          </Reveal>
          <WordReveal
            text="Je construis les *outils* dont le business a besoin."
            className="text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-5xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg leading-relaxed text-slate">{profile.pitchEnd}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {strengths.map((s) => (
                <li key={s} className="rounded-full bg-business-soft px-3.5 py-1.5 text-sm font-bold text-business">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <Reveal>
              <Card title="Projets personnels" tone="tech">
                <p className="font-bold text-ink">{sideProject.title}</p>
                <p className="mt-1 text-slate">{sideProject.text}</p>
                <p className="mt-3 text-sm font-bold text-tech">{sideProject.tools.join(" · ")}</p>
              </Card>
            </Reveal>
            <Reveal delay={0.06}>
              <Card title="Formation" tone="business">
                <ul className="space-y-3">
                  {education.map((e) => (
                    <li key={e.degree}>
                      <p className="font-bold leading-snug text-ink">
                        {e.degree} <span className="font-normal text-muted">· {e.year}</span>
                      </p>
                      <p className="text-sm text-slate">{e.school}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
            <Reveal delay={0.12}>
              <Card title="Langues & certification" tone="ink">
                <p className="text-slate">{languages.join(" · ")}</p>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-tech-soft px-3 py-1 text-sm font-bold text-tech">
                  ❄ {certification}
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.18}>
              <Card title="Centres d'intérêt" tone="ink">
                <p className="text-slate">{interests.join(" · ")}</p>
              </Card>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ title, tone, children }: { title: string; tone: "tech" | "business" | "ink"; children: React.ReactNode }) {
  const color = tone === "tech" ? "text-tech" : tone === "business" ? "text-business" : "text-ink";
  return (
    <div className="h-full rounded-2xl border border-line p-6">
      <p className={`eyebrow mb-3 !text-[0.7rem] ${color}`}>{title}</p>
      {children}
    </div>
  );
}
