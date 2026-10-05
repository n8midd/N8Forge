import Link from "next/link";

const extras: { label: string; href?: string }[] = [
  { label: "Google Business Profile optimization", href: "/local-seo" },
  { label: "Local SEO", href: "/local-seo" },
  { label: "Contact forms" },
  { label: "Appointment booking" },
  { label: "Review management" },
  { label: "Monthly analytics reports" },
  { label: "Website maintenance" },
  { label: "Performance optimization" },
  { label: "Website redesign", href: "/website-redesign" },
  { label: "Custom QR Codes" },
];

export function Extras() {
  return (
    <section id="extras" className="scroll-mt-8 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          Extras
        </h2>
        <p className="mt-3 max-w-2xl text-steel">
          Need more than a website? I can also help you get found locally, manage
          your site, improve performance, and turn more visitors into customers.
        </p>

        <ul className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {extras.map((item) => (
            <li
              key={item.label}
              className="flex items-start gap-3 border-b border-steel-light/50 py-3 text-charcoal"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-ember" aria-hidden />
              {item.href ? (
                <Link
                  href={item.href}
                  className="font-medium text-charcoal underline-offset-2 hover:text-ember-ink hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
