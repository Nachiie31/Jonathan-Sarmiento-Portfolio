/**
 * Single source of truth for site-wide identity and SEO.
 * Every value marked TODO is a placeholder: replace before deploying.
 */
export const siteConfig = {
  // TODO: replace with your real name and title.
  name: "Your Name",
  title: "Web Developer",
  // Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://yourname.dev). Falls back to localhost for dev.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_US",
  // Keep under ~160 characters so search engines don't truncate it.
  description:
    "Web developer building functional, responsive, user-focused web applications with clean implementation, thoughtful design and reliable QA. Portfolio of projects and case studies.",
  keywords: [
    "web developer",
    "frontend developer",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "QA tester",
    "software testing",
    "portfolio",
  ],
  // TODO: add your real profile links. Leave empty strings until you have them.
  links: {
    email: "", // e.g. "you@example.com"
    github: "", // e.g. "https://github.com/username"
    linkedin: "", // e.g. "https://www.linkedin.com/in/username"
  },
  // TODO: optional, e.g. "Philippines". Used in structured data only if set.
  location: "",
} as const;

export const sameAsLinks = [siteConfig.links.github, siteConfig.links.linkedin].filter(
  (link) => link.length > 0,
);
