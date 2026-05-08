"use client";

import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   CONDITIONS GÉNÉRALES DE VENTE (CGV)
   ═══════════════════════════════════════════════════════════ */

export default function CGV() {
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
          Retour à l&apos;accueil
        </Link>

        {/* Content Card */}
        <div className="rounded-3xl border border-gray-border bg-white p-8 shadow-sm md:p-12">
          <h1 className="mb-12 font-display text-4xl font-bold text-[#111111] md:text-5xl">
            Conditions Générales de Vente
          </h1>

          <div className="space-y-8 text-gray-text">
            {/* Article 1 */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Article 1 : Objet
              </h2>
              <p className="leading-relaxed">
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Arthur Lasnier (le Prestataire) et son Client pour la création de sites internet.
              </p>
            </div>

            {/* Article 2 */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Article 2 : Commandes et Devis
              </h2>
              <p className="leading-relaxed">
                Toute commande ne devient ferme qu&apos;après acceptation du devis par le Client (par email ou signature) ou accord écrit sur le prix.
              </p>
            </div>

            {/* Article 3 */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Article 3 : Tarifs et Paiement
              </h2>
              <div className="space-y-3 leading-relaxed">
                <p>Les prix sont indiqués en euros.</p>
                <p>
                  En tant que micro-entrepreneur, la TVA est non applicable (art. 293 B du CGI).
                </p>
                <p>
                  Le paiement est exigible à la livraison du site, sauf accord contraire spécifié sur la facture.
                </p>
              </div>
            </div>

            {/* Article 4 */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Article 4 : Propriété Intellectuelle
              </h2>
              <p className="leading-relaxed">
                La propriété du site et de son code source est transférée au Client une fois le paiement intégral effectué.
              </p>
            </div>

            {/* Article 5 */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Article 5 : Responsabilité
              </h2>
              <p className="leading-relaxed">
                Le Prestataire s&apos;engage à une obligation de moyens. Il ne saurait être tenu responsable des problèmes liés à l&apos;hébergeur, au nom de domaine ou aux modifications effectuées par le Client après livraison.
              </p>
            </div>

            {/* Article 6 */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Article 6 : Délais
              </h2>
              <p className="leading-relaxed">
                Les délais de livraison sont donnés à titre indicatif. Tout retard ne peut donner lieu à indemnisation ou annulation de la commande, sauf en cas de force majeure.
              </p>
            </div>

            {/* Article 7 */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Article 7 : Garantie et Support
              </h2>
              <p className="leading-relaxed">
                Le Prestataire garantit le bon fonctionnement du site à la livraison. Tout support ou maintenance après livraison fait l&apos;objet d&apos;un devis séparé.
              </p>
            </div>

            {/* Article 8 */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#111111]">
                Article 8 : Litiges
              </h2>
              <p className="leading-relaxed">
                En cas de litige, les parties s&apos;engagent à rechercher une solution amiable. À défaut, le litige sera porté devant les tribunaux compétents.
              </p>
            </div>

            {/* Contact */}
            <div className="mt-12 rounded-xl border border-gray-border bg-gray-bg p-6">
              <p className="text-sm leading-relaxed">
                Pour toute question concernant ces conditions générales de vente, contactez-nous à :{" "}
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
      </div>
    </section>
  );
}
