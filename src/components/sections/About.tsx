import { InterestDiagram } from "@/components/ui/InterestDiagram";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { about } from "@/data/about";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden border-t border-border py-28 sm:py-40">
      {/* Layered ghost typography behind the content, drifting at its own pace */}
      <Parallax distance={110} className="pointer-events-none absolute -left-4 top-6 hidden select-none sm:block">
        <span
          aria-hidden
          className="block font-display text-[clamp(8rem,30vw,26rem)] font-semibold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]"
        >
          About
        </span>
      </Parallax>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionHeader id="about-heading" eyebrow="About me" title="Who I am" />
            <Reveal as="p" delay={0.1} className="mt-10 max-w-2xl font-display text-2xl font-medium leading-snug tracking-tight sm:text-4xl">
              {about.headline}
            </Reveal>
            <div className="mt-10 max-w-xl space-y-6 text-base leading-relaxed text-muted sm:text-lg">
              {about.paragraphs.map((p, i) => (
                <Reveal as="p" key={p} delay={0.1 + i * 0.08}>
                  {p}
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="flex items-center justify-center lg:col-span-5 lg:mt-24">
            <InterestDiagram />
          </Reveal>
        </div>

        <ul className="mt-24 grid border-t border-border md:grid-cols-3">
          {about.principles.map((p, i) => (
            <li key={p.title} className="border-b border-border py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <Reveal delay={i * 0.08}>
                <p className="font-mono text-xs text-subtle">0{i + 1}</p>
                <h3 className="mt-3 font-display text-xl font-medium tracking-tight">{p.title}</h3>
                <p className="mt-3 text-muted">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
