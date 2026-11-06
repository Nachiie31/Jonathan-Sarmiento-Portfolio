import { ArrowUpRight } from "lucide-react";
import { ZoomImage } from "@/components/projects/ZoomImage";
import { Reveal } from "@/components/ui/Reveal";
import type {
  QAArea,
  QADefect,
  QAImage,
  QALink,
  QAResult,
  QAStat,
  QATestCase,
  ProjectQA as ProjectQAData,
} from "@/data/qa";

const lead = "max-w-3xl text-lg leading-relaxed text-muted";
const label = "font-mono text-xs uppercase tracking-[0.25em] text-subtle";

const resultText: Record<QAResult, string> = { pass: "Pass", fail: "Fail", blocked: "Blocked", skipped: "Skipped" };
const resultStyle: Record<QAResult, string> = {
  pass: "border-emerald-400/50 text-emerald-200",
  fail: "border-red-400/50 text-red-200",
  blocked: "border-amber-400/50 text-amber-200",
  skipped: "border-border-strong text-muted",
};
const statusText: Record<QADefect["status"], string> = { fixed: "Fixed", open: "Open", "wont-fix": "Won't fix" };

function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.15em] ${className}`}>
      {children}
    </span>
  );
}

function Stats({ stats }: { stats?: QAStat[] }) {
  if (!stats?.length) return null;
  return (
    <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6 border-y border-border py-6">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse">
          <dt className="mt-1 text-sm text-muted">{s.label}</dt>
          <dd className="font-display text-4xl font-semibold tracking-tight">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

const COLLAPSE_AFTER = 8;

function Coverage({ title, areas }: { title: string; areas?: QAArea[] }) {
  if (!areas?.length) return null;
  return (
    <details open={areas.length <= COLLAPSE_AFTER} className="group mt-8 border-b border-border">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 border-t border-border py-3 [&::-webkit-details-marker]:hidden">
        <span className={label}>
          {title} ({areas.length})
        </span>
        <span aria-hidden className="font-mono text-lg leading-none text-muted group-open:rotate-45 transition-transform">
          +
        </span>
      </summary>
      <ul className="grid gap-x-12 pb-4 sm:grid-cols-2">
        {areas.map((a) => (
          <li key={a.name} className="flex items-baseline justify-between gap-4 border-t border-border py-3 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
            <span>
              <span className="block">{a.name}</span>
              {a.detail && <span className="mt-0.5 block text-sm text-muted">{a.detail}</span>}
            </span>
            {a.count && <span className="shrink-0 font-mono text-xs text-subtle">{a.count}</span>}
          </li>
        ))}
      </ul>
    </details>
  );
}

function SampleCases({ cases }: { cases?: QATestCase[] }) {
  if (!cases?.length) return null;
  return (
    <div className="mt-10">
      <p className={label}>Sample test {cases.length > 1 ? "cases" : "case"}</p>
      <ul className="mt-4 space-y-4">
        {cases.map((tc) => (
          <li key={tc.id} className="border border-border p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs text-subtle">{tc.id}</span>
              {tc.result && <Chip className={resultStyle[tc.result]}>{resultText[tc.result]}</Chip>}
            </div>
            <p className="mt-3 font-display text-lg font-medium tracking-tight">{tc.title}</p>
            <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-muted marker:font-mono marker:text-xs marker:text-subtle">
              {tc.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-4 text-sm">
              <span className={`${label} mr-2`}>Expected</span>
              <span className="text-muted">{tc.expected}</span>
            </p>
            {tc.note && <p className="mt-2 text-sm text-muted">{tc.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Defects({ defects }: { defects?: QADefect[] }) {
  if (!defects?.length) return null;
  return (
    <div className="mt-10">
      <p className={label}>Notable defects</p>
      <ul className="mt-4 divide-y divide-border border-y border-border">
        {defects.map((d) => (
          <li key={d.id} className="py-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-xs text-subtle">{d.id}</span>
              <span className="font-medium">{d.title}</span>
              {d.severity && <Chip className="border-border-strong text-muted">{d.severity}</Chip>}
              <Chip className="border-border-strong text-muted">{statusText[d.status]}</Chip>
            </div>
            {d.summary && <p className="mt-2 max-w-3xl text-sm text-muted">{d.summary}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Links({ links }: { links?: QALink[] }) {
  if (!links?.length) return null;
  return (
    <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-1.5 border-b border-border-strong text-sm transition-colors hover:border-foreground"
          >
            {l.label}
            <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          {l.note && <p className="mt-1 text-xs text-subtle">{l.note}</p>}
        </li>
      ))}
    </ul>
  );
}

function Images({ images }: { images?: QAImage[] }) {
  if (!images?.length) return null;
  return (
    <ul className="mt-10 columns-1 gap-4 sm:columns-2">
      {images.map((img) => (
        <li key={img.src} className="mb-4 break-inside-avoid">
          <ZoomImage image={img} sizes="(min-width: 1024px) 38vw, 92vw" />
        </li>
      ))}
    </ul>
  );
}

function Block({
  kind,
  title,
  summary,
  heading: Heading,
  children,
}: {
  kind: string;
  title: string;
  summary: string;
  heading: "h3" | "h4";
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className={label}>{kind}</p>
      <Heading className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">{title}</Heading>
      <p className={`mt-4 ${lead}`}>{summary}</p>
      {children}
    </div>
  );
}

/**
 * QA & test evidence for a case study. Renders nothing unless the project has manual or automated QA data.
 * `as` is the heading level of the section title (h2 on the full page, h3 in the overlay).
 */
export function ProjectQA({ qa, as }: { qa?: ProjectQAData; as: "h2" | "h3" }) {
  if (!qa || (!qa.manual && !qa.automated)) return null;
  const Heading = as;
  const Sub = as === "h2" ? "h3" : "h4";
  const { manual, automated } = qa;

  return (
    <Reveal className="grid gap-6 border-t border-border py-10 sm:py-14 md:grid-cols-[13rem_1fr] md:gap-12">
      <Heading className="self-start font-mono text-xs uppercase tracking-[0.25em] text-subtle md:sticky md:top-24">
        QA &amp; test evidence
      </Heading>

      <div className="min-w-0 space-y-20">
        {manual && (
          <Block kind="Manual testing" title="Test cases and defect tracking" summary={manual.summary} heading={Sub}>
            <Stats stats={manual.stats} />
            <Coverage title="Coverage by module" areas={manual.coverage} />
            <SampleCases cases={manual.sampleCases} />
            <Defects defects={manual.defects} />
            <Links links={manual.links} />
            <Images images={manual.images} />
          </Block>
        )}

        {automated && (
          <Block kind="Automated testing" title="Automated checks" summary={automated.summary} heading={Sub}>
            {automated.tools && automated.tools.length > 0 && (
              <ul aria-label="Automation tools" className="mt-6 flex flex-wrap gap-2">
                {automated.tools.map((t) => (
                  <li key={t} className="rounded-full border border-border-strong px-4 py-1.5 font-mono text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            )}
            <Stats stats={automated.stats} />
            <Coverage title="Suites and areas covered" areas={automated.suites} />

            {automated.runCommand && (
              <div className="mt-10">
                <p className={label}>Run it</p>
                <pre
                  tabIndex={0}
                  aria-label="Command to run the automated tests"
                  className="mt-3 overflow-x-auto border border-border bg-surface p-4 font-mono text-sm"
                >
                  <code>{automated.runCommand}</code>
                </pre>
              </div>
            )}

            {automated.snippet && (
              <div className="mt-10">
                <p className={label}>{automated.snippet.title ?? "Example test"}</p>
                <pre
                  tabIndex={0}
                  aria-label={automated.snippet.title ?? "Example test code"}
                  className="mt-3 overflow-x-auto border border-border bg-surface p-4 font-mono text-sm leading-relaxed"
                >
                  <code>{automated.snippet.code}</code>
                </pre>
              </div>
            )}

            <Links links={automated.links} />
            <Images images={automated.images} />
          </Block>
        )}

        {qa.scope && qa.scope.length > 0 && (
          <div>
            <p className={label}>Scope &amp; limits</p>
            <ul className="mt-4 space-y-2 text-muted">
              {qa.scope.map((s) => (
                <li key={s} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-white/40" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Reveal>
  );
}
