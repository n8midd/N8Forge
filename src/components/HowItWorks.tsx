import { CTA } from "../lib/contact";

const steps = [
  {
    title: "Tell me about your business",
    body: "What you do, who you serve, and what you need the site to accomplish — calls, bookings, or quote requests.",
  },
  {
    title: "I create your website game plan & design",
    body: "You get a recommended structure, features, and a clear flat-rate price before we build.",
  },
  {
    title: "We review it together",
    body: "We walk through the plan, adjust pages and content, and lock scope so there are no surprises.",
  },
  {
    title: "I launch it and support you",
    body: "I publish the site, connect forms or booking, and stick around for support after go-live.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-8 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember">
          Process
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          How it works
        </h2>
        <p className="mt-3 max-w-2xl text-steel">
          A simple path from first conversation to a live site.{" "}
          {CTA.turnaround} You always work with me directly in Nacogdoches.
        </p>

        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t border-steel-light/70 pt-6">
              <span className="font-display text-sm font-semibold text-ember">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-charcoal">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
