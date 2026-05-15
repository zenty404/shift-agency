"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useVisible } from "@/app/hooks/useVisible";
import ButtonBrand from "@/app/components/ButtonBrand";
import CTACalendly from "@/app/components/CTACalendly";
import { CALENDLY_URL } from "@/lib/calendly";

/* ═══════════════════════════════════════════════════════════
   NOS SERVICES — Horizontal stacked cards with pricing
   Layout: Hero → 3 detailed offer cards → CTA
   ═══════════════════════════════════════════════════════════ */

const OFFERS = [
  {
    num: "01",
    title: "Le Site Simple",
    headline:
      "Une page claire pour présenter votre cabinet. Vos futurs patients prennent rendez-vous facilement.",
    blocage:
      "Aujourd'hui, vos patients ont du mal à comprendre votre pratique, ou vous êtes perdu au milieu des autres sans pouvoir vous démarquer.",
    solution:
      "Un site apaisant et très facile à lire. En quelques secondes, les visiteurs se sentent en confiance et ont envie de vous contacter.",
    results: [
      "Prêt en 7 jours",
      "Plus de prises de rendez-vous",
      "Une belle image professionnelle",
      "Très facile à lire sur téléphone",
    ],
    process: ["Discussion", "Design", "Création", "Mise en ligne"],
    delay: "7 jours",
    price: "1 000 € HT",
    cta: "Je veux ce site",
  },
  {
    num: "02",
    title: "Le Site Complet",
    headline:
      "Un site avec plusieurs pages pour tout expliquer. Parfait pour être trouvé facilement sur Google.",
    blocage:
      "On ne vous trouve pas quand on cherche un spécialiste dans votre ville. Le bouche-à-oreille marche bien, mais ce n'est plus suffisant.",
    solution:
      "Un site qui rassure, qui explique bien toutes vos méthodes, et surtout, qui est fait pour que Google vous mette en avant dans votre région.",
    results: [
      "Mieux placé sur Google",
      "Vos patients comprennent bien votre pratique",
      "Votre agenda se remplit",
      "Prêt en 14 jours",
    ],
    process: ["Organisation", "Design", "Référencement", "Mise en ligne"],
    delay: "14 jours",
    price: "2 000 € HT",
    cta: "Je veux être visible",
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
            <ButtonBrand href={CALENDLY_URL}>
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
    <>
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
              <span className="text-[clamp(2.2rem,8vw,5rem)] font-bold text-[#0F172A]">
                Deux offres simples.
              </span>
            </RevealLine>
            <RevealLine delay={250} loaded={loaded}>
              <span className="text-[clamp(2.2rem,8vw,5rem)] font-bold text-[#0F172A]">
                Pour remplir votre agenda.
              </span>
            </RevealLine>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-6 max-w-[640px] px-2 text-base leading-[1.65] text-[#334155] sm:mt-8 sm:px-0 sm:text-lg md:mt-9 font-medium"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 800ms cubic-bezier(0.22, 1, 0.36, 1) 600ms",
            }}
          >
            Des sites créés pour vous aider à avoir plus de patients, sans jargon technique. On s&apos;occupe de tout pour que vous puissiez vous concentrer sur vos consultations.
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
            <ButtonBrand href={CALENDLY_URL} aria-label="Réserver un créneau sur Calendly">
              Réserver 30 min
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

    </div>
    <CTACalendly />
    </>
  );
}
