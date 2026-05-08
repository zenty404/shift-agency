"use client";

import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   POLITIQUE DE CONFIDENTIALITÉ PAGE
   ═══════════════════════════════════════════════════════════ */

export default function PolitiqueConfidentialite() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-bg">
      {/* Hero gradient */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 25%, #062783 0%, #5C7BC8 40%, #D4DCEF 75%, #ffffff 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 md:px-12 md:py-32">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-text transition-colors hover:text-blue"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          Retour à l'accueil
        </Link>

        {/* Content Card */}
        <div className="rounded-3xl border border-gray-border bg-white p-8 shadow-sm md:p-12">
          <h1 className="mb-12 font-display text-4xl font-bold text-[#111111] md:text-5xl">
            Politique de confidentialité
          </h1>

          <div className="space-y-8 text-gray-text">
            {/* Collecte des données personnelles */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Collecte des données personnelles
              </h2>
              <p className="leading-relaxed">
                Nous collectons uniquement les données personnelles strictement
                nécessaires au bon fonctionnement de nos services. Cela peut
                inclure votre nom, adresse e-mail, téléphone, et données de
                navigation.
              </p>
            </div>

            {/* Utilisation des données */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Utilisation des données
              </h2>
              <p className="leading-relaxed">
                Les données sont utilisées dans le but de vous fournir nos
                services, d'améliorer votre expérience utilisateur, et de vous
                contacter en cas de besoin. Aucune donnée n'est transmise à des
                tiers sans votre consentement.
              </p>
            </div>

            {/* Conservation des données */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Conservation des données
              </h2>
              <p className="leading-relaxed">
                Les données sont conservées pendant une durée maximale de 3 ans
                après la fin de la relation contractuelle ou le dernier contact
                émanant de votre part.
              </p>
            </div>

            {/* Sécurité */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Sécurité
              </h2>
              <p className="leading-relaxed">
                Nous mettons en place toutes les mesures techniques et
                organisationnelles nécessaires pour protéger vos données contre
                toute perte, altération ou accès non autorisé.
              </p>
            </div>

            {/* Vos droits */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Vos droits
              </h2>
              <p className="leading-relaxed">
                Conformément au RGPD, vous disposez d'un droit d'accès, de
                rectification, de suppression et d'opposition au traitement de
                vos données. Pour exercer ces droits, contactez-nous à :{" "}
                <a
                  href="mailto:contact@ikovaline.com"
                  className="text-blue transition-colors hover:underline"
                >
                  contact@ikovaline.com
                </a>
                .
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Cookies
              </h2>
              <p className="leading-relaxed">
                Pour en savoir plus sur notre politique de cookies, vous pouvez
                consulter notre module de gestion des cookies en bas de page ou
                visiter la section dédiée dans les mentions légales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
