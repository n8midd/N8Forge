import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Source_Sans_3, Syne } from "next/font/google";
import { JsonLd, localBusinessJsonLd } from "../components/JsonLd";
import { SITE_URL } from "../lib/contact";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const defaultTitle =
  "Websites That Help East Texas Businesses Get Customers";
const defaultDescription =
  "Custom websites for East Texas service businesses in Nacogdoches. Flat pricing from $400. Work directly with the developer. Free website game plan — no obligation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${defaultTitle} | N8Forge`,
    template: "%s | N8Forge",
  },
  description: defaultDescription,
  applicationName: "N8Forge",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: SITE_URL,
    siteName: "N8Forge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <JsonLd data={localBusinessJsonLd()} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
