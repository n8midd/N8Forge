import { contact } from "../lib/contact";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-charcoal py-10 text-steel-light">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <a href="#top" aria-label="N8Forge home" className="inline-block">
            <Logo size="footer" />
          </a>
          <p className="mt-4 text-sm">
            <a
              href={`mailto:${contact.email}`}
              className="transition-colors hover:text-ember"
            >
              {contact.email}
            </a>
            <span className="mx-2 text-steel">·</span>
            <a href={contact.phoneHref} className="transition-colors hover:text-ember">
              {contact.phone}
            </a>
          </p>
        </div>
        <p className="text-sm text-steel">© {year} N8Forge</p>
      </div>
    </footer>
  );
}
