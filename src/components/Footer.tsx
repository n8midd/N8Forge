import Link from "next/link";
import { owner } from "../lib/contact";
import { Logo } from "./Logo";

const footerLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/nacogdoches-web-design", label: "Nacogdoches web design" },
  { href: "/local-seo", label: "Local SEO" },
  { href: "/website-redesign", label: "Website redesign" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-charcoal pb-24 pt-10 text-steel-light md:pb-10">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" aria-label="N8Forge home" className="inline-block">
              <Logo size="footer" />
            </Link>
            <p className="mt-4 text-sm text-off-white">
              {owner.name} · {owner.serviceArea}
            </p>
            <p className="mt-2 text-sm">
              <a
                href={`mailto:${owner.email}`}
                className="transition-colors hover:text-ember"
              >
                {owner.email}
              </a>
              <span className="mx-2 text-steel">·</span>
              <a href={owner.phoneHref} className="transition-colors hover:text-ember">
                {owner.phone}
              </a>
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid gap-2 text-sm sm:grid-cols-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-off-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-10 text-sm text-steel">© {year} N8Forge</p>
      </div>
    </footer>
  );
}
