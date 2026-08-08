import { testimonials } from "../lib/contact";

/**
 * Additional testimonials beyond the featured case study.
 * Add entries to `testimonials` in contact.ts (after index 0) to show them here.
 */
export function Testimonials() {
  const extras = testimonials.slice(1);
  if (extras.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="scroll-mt-8 border-t border-steel-light/40 bg-off-white py-16 md:py-20"
      aria-label="More client testimonials"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember">
          More client words
        </p>
        <ul className="mt-8 grid gap-10 md:grid-cols-2">
          {extras.map((item) => (
            <li key={`${item.author}-${item.business}`}>
              <blockquote className="border-l-4 border-ember pl-6">
                <p className="text-base leading-relaxed text-charcoal md:text-lg">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-4 text-sm text-steel">
                  — {item.author}, {item.business}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
