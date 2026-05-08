"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useVisible } from "@/app/hooks/useVisible";
import ButtonBrand from "@/app/components/ButtonBrand";

/* ═══════════════════════════════════════════════════════════
   À PROPOS — Long-form editorial with alternating sections
   ═══════════════════════════════════════════════════════════ */

const EXPERTISES = [
  "Développement de sites web sur mesure (vitrines, e-commerce, SaaS)",
  "Création d'applications web et mobiles performantes",
  "Intégration d'outils d'automatisation et d'IA",
  "Référencement SEO / SEA",
  "Stratégies d'acquisition et de conversion",
  "Design UX/UI orienté business",
];

const ADN = [
  {
    title: "Livraison rapide",
    desc: "7 jours pour un site vitrine, pas 3 mois.",
  },
  {
    title: "Prix transparent",
    desc: "490€, 890€, ou sur-mesure. Pas de frais cachés.",
  },
  {
    title: "Sans abonnement",
    desc: "Vous payez une fois, le site est à vous.",
  },
  {
    title: "Contact direct",
    desc: "WhatsApp, email, pas de formulaire sans fin.",
  },
];

const PROMESSE = [
  {
    num: "01",
    title: "Efficace",
    desc: "Il sert un objectif concret, mesurable.",
  },
  {
    num: "02",
    title: "Évolutif",
    desc: "Il s'adapte à votre croissance.",
  },
  {
    num: "03",
    title: "Distinctif",
    desc: "Il reflète votre identité et vous différencie sur votre marché.",
  },
];

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

function Section({
  children,
  className = "",
  bg = "bg-white",
}: {
  children: React.ReactNode;
  className?: string;
  bg?: string;
}) {
  const { ref, visible } = useVisible<HTMLElement>(0.1);
  return (
    <section
      ref={ref}
      className={`${bg} px-6 py-20 lg:py-28 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 700ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {children}
    </section>
  );
}

export default function About() {
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
        aria-label="À propos d'Shift Agency"
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
                  À propos
                </span>
              </div>
            </div>
          </div>

          {/* H1 */}
          <h1 className="font-display leading-[1.08] tracking-[-0.02em]">
            <RevealLine delay={150} loaded={loaded}>
              <span className="text-[clamp(2.2rem,8vw,7rem)] font-bold text-[#0F172A]">
                À propos d&apos;Shift Agency
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
            Shift Agency est une agence de développement web basée à Paris.
            Nous créons des sites performants pour artisans, coachs et entrepreneurs.
            Sites livrés en 7 jours, sans abonnement mensuel.
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
            <ButtonBrand href="/contact" aria-label="Parlons de votre projet">
              Parlons de votre projet
            </ButtonBrand>
            <Link
              href="/nos-services"
              className="group inline-flex items-center gap-2 rounded-full border border-gray-border bg-white/60 backdrop-blur-sm px-7 py-3.5 text-[15px] font-medium text-[#0F172A] transition-all duration-300 hover:border-gray-border/80 hover:bg-white/80 hover:shadow-sm"
            >
              Voir nos services
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
            <MetricCard value="2024" label="Depuis" delay={900} loaded={loaded} />
            <MetricCard value="100+" label="Projets livrés" delay={1000} loaded={loaded} />
            <MetricCard value="Paris" label="Basé à" delay={1100} loaded={loaded} />
            <MetricCard value="7j" label="Délai moyen" delay={1200} loaded={loaded} />
          </div>

        </div>
      </section>

      {/* ── Notre histoire ── */}
      <Section bg="bg-gray-bg/50 border-y border-gray-border/30">
        <div className="mx-auto max-w-[1100px] grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="font-mono text-xs text-blue font-medium tracking-wider uppercase">
              Notre histoire
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-[#111111] sm:text-3xl tracking-[-0.02em]">
              Pas une agence de plus.
            </h2>
          </div>
          <div className="space-y-4 text-base text-gray-text leading-relaxed">
            <p>
              Shift Agency est né d&apos;une conviction simple : les artisans et entrepreneurs
              méritent des sites web professionnels, rapides à obtenir et sans se ruiner
              en abonnements mensuels.
            </p>
            <p>
              Pas une simple agence corporate, mais un service direct et efficace.
              Sites livrés en 7 jours, propriété totale du client, pas de frais cachés.
            </p>
            <p>
              Chaque projet est traité avec le même niveau d&apos;exigence technique,
              que ce soit un site vitrine à 490€ ou une application sur-mesure.
              Le but : vous rendre visible en ligne, rapidement.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Notre modèle ── */}
      <Section>
        <div className="mx-auto max-w-[1100px] grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1 space-y-4 text-base text-gray-text leading-relaxed">
            <p>
              Shift Agency repose sur un modèle simple : développement rapide,
              prix fixe, livraison en 7 à 10 jours. Pas de surprises, pas d&apos;abonnement,
              vous êtes propriétaire de tout.
            </p>
            <p>
              Ce modèle permet d&apos;allier rapidité et qualité sans vous ruiner.
              Sites vitrines dès 490€, sites multi-pages dès 890€, applications sur-mesure
              dès 1500€. Hébergement et maintenance première année inclus.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <span className="font-mono text-xs text-blue font-medium tracking-wider uppercase">
              Notre modèle
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-[#111111] sm:text-3xl tracking-[-0.02em]">
              Simple, rapide, transparent.
            </h2>
            <div className="mt-6 flex gap-4">
              {["7 jours", "Prix fixe", "Pas d'abonnement"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue/10 px-3 py-1 text-[11px] font-medium text-blue"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Notre promesse ── */}
      <Section bg="bg-gray-bg/50 border-y border-gray-border/30">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-14">
            <span className="font-mono text-xs text-blue font-medium tracking-wider uppercase">
              Notre promesse
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-[#111111] sm:text-3xl tracking-[-0.02em]">
              Un projet digital doit être :
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {PROMESSE.map((p) => (
              <div
                key={p.num}
                className="rounded-2xl border border-gray-border/40 bg-white p-8 text-center transition-colors hover:border-blue/30"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue/10 font-mono text-sm font-bold text-blue">
                  {p.num}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#111111]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-gray-text">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Nos expertises ── */}
      <Section>
        <div className="mx-auto max-w-[1100px] grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="font-mono text-xs text-blue font-medium tracking-wider uppercase">
              Nos expertises
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-[#111111] sm:text-3xl tracking-[-0.02em]">
              Ce qu&apos;on maîtrise.
            </h2>
          </div>
          <ul className="space-y-4">
            {EXPERTISES.map((e) => (
              <li key={e} className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0 text-blue">
                  <path d="M4 8.5l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-base text-gray-text">{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Notre ADN ── */}
      <Section bg="bg-[#111111]">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-14">
            <span className="font-mono text-xs text-blue font-medium tracking-wider uppercase">
              Notre ADN
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl tracking-[-0.02em]">
              Ce qui nous définit.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADN.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <h3 className="font-display text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Notre vision ── */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs text-blue font-medium tracking-wider uppercase">
            Notre vision
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold text-[#111111] sm:text-3xl tracking-[-0.02em]">
            Sites web accessibles pour tous les entrepreneurs.
          </h2>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            {[
              "Rapide : Votre site en ligne en 7 jours, pas en 3 mois.",
              "Accessible : Dès 490€, sans abonnement qui vous plombe.",
              "Professionnel : Design moderne, code propre, optimisé mobile.",
            ].map((v) => (
              <div
                key={v}
                className="flex-1 rounded-xl border border-gray-border/40 bg-gray-bg/30 p-5 text-left"
              >
                <p className="text-sm text-gray-text leading-relaxed">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="bg-blue py-20 px-6 text-center">
        <h2 className="font-display text-2xl font-bold text-white sm:text-5xl mb-4">
          Prêt à lancer votre site ?
        </h2>
        <p className="text-white/70 text-2xl max-w-xl mx-auto mb-8">
          Sites vitrines, e-commerce, applications sur-mesure.
          Livraison rapide, prix transparent, sans abonnement.
        </p>
        <p className="text-white/50 text-sm mb-6">Réponse sous 2h · Devis gratuit</p>
        <ButtonBrand href="/contact">
          Demander un devis
        </ButtonBrand>
      </section>
    </div>
  );
}
