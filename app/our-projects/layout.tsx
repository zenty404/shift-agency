import type { Metadata } from "next";

/* ═══════════════════════════════════════════════════════════
   OUR PROJECTS — Layout & Metadata
   SEO optimisé pour le portfolio et les réalisations
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Portfolio & Réalisations | Sites, SaaS, Apps — arthur.dev",
  description:
    "Découvrez nos projets web et mobile : +50 sites vitrines, +20 applications SaaS et mobiles en production. Landing pages performantes, e-commerce, dashboards. 5/5 sur Google.",

  keywords: [
    "portfolio agence web",
    "réalisations web",
    "projets React Next.js",
    "site vitrine exemple",
    "SaaS développement",
    "application mobile portfolio",
    "landing page référence",
    "agence développement Paris",
    "projet web sur mesure",
    "dashboard application",
  ],

  openGraph: {
    title: "Portfolio — Projets Web & Mobile | arthur.dev",
    description:
      "+50 sites vitrines, +20 applications en production. Sites corporate, SaaS, apps mobiles. 5/5 sur Google.",
    url: "https://arthur.dev/our-projects",
    type: "website",
    locale: "fr_FR",
    siteName: "arthur.dev",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "arthur.dev — Portfolio & Réalisations",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Projets Web & Mobile",
    description: "+50 sites, +20 apps en production. SaaS, landing pages, sites corporate.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://arthur.dev/our-projects",
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
    name: "Portfolio arthur.dev",
    description: "Portfolio de projets web et mobile réalisés par arthur.dev",
    url: "https://arthur.dev/our-projects",
    isPartOf: {
      "@type": "WebSite",
      name: "arthur.dev",
      url: "https://arthur.dev",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Nos réalisations",
      description: "Sites vitrines, SaaS, applications mobiles et e-commerce",
      itemListElement: [
        {
          "@type": "CreativeWork",
          name: "Plateforme SaaS",
          description: "Dashboard et application SaaS complète",
          image: "https://arthur.dev/saas.png",
        },
        {
          "@type": "CreativeWork",
          name: "Landing Page",
          description: "Landing page performante et optimisée conversion",
          image: "https://arthur.dev/landing.png",
        },
        {
          "@type": "CreativeWork",
          name: "Site Vitrine",
          description: "Site vitrine professionnel pour artisan",
          image: "https://arthur.dev/artisan.png",
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      ratingCount: "1",
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
