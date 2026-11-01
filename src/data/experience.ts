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
    role: "Bachelor of Science in Information Technology",
    organization: "Datamex College of Saint Adeline",
    dates: "July 2021 – May 2025",
    summary: "Graduated Cum Laude with a strong foundation in information technology, software development, database management, and systems analysis. Developed practical programming and problem-solving skills through academic projects and hands-on application development.",
    responsibilities: ["Developed a POS and Inventory Management System using VB.NET and SQLite as an academic capstone project.",
    "Studied programming fundamentals, database management, systems analysis, and software development.",
    "Applied software development concepts through academic projects, including application design, implementation, and testing."],
        tools: ["VB.NET",
    "SQLite",
    "SQL",
    "C#",
    "HTML",
    "CSS",
    "JavaScript",
    "Microsoft Office"],
  },

  {
    role: "IT Support Intern",
    organization: "Manila North Harbour Port Inc.",
    dates: "September 2024 – February 2025",
    summary: "Supported the IT department in day-to-day technical operations, assisting with hardware and software setup, troubleshooting, network configuration, and basic system maintenance.",
    responsibilities: ["Assisted in troubleshooting hardware, software, and network-related issues.",
    "Helped configure IP phones, network printers, and workstations.",
    "Performed computer setup, software installation, and basic hardware maintenance.",
    "Assisted with LAN cable testing and gained hands-on exposure to switches, servers, and networking tools.",
    "Used remote support tools such as VNC to assist with technical issues.",
    "Provided basic assistance with an internal inventory management application developed using PowerApps."],
        tools: ["Windows",
    "Microsoft Office",
    "VNC",
    "PowerApps",
    "IP Phones",
    "Network Printers",
    "LAN Cable Tester",
    "Networking Tools",
    "Hardware & Software Troubleshooting"],
  },

  {
  role: "Seasonal Graphic Designer / Sign Layout Designer",
  organization: "Fairway Signs",
  dates: "July 2025 – February 2026",
  summary: "Worked remotely as a graphic designer specializing in sign layouts, translating customer preferences and design requests into clear, visually appealing layouts while coordinating revisions through digital communication platforms.",
  responsibilities: [
    "Created and modified sign layouts based on customer specifications and design requirements.",
    "Communicated with customers to understand their design preferences, requirements, and requested revisions.",
    "Coordinated design updates and approvals through email, Microsoft Teams, and other online communication platforms.",
    "Reviewed layouts for accuracy, consistency, and alignment with customer instructions.",
    "Managed design revisions to ensure the final output met the requested specifications."
  ],
  tools: [
    "Corel DRAW",
    "Microsoft Teams",
    "Email Communication",
    "Digital Collaboration Tools"]
  }
 
];
