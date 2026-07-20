"use client";

import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#mission", label: "Mission" },
  { href: "#pricing", label: "Pricing" },
  { href: "#case-study", label: "Case study" },
  { href: "#extras", label: "Extras" },
  { href: "#contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <a href="#top" className="transition-opacity hover:opacity-90" aria-label="N8Forge home">
          <Logo size="nav" priority />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-ember px-4 py-2 text-sm font-semibold text-off-white transition-colors hover:bg-ember-deep"
          >
            Request a Free Website Plan
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center text-off-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex h-5 w-6 flex-col justify-between" aria-hidden>
            <span
              className={`h-0.5 w-full bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-current transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-white/10 bg-primary/95 px-6 py-4 backdrop-blur md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-1 text-off-white"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="mt-1 inline-block bg-ember px-4 py-2 text-sm font-semibold text-off-white"
                onClick={() => setOpen(false)}
              >
                Request a Free Website Plan
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
