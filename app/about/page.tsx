"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useVisible } from "@/app/hooks/useVisible";
import ButtonBrand from "@/app/components/ButtonBrand";
import CTACalendly from "@/app/components/CTACalendly";
import { WHATSAPP_URL } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════
   À PROPOS — Long-form editorial with alternating sections
   ═══════════════════════════════════════════════════════════ */

const EXPERTISES = [
  "Des sites très clairs pour présenter votre cabinet",
  "Vous aider à être trouvé facilement sur Google",
  "Des mots justes et bienveillants pour expliquer votre pratique",
  "Un design apaisant qui donne confiance",
  "Des pages faites pour encourager la prise de rendez-vous",
  "On s'occupe de toute la technique pour vous",
];

const ADN = [
  {
    title: "Création rapide",
    desc: "Votre site simple est prêt en 7 jours, votre site complet en 14 jours.",
  },
  {
    title: "Prix clairs",
    desc: "1 000 € ou 2 000 €. Pas de mauvaise surprise ni de frais cachés.",
  },
  {
    title: "Sans abonnement",
    desc: "Vous payez une seule fois, le site est à vous pour de bon.",
  },
  {
    title: "On se parle",
    desc: "On discute par WhatsApp ou téléphone, c'est simple et direct.",
  },
];

const PROMESSE = [
  {
    num: "01",
    title: "Utile",
    desc: "Votre site a un but précis : vous amener de nouveaux patients.",
  },
  {
    num: "02",
    title: "Clair",
    desc: "Très facile à comprendre pour toutes les personnes qui vous visitent.",
  },
  {
    num: "03",
    title: "Rassurant",
    desc: "Une belle image, bienveillante, qui donne envie de vous faire confiance.",
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
    <>
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
              <span className="text-[clamp(2.2rem,8vw,5rem)] font-bold text-[#0F172A]">
                Qui sommes-nous ?
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
           
           Nous aidons les praticiens à développer leur cabinet avec des sites internet simples et rassurants. Sans jargon technique, avec beaucoup de bienveillance.
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
              Lancer mon projet
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
              Des mots simples pour vous aider à aider.
            </h2>
          </div>
          <div className="space-y-4 text-base text-gray-text leading-relaxed">
            <p>
              Nous avons créé cette agence avec une idée en tête : rendre internet facile pour les praticiens. Vous n'avez pas besoin de comprendre l'informatique pour avoir des patients.
            </p>
            <p>
              C'est terminé les sites compliqués et les termes techniques incompréhensibles. Nous vous faisons un site très doux, apaisant, qui donne confiance à vos futurs patients.
            </p>
            <p>
              On vous aide à être bien visible, et on ne vous demande jamais de payer un abonnement tous les mois. Une fois le site fait, il est à vous.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Notre modèle ── */}
      <Section>
        <div className="mx-auto max-w-[1100px] grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1 space-y-4 text-base text-gray-text leading-relaxed">
            <p>
              Notre façon de faire est très simple : on vous donne un prix clair, on va vite, et on vous aide. Pas de mauvaise surprise, pas de frais cachés.
            </p>
            <p>
              Nos sites démarrent à 1 000 €. On discute ensemble par WhatsApp ou au téléphone, on comprend ce que vous faites, et on commence.
              C'est sans stress et très bienveillant.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <span className="font-mono text-xs text-blue font-medium tracking-wider uppercase">
              Notre modèle
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-[#111111] sm:text-3xl tracking-[-0.02em]">
              Simple, humain, transparent.
            </h2>
            <div className="mt-6 flex gap-4">
              {["7 jours", "Prix clair", "Pas d'abonnement"].map((tag) => (
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
              Votre site internet doit être :
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
              Nos réalisations au quotidien.
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
              Ce que les avis Google résument.
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
            De la bienveillance pour votre cabinet.
          </h2>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            {[
              "On travaille pour vous rapidement pour que vous ayez vite des patients.",
              "Aucun abonnement qui vous coûte cher tous les mois. C'est clair et honnête.",
              "Un site qui inspire la confiance et qui encourage à prendre rendez-vous.",
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

    </div>
    <CTACalendly />
    </>
  );
}
