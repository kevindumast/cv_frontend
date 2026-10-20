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

export const stats: { value: number | null; prefix?: string; suffix?: string; label: string; detail: string; tone: Tone }[] = [
  { value: 26, suffix: "", label: "commerciaux", detail: "+ 3 managers et 1 directeur commercial accompagnés", tone: "business" },
  { value: 5, label: "gammes IARD", detail: "sur 2 filiales, au service de 2 directeurs généraux", tone: "business" },
  { value: null, label: "IA en production", detail: "agents IA au service du pilotage commercial", tone: "tech" },
  { value: null, label: "Seul", detail: "sur toute la chaîne data, de Snowflake à l'IA", tone: "tech" },
];

// La chaîne data opérée de bout en bout.
export const pipeline: { step: string; tools: string; output: string; tone: Tone }[] = [
  { step: "Ingestion & entrepôt", tools: "Snowflake", output: "Toute la donnée commerciale IARD, conçue et administrée seul", tone: "tech" },
  { step: "Modélisation", tools: "dbt · Python · Snowpark", output: "Moteurs d'objectifs et de segmentation, de la règle métier au résultat", tone: "tech" },
  { step: "Orchestration", tools: "Dagster · GitLab CI/CD", output: "Pipelines industrialisés, déployés en continu", tone: "tech" },
  { step: "Intelligence", tools: "Snowflake Cortex · LLM", output: "Agents IA : la performance en langage naturel, un rapport quotidien généré", tone: "tech" },
  { step: "Restitution", tools: "QlikSense · Streamlit · Mapbox", output: "Dashboards et cartographie interactive de la production", tone: "business" },
  { step: "Décision", tools: "Business Review", output: "Ce qui progresse, ce qui recule, et pourquoi, pour la direction commerciale", tone: "business" },
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
      "Pilotage de l'activité des banquiers privés (assurance-vie, titres, financements) : dashboards, études marketing, automatisation du service",
    ],
  },
  {
    title: "Middle Office & Risk Management",
    company: "FASTEA Capital",
    place: "Société de gestion · Nantes",
    period: "Avr. 2015 — Mars 2016",
    bullets: [
      "Système d'information Risk / Middle office (Python, VBA, SQL), indicateurs de risque (VaR), valorisation automatisée de 2 OPCVM",
    ],
  },
];

export const expertise = [
  "Courtage d'assurance : pilotage et animation d'un réseau de courtiers",
  "Assurance IARD : Auto, Habitation, RC Décennale, 2-roues, Immobilier",
  "Campagnes commerciales : segmentation, ciblage, suivi",
  "Pilotage : KPIs, objectifs saisonnalisés, Business Review",
  "Technique assurance : tarification, rétention, résultats techniques",
  "Finance : banque privée, gestion d'actifs, risque",
  "Gouvernance de données",
];

export const stack: { group: string; items: string[] }[] = [
  { group: "Data", items: ["Snowflake", "dbt", "Dagster", "SQL avancé", "Snowpark", "PySpark"] },
  { group: "IA & Data Science", items: ["Snowflake Cortex (agents IA)", "LLM & prompt engineering", "Machine learning (scikit-learn)", "NLP"] },
  { group: "Développement", items: ["Python", "TypeScript", "JavaScript", "Next.js", "Tailwind", "Streamlit", "Mapbox GL", "API REST", "VBA"] },
  { group: "DevOps & Cloud", items: ["Git", "GitLab CI/CD", "Docker", "Vercel", "OVH", "Azure", "AWS"] },
  { group: "BI & CRM", items: ["QlikSense", "Salesforce (SOQL)"] },
];

export const marquee = [
  "Snowflake", "dbt", "Dagster", "Cortex", "Python", "SQL", "Snowpark", "PySpark", "scikit-learn", "NLP",
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

export const education = [
  { degree: "Master 2 Ingénierie Économique et Financière", school: "Université de Rennes 1 · finance quantitative", year: "2015" },
  { degree: "Licence Économie-Gestion", school: "Université de Rennes 1", year: "2012" },
];
