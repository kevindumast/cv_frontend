# Kévin DUMAST · site vitrine

Site one-page construit à partir du CV 2026 : Next.js 16, Tailwind 4, Motion, Lenis.
Palette et typographie reprises du CV (violet `#6A4FC2` = business, vert `#1E8C6E` = tech, Calibri / Carlito).

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:3000
```

## Modifier le contenu

Tous les textes sont dans [`lib/content.ts`](lib/content.ts). Dans les titres animés, `*mot*` s'affiche en violet et `~mot~` en vert.
La photo est `public/kevin.png` ; l'aperçu LinkedIn est généré par `app/opengraph-image.tsx`.

## Déployer sur Vercel

1. Pousser ce dépôt sur GitHub (ou GitLab).
2. Sur [vercel.com/new](https://vercel.com/new), importer le dépôt. Next.js est détecté automatiquement, sans aucun réglage.
3. Coller l'URL `https://<projet>.vercel.app` dans LinkedIn : *Modifier le profil → Site web*, ou dans la section *Sélection*.

En alternative : `npx vercel` puis `npx vercel --prod` depuis ce dossier.

Les fichiers sources personnels (`*.pptx`, `*.pdf`, `.env*`…) sont exclus par `.gitignore`.
