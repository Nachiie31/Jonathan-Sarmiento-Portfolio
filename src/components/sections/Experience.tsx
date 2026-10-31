import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-t border-border py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader id="experience-heading" eyebrow="Background" title="Experience" />
        <ExperienceTimeline entries={experience} />
      </div>
    </section>
  );
}
