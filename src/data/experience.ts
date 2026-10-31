/**
 * Everything here is a "[Placeholder]". Replace with your real roles, internships and learning milestones.
 * `highlights` is optional: only add contributions you can stand behind (no invented numbers).
 */
export type ExperienceEntry = {
  role: string;
  organization: string;
  dates: string;
  summary: string;
  responsibilities: string[];
  tools: string[];
  highlights?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "[Placeholder] QA Tester / Intern",
    organization: "[Placeholder] Organization",
    dates: "[Placeholder] Start – End",
    summary: "[Placeholder] One sentence on the role and what you worked on.",
    responsibilities: ["[Placeholder] Responsibility one", "[Placeholder] Responsibility two"],
    tools: ["Manual testing", "Bug reporting"],
  },
  {
    role: "[Placeholder] IT Support",
    organization: "[Placeholder] Organization",
    dates: "[Placeholder] Start – End",
    summary: "[Placeholder] One sentence on the role and what you worked on.",
    responsibilities: ["[Placeholder] Responsibility one", "[Placeholder] Responsibility two"],
    tools: ["Troubleshooting", "Networking fundamentals"],
  },
  {
    role: "[Placeholder] Education / Learning",
    organization: "[Placeholder] School or program",
    dates: "[Placeholder] Start – End",
    summary: "[Placeholder] Degree, certification or self-directed learning.",
    responsibilities: ["[Placeholder] Focus area or coursework"],
    tools: ["JavaScript", "React"],
  },
];
