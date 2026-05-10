"use client";

import { useRef, useEffect, useState } from "react";
import ButtonBrand from "@/app/components/ButtonBrand";
import { WHATSAPP_URL } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════
   CTA + CALENDLY SECTION
   - Full #062783 background with grid overlay
   - Split 50/50: reassurance left, Calendly embed right
   ═══════════════════════════════════════════════════════════ */

const REASSURANCE = [
  "Réponse sous 24h",
  "Devis 100% gratuit",
  "Pas d'abonnement mensuel",
];

export default function CTACalendly() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-blue py-24 lg:py-32"
      aria-label="Prendre rendez-vous"
    >
      {/* ── Grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        <div
          className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 700ms cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {/* ── Left: text content ── */}
          <div className="flex-1">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-[48px] lg:leading-tight">
              On lance votre projet ?
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              Réservez un créneau de 30 minutes pour discuter de votre projet.
              Sans engagement, on écoute d&apos;abord.
            </p>

            {/* Reassurance list */}
            <ul className="mt-8 flex flex-col gap-3">
              {REASSURANCE.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-medium text-white">{item}</span>
                </li>
              ))}
            </ul>

            {/* Alternative CTA */}
            <div className="mt-10 flex flex-col gap-3 sm:items-start">
              <ButtonBrand href={WHATSAPP_URL} arrow={false}>
                Discuter sur WhatsApp
                <span aria-hidden="true">→</span>
              </ButtonBrand>
              <a
                href="mailto:contact@arthur-dev.eu"
                className="text-sm font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Ou par email
              </a>
            </div>
          </div>

          {/* ── Right: Calendly embed ── */}
          <div className="flex-1">
            <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
              <iframe
                src="https://calendly.com/martinprofessionnel0/lancer-votre-projet-digital"
                title="Réserver un rendez-vous avec Shift Agency"
                className="h-[580px] w-full border-0"
                loading="lazy"
                aria-label="Widget de réservation Calendly"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
