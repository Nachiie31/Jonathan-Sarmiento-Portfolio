"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { siteConfig } from "@/data/site";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { MESSAGE_MAX, validateContact, type ContactErrors, type ContactValues } from "@/lib/validation";

// Public by design: Web3Forms access keys are meant to be used in the browser.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "success" | "error";

const input =
  "w-full border-0 border-b bg-transparent py-3 text-base text-foreground placeholder:text-subtle transition-colors duration-300 focus:border-foreground";

export function ContactForm() {
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [length, setLength] = useState(0);

  // Without a key there is nothing to submit to, so say so instead of showing a form that can't work.
  if (!ACCESS_KEY) {
    return (
      <div className="border border-dashed border-border-strong p-6 text-muted" role="note">
        <p className="font-display text-lg text-foreground">The contact form isn&apos;t switched on yet.</p>
        <p className="mt-2 text-sm">Please use one of the links on this page to get in touch.</p>
        {process.env.NODE_ENV !== "production" && (
          <p className="mt-4 font-mono text-xs text-subtle">
            Dev note: set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local (see .env.example).
          </p>
        )}
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = new FormData(e.currentTarget);

    // Honeypot: real visitors never see or tick this. Pretend it worked and send nothing.
    if (data.get("botcheck")) {
      setStatus("success");
      return;
    }

    const values: ContactValues = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (["name", "email", "message"] as const).find((k) => found[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setErrorMessage("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio enquiry from ${values.name.trim()}`,
          from_name: `${siteConfig.name} Portfolio`,
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
        signal: controller.signal,
      });
      const json: { success?: boolean; message?: string } = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setStatus("success");
        formRef.current?.reset();
        setLength(0);
        // Move focus to the confirmation so screen reader and keyboard users land on it.
        setTimeout(() => successRef.current?.focus(), 50);
      } else {
        setStatus("error");
        setErrorMessage(
          res.status === 429
            ? "Too many messages were sent recently. Please try again in a little while."
            : "Your message couldn't be sent. Please try again, or use one of the links instead.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
    } finally {
      clearTimeout(timeout);
    }
  }

  const fieldBorder = (key: keyof ContactValues) => (errors[key] ? "border-red-400/80" : "border-border-strong");

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <m.div
          key="done"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="border border-border-strong p-8"
        >
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-foreground text-background">
            <Check size={20} aria-hidden />
          </span>
          <h3 ref={successRef} tabIndex={-1} className="mt-6 font-display text-3xl font-semibold tracking-tight outline-none">
            Message sent.
          </h3>
          <p className="mt-3 text-muted">Thanks for getting in touch. I&apos;ll reply as soon as I can.</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 inline-flex min-h-11 items-center border-b border-border-strong text-sm transition-colors hover:border-foreground"
          >
            Send another message
          </button>
        </m.div>
      ) : (
        <m.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
          aria-describedby="form-status"
        >
          {/* Honeypot: hidden from people, tempting to bots */}
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

          <div>
            <label htmlFor="cf-name" className="font-mono text-xs uppercase tracking-[0.25em] text-subtle">
              Name
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "cf-name-err" : undefined}
              className={`${input} ${fieldBorder("name")}`}
            />
            {errors.name && (
              <p id="cf-name-err" className="mt-2 text-sm text-red-300">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cf-email" className="font-mono text-xs uppercase tracking-[0.25em] text-subtle">
              Email
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "cf-email-err" : undefined}
              className={`${input} ${fieldBorder("email")}`}
            />
            {errors.email && (
              <p id="cf-email-err" className="mt-2 text-sm text-red-300">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="cf-message" className="font-mono text-xs uppercase tracking-[0.25em] text-subtle">
                Message
              </label>
              <span className={`font-mono text-xs tabular-nums ${length > MESSAGE_MAX ? "text-red-300" : "text-subtle"}`}>
                {length}/{MESSAGE_MAX}
              </span>
            </div>
            <textarea
              id="cf-message"
              name="message"
              rows={5}
              placeholder="Tell me about the project or opportunity"
              onChange={(e) => setLength(e.target.value.length)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "cf-message-err" : undefined}
              className={`${input} resize-y ${fieldBorder("message")}`}
            />
            {errors.message && (
              <p id="cf-message-err" className="mt-2 text-sm text-red-300">
                {errors.message}
              </p>
            )}
          </div>

          <div id="form-status" aria-live="polite">
            {status === "error" && (
              <p role="alert" className="border border-red-400/40 bg-red-400/5 px-4 py-3 text-sm text-red-200">
                {errorMessage}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
          >
            {status === "sending" ? (
              <>
                <Loader2 size={16} aria-hidden className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                Send message
                <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </m.form>
      )}
    </AnimatePresence>
  );
}
