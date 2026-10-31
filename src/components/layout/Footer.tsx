import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { navItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export function Footer() {
  const { links } = siteConfig;
  const external = [
    { label: "GitHub", href: links.github },
    { label: "LinkedIn", href: links.linkedin },
  ].filter((l) => l.href);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight">
            {siteConfig.name}
            <span className="text-subtle">.</span>
          </p>
          <p className="mt-2 text-sm text-subtle">
            {siteConfig.title}. © {new Date().getFullYear()}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
          {navItems.map((item) => (
            <Link key={item.id} href={`/#${item.id}`} className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
          {external.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#top"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          Back to top <ArrowUp size={16} aria-hidden />
        </a>
      </div>
    </footer>
  );
}
