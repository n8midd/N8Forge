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
  title: "N8Forge — Custom Websites for East Texas Service Businesses",
  description:
    "N8Forge builds custom websites for East Texas service businesses. Straightforward pricing from $400, personal local support from Nathan Middleton in Nacogdoches, TX.",
  applicationName: "N8Forge",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "N8Forge — Custom Websites for East Texas Service Businesses",
    description:
      "Custom websites for East Texas service businesses. Straightforward pricing from $400, with personal local support.",
    url: "https://n8-forge.vercel.app",
    siteName: "N8Forge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "N8Forge — Custom Websites for East Texas Service Businesses",
    description:
      "Custom websites for East Texas service businesses. Straightforward pricing from $400, with personal local support.",
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
