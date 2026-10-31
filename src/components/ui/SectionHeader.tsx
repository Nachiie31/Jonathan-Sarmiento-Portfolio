import { Reveal } from "@/components/ui/Reveal";

export function SectionHeader({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div>
      <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.3em] text-subtle">
        {eyebrow}
      </Reveal>
      <Reveal as="h2" id={id} delay={0.05} className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
        {title}
      </Reveal>
    </div>
  );
}
