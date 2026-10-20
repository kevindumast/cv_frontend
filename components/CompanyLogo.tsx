import Image from "next/image";
import { companies } from "@/lib/content";

// Logo à hauteur fixe, largeur selon ses proportions (bornée pour les logos très larges).
export function CompanyLogo({ company, height = 32 }: { company: string; height?: number }) {
  const c = companies[company];

  if (c?.logo && c.ratio) {
    const width = Math.round(Math.min(height * c.ratio, height * 3.6));
    const h = Math.round(width / c.ratio);
    return (
      <Image
        src={c.logo}
        alt={`Logo ${company}`}
        width={width}
        height={h}
        unoptimized
        className="shrink-0 object-contain"
        style={{ width, height: h }}
      />
    );
  }

  return (
    <span
      aria-hidden
      className="text-bridge flex shrink-0 items-center justify-center rounded-xl border border-line bg-white text-base font-bold"
      style={{ width: height, height }}
    >
      {c?.initials ?? company.slice(0, 1)}
    </span>
  );
}
