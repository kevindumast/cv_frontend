"use client";

import { useState } from "react";

// Sur mobile, n'affiche que les `visible` premiers éléments avec un bouton « Voir plus ».
// À partir de `lg`, tout est affiché et le bouton disparaît.
export function useExpandable(total: number, visible: number) {
  const [open, setOpen] = useState(false);
  const hiddenCount = total - visible;
  const itemClass = (i: number) => (!open && i >= visible ? "hidden lg:flex" : "flex");
  const toggle =
    hiddenCount > 0 ? (
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-bold text-slate transition-colors hover:border-business hover:text-business lg:hidden"
      >
        {open ? "Voir moins" : `Voir plus (${hiddenCount})`}
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>↓</span>
      </button>
    ) : null;
  return { itemClass, toggle, reset: () => setOpen(false) };
}
