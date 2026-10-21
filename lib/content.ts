// Contenu du site, repris du CV 2026 (v16).

export const profile = {
  firstName: "Kévin",
  lastName: "DUMAST",
  role: "Responsable de la Performance Commerciale IARD",
  tagline: ["Data & Business Analytics", "BI & IA", "Développement Full Stack"],
  pitch:
    "Plus de 10 ans de data en finance et en assurance. Je pilote la performance commerciale d'un réseau de courtiers IARD en m'appuyant sur une chaîne data que je conçois et opère seul, de Snowflake aux agents IA.",
  pitchEnd:
    "Autodidacte et force de proposition : quand un besoin métier n'a pas d'outil, je le conçois, je le code et je le mets en production. Prêt à structurer et animer une équipe data & performance.",
  linkedin: "https://www.linkedin.com/in/kevin-dumast-29aa5588",
  location: "Rennes",
};

export type Tone = "business" | "tech";

// Même structure pour chaque carte : `value` (nombre animé) ou `word` en grand, puis libellé et détail.
export const stats: { value?: number; word?: string; label: string; detail: string; tone: Tone }[] = [
  { value: 26, label: "commerciaux", detail: "+ 3 managers et 1 directeur commercial accompagnés", tone: "business" },
  { value: 5, label: "gammes IARD", detail: "sur 2 filiales, au service de 2 directeurs généraux", tone: "business" },
  { word: "IA", label: "en production", detail: "agents IA au service du pilotage commercial", tone: "tech" },
  { word: "Seul", label: "sur toute la chaîne data", detail: "de Snowflake jusqu'aux agents IA", tone: "tech" },
];

// KPIs pilotés au quotidien, du potentiel au portefeuille.
// `hint` uniquement pour les définitions validées.
export const kpiStages: { stage: string; caption: string; kpis: { k: string; hint?: string }[] }[] = [
  {
    stage: "Potentiel",
    caption: "Identifier où se trouve la croissance",
    kpis: [{ k: "Potentiel additionnel" }, { k: "Qualification du potentiel" }],
  },
  {
    stage: "Animation du réseau",
    caption: "Mobiliser les bons courtiers",
    kpis: [{ k: "Taux d'animation / objectif" }, { k: "Volume de devis" }, { k: "Efficience commerciale" }],
  },
  {
    stage: "Conversion",
    caption: "Transformer l'activité en affaires",
    kpis: [
      { k: "Taux d'engagement", hint: "courtiers ciblés effectivement suivis" },
      { k: "Transformation du potentiel" },
      { k: "Taux de transformation" },
    ],
  },
  {
    stage: "Résultats",
    caption: "Mesurer ce qui a été produit",
    kpis: [{ k: "Production nouvelle" }, { k: "CA" }, { k: "Prime moyenne" }, { k: "Taux d'atteinte objectif" }],
  },
  {
    stage: "Portefeuille",
    caption: "Garder et rentabiliser",
    kpis: [
      { k: "Rétention" },
      { k: "Taux de chute" },
      { k: "Durée de vie des contrats" },
      { k: "Multi-équipement" },
      { k: "Rentabilité" },
    ],
  },
];

// La chaîne data opérée de bout en bout.
export const pipeline: { step: string; tools: string; output: string; tone: Tone }[] = [
  { step: "Ingestion & entrepôt", tools: "Snowflake", output: "Toute la donnée commerciale IARD, conçue et administrée seul", tone: "tech" },
  { step: "Modélisation", tools: "dbt · Python · Snowpark", output: "Moteurs d'objectifs et de segmentation, de la règle métier au résultat", tone: "tech" },
  { step: "Orchestration", tools: "Dagster · GitLab CI/CD", output: "Pipelines industrialisés, déployés en continu", tone: "tech" },
  { step: "Intelligence", tools: "Snowflake Cortex · LLM", output: "Agents IA : la performance en langage naturel, un rapport quotidien généré", tone: "tech" },
  { step: "Restitution", tools: "QlikSense · Streamlit · Mapbox", output: "Dashboards et cartographie interactive de la production", tone: "business" },
  { step: "Décision", tools: "Business Review · supports générés en Python", output: "Des présentations prêtes pour la direction commerciale : ce qui progresse, ce qui recule, et pourquoi", tone: "business" },
];

// Logos officiels (public/logos/), récupérés sur les sites des entreprises.
// `ratio` = largeur / hauteur du SVG. Sans logo, une pastille aux initiales s'affiche.
export const companies: Record<string, { initials: string; logo?: string; ratio?: number }> = {
  APRIL: { initials: "A", logo: "/logos/april.svg", ratio: 140 / 33 },
  "Crédit Agricole d'Ille-et-Vilaine": {
    initials: "CA",
    logo: "/logos/credit-agricole-ille-et-vilaine.svg",
    ratio: 134 / 72,
  },
  "FASTEA Capital": { initials: "F", logo: "/logos/fastea-capital.svg", ratio: 277 / 87 },
  // Banque de Bretagne, absorbée par BNP Paribas en 2011 : logo du groupe
  "Banque de Bretagne": { initials: "BB", logo: "/logos/bnp-paribas.svg", ratio: 219.1 / 45.4 },
  "BNP Paribas": { initials: "BNP", logo: "/logos/bnp-paribas.svg", ratio: 219.1 / 45.4 },
  // Banque Populaire de l'Ouest, fusionnée en 2017 dans la BPGO : emblème Banque Populaire
  "Banque Populaire de l'Ouest": { initials: "BP", logo: "/logos/banque-populaire.png", ratio: 234 / 232 },
  Groupama: { initials: "G", logo: "/logos/groupama.svg", ratio: 155.1 / 36.1 },
  // Rennes 1 est devenue l'Université de Rennes en 2023 : logo actuel
  "Université de Rennes 1": { initials: "UR", logo: "/logos/universite-rennes.svg", ratio: 927 / 296 },
};

// Jobs étudiants et stages pendant les études, du plus récent au plus ancien
export const studentJobs: { company: string; role?: string; sector: string; year: string; note?: string }[] = [
  { company: "Banque Populaire de l'Ouest", role: "Analyste crédit", sector: "Banque", year: "2013" },
  { company: "Banque de Bretagne", role: "Conseiller clientèle assistant", sector: "Banque", year: "2012", note: "groupe BNP Paribas" },
  { company: "BNP Paribas", role: "Conseiller clientèle assistant", sector: "Banque", year: "2011" },
  { company: "Groupama", role: "Stage", sector: "Assurance", year: "2010" },
];

export type Experience = {
  title: string;
  company: string;
  place: string;
  period: string;
  business?: string[];
  tech?: string[];
  bullets?: string[];
};

export const experiences: Experience[] = [
  {
    title: "Responsable de la Performance Commerciale IARD",
    company: "APRIL",
    place: "Réseau de courtage IARD · Rennes",
    period: "Nov. 2024 — aujourd'hui",
    business: [
      "Pilotage de la performance du réseau de courtiers : 5 gammes IARD (Auto, Habitation, RC Décennale, 2-roues, Immobilier) sur 2 filiales",
      "Calcul des objectifs des commerciaux, saisonnalisés, et suivi de leur atteinte",
      "Business Review mensuelles pour la direction commerciale : ce qui progresse, ce qui recule et pourquoi",
      "Pilotage de l'animation commerciale : segmentation annuelle des courtiers et respect des checkpoints fixés par la stratégie du groupe",
      "Actions commerciales pour corriger les écarts et capter les poches de potentiel",
      "Speaker aux conventions commerciales et au comité de développement commercial",
      "Coach de plusieurs équipes lors d'un hackathon data",
    ],
    tech: [
      "Entrepôt Snowflake de toute la donnée commerciale IARD, conçu et administré seul, modélisation dbt",
      "Moteur de calcul des objectifs en Python / dbt, de la règle métier au résultat",
      "Agents IA Snowflake Cortex : analyse de la performance en langage naturel et rapport quotidien généré par IA",
      "Moteur de segmentation algorithmique en Python / dbt, conçu et développé de A à Z",
      "Moteur de règles de ciblage des campagnes ; reportings automatisés qui font gagner des semaines de travail",
      "Génération automatisée des supports de Business Review en Python : de la donnée au deck prêt pour la direction",
      "Dashboards QlikSense et application de cartographie interactive de la production (Streamlit, Mapbox)",
      "Industrialisation : orchestration Dagster, CI/CD GitLab, extensions Chrome métier",
    ],
  },
  {
    title: "Data Scientist · Data Lab / R&D",
    company: "APRIL",
    place: "Direction technique · Rennes",
    period: "Mai 2017 — Nov. 2024",
    bullets: [
      "Rétention et valeur client : modélisation de la durée de vie des contrats et des taux de chute, segmentation clients (k-means, arbres de décision)",
      "Tarification et rentabilité : calculettes de tarification, optimisation sous contraintes, analyses actuarielles des portefeuilles Auto, Habitation et RC Décennale (métropole et DROM)",
      "Outils d'aide à la décision pour les métiers : résultats techniques, provisions sinistres, risques de l'activité construction, cartographie interactive",
      "Qualité de la relation client : analyse des appels par NLP (speech-to-text, diarisation, sentiment)",
      "Fusions d'entreprises : consolidation des SI, membre du comité Gouvernance de données groupe",
    ],
  },
  {
    title: "Analyste Middle Office · Banque privée",
    company: "Crédit Agricole d'Ille-et-Vilaine",
    place: "Marché du patrimoine",
    period: "Juin 2016 — Mai 2017",
    bullets: [
      "Pilotage de l'activité des banquiers privés du marché du patrimoine : assurance-vie, titres et financements",
      "Dashboards de suivi de l'activité commerciale, pour les banquiers et leur encadrement",
      "Études marketing pour orienter les actions auprès de la clientèle patrimoniale",
      "Automatisation des tâches récurrentes du service, pour redonner du temps aux équipes",
      "Premier poste au contact direct du commercial : la data au service de la performance, déjà",
    ],
  },
  {
    title: "Middle Office & Risk Management",
    company: "FASTEA Capital",
    place: "Société de gestion · Nantes",
    period: "Avr. 2015 — Mars 2016",
    bullets: [
      "Construction du système d'information Risk / Middle office d'une société de gestion",
      "Développements Python, VBA et SQL pour fiabiliser et automatiser les flux de données du middle office",
      "Calcul et suivi des indicateurs de risque des portefeuilles, dont la VaR",
      "Valorisation automatisée de 2 OPCVM, en remplacement de traitements manuels",
      "Première mise en pratique de la finance quantitative du Master, côté outils et données",
    ],
  },
];

export const expertise = [
  "Courtage d'assurance : pilotage et animation d'un réseau de courtiers",
  "Assurance IARD : Auto, Habitation, RC Décennale, 2-roues, Immobilier",
  "Campagnes commerciales : segmentation, ciblage, suivi",
  "Pilotage : KPIs, objectifs saisonnalisés, Business Review, restitution aux directions",
  "Technique assurance : tarification, rétention, résultats techniques",
  "Finance : banque privée, gestion d'actifs, risque",
  "Gouvernance de données",
];

export const stack: { group: string; items: string[] }[] = [
  { group: "Data", items: ["Snowflake", "dbt", "Dagster", "SQL avancé", "Snowpark", "PySpark"] },
  { group: "Assistants IA au quotidien", items: ["Claude", "Claude Code", "Codex", "Gemini"] },
  { group: "IA & Data Science", items: ["Snowflake Cortex (agents IA)", "LLM & prompt engineering", "Machine learning (scikit-learn)", "NLP"] },
  { group: "Développement", items: ["Python", "TypeScript", "JavaScript", "Next.js", "Tailwind", "Streamlit", "Mapbox GL", "API REST", "VBA"] },
  { group: "DevOps & Cloud", items: ["Git", "GitLab CI/CD", "Docker", "Vercel", "OVH", "Azure", "AWS"] },
  { group: "BI & CRM", items: ["QlikSense", "Salesforce (SOQL)"] },
];

export const marquee = [
  "Claude Code", "Snowflake", "dbt", "Dagster", "Cortex", "Python", "SQL", "Snowpark", "PySpark", "scikit-learn", "NLP",
  "TypeScript", "Next.js", "Tailwind", "Streamlit", "Mapbox GL", "GitLab CI/CD", "Docker", "Vercel", "QlikSense", "Salesforce",
];

export const strengths = [
  "Force de proposition",
  "Autodidacte",
  "Prise de parole en public",
  "Vulgarisation auprès des directions",
  "Autonomie",
  "Esprit produit",
];

export const languages = ["Français natif", "Anglais professionnel", "Espagnol notions"];
export const certification = "Snowflake Fundamentals";
export const interests = ["Veille tech & IA", "Projets web perso", "Cuisine", "Sport", "MAO", "Généalogie"];

export const sideProject = {
  title: "Applications web full stack",
  text: "Développées de A à Z : authentification, base temps réel, CI/CD, mise en production.",
  tools: ["Next.js", "TypeScript", "Tailwind", "Convex", "Clerk", "Vercel"],
};

export const school = {
  name: "Université de Rennes 1",
  faculty: "Faculté des Sciences Économiques",
  today: "aujourd'hui Université de Rennes",
};

export const education: { degree: string; period: string; focus?: string; details?: string[] }[] = [
  {
    degree: "Master 2 Ingénierie Économique et Financière",
    period: "2014 — 2015",
    focus: "Parcours Finance quantitative et gestion d'actifs",
    details: [
      "Mémoire : optimisation du risque et de la performance en gestion collective et privée",
      "Trésorier adjoint du master",
    ],
  },
  {
    degree: "Master 1 Banque / Finance · Ingénierie économique et financière",
    period: "2013 — 2014",
    focus: "Finance quantitative et gestion d'actifs",
  },
  { degree: "Licence Économie-Gestion", period: "2012" },
];

// Matières clés du master, regroupées par famille
export const coursework: { group: string; tone: Tone | "ink"; items: string[] }[] = [
  {
    group: "Data & programmation",
    tone: "tech",
    items: ["C++", "C#", "SQL", "R", "SAS", "VBA", "Datamining & machine learning", "Économétrie", "Prévisions ARCH / GARCH", "Mathématiques"],
  },
  {
    group: "Finance quantitative",
    tone: "business",
    items: ["Modélisation financière", "Évaluation d'actifs (Black-Scholes)", "Gestion d'actifs avancée", "Options, futures & swaps", "Stratégies de couverture"],
  },
  {
    group: "Économie & marchés",
    tone: "ink",
    items: ["Marchés financiers", "Matières premières", "Finance d'entreprise", "Finance internationale", "Politique monétaire et financière"],
  },
];
