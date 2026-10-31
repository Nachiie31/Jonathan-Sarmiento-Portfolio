/**
 * Typed, data-driven project definitions.
 * Add a project by appending an object to `projects`. No UI changes needed.
 * Everything below is a clearly marked "[Placeholder]". Replace with your real projects;
 * never leave invented clients, users, revenue or performance numbers here.
 */
export type ProjectLink = { label: string; href: string };
export type ProjectImage = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  year?: string;
  tagline: string;
  overview: string;
  problem: string;
  role: string;
  responsibilities: string[];
  features: string[];
  stack: string[];
  decisions: { title: string; detail: string }[];
  challenges: { challenge: string; resolution: string }[];
  testing: string;
  /** Replace with real screenshots saved in /public/projects/<slug>/ */
  image?: ProjectImage;
  gallery: ProjectImage[];
  links: { live?: ProjectLink; source?: ProjectLink };
};

const blank = {
  overview: "[Placeholder] Describe the project in two or three sentences.",
  problem: "[Placeholder] What problem or purpose led to this project?",
  role: "[Placeholder] Your role",
  responsibilities: ["[Placeholder] Responsibility"],
  features: ["[Placeholder] Feature"],
  decisions: [{ title: "[Placeholder] Decision", detail: "[Placeholder] Why you chose it." }],
  challenges: [
    { challenge: "[Placeholder] Challenge", resolution: "[Placeholder] How you addressed it." },
  ],
  testing: "[Placeholder] How you tested this project.",
  gallery: [] as ProjectImage[],
  links: {} as Project["links"],
};

export const projects: Project[] = [
  {
    ...blank,
    slug: "project-one",
    number: "01",
    title: "[Placeholder] Project One",
    category: "Web Application",
    tagline: "[Placeholder] One-line summary of what this project does.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    ...blank,
    slug: "project-two",
    number: "02",
    title: "[Placeholder] Project Two",
    category: "Full-Stack App",
    tagline: "[Placeholder] One-line summary of what this project does.",
    stack: ["React", "Node.js", "SQL"],
  },
  {
    ...blank,
    slug: "project-three",
    number: "03",
    title: "[Placeholder] Project Three",
    category: "QA & Test Automation",
    tagline: "[Placeholder] One-line summary of what this project does.",
    stack: ["Python", "pytest", "Selenium"],
  },
];
