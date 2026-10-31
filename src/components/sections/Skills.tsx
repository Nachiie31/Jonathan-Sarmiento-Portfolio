import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillGroups } from "@/data/skills";

/** Capability matrix: grouped by discipline, no meaningless percentages. */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-t border-border py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader id="skills-heading" eyebrow="Capabilities" title="Skills & tools" />

        <div className="mt-16 border-b border-border">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.name}
              className="grid gap-6 border-t border-border py-8 md:grid-cols-[17rem_1fr] md:gap-12 md:py-10"
            >
              <div>
                <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-2xl font-medium tracking-tight">{group.name}</h3>
                <p className="mt-2 text-sm text-muted">{group.focus}</p>
              </div>
              <ul aria-label={`${group.name} skills`} className="flex flex-wrap content-start gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-4 py-2 text-sm text-muted transition duration-300 hover:-translate-y-0.5 hover:border-foreground hover:text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
