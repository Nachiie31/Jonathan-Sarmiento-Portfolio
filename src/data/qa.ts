/**
 * QA / testing evidence for a project. Everything is optional.
 * Add a `qa` object to a project in projects.ts and the case study shows a
 * "QA & test evidence" section. Projects without `qa` show nothing extra.
 *
 * Only include numbers you can back up (a test sheet, a report, a repository).
 * Never invent counts, pass rates or coverage figures.
 */
export type QAStat = { value: string; label: string };

/** Screenshot of a test sheet, defect log, report, terminal run, etc. Use the file's real pixel size. */
export type QAImage = { src: string; alt: string; width: number; height: number; caption?: string };

/** A link to evidence: a sheet, a PDF, a repo folder, a CI run, a report. */
export type QALink = { label: string; href: string; note?: string };

/** A module, feature area or test suite and what it covers. */
export type QAArea = { name: string; detail?: string; count?: string };

export type QAResult = "pass" | "fail" | "blocked" | "skipped";

/** One worked example of a manual test case. */
export type QATestCase = {
  id: string;
  title: string;
  steps: string[];
  expected: string;
  result?: QAResult;
  note?: string;
};

export type QADefect = {
  id: string;
  title: string;
  severity?: "low" | "medium" | "high" | "critical";
  status: "fixed" | "open" | "wont-fix";
  summary?: string;
};

export type ManualQA = {
  summary: string;
  stats?: QAStat[];
  /** Modules or feature areas covered. Long lists collapse automatically. */
  coverage?: QAArea[];
  sampleCases?: QATestCase[];
  defects?: QADefect[];
  links?: QALink[];
  images?: QAImage[];
};

export type AutomatedQA = {
  summary: string;
  /** e.g. ["Python", "pytest", "Selenium"] */
  tools?: string[];
  stats?: QAStat[];
  /** Test suites or areas the automation covers. */
  suites?: QAArea[];
  /** e.g. "pytest -v" */
  runCommand?: string;
  snippet?: { title?: string; language?: string; code: string };
  links?: QALink[];
  images?: QAImage[];
};

export type ProjectQA = {
  manual?: ManualQA;
  automated?: AutomatedQA;
  /** Honest scope and limits, e.g. "Tested in Chrome only". */
  scope?: string[];
};
