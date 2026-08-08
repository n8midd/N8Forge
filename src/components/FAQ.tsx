import { faqs } from "../lib/faqs";
import { faqPageJsonLd, JsonLd } from "./JsonLd";

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-8 bg-surface py-20 md:py-28">
      <JsonLd data={faqPageJsonLd(faqs)} />
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember">
          FAQ
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          Common questions
        </h2>
        <p className="mt-3 max-w-2xl text-steel">
          Straight answers so you know what happens after you say yes.
        </p>

        <dl className="mt-12 divide-y divide-steel-light/60 border-y border-steel-light/60">
          {faqs.map((item) => (
            <div key={item.q} className="py-6 md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] md:gap-10">
              <dt className="font-display text-lg font-semibold text-charcoal">
                {item.q}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-neutral md:mt-0 md:text-base">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
