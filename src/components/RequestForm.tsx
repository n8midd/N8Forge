"use client";

import { FormEvent, useState } from "react";
import { contact, initialIntake, owner, type IntakeValues } from "../lib/contact";

const fieldClass =
  "w-full border border-steel-light bg-white px-3 py-2.5 text-charcoal outline-none transition-colors placeholder:text-steel focus:border-primary-light";

export function RequestForm() {
  const [values, setValues] = useState<IntakeValues>(initialIntake);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof IntakeValues>(key: K, value: IntakeValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        setError(data.error || "Could not send your request. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Could not send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-8 bg-off-white py-20 text-charcoal md:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] md:gap-16 md:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
            Request a Free Website Plan
          </h2>
          <p className="mt-3 max-w-md text-steel">
            Tell me a little about your business and what you need. I&apos;ll
            follow up personally using the contact details you provide.
          </p>

          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="text-steel">{owner.name}</dt>
              <dd className="mt-1 text-charcoal">{owner.location}</dd>
            </div>
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
              <dd className="mt-1">
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
                Thanks — request received
              </h3>
              <p className="mt-3 max-w-md text-steel">
                I&apos;ll review your details and follow up at{" "}
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
            <div className="space-y-4">
              <p className="text-sm text-steel">
                Interested in the{" "}
                <span className="font-medium text-charcoal">
                  Founding Client Package ($400)
                </span>
                ? Mention it in &ldquo;What do you need?&rdquo; — limited to the
                first three clients.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-charcoal">Name</span>
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
                  <span className="mb-1.5 block font-medium text-charcoal">Business</span>
                  <input
                    required
                    name="business"
                    className={fieldClass}
                    value={values.business}
                    onChange={(e) => update("business", e.target.value)}
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-charcoal">Email</span>
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
                  <span className="mb-1.5 block font-medium text-charcoal">Phone</span>
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
                <span className="mb-1.5 block font-medium text-charcoal">
                  What do you need?
                </span>
                <textarea
                  required
                  name="need"
                  rows={4}
                  className={`${fieldClass} resize-y`}
                  value={values.need}
                  onChange={(e) => update("need", e.target.value)}
                  placeholder="Pages, booking, photos, timeline…"
                />
              </label>

              {error ? (
                <p className="text-sm text-ember" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="bg-ember px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ember-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Request a Free Website Plan"}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
