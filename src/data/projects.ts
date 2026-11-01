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
    slug: "servebiz",
    number: "01",
    title: "ServeBiz",
    category: "Full-Stack Web Application",
    year: "2026",
    tagline: "POS and inventory system for small shops, with batch and expiry tracking.",
    overview:
      "ServeBiz is a point of sale and inventory web app. Shops record deliveries as batches, sell at the counter, and review sales trends, profit and low stock. It supports several branches, staff roles, refunds and offline cash sales.",
    problem:
      "Small shops often track stock in notebooks, sell items past their expiry date and cannot easily see what to reorder. I wanted one simple tool covering receiving, selling and reporting.",
    role: "Solo developer and QA tester: design, development, database, testing and documentation.",
    responsibilities: [
      "Designed the database schema, security rules and migrations",
      "Built the Next.js interface and server logic for inventory, POS, sales and reports",
      "Integrated Stripe Connect (test mode) for card and GCash payments",
      "Wrote a 198-case manual QA plan and ran browser and database tests",
      "Fixed every defect found and wrote the user guide",
    ],
    features: [
      "POS with discounts, VAT, cash change and printable receipts",
      "Stock received in batches; the earliest-expiring batch is sold first",
      "Low-stock and expiring-soon alerts",
      "Purchase orders with partial receiving, plus CSV import and export",
      "Owner, manager and cashier roles with an audit log",
      "Multiple businesses and branches with an all-branches overview",
      "Partial refunds and voids that restore stock",
      "Sales trends compared with the previous period",
      "Installable PWA that queues cash sales while offline",
      "One-click guest demo with sample data",
    ],
    stack: [
      "Next.js 15", "React", "TypeScript", "Supabase (Postgres, Auth, Storage)",
      "Row Level Security", "Stripe Connect", "PWA", "Playwright",
    ],
    decisions: [
      {
        title: "Permissions enforced in the database",
        detail:
          "Roles are checked with Row Level Security and database functions, so a cashier cannot read or change restricted data even by calling the API directly, not just hidden in the interface.",
      },
      {
        title: "Stock calculated from batches",
        detail:
          "Stock levels come from batch records rather than a single counter. This keeps counts accurate, supports expiry tracking, and gives refunds and voids a clear history to restore.",
      },
      {
        title: "Branches under one business",
        detail:
          "Each branch has its own stock and sales, while the owner can compare all branches in one view. This matches how small chains actually operate.",
      },
    ],
    challenges: [
      {
        challenge: "Opening the app as a new guest could create two demo stores.",
        resolution:
          "Found during QA. Fixed with a per-user lock in the database so the demo store is created only once.",
      },
      {
        challenge: "Refunds and voids had to keep stock, receipts and reports consistent.",
        resolution:
          "Moved them into database functions that update everything in one step, then tested the totals against the sales list.",
      },
      {
        challenge: "Wide tables broke the phone layout.",
        resolution:
          "Fixed the grid so tables scroll inside their own box, and started the menu collapsed on phones. Verified at 390px on nine key pages.",
      },
    ],
    testing:
      "198 manual test cases across 24 modules, each with steps, test data and expected results, plus a defect log. I ran about 130 browser checks and 330 database checks. 10 defects were found and fixed. Payments ran in Stripe test mode only, and I tested only in Chrome.",
    image: {
      src: "/projects/servebiz/dashboard.png",
      alt: "ServeBiz dashboard showing sales trends, low stock and expiring items",
      width: 1600,
      height: 900,
    },
    gallery: [
      { src: "/projects/servebiz/pos.png", alt: "ServeBiz point of sale with cart and cash payment", width: 1600, height: 900 },
      { src: "/projects/servebiz/receipt-refund.png", alt: "Receipt showing a partial refund and net total", width: 1600, height: 900 },
      { src: "/projects/servebiz/branch.png", alt: "All-branches overview comparing income and profit", width: 1600, height: 900 },
      { src: "/projects/servebiz/mobile-pos.png", alt: "ServeBiz POS on a phone screen", width: 390, height: 844 },
    ],
    links: {
      live: { label: "Try the live demo", href: "https://servebiz.vercel.app/login?guest=1" }, // TODO
      // source: { label: "View source", href: "https://github.com/Nachiie31/..." }, // only if the repo is public
    },
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
