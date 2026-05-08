import type { Metadata } from "next";

/* ═══════════════════════════════════════════════════════════
   NOS SERVICES — Layout & Metadata
   SEO optimisé pour la page des offres et services
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Nos Services | Sites Web, SaaS & Applications — arthur.dev",
  description:
    "Développement de sites vitrines, landing pages performantes et applications sur mesure. Pack Essentiel dès 490€, Performance 890€, Sur-mesure à partir de 1500€. Livraison rapide, code propriétaire.",

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
      "Pack Essentiel dès 490€, Performance avec SEO local 890€, Sur-mesure à partir de 1500€. Livraison rapide, stack moderne.",
    url: "https://arthur.dev/nos-services",
    type: "website",
    locale: "fr_FR",
    siteName: "arthur.dev",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "arthur.dev — Nos Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nos Services — Sites Web & Applications",
    description: "Pack Essentiel 490€, Performance 890€, Sur-mesure dès 1500€. Stack moderne, livraison rapide.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://arthur.dev/nos-services",
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
      name: "arthur.dev",
      url: "https://arthur.dev",
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
            name: "Pack Essentiel",
            description: "Site vitrine 1 page, mobile-first, livré en 7 jours",
          },
          price: "490",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pack Performance",
            description: "Site multi-pages avec SEO local optimisé",
          },
          price: "890",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pack Sur-mesure",
            description: "Application technique, dashboard, intégrations avancées",
          },
          price: "1500",
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
