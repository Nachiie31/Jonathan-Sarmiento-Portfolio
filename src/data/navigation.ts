export type NavItem = { id: string; label: string };

/** Section ids double as anchor targets and as the scroll-spy list. */
export const navItems: NavItem[] = [
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];
