import type { Metadata } from "next";

/* ═══════════════════════════════════════════════════════════
   CONTACT — Layout & Metadata
   SEO optimisé pour la page Contact
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Contact & Devis Gratuit | arthur.dev — Réponse sous 2h",
  description:
    "Contactez arthur.dev pour votre projet web ou mobile. Réponse WhatsApp sous 2h, devis 100% gratuit, sans engagement. Email, téléphone. Basé à Paris.",

  keywords: [
    "contact agence web",
    "devis gratuit site web",
    "devis développement web",
    "contact développeur Paris",
    "WhatsApp agence web",
    "demande devis site",
    "contact arthur.dev",
    "projet web Paris",
    "développement sur mesure",
    "réponse rapide",
  ],

  openGraph: {
    title: "Contact — Devis gratuit sous 24h | arthur.dev",
    description:
      "Réponse WhatsApp sous 2h. Devis 100% gratuit, sans engagement. contact@arthur-dev.eu",
    url: "https://arthur.dev/contact",
    type: "website",
    locale: "fr_FR",
    siteName: "arthur.dev",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "arthur.dev — Contact",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact — Devis gratuit | arthur.dev",
    description: "Réponse sous 2h sur WhatsApp. Devis 100% gratuit.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://arthur.dev/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact arthur.dev",
    description:
      "Contactez arthur.dev pour votre projet web. Réponse rapide, devis gratuit.",
    url: "https://arthur.dev/contact",
    mainEntity: {
      "@type": "Organization",
      name: "arthur.dev",
      url: "https://arthur.dev",
      email: "contact@arthur-dev.eu",
      telephone: "+33652379343",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+33652379343",
          contactType: "customer service",
          availableLanguage: ["French"],
          areaServed: "FR",
          contactOption: "TollFree",
        },
        {
          "@type": "ContactPoint",
          email: "contact@arthur-dev.eu",
          contactType: "sales",
          availableLanguage: ["French"],
          areaServed: "FR",
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
