/**
 * Configurable starting point. Remove anything you can't genuinely demonstrate
 * and add anything missing. No percentages: depth is shown by what you can point to in projects.
 */
export type SkillGroup = { name: string; focus: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    focus: "Responsive, accessible interfaces.",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    name: "Backend & data",
    focus: "APIs and data behind the interface.",
    items: ["Node.js", "REST APIs", "Supabase", "SQL"],
  },
  {
    name: "Development tools",
    focus: "Version control and shipping.",
    items: ["Git", "GitHub", "VS Code", "Vercel"],
  },
  {
    name: "Testing & QA",
    focus: "Finding defects before users do.",
    items: [
      "Manual testing",
      "Test cases",
      "Bug reporting",
      "Regression testing",
      "Python",
      "pytest",
    ],
  },
  {
    name: "IT support",
    focus: "Systematic troubleshooting.",
    items: ["Troubleshooting", "Networking fundamentals", "Hardware & software support"],
  },
];
