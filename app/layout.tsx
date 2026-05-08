import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

/* ═══════════════════════════════════════════════════════════
   ROOT LAYOUT
   - Inter: body text
   - Sora: display headings (Zalando substitute)
   - JetBrains Mono: code/monospace elements
   - Light mode only, cursor: none globally
   ═══════════════════════════════════════════════════════════ */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arthur.dev"),
  title: "Shift Agency | Développement Web & Mobile Premium — Paris",
  description:
    "Création de sites corporate, landing pages, SaaS et applications mobiles. React, Next.js, stack moderne. Conception, développement, déploiement. Basé à Paris.",

  keywords: [
    "agence web Paris",
    "développement web",
    "développement mobile",
    "création site corporate",
    "landing page",
    "SaaS",
    "application mobile",
    "React",
    "Next.js",
    "TypeScript",
    "agence digitale",
    "développeur full-stack",
  ],

  authors: [{ name: "Shift Agency", url: "https://arthur.dev" }],
  creator: "Shift Agency",
  publisher: "Shift Agency",

  icons: {
    icon: "/shift_logo.svg",
    shortcut: "/shift_logo.svg",
    apple: "/shift_logo.svg",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://arthur.dev",
    siteName: "Shift Agency",
    title: "Shift Agency — Agence de développement web & mobile",
    description:
      "Sites corporate, SaaS, applications mobiles. Technologies modernes, livraison agile.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shift Agency — Développement web & mobile",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Shift Agency — Développement web & mobile",
    description: "Sites corporate, SaaS, applications mobiles. Stack moderne.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://arthur.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Shift Agency",
    description: "Agence de développement web et mobile basée à Paris",
    url: "https://arthur.dev",
    areaServed: {
      "@type": "City",
      name: "Paris",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    priceRange: "$$",
    knowsAbout: [
      "Développement Web",
      "Développement Mobile",
      "React",
      "Next.js",
      "TypeScript",
      "SaaS",
      "Landing Pages",
    ],
  };

  return (
    <html
      lang="fr"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-bg text-[#111111]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
