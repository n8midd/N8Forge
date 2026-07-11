const paragraphs = [
  "At N8Forge, we believe every local business deserves a website that's as unique as the people behind it. Unlike large website companies that rely on templates, support tickets, and call centers, we offer a personal, one-on-one experience from start to finish.",
  "When you work with N8Forge, you're working directly with the person designing and building your website. We'll sit down together, learn about your business, discuss your goals, and create a website that reflects your brand—not someone else's template.",
  "Need help taking professional photos? We can help. Not sure what to write on your website? We'll work through it together. Want to make changes or ask questions? You'll always know exactly who to call.",
  "Our goal isn't just to build websites—it's to build lasting relationships with the businesses that make East Texas a great place to live and work. By partnering with local businesses, we provide responsive service, honest communication, and solutions tailored to your specific needs, helping you establish a professional online presence that attracts customers and supports long-term growth.",
  "At N8Forge, you're more than just another project. You're our neighbor, and your success is our success.",
] as const;

export function Mission() {
  return (
    <section id="mission" className="scroll-mt-8 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember">
          About
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          Our Mission
        </h2>

        <div className="mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-neutral md:text-lg">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
