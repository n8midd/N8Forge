"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  contact,
  featureOptions,
  initialIntake,
  integrationOptions,
  pageOptions,
  type CarePlanInterest,
  type DomainStatus,
  type ExistingSiteStatus,
  type ImageStatus,
  type IntakeValues,
  type PackageInterest,
  type TextStatus,
  type Timeframe,
} from "../lib/contact";

const packages: PackageInterest[] = [
  "Starter Website",
  "Professional",
  "Not sure yet",
];

const careOptions: CarePlanInterest[] = [
  "Yes — with my package",
  "No thanks",
  "Not sure yet",
];

function carePriceLabel(pkg: PackageInterest): string {
  if (pkg === "Starter Website") return "$50/month with Starter";
  if (pkg === "Professional") return "$150/month with Professional";
  return "$50/month with Starter · $150/month with Professional";
}

const imageStatuses: ImageStatus[] = [
  "I have photos ready",
  "I need help with photos",
  "Mix of both",
  "Not sure yet",
];

const textStatuses: TextStatus[] = [
  "I have copy written",
  "I need help writing copy",
  "Mix of both",
  "Not sure yet",
];

const domainStatuses: DomainStatus[] = [
  "I already own a domain",
  "I need to buy a domain",
  "Not sure yet",
];

const existingSiteStatuses: ExistingSiteStatus[] = [
  "No existing website",
  "Yes — redesign / rebuild",
  "Yes — keep and improve",
];

const timeframes: Timeframe[] = [
  "ASAP",
  "2–4 weeks",
  "1–2 months",
  "Flexible / exploring",
];

const steps = [
  { id: "about", title: "About you", blurb: "Who you are and what you do." },
  { id: "pages", title: "Pages", blurb: "Which pages should the site include?" },
  { id: "content", title: "Content", blurb: "Images, copy, and brand assets." },
  { id: "features", title: "Features", blurb: "What the site needs to do." },
  {
    id: "integrations",
    title: "Integrations",
    blurb: "Tools and services to connect.",
  },
  {
    id: "domain",
    title: "Domain & site",
    blurb: "Domain ownership and any existing website.",
  },
  {
    id: "timeline",
    title: "Timeline",
    blurb: "When you want to launch, plus anything else.",
  },
  { id: "review", title: "Review", blurb: "Check your answers, then send." },
] as const;

const fieldClass =
  "w-full border border-steel-light bg-white px-3 py-2.5 text-charcoal outline-none transition-colors placeholder:text-steel focus:border-primary-light";

const choiceClass =
  "flex cursor-pointer items-start gap-3 border border-steel-light bg-white px-3 py-2.5 text-sm text-charcoal transition-colors hover:border-primary-light has-[:checked]:border-primary has-[:checked]:bg-primary/5";

function toggleItem(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((v) => v !== item) : [...list, item];
}

export function RequestForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<IntakeValues>(initialIntake);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const progress = ((step + 1) / steps.length) * 100;

  function update<K extends keyof IntakeValues>(key: K, value: IntakeValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  function validateStep(): boolean {
    if (step === 0) {
      if (!values.name.trim() || !values.business.trim() || !values.email.trim()) {
        setError("Name, business, and email are required.");
        return false;
      }
    }
    if (step === 1 && values.pages.length === 0 && !values.customPages.trim()) {
      setError("Pick at least one page or add a custom page.");
      return false;
    }
    return true;
  }

  function goNext() {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function goBack() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateStep()) return;
    if (!isLast) {
      goNext();
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setError(data.error || "Could not send your intake. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Could not send your intake. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const reviewLines = useMemo(
    () => [
      ["Package", values.packageInterest],
      ["Monthly Care", `${values.carePlanInterest} (${carePriceLabel(values.packageInterest)})`],
      ["Pages", values.pages.join(", ") || "(none)"],
      ["Images", values.imageStatus],
      ["Copy", values.textStatus],
      ["Features", values.features.join(", ") || "(none)"],
      ["Integrations", values.integrations.join(", ") || "(none)"],
      ["Domain", values.domainStatus],
      ["Existing site", values.existingSiteStatus],
      ["Timeframe", values.timeframe],
    ],
    [values],
  );

  return (
    <section id="contact" className="scroll-mt-8 bg-off-white py-20 text-charcoal md:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] md:gap-16 md:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
            Request a site
          </h2>
          <p className="mt-3 max-w-md text-steel">
            A short walkthrough so I know pages, content, features, and timing
            before we start. Submit when you&apos;re done — I&apos;ll follow up
            using the contact details you provide.
          </p>

          <ol className="mt-10 hidden space-y-3 text-sm md:block">
            {steps.map((s, i) => (
              <li
                key={s.id}
                className={`flex items-baseline gap-3 ${
                  i === step
                    ? "font-semibold text-primary"
                    : i < step
                      ? "text-ember"
                      : "text-steel"
                }`}
              >
                <span className="w-5 font-display text-xs tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{s.title}</span>
              </li>
            ))}
          </ol>

          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="text-steel">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${contact.email}`}
                  className="font-medium text-charcoal transition-colors hover:text-primary"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-steel">Phone</dt>
              <dd className="mt-1">
                <a
                  href={contact.phoneHref}
                  className="font-medium text-charcoal transition-colors hover:text-primary"
                >
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-steel">Social</dt>
              <dd className="mt-1 flex flex-wrap gap-4">
                {contact.social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-charcoal transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={onSubmit}
          className="border border-steel-light/60 bg-white p-6 shadow-sm md:p-8"
        >
          {submitted ? (
            <div className="py-6">
              <h3 className="font-display text-2xl font-bold text-charcoal">
                Thanks — intake received
              </h3>
              <p className="mt-3 max-w-md text-steel">
                I&apos;ll review your answers and follow up at{" "}
                <span className="font-medium text-charcoal">{values.email}</span>
                {values.phone ? (
                  <>
                    {" "}
                    or{" "}
                    <span className="font-medium text-charcoal">{values.phone}</span>
                  </>
                ) : null}
                .
              </p>
            </div>
          ) : (
            <>
          <div className="mb-6">
            <div className="flex items-center justify-between gap-4 text-xs text-steel">
              <span>
                Step {step + 1} of {steps.length}
              </span>
              <span className="font-semibold text-primary">{current.title}</span>
            </div>
            <div className="mt-3 h-1 w-full bg-steel-light/40" aria-hidden>
              <div
                className="h-full bg-ember transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-steel">{current.blurb}</p>
          </div>

          {step === 0 ? (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block text-sm font-medium text-charcoal">Name</span>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className={fieldClass}
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-sm font-medium text-charcoal">Business</span>
                  <input
                    required
                    name="business"
                    className={fieldClass}
                    value={values.business}
                    onChange={(e) => update("business", e.target.value)}
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-sm font-medium text-charcoal">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className={fieldClass}
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-sm font-medium text-charcoal">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    className={fieldClass}
                    value={values.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-1.5 block text-sm font-medium text-charcoal">Package interest</span>
                <select
                  name="packageInterest"
                  className={fieldClass}
                  value={values.packageInterest}
                  onChange={(e) =>
                    update("packageInterest", e.target.value as PackageInterest)
                  }
                >
                  {packages.map((pkg) => (
                    <option key={pkg} value={pkg}>
                      {pkg}
                    </option>
                  ))}
                </select>
              </label>
              <fieldset>
                <legend className="mb-2 text-sm font-medium text-charcoal">
                  Monthly Care add-on
                </legend>
                <p className="mb-3 text-xs text-steel">
                  {carePriceLabel(values.packageInterest)} — updates, backups,
                  hosting, security, and small content edits.
                </p>
                <div className="grid gap-2">
                  {careOptions.map((option) => (
                    <label key={option} className={choiceClass}>
                      <input
                        type="radio"
                        name="carePlanInterest"
                        className="mt-0.5 accent-[var(--primary)]"
                        checked={values.carePlanInterest === option}
                        onChange={() => update("carePlanInterest", option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block text-sm">
                <span className="mb-1.5 block text-sm font-medium text-charcoal">
                  What does your business do?
                </span>
                <textarea
                  name="businessDescription"
                  rows={3}
                  className={`${fieldClass} resize-y`}
                  value={values.businessDescription}
                  onChange={(e) => update("businessDescription", e.target.value)}
                  placeholder="Services, customers, location…"
                />
              </label>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-4">
              <fieldset>
                <legend className="mb-3 text-sm font-medium text-charcoal">
                  Select the pages you want
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {pageOptions.map((page) => (
                    <label key={page} className={choiceClass}>
                      <input
                        type="checkbox"
                        className="mt-0.5 accent-[var(--primary)]"
                        checked={values.pages.includes(page)}
                        onChange={() => update("pages", toggleItem(values.pages, page))}
                      />
                      <span>{page}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block text-sm">
                <span className="mb-1.5 block text-sm font-medium text-charcoal">
                  Other pages (comma-separated)
                </span>
                <input
                  name="customPages"
                  className={fieldClass}
                  value={values.customPages}
                  onChange={(e) => update("customPages", e.target.value)}
                  placeholder="e.g. Team, Locations, Menu"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-sm font-medium text-charcoal">
                  Notes about specific pages
                </span>
                <textarea
                  name="pageNotes"
                  rows={3}
                  className={`${fieldClass} resize-y`}
                  value={values.pageNotes}
                  onChange={(e) => update("pageNotes", e.target.value)}
                  placeholder="What each page should cover, must-have sections…"
                />
              </label>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-5">
              <fieldset>
                <legend className="mb-3 text-sm font-medium text-charcoal">Images & photos</legend>
                <div className="grid gap-2">
                  {imageStatuses.map((status) => (
                    <label key={status} className={choiceClass}>
                      <input
                        type="radio"
                        name="imageStatus"
                        className="mt-0.5 accent-[var(--primary)]"
                        checked={values.imageStatus === status}
                        onChange={() => update("imageStatus", status)}
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-3 text-sm font-medium text-charcoal">Text & copy</legend>
                <div className="grid gap-2">
                  {textStatuses.map((status) => (
                    <label key={status} className={choiceClass}>
                      <input
                        type="radio"
                        name="textStatus"
                        className="mt-0.5 accent-[var(--primary)]"
                        checked={values.textStatus === status}
                        onChange={() => update("textStatus", status)}
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block text-sm">
                <span className="mb-1.5 block text-sm font-medium text-charcoal">
                  Logo, colors, fonts, or brand notes
                </span>
                <textarea
                  name="brandNotes"
                  rows={3}
                  className={`${fieldClass} resize-y`}
                  value={values.brandNotes}
                  onChange={(e) => update("brandNotes", e.target.value)}
                  placeholder="Have a logo? Preferred colors? Sites you like?"
                />
              </label>
            </div>
          ) : null}

          {step === 3 ? (
            <fieldset>
              <legend className="mb-3 text-sm font-medium text-charcoal">
                Required features
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {featureOptions.map((feature) => (
                  <label key={feature} className={choiceClass}>
                    <input
                      type="checkbox"
                      className="mt-0.5 accent-[var(--primary)]"
                      checked={values.features.includes(feature)}
                      onChange={() =>
                        update("features", toggleItem(values.features, feature))
                      }
                    />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}

          {step === 4 ? (
            <div className="space-y-4">
              <fieldset>
                <legend className="mb-3 text-sm font-medium text-charcoal">
                  Integrations you need
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {integrationOptions.map((item) => (
                    <label key={item} className={choiceClass}>
                      <input
                        type="checkbox"
                        className="mt-0.5 accent-[var(--primary)]"
                        checked={values.integrations.includes(item)}
                        onChange={() =>
                          update(
                            "integrations",
                            toggleItem(values.integrations, item),
                          )
                        }
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block text-sm">
                <span className="mb-1.5 block text-sm font-medium text-charcoal">
                  Other tools or accounts
                </span>
                <input
                  name="otherIntegrations"
                  className={fieldClass}
                  value={values.otherIntegrations}
                  onChange={(e) => update("otherIntegrations", e.target.value)}
                  placeholder="e.g. Square appointments, Jobber, Toast"
                />
              </label>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="space-y-5">
              <fieldset>
                <legend className="mb-3 text-sm font-medium text-charcoal">Domain</legend>
                <div className="grid gap-2">
                  {domainStatuses.map((status) => (
                    <label key={status} className={choiceClass}>
                      <input
                        type="radio"
                        name="domainStatus"
                        className="mt-0.5 accent-[var(--primary)]"
                        checked={values.domainStatus === status}
                        onChange={() => update("domainStatus", status)}
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block text-sm">
                <span className="mb-1.5 block text-sm font-medium text-charcoal">
                  Domain name (if you have one or a preference)
                </span>
                <input
                  name="domainName"
                  className={fieldClass}
                  value={values.domainName}
                  onChange={(e) => update("domainName", e.target.value)}
                  placeholder="yourbusiness.com"
                />
              </label>
              <fieldset>
                <legend className="mb-3 text-sm font-medium text-charcoal">
                  Existing website
                </legend>
                <div className="grid gap-2">
                  {existingSiteStatuses.map((status) => (
                    <label key={status} className={choiceClass}>
                      <input
                        type="radio"
                        name="existingSiteStatus"
                        className="mt-0.5 accent-[var(--primary)]"
                        checked={values.existingSiteStatus === status}
                        onChange={() => update("existingSiteStatus", status)}
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {values.existingSiteStatus !== "No existing website" ? (
                <label className="block text-sm">
                  <span className="mb-1.5 block text-sm font-medium text-charcoal">
                    Current website URL
                  </span>
                  <input
                    name="existingSiteUrl"
                    type="url"
                    className={fieldClass}
                    value={values.existingSiteUrl}
                    onChange={(e) => update("existingSiteUrl", e.target.value)}
                    placeholder="https://"
                  />
                </label>
              ) : null}
            </div>
          ) : null}

          {step === 6 ? (
            <div className="space-y-5">
              <fieldset>
                <legend className="mb-3 text-sm font-medium text-charcoal">
                  Ideal timeframe
                </legend>
                <div className="grid gap-2">
                  {timeframes.map((item) => (
                    <label key={item} className={choiceClass}>
                      <input
                        type="radio"
                        name="timeframe"
                        className="mt-0.5 accent-[var(--primary)]"
                        checked={values.timeframe === item}
                        onChange={() => update("timeframe", item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block text-sm">
                <span className="mb-1.5 block text-sm font-medium text-charcoal">
                  Anything else I should know?
                </span>
                <textarea
                  name="additionalNotes"
                  rows={4}
                  className={`${fieldClass} resize-y`}
                  value={values.additionalNotes}
                  onChange={(e) => update("additionalNotes", e.target.value)}
                  placeholder="Must-haves, competitors, launch events…"
                />
              </label>
            </div>
          ) : null}

          {step === 7 ? (
            <div className="space-y-4 text-sm">
              <p className="text-steel">
                Ready to send? I&apos;ll get your intake by email and reach back
                out using the contact details you shared.
              </p>
              <dl className="divide-y divide-steel-light/50 border-y border-steel-light/50">
                {reviewLines.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4"
                  >
                    <dt className="text-steel">{label}</dt>
                    <dd className="text-charcoal">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {error ? (
            <p className="mt-4 text-sm text-ember" role="alert">
              {error}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0 || submitting}
              className="border border-charcoal px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-ember px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ember-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLast
                ? submitting
                  ? "Sending…"
                  : "Submit intake"
                : "Continue"}
            </button>
          </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
