/**
 * Certificates, awards, recognitions, competitions. Add one object per achievement.
 *
 * Images go in /public/achievements/ and are referenced as "/achievements/<file>".
 * Use the file's REAL pixel size for width and height (right-click > Properties > Details on Windows).
 * Leave `image` out and a neutral placeholder is shown instead.
 *
 * Only list things that are true and that you can show. Never invent awards or issuers.
 */
export type AchievementImage = { src: string; alt: string; width: number; height: number };

export type Achievement = {
  title: string;
  /** Who awarded it, e.g. a school, company or organiser. */
  issuer: string;
  /** Free text, e.g. "March 2025" or "2024". */
  date: string;
  /** Short label such as "Certificate", "Award", "Competition". */
  category: string;
  description: string;
  image?: AchievementImage;
  /** Optional verification or credential link. */
  link?: { label: string; href: string };
};

export const achievements: Achievement[] = [
  {
    title: "Certificate of Recognition – 3rd Place in Structured Programming Language",
    issuer: "Datamex College of Saint Adeline",
    date: "February 2, 2019",
    category: "Award",
    description:
      "Recognized for securing 3rd place in the Structured Programming Language (SPL) coding competition during the school's IT Week, demonstrating programming knowledge and problem-solving skills.",
    image: { src: "/achievements/3rd-place-spl.jpg", alt: "3rd Place Certificate", width: 1600, height: 1131 },
  },
  {
    title: "Leadership Award",
    issuer: "Datamex College of Saint Adeline",
    date: "April 5, 2019",
    category: "Award",
    description:
      "Recognized for demonstrating leadership qualities, responsibility, and the ability to contribute positively to school activities and the academic community.",
    image: { src: "/achievements/leadership-award.jpg", alt: "Leadership Award", width: 1600, height: 1131 }
  },
  {
    title: "Outstanding Performance in Specialized Subject – Programming 1",
    issuer: "Datamex College of Saint Adeline",
    date: "April 5, 2019",
    category: "Recognition",
    description:
      "Recognized for outstanding academic performance in Programming 1, demonstrating a strong understanding of programming concepts and practical problem-solving.",
    image: { src: "/achievements/prog1-recognition.jpg", alt: "Outstanding Performance in Programming 1", width: 1600, height: 1131 }
  },
  {
    title: "Academic Excellence – Top 3 in Technical-Vocational Track",
    issuer: "Datamex College of Saint Adeline",
    date: "April 5, 2019",
    category: "Academic Award",
    description:
      "Recognized for achieving a Top 3 ranking in the Technical-Vocational Track in recognition of academic performance and achievement.",
    image: { src: "/achievements/top3.jpg", alt: "Academic Excellence Award", width: 1600, height: 1131 }
  },
  
    // image: { src: "/achievements/example.png", alt: "Certificate of ... awarded to ...", width: 1600, height: 1131 },
    // link: { label: "Verify credential", href: "https://..." },
  
];
