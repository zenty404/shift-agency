"use client";

import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   MENTIONS LÉGALES PAGE
   ═══════════════════════════════════════════════════════════ */

export default function MentionsLegales() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-bg">
      {/* Hero gradient */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 25%, #4DB6F9 0%, #8ecdf6 40%, #ddf2fc 75%, #ffffff 100%)",
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
            Mentions Légales
          </h1>

          <div className="space-y-8 text-gray-text">
            <p className="leading-relaxed italic">
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique.
            </p>

            {/* Éditeur du site */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                1. Édition du site
              </h2>
              <p className="mb-3 leading-relaxed">
                Le présent site, accessible à l&apos;URL www.arthur-dev.eu, est édité par :
              </p>
              <div className="space-y-1 leading-relaxed">
                <p className="font-semibold text-[#111111]">Arthur LASNIER</p>
                <p>Entrepreneur individuel</p>
                <p>Adresse : 92 rue des Labours, 77700 Magny-le-Hongre</p>
                <p>SIRET : 999 696 735 00011</p>
                <p>
                  Email :{" "}
                  <a
                    href="mailto:contact@arthur-dev.eu"
                    className="text-blue transition-colors hover:underline"
                  >
                    contact@arthur-dev.eu
                  </a>
                </p>
              </div>
            </div>

            {/* Hébergement */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                2. Hébergement
              </h2>
              <p className="mb-3 leading-relaxed">Le site est hébergé par :</p>
              <div className="space-y-1 leading-relaxed">
                <p className="font-semibold text-[#111111]">Vercel Inc.</p>
                <p>Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, États-Unis</p>
                <p>
                  Site web :{" "}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue transition-colors hover:underline"
                  >
                    https://vercel.com
                  </a>
                </p>
              </div>
            </div>

            {/* Politique de Confidentialité (RGPD) */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                3. Politique de Confidentialité (RGPD)
              </h2>
              <div className="space-y-4 leading-relaxed">
                <div>
                  <p className="font-semibold text-[#111111]">Collecte des données :</p>
                  <p>
                    Les informations recueillies via le formulaire de contact (Nom, Email) sont enregistrées dans un fichier informatisé par Arthur Lasnier pour la gestion des demandes de devis et la relation client.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[#111111]">Durée de conservation :</p>
                  <p>
                    Elles sont conservées pendant 3 ans maximum si aucune relation commerciale n&apos;est établie.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[#111111]">Vos droits :</p>
                  <p>
                    Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d&apos;accès aux données vous concernant et les faire rectifier en contactant :{" "}
                    <a
                      href="mailto:contact@arthur-dev.eu"
                      className="text-blue transition-colors hover:underline"
                    >
                      contact@arthur-dev.eu
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                4. Propriété intellectuelle
              </h2>
              <p className="leading-relaxed">
                Tous les contenus présents sur le site Shift Agency (textes,
                images, vidéos, logos, etc.) sont protégés par les lois en
                vigueur sur la propriété intellectuelle. Toute reproduction,
                distribution, modification ou utilisation sans autorisation
                préalable est strictement interdite.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                5. Cookies
              </h2>
              <p className="leading-relaxed">
                Le site Shift Agency n&apos;utilise pas de cookies de tracking. Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.
              </p>
            </div>

            {/* Responsabilité */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                6. Responsabilité
              </h2>
              <p className="leading-relaxed">
                L&apos;éditeur ne peut être tenu responsable en cas de dommages
                directs ou indirects résultant de l&apos;utilisation du site ou de
                l&apos;impossibilité de son utilisation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
