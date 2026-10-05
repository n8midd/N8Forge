import Link from "next/link";
import { Logo } from "@/components/Logo";

export function AuditShell({
  children,
  bare,
}: {
  children: React.ReactNode;
  bare?: boolean;
}) {
  return (
    <div className="flex min-h-full flex-col bg-surface">
      {!bare ? (
        <header className="border-b border-steel-light/30 bg-primary">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
            <Link href="/" className="transition-opacity hover:opacity-90" aria-label="N8Forge home">
              <Logo size="nav" />
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-white/80">
              <Link href="/audit" className="hover:text-white">
                Free Audit
              </Link>
              <Link href="/#contact" className="hover:text-white">
                Contact
              </Link>
            </nav>
          </div>
        </header>
      ) : null}
      <main className="flex-1">{children}</main>
      <footer className="border-t border-steel-light/30 bg-white py-8">
        <div className="mx-auto max-w-6xl px-6 text-sm text-steel md:px-8">
          <p>
            Free website audit by{" "}
            <Link href="/" className="font-semibold text-primary hover:text-ember">
              N8Forge
            </Link>
            . Built to help East Texas businesses get found and convert visitors
            into customers.
          </p>
        </div>
      </footer>
    </div>
  );
}
