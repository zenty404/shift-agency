import type { Metadata } from "next";

/* ═══════════════════════════════════════════════════════════
   NOS SERVICES — Layout & Metadata
   SEO optimisé pour la page des offres et services
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Nos Services | Sites Web, SaaS & Applications — Shift Agency",
  description:
    "Développement de landings, sites vitrines et applications sur mesure. Pack OnConversion dès 1 000€, OnComplete 2 000€, OnTime sur devis. Livraison rapide, code propriétaire.",

  keywords: [
    "services développement web",
    "création site vitrine",
    "landing page performante",
    "développement SaaS",
    "application web sur mesure",
    "tarif site web",
    "agence web Paris",
    "React Next.js",
    "SEO local",
    "développeur freelance",
  ],

  openGraph: {
    title: "Nos Services — Sites Web & Applications sur mesure",
    description:
      "Pack OnConversion dès 1 000€, OnComplete avec SEO local 2 000€, OnTime sur devis. Livraison rapide, stack moderne.",
    url: "https://Shift Agency/nos-services",
    type: "website",
    locale: "fr_FR",
    siteName: "Shift Agency",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shift Agency — Nos Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nos Services — Sites Web & Applications",
    description: "Pack OnConversion 1 000€, OnComplete 2 000€, OnTime sur devis. Stack moderne, livraison rapide.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://Shift Agency/nos-services",
  },
};

export default function NosServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Services de développement web et mobile",
    provider: {
      "@type": "ProfessionalService",
      name: "Shift Agency",
      url: "https://Shift Agency",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
    },
    serviceType: "Développement Web et Mobile",
    areaServed: "France",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Nos offres de développement",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pack OnConversion",
            description: "Landing page haute conversion, mobile-first, livrée en 7 jours",
          },
          price: "1000",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pack OnComplete",
            description: "Site vitrine complet avec SEO local optimisé",
          },
          price: "2000",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pack OnTime",
            description: "Web app, dashboard et automatisations avancées",
          },
          price: "8000",
          priceCurrency: "EUR",
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
