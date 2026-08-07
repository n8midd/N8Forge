import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Source_Sans_3, Syne } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://n8-forge.vercel.app"),
  title: {
    default: "N8Forge — Websites That Help East Texas Businesses Get Customers",
    template: "%s | N8Forge",
  },
  description:
    "Custom websites for East Texas service businesses in Nacogdoches. Flat pricing from $400. Work directly with the developer. Free website game plan — no obligation.",
  applicationName: "N8Forge",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "N8Forge — More Calls, Bookings & Customers for East Texas Businesses",
    description:
      "Custom-built in Nacogdoches. Pricing from $400 without agency overhead. Free website game plan with structure, features, and flat rate.",
    url: "https://n8-forge.vercel.app",
    siteName: "N8Forge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "N8Forge — East Texas websites that get results",
    description:
      "Custom sites from $400. Local in Nacogdoches. Free website game plan — no obligation.",
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
