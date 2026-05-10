"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useVisible } from "@/app/hooks/useVisible";
import ButtonBrand from "@/app/components/ButtonBrand";
import { WHATSAPP_URL } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════
   NOS SERVICES — Horizontal stacked cards with pricing
   Layout: Hero → 3 detailed offer cards → CTA
   ═══════════════════════════════════════════════════════════ */

const OFFERS = [
  {
    num: "01",
    title: "Pack OnConversion",
    headline:
      "Landing page haute conversion. Votre trafic devient des demandes qualifiées en ~7 jours.",
    blocage:
      "Vous envoyez encore vos prospects sur une bio Instagram ou un PDF : zéro preuve sociale, zéro clarté, zéro conversion.",
    solution:
      "Une landing qui convertit et est compréhensible en moins de 3 secondes. Satisfait ou remboursé 14 jours.",
    results: [
      "Live en ~7 jours",
      "Plus de leads qualifiés",
      "Crédibilité immédiate ",
      "Rapide, SEO-ready, évolutif",
    ],
    process: ["Brief", "Design", "Développement", "Livraison"],
    delay: "7 jours",
    price: "1 000 € HT",
    cta: "Je veux ma landing",
  },
  {
    num: "02",
    title: "Pack OnComplete",
    headline:
      "Site vitrine complet. Vos prospects comprennent, vous crédibilisent, puis vous contactent.",
    blocage:
      "On vous trouve mal sur Google, ou votre site actuel ne raconte pas assez vite ce que vous vendez, vous perdez des leads au silence.",
    solution:
      "Un site qui assure une autorité digne des plus grands. Vos prospects comprennent qui vous êtes et ont envie de travailler avec vous.",
    results: [
      "Visibilité locale et pages qui respirent le pro",
      "Parcours clair : comprendre → croire → booker",
      "Des leads qui vous contactent",
      "Rapide, SEO-ready, évolutif",
    ],
    process: ["Cadrage", "Design", "SEO", "Livraison"],
    delay: "14 jours",
    price: "2 000 € HT",
    cta: "Je veux être crédible",
  },
  {
    num: "03",
    title: "Pack OnTime",
    headline:
      "Web app & automatisation. Un outil sur-mesure pour gagner du temps et scaler proprement.",
    blocage:
      "Vous perdez des heures chaque semaine sur des tâches manuelles, ou votre produit a besoin d’un vrai back-office pas d’un template générique.",
    solution:
      "Une application sur-mesure qui fera gagner au moins +15 h/semaine à vos équipes.",
    results: [
      "Outil aligné sur votre workflow réel",
      "Évolutif : on itère tant que l'objectif n'est pas atteint",
      "Rapide, évolutif et performant",
      "Repo + infra remis entre vos mains",
    ],
    process: ["Audit", "Architecture", "Développement", "Déploiement"],
    delay: "Sur devis",
    price: "Dès 8 000 € HT",
    cta: "Récupérer vos 15h",
  },
];

type Offer = (typeof OFFERS)[number];

/* ── Staggered line reveal for H1 ── */
function RevealLine({
  children,
  delay,
  loaded,
}: {
  children: React.ReactNode;
  delay: number;
  loaded: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <span
        className="block will-change-transform"
        style={{
          transform: loaded ? "translateY(0)" : "translateY(110%)",
          transition: `transform 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

/* ── Trust Metric Card ── */
interface MetricCardProps {
  value: string;
  label: string;
  delay: number;
  loaded: boolean;
}

function MetricCard({ value, label, delay, loaded }: MetricCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl border border-gray-border/60 bg-white/40 backdrop-blur-sm px-6 py-5 transition-all duration-300 hover:border-gray-border hover:bg-white/60 hover:shadow-sm"
      style={{
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: `all 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      <div className="text-3xl font-bold text-[#0F172A] font-display">{value}</div>
      <div className="mt-1 text-sm font-medium text-gray-text">{label}</div>
    </div>
  );
}

function OfferCard({ offer, isEven }: { offer: Offer; isEven: boolean }) {
  const card = useVisible(0.12);

  return (
    <div
      ref={card.ref}
      className={`flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16 ${
        isEven ? "lg:flex-row-reverse" : ""
      }`}
      style={{
        opacity: card.visible ? 1 : 0,
        transform: card.visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 800ms cubic-bezier(0.4,0,0.2,1)`,
      }}
    >
      {/* Left: info */}
      <div className="flex-1">
        <span className="font-mono text-sm text-blue font-medium">
          {offer.num}
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold text-[#111111] tracking-[-0.02em] sm:text-4xl">
          {offer.title}
        </h2>
        <p className="mt-4 text-lg text-gray-text leading-relaxed">
          {offer.headline}
        </p>

        {/* Blocage */}
        <div className="mt-8 rounded-xl border border-gray-border/50 bg-gray-bg/50 p-5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-text/60 mb-2">
            Le vrai blocage
          </div>
          <p className="text-sm text-gray-text leading-relaxed">
            {offer.blocage}
          </p>
        </div>

        {/* Solution */}
        <div className="mt-4 rounded-xl border border-blue/20 bg-blue-light/30 p-5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-blue/70 mb-2">
            Ce que vous gagnez
          </div>
          <p className="text-sm text-[#111111] leading-relaxed">
            {offer.solution}
          </p>
        </div>
      </div>

      {/* Right: results + pricing */}
      <div className="flex-1 lg:max-w-md">
        {/* Results */}
        <div className="rounded-2xl border border-gray-border/40 bg-white p-8 shadow-lg shadow-black/[0.04]">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#111111] mb-5">
            Résultats attendus
          </div>
          <ul className="space-y-3">
            {offer.results.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-blue" aria-hidden="true">
                  <path d="M4 8.5l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm text-gray-text">{r}</span>
              </li>
            ))}
          </ul>

          {/* Process steps */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {offer.process.map((step, si) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-full bg-blue/10 px-3 py-1 text-[10px] font-medium text-blue">
                  {step}
                </span>
                {si < offer.process.length - 1 && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-border" aria-hidden="true">
                    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="mt-8 flex items-end justify-between border-t border-gray-border/30 pt-6">
            <div>
              <div className="text-[11px] text-gray-text">{offer.delay}</div>
              <div className="mt-1 font-display text-xl font-bold text-[#111111]">
                {offer.price}
              </div>
            </div>
            <ButtonBrand href={WHATSAPP_URL}>
              {offer.cta}
            </ButtonBrand>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NosServices() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section
        className="relative flex flex-col items-center justify-start overflow-hidden px-3 sm:px-6 pt-24 pb-20 sm:pb-24 md:pb-28"
        aria-label="Nos services Shift Agency"
      >
        {/* ── Corporate gradient background ── */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          {/* Base gradient: white center → subtle grey-blue edges */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 30%, #ffffff 0%, #F8FAFC 35%, #E8ECF1 70%, #E2E8F0 100%)",
            }}
          />

          {/* Subtle geometric grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #0F172A 1px, transparent 1px),
                linear-gradient(to bottom, #0F172A 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />

          {/* Subtle accent glows (navy tones) */}
          <div
            className="absolute -top-32 -left-32 h-[300px] w-[300px] rounded-full opacity-[0.06] blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[140px]"
            style={{ background: "#0F172A" }}
          />
          <div
            className="absolute -top-32 -right-32 h-[300px] w-[300px] rounded-full opacity-[0.06] blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[140px]"
            style={{ background: "#334155" }}
          />

          {/* Central white glow (institutional clean feel) */}
          <div
            className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full opacity-80 blur-[80px] sm:h-[600px] sm:w-[1000px] sm:blur-[140px]"
            style={{ background: "#ffffff" }}
          />
        </div>

        {/* ── Stage Card (Corporate) ── */}
        <div
          className="relative z-10 w-full
            rounded-[24px] sm:rounded-[32px] md:rounded-[40px]
            bg-blue-light/90 border border-blue/30
            shadow-[0_8px_60px_-8px_rgba(6,39,131,0.35)]
            flex flex-col items-center text-center
            px-6 sm:px-8 md:px-10 lg:px-14 py-8 sm:py-10 md:py-12"
          style={{
            opacity: loaded ? 1 : 0.1,
            transform: loaded ? "translateY(0) scale(1)" : "translateY(30px) scale(0.98)",
            transition: "all 900ms cubic-bezier(0.22, 1, 0.36, 1) 100ms",
          }}
        >
          {/* Subtle inner glow (navy tone) */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] sm:h-[450px] md:h-[550px] w-full rounded-full opacity-25 blur-[100px] sm:blur-[160px]"
            style={{ background: "#062783" }}
            aria-hidden="true"
          />

          {/* Badge */}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition: "all 700ms cubic-bezier(0.22, 1, 0.36, 1) 200ms",
            }}
          >
            <div className="mb-6 sm:mb-8 md:mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-border bg-gray-bg px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                <span className="text-xs font-medium text-gray-text tracking-wide">
                  Nos offres
                </span>
              </div>
            </div>
          </div>

          {/* H1 */}
          <h1 className="font-display leading-[1.08] tracking-[-0.02em]">
            <RevealLine delay={150} loaded={loaded}>
              <span className="text-[clamp(2.2rem,8vw,7rem)] font-bold text-[#0F172A]">
                Trois packs.
              </span>
            </RevealLine>
            <RevealLine delay={250} loaded={loaded}>
              <span className="text-[clamp(2.2rem,8vw,7rem)] font-bold text-[#0F172A]">
                Qui réussissent pour de vrai.
              </span>
            </RevealLine>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-6 max-w-[640px] px-2 text-base leading-[1.65] text-[#334155] sm:mt-8 sm:px-0 sm:text-lg md:mt-9 md:text-xl font-medium"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 800ms cubic-bezier(0.22, 1, 0.36, 1) 600ms",
            }}
          >
            Pack OnConversion, Pack OnComplete, Pack OnTime. Une réponse rapide, des projets qui avance et des clients satisfait. Si le projet n&apos;est pas mûr, on vous le dit.
          </p>

          {/* Dual CTAs */}
          <div
            className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 md:mt-10"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 800ms cubic-bezier(0.22, 1, 0.36, 1) 750ms",
            }}
          >
            <ButtonBrand href={WHATSAPP_URL} aria-label="Contacter sur WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Demander un devis
            </ButtonBrand>
            <Link
              href="/our-projects"
              className="group inline-flex items-center gap-2 rounded-full border border-gray-border bg-white/60 backdrop-blur-sm px-7 py-3.5 text-[15px] font-medium text-[#0F172A] transition-all duration-300 hover:border-gray-border/80 hover:bg-white/80 hover:shadow-sm"
            >
              Voir nos projets
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path
                  d="M3 7h8M8 4l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Trust Metrics Grid */}
          <div
            className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-5 md:mt-16 md:grid-cols-4 md:gap-6 w-full max-w-4xl"
          >
            <MetricCard value="7j" label="Livraison rapide" delay={900} loaded={loaded} />
            <MetricCard value="5★" label="Avis Google" delay={1000} loaded={loaded} />
            <MetricCard value="2h" label="Réponse WhatsApp" delay={1100} loaded={loaded} />
            <MetricCard value="1 000€" label="Dès" delay={1200} loaded={loaded} />
          </div>

        </div>
      </section>

      {/* ── Offer cards ── */}
      <section className="py-20 px-6 lg:py-32 space-y-28">
        <div className="mx-auto max-w-[1280px] space-y-16">
          {OFFERS.map((offer, i) => (
            <OfferCard key={offer.num} offer={offer} isEven={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* ── CTA final ── */}
            <section className="bg-blue py-20 px-6 text-center">
              <h2 className="font-display text-2xl font-bold text-white sm:text-5xl mb-4">
                Prêt à lancer votre projet ?
              </h2>
              <p className="text-white/70 text-2xl max-w-xl mx-auto mb-8">
                On cadre un court échange de 30 min pour voir si on peut lancer votre projet.
              </p>
              <ButtonBrand href={WHATSAPP_URL}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Lancer votre projet
              </ButtonBrand>
            </section>
          </div>
  );
}
