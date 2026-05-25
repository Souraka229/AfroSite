export interface Expert {
  id: string
  name: string
  role: string
  bio: string
  skills: string[]
  image?: string
}

export const experts: Expert[] = [
  {
    id: "souraka",
    name: "Souraka HAMIDA",
    role: "CEO & Fondateur",
    bio: "CEO de Restafy, Fondateur de AfroSite et acteur digital. Data Scientist en formation a Seme City, la future Silicon Valley d&apos;Afrique.",
    skills: ["Leadership", "Data Science", "Vision Strategique", "Business Development"],
  },
  {
    id: "bienvenu",
    name: "DAGA Bienvenu",
    role: "Designer UI/UX",
    bio: "Expert en design d&apos;interfaces utilisateur et experiences utilisateur. Passionnee par la creation de designs intuitifs et esthetiques.",
    skills: ["UI Design", "UX Research", "Figma", "Design System"],
  },
  {
    id: "hamdaane",
    name: "CHITOU Hamdaane",
    role: "Developpeur & Cybersecurite",
    bio: "Developpeur full-stack et expert en cybersecurite. Assure la solidite et la securite de toutes nos solutions.",
    skills: ["Full-Stack Development", "Cybersecurity", "Cloud", "DevOps"],
  },
]

export const services = [
  {
    id: "web",
    title: "Developpement Web",
    description: "Sites web modernes, performants et responsive. Applications web sur mesure pour votre entreprise.",
    icon: "Globe",
  },
  {
    id: "design",
    title: "Design UI/UX",
    description: "Interfaces elegantes et experiences utilisateur fluides. Design qui convertit et fidélise.",
    icon: "Palette",
  },
  {
    id: "security",
    title: "Cybersecurite",
    description: "Protection de vos systemes et donnees. Audits de securite et conformite.",
    icon: "Shield",
  },
  {
    id: "consulting",
    title: "Conseil Digital",
    description: "Accompagnement strategique pour votre transformation digitale. De l&apos;idee a la realisation.",
    icon: "Lightbulb",
  },
]

export const projectTypes = [
  "Site Vitrine",
  "E-commerce",
  "Application Web",
  "Application Mobile",
  "Refonte de Site",
  "Design UI/UX",
  "Audit de Securite",
  "Autre",
]

export const budgetRanges = [
  "Moins de 500 000 FCFA",
  "500 000 - 1 000 000 FCFA",
  "1 000 000 - 2 500 000 FCFA",
  "2 500 000 - 5 000 000 FCFA",
  "Plus de 5 000 000 FCFA",
  "A definir",
]
