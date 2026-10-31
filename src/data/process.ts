export type ProcessStep = { title: string; summary: string; activities: string[] };

export const processSteps: ProcessStep[] = [
  {
    title: "Understand",
    summary: "Pin down what the product must do, for whom, and what “done” looks like before anything is built.",
    activities: ["Clarify goals and users", "List requirements and edge cases", "Agree on scope and acceptance criteria"],
  },
  {
    title: "Plan",
    summary: "Decide on structure first, so the build stays simple and changes stay cheap.",
    activities: ["Map pages, data and components", "Choose the simplest stack that fits", "Plan accessibility and performance up front"],
  },
  {
    title: "Design & build",
    summary: "Build in small, reviewable steps with responsive, accessible interfaces.",
    activities: ["Typed, reusable components", "Mobile-first layouts", "Frequent, descriptive Git commits"],
  },
  {
    title: "Test & fix",
    summary: "Test while building, then again before release. Reproduce, report and fix defects properly.",
    activities: ["Write test cases from requirements", "Manual and regression testing", "Track and verify every fix"],
  },
  {
    title: "Deploy & maintain",
    summary: "Ship it, check the live build, document it, and keep improving it.",
    activities: ["Deploy and smoke-test the live site", "Document setup and decisions", "Monitor, fix and iterate"],
  },
];
