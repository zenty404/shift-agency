import type { Metadata } from "next";

/* ═══════════════════════════════════════════════════════════
   OUR PROJECTS — Layout & Metadata
   SEO optimisé pour le portfolio et les réalisations
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Nos réalisations de sites pour praticiens — Shift Agency",
  description:
    "Découvrez les sites internet que nous avons créés pour des cabinets de médecine douce, ostéopathes, naturopathes et thérapeutes. Des sites clairs qui attirent des patients.",

  keywords: [
    "site internet praticien",
    "création site ostéopathe",
    "site web naturopathe",
    "site médecine douce",
    "exemple site thérapeute",
    "agence web santé",
    "création site cabinet",
    "avoir plus de patients",
    "site vitrine praticien",
    "référencement thérapeute",
  ],

  openGraph: {
    title: "Nos réalisations de sites pour praticiens — Shift Agency",
    description:
      "Des sites internet simples, apaisants et efficaces pour les professionnels de la santé et du bien-être.",
    url: "https://arthur-dev.eu/our-projects",
    type: "website",
    locale: "fr_FR",
    siteName: "Shift Agency",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shift Agency — Exemples de sites pour praticiens",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nos réalisations de sites pour praticiens",
    description: "Des sites internet simples et efficaces pour les professionnels du bien-être.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://arthur-dev.eu/our-projects",
  },
};

export default function OurProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Réalisations de sites pour praticiens",
    description: "Exemples de sites web pour cabinets et praticiens par Shift Agency",
    url: "https://arthur-dev.eu/our-projects",
    isPartOf: {
      "@type": "WebSite",
      name: "Shift Agency",
      url: "https://arthur-dev.eu",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Nos réalisations",
      description: "Sites pour ostéopathes, naturopathes et thérapeutes",
      itemListElement: [
        {
          "@type": "CreativeWork",
          name: "Site Complet",
          description: "Un site clair pour présenter votre cabinet et attirer des patients",
          image: "https://arthur-dev.eu/artisan.png",
        },
        {
          "@type": "CreativeWork",
          name: "Site Simple",
          description: "Une belle page rassurante pour prendre rendez-vous facilement",
          image: "https://arthur-dev.eu/landing.png",
        },
      ],
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
