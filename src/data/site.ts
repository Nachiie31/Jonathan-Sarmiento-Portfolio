/**
 * Single source of truth for site-wide identity and SEO.
 * Every value marked TODO is a placeholder: replace before deploying.
 */
export const siteConfig = {
  // TODO: replace with your real name and title.
  name: "Jonathan Sarmiento",
  title: "Junior Web Developer / Manual Quality Assurance Tester",
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
    "manual testing",
  ],
  // TODO: add your real profile links. Leave empty strings until you have them.
  links: {
    email: "jonathan.galsim.sarmiento@gmail.com", // e.g. "you@example.com"
    github: "https://github.com/Nachiie31", // e.g. "https://github.com/username"
    linkedin: "www.linkedin.com/in/sarmiento-jonathan-g-3458b527a", // e.g. "https://www.linkedin.com/in/username"
  },
  // TODO: optional, e.g. "Philippines". Used in structured data only if set.
  location: "Philippines",
} as const;

export const sameAsLinks = [siteConfig.links.github, siteConfig.links.linkedin].filter(
  (link) => link.length > 0,
);
