import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { site, links } from "@/lib/content";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const fullTitle = `${site.name} — ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: fullTitle, template: `%s · ${site.name}` },
  description: site.description,
  keywords: [
    "Bhashyam Naidu",
    "Backend Engineer",
    "Cloud Engineer",
    "AI Engineering",
    "FastAPI",
    "AWS",
    "PostgreSQL",
    "Terraform",
    "RAG",
    "VIT Vellore",
  ],
  authors: [{ name: site.name, url: links.github }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: fullTitle,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: fullTitle, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  url: site.url,
  sameAs: [links.github, links.linkedin].filter(Boolean),
  alumniOf: { "@type": "CollegeOrUniversity", name: "Vellore Institute of Technology" },
  knowsAbout: ["Backend Engineering", "Cloud Infrastructure", "Distributed Systems", "AI Engineering"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body className="min-h-dvh overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
