"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useVisible } from "@/app/hooks/useVisible";
import ButtonBrand from "@/app/components/ButtonBrand";
import CTACalendly from "@/app/components/CTACalendly";
import { WHATSAPP_URL } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════
   PROJETS — Stats-focused, minimal, bold numbers
   ═══════════════════════════════════════════════════════════ */

const STATS = [
  { value: "100+", label: "Cabinets et praticiens accompagnés" },
  { value: "5/5", label: "Note laissée par nos clients sur Google" },
  { value: "7j", label: "Temps moyen pour avoir votre site" },
  { value: "1 000€", label: "Des prix clairs sans mauvaise surprise" },
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

export default function OurProjects() {
  const [loaded, setLoaded] = useState(false);
  const stats = useVisible(0.1);
  const bento = useVisible(0.15);

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
        aria-label="Nos projets Shift Agency"
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
                  Nos projets
                </span>
              </div>
            </div>
          </div>

          {/* H1 */}
          <h1 className="font-display leading-[1.08] tracking-[-0.02em]">
            <RevealLine delay={150} loaded={loaded}>
              <span className="text-[clamp(2.2rem,8vw,5rem)] font-bold text-[#0F172A]">
              Ils nous font confiance.
              </span>
            </RevealLine>
            <RevealLine delay={250} loaded={loaded}>
              <span className="text-[clamp(2.2rem,8vw,5rem)] font-bold text-[#0F172A]">
              Découvrez nos sites.
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
            Des sites jolis, simples, et qui aident chaque jour de nombreux praticiens à recevoir plus de patients dans leurs cabinets.
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
        </div>
      </section>

      {/* ── Stats grid ── */}
      <section className="py-24 px-6 lg:py-32">
        <div ref={stats.ref} className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-2 gap-px bg-gray-border/40 sm:grid-cols-3 lg:grid-cols-4 rounded-2xl overflow-hidden border border-gray-border/40">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-white p-8 sm:p-10 text-center transition-colors hover:bg-blue-light/30"
                style={{
                  opacity: stats.visible ? 1 : 0,
                  transform: stats.visible ? "translateY(0)" : "translateY(25px)",
                  transition: `all 600ms cubic-bezier(0.4,0,0.2,1) ${i * 80}ms`,
                }}
              >
                <div className="font-display text-3xl font-bold text-[#111111] sm:text-4xl tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs text-gray-text leading-relaxed">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bento Grid Mockups ── */}
      <section className="py-24 px-6 lg:py-32 bg-gradient-to-b from-white to-gray-bg">
        <div ref={bento.ref} className="mx-auto max-w-[1200px]">
          {/* Header */}
          <div
            className="text-center mb-16"
            style={{
              opacity: bento.visible ? 1 : 0,
              transform: bento.visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 700ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-border bg-white px-4 py-1.5 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
              <span className="text-xs font-medium text-gray-text tracking-wide">
                Portfolio
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-[#0F172A] sm:text-5xl mb-4">
              Ce que nous faisons pour vous
            </h2>
            <p className="text-gray-text text-lg max-w-2xl mx-auto">
              Chaque site est pensé pour rassurer vos futurs patients et simplifier la prise de rendez-vous. Tout est très facile.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]">
            {/* Desktop Mockup - SaaS (Large) */}
            <div
              className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue/5 to-blue-light border border-gray-border/60 p-8 hover:border-blue/40 transition-all duration-300 hover:shadow-xl"
              style={{
                opacity: bento.visible ? 1 : 0,
                transform: bento.visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
                transition: "all 800ms cubic-bezier(0.22, 1, 0.36, 1) 150ms",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue/0 to-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-sm font-medium text-[#0F172A]">Plateforme SaaS</span>
                </div>
                <div className="flex-1 rounded-xl bg-white shadow-lg overflow-hidden border border-gray-border/40">
                  <div className="w-full h-full relative bg-gradient-to-br from-blue-light to-white">
                    <Image
                      src="/saas.png"
                      alt="SaaS Dashboard"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Tall - Landing Page */}
            <div
              className="md:col-span-2 md:row-span-3 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-bg border border-gray-border/60 p-8 hover:border-blue/40 transition-all duration-300 hover:shadow-xl"
              style={{
                opacity: bento.visible ? 1 : 0,
                transform: bento.visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
                transition: "all 800ms cubic-bezier(0.22, 1, 0.36, 1) 300ms",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue/0 to-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-sm font-medium text-[#0F172A]">Landing Page</span>
                </div>
                <div className="flex-1 rounded-xl bg-white shadow-lg overflow-hidden border border-gray-border/40">
                  <div className="w-full h-full relative bg-gradient-to-br from-white to-gray-bg">
                    <Image
                      src="/landing.png"
                      alt="Landing Page"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Wide - Site Vitrine */}
            <div
              className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-light/40 to-white border border-gray-border/60 p-6 hover:border-blue/40 transition-all duration-300 hover:shadow-xl"
              style={{
                opacity: bento.visible ? 1 : 0,
                transform: bento.visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
                transition: "all 800ms cubic-bezier(0.22, 1, 0.36, 1) 450ms",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue/0 to-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <span className="text-sm font-medium text-[#0F172A]">Site Vitrine</span>
                </div>
                <div className="flex-1 rounded-lg bg-white shadow-lg overflow-hidden border border-gray-border/40">
                  <div className="w-full h-full relative bg-gradient-to-b from-white to-blue-light">
                    <Image
                      src="/artisan.png"
                      alt="Site Vitrine Artisan"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
    <CTACalendly />
    </>
  );
}
