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
    "Web developer building responsive, user-focused applications with clean code, thoughtful design, and reliable QA.",
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
    email: "jonathan.galsim.sarmiento@gmail.com", 
    github: "https://github.com/Nachiie31", 
    linkedin: "https://www.linkedin.com/in/jonathan-sarmiento-3458b527a/", 
  },
  
  location: "Philippines",
} as const;

export const sameAsLinks = [siteConfig.links.github, siteConfig.links.linkedin].filter(
  (link) => link.length > 0,
);
