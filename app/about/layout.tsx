import type { Metadata } from "next";

/* ═══════════════════════════════════════════════════════════
   ABOUT — Layout & Metadata
   SEO optimisé pour la page À propos
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "À propos | Agence Web Paris — arthur.dev",
  description:
    "Agence de développement web basée à Paris depuis 2024. Sites livrés en 7 jours sans abonnement. +100 projets réalisés. Expertise React, Next.js, SEO, applications mobiles et IA.",

  keywords: [
    "agence web Paris",
    "développeur web Paris",
    "à propos arthur.dev",
    "agence développement Paris",
    "sites web 7 jours",
    "sans abonnement",
    "React Next.js Paris",
    "SEO Paris",
    "développement application",
    "automatisation IA",
  ],

  openGraph: {
    title: "À propos — arthur.dev, agence web à Paris",
    description:
      "Sites livrés en 7 jours, sans abonnement. +100 projets depuis 2024. Expertise développement web, mobile, SEO et IA.",
    url: "https://arthur.dev/about",
    type: "website",
    locale: "fr_FR",
    siteName: "arthur.dev",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "arthur.dev — À propos",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "À propos — arthur.dev",
    description: "Agence web Paris. Sites en 7j, sans abonnement. +100 projets depuis 2024.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://arthur.dev/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "À propos de arthur.dev",
    description: "Agence de développement web basée à Paris",
    url: "https://arthur.dev/about",
    mainEntity: {
      "@type": "Organization",
      name: "arthur.dev",
      url: "https://arthur.dev",
      logo: "https://arthur.dev/logo.svg",
      foundingDate: "2024",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
      areaServed: "France",
      description:
        "Agence de développement web spécialisée dans la création de sites vitrines, SaaS et applications mobiles",
      knowsAbout: [
        "Développement Web",
        "React",
        "Next.js",
        "SEO",
        "Applications Mobiles",
        "SaaS",
        "Intelligence Artificielle",
        "UX/UI Design",
      ],
      slogan: "Sites web accessibles pour tous les entrepreneurs",
      numberOfEmployees: "1-10",
      priceRange: "$$",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
