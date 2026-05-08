"use client";

import { useEffect, useState } from "react";
import ButtonBrand from "@/app/components/ButtonBrand";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   HERO SECTION — Ikovaline (Corporate Premium Edition)
   - Full-screen centered layout with institutional design
   - Subtle gradient background (navy-grey tones)
   - Badge at top (subtle hover, no holographic effect)
   - Large centered multi-line headline
   - Subtitle + dual CTA (primary + secondary)
   - Trust metrics (4 KPI cards)
   - Client logo carousel
   ═══════════════════════════════════════════════════════════ */

/* ── Staggered line reveal for H1 (corporate timing) ── */
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
      className="flex flex-col items-center justify-center rounded-xl border border-gray-border/60 bg-white/40 px-6 py-5 transition-[border-color,background-color,box-shadow] duration-300 hover:border-gray-border hover:bg-white/60 hover:shadow-sm"
      style={{
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      <div className="text-3xl font-bold text-[#0F172A] font-display">{value}</div>
      <div className="mt-1 text-sm font-medium text-gray-text">{label}</div>
    </div>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-start overflow-hidden px-3 sm:px-6 pt-24 pb-20 sm:pb-24 md:pb-28"
      aria-label="Accueil — Shift Agency, développement web et digital sur-mesure"
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
          shadow-[0_8px_60px_-8px_rgba(77,182,249,0.35)]
          flex flex-col items-center text-center
          px-6 sm:px-8 md:px-10 lg:px-14 py-8 sm:py-10 md:py-12"
        style={{
          opacity: loaded ? 1 : 0.1,
          transform: loaded ? "translateY(0) scale(1)" : "translateY(30px) scale(0.98)",
          transition: "opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 100ms",
        }}
      >
        {/* Subtle inner glow (blue tone) */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] sm:h-[450px] md:h-[550px] w-full rounded-full opacity-25 blur-[100px] sm:blur-[160px]"
          style={{ background: "#4DB6F9" }}
          aria-hidden="true"
        />

        {/* Google Reviews badge */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 200ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 200ms",
          }}
        >
          <div className="mb-6 sm:mb-8 md:mb-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-gray-border/50 bg-white px-5 py-2.5 shadow-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="#FBBF24"
                    aria-hidden="true"
                  >
                    <path d="M8 0l2.47 4.94L16 5.76l-4 3.85L12.94 16 8 13.27 3.06 16 4 9.61 0 5.76l5.53-.82L8 0z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-[#0F172A]">
                5/5 · Avis Google
              </span>
            </div>
          </div>
        </div>

        {/* H1 (keep existing text) */}
        <h1 className="font-display leading-[1.08] tracking-[-0.02em]">
          <RevealLine delay={150} loaded={loaded}>
            <span className="text-[clamp(2.2rem,8vw,7rem)] font-bold text-[#0F172A]">
              Votre projet digital.
            </span>
          </RevealLine>
          <RevealLine delay={250} loaded={loaded}>
            <span className="text-[clamp(2.2rem,8vw,7rem)] font-bold text-[#0F172A]">
              De l&apos;idée au déploiement.
            </span>
          </RevealLine>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6 max-w-[640px] px-2 text-base leading-[1.65] text-[#334155] sm:mt-8 sm:px-0 sm:text-lg md:mt-9 md:text-xl font-medium"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 600ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 600ms",
          }}
        >
          Sites web rapides et efficaces pour artisans, coachs et entrepreneurs. Sans abonnement mensuel.
        </p>

        {/* Dual CTAs */}
        <div
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 md:mt-10"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 750ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 750ms",
          }}
        >
          <ButtonBrand href="#contact" aria-label="Lancer mon projet">
            Lancer mon projet
          </ButtonBrand>
          <Link
            href="/our-projects"
            className="group inline-flex items-center gap-2 rounded-full border border-gray-border bg-white px-7 py-3.5 text-[15px] font-medium text-[#0F172A] transition-[border-color,background-color,box-shadow] duration-300 hover:border-gray-border/80 hover:bg-gray-bg hover:shadow-sm"
          >
            Voir nos réalisations
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
          <MetricCard value="490€" label="Dès" delay={1200} loaded={loaded} />
        </div>

      </div>
    </section>
  );
}
