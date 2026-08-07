import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileCtaBar } from "./MobileCtaBar";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header variant="page" />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
