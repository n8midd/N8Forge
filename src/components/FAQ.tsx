const faqs = [
  {
    q: "How long does a website take?",
    a: "Typical turnaround is about 10 business days after we agree on the plan and content. Larger projects or content delays can take longer.",
  },
  {
    q: "Do I own my website?",
    a: "Yes. When the project is paid and delivered, the website is yours. I'll help with handoff or ongoing care if you want it.",
  },
  {
    q: "Are there contracts?",
    a: "We'll agree on scope, price, and timeline in writing before work starts so expectations are clear — no long-term lock-in for the build itself.",
  },
  {
    q: "What does the $49/month cover?",
    a: "Monthly Care is optional and typically includes hosting, backups, security updates, and small content edits so you're not stuck maintaining the site alone.",
  },
  {
    q: "Is hosting required?",
    a: "Your site needs to live somewhere. You can use my care/hosting plan or host on your own account — we'll choose what fits you.",
  },
  {
    q: "Is the domain included?",
    a: "If you already own a domain, we'll connect it. If not, I can help you register one (domain renewal is usually a separate yearly fee from your registrar).",
  },
  {
    q: "Can you use my existing booking system?",
    a: "Yes. Many clients keep tools like Vagaro, Calendly, or Square. I'll integrate the booking path into a polished site instead of forcing you to switch platforms.",
  },
  {
    q: "Can you write the content?",
    a: "Yes. I can help draft pages from notes, interviews, or your existing materials so you're not staring at a blank page.",
  },
  {
    q: "Can you take photos?",
    a: "I can help with photo planning and selection, and coordinate or guide shoots when it makes sense for the project.",
  },
  {
    q: "Can you redesign an existing website?",
    a: "Absolutely. Outdated, slow, or template-looking sites are a common starting point — we keep what works and rebuild the rest.",
  },
  {
    q: "Can you help with Google?",
    a: "Yes — basic SEO on the site, Google Maps, Analytics, and guidance on Google Business Profile so local customers can find you.",
  },
  {
    q: "What do I need before we start?",
    a: "A clear description of your services, preferred contact methods, and any brand assets you already have (logo, colors, photos). We'll fill gaps together.",
  },
] as const;

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-8 bg-surface py-20 md:py-28">
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
