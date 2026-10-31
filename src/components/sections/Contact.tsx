import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";

const { links } = siteConfig;

const channels = [
  { label: "Email", value: links.email, href: links.email ? `mailto:${links.email}` : "" },
  { label: "GitHub", value: links.github, href: links.github },
  { label: "LinkedIn", value: links.linkedin, href: links.linkedin },
];

const display = (value: string) => value.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden border-t border-border py-28 sm:py-40">
      <Parallax distance={90} className="pointer-events-none absolute -right-6 bottom-0 hidden select-none sm:block">
        <span
          aria-hidden
          className="block font-display text-[clamp(8rem,30vw,26rem)] font-semibold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.07)]"
        >
          Hello
        </span>
      </Parallax>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.3em] text-subtle">
          Get in touch
        </Reveal>
        <Reveal as="h2" id="contact-heading" delay={0.05} className="mt-4 max-w-5xl font-display text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
          Have a project or role in mind? <span className="text-muted">Let&apos;s talk.</span>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <ul className="border-t border-border">
              {channels.map((c) => (
                <li key={c.label} className="border-b border-border">
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.label === "Email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                      className="group flex min-h-20 items-center justify-between gap-4 py-4"
                    >
                      <span>
                        <span className="block font-mono text-xs uppercase tracking-[0.25em] text-subtle">{c.label}</span>
                        <span className="mt-1 block break-all font-display text-xl tracking-tight transition-colors group-hover:text-white sm:text-2xl">
                          {display(c.value)}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={20}
                        aria-hidden
                        className="shrink-0 text-subtle transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground"
                      />
                    </a>
                  ) : (
                    <div className="flex min-h-20 flex-col justify-center py-4">
                      <span className="font-mono text-xs uppercase tracking-[0.25em] text-subtle">{c.label}</span>
                      <span className="mt-1 text-muted">[Placeholder] Add your {c.label.toLowerCase()} in src/data/site.ts</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <h3 className="sr-only">Send a message</h3>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
