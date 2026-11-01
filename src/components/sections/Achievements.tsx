import { AchievementGallery } from "@/components/sections/AchievementGallery";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { achievements } from "@/data/achievements";

export function Achievements() {
  if (achievements.length === 0) return null;
  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="border-t border-border py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader id="achievements-heading" eyebrow="Recognition" title="Achievements" />
        <AchievementGallery items={achievements} />
      </div>
    </section>
  );
}
