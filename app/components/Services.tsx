"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import ButtonBrand from "@/app/components/ButtonBrand";

/* ═══════════════════════════════════════════════════════════
   SERVICES — Scrollytelling + 3D Wheel
   ═══════════════════════════════════════════════════════════ */

const STEPS = [
  {
    title: "Le site simple",
    description:
      "Une belle page internet livrée en 7 jours pour présenter votre cabinet. Parfait pour les praticiens qui veulent être facilement trouvables et rassurer leurs futurs patients.",
    features: ["Livraison 7 jours", "Plus de patients", "Satisfait ou remboursé 14j"],
    image: "/clement.png",
    naturalScale: false,
  },
  {
    title: "Le site complet",
    description:
      "Vos futurs patients comprendront en 3 secondes comment vous pouvez les aider. Vous obtiendrez un site complet qui met en valeur vos compétences et vous aide à être bien placé sur Google.",
    features: ["Confiance instantanée", "Plus de patients", "Livraison en 2 semaines", "Satisfait ou remboursé 14j"],
    image: "/artisan.png",
    naturalScale: true,
  },
  // {
  //   title: "Pack OnTime (Web App & Automatisation)",
  //   description:
  //     "Gagner +15 h/semaine pour vos équipes avec un outil sur-mesure livré en ~30 jours. L'outil sera tellement bien que vos équipes ne voudront pas le lâcher.",
  //   features: ["Livraison ~30 jours", "Gagner +15 h/semaine", "Itérations gratuites"],
  //   image: "/saas.png",
  //   naturalScale: false,
  // },
];

const N = STEPS.length;

/* ═══ Arc de cercle — flush right ═══ */
const HUB_DIST = 900;
const CARD_W = 660;
const CARD_H = 440;
const RADIUS = HUB_DIST + CARD_W / 2;
const CARD_GAP = 620;
const STEP_DEG = Math.asin(CARD_GAP / RADIUS) * (180 / Math.PI);
const ORIGIN = `calc(100% + ${HUB_DIST}px) 50%`;

/* ── Carte individuelle sur l'arc (desktop) ── */
function ArcCard({
  index,
  step,
  scrollYProgress,
  activeIndex,
}: {
  index: number;
  step: (typeof STEPS)[number];
  scrollYProgress: MotionValue<number>;
  activeIndex: number;
}) {
  const t = useTransform(scrollYProgress, (v) => index - v * (N - 1));

  const rotate = useTransform(t, (v) => -v * STEP_DEG);
  const scale = useTransform(t, (v) => Math.max(0.78, 1 - Math.abs(v) * 0.14));
  const frameOpacity = useTransform(t, (v) => {
    const abs = Math.abs(v);
    if (abs < 0.5) return 1;
    return Math.max(0, 1 - (abs - 0.5) * 1.5);
  });
  const contentOpacity = useTransform(t, (v) => {
    const abs = Math.abs(v);
    if (abs < 0.1) return 1;
    return Math.max(0, 1 - (abs - 0.1) * 1.4);
  });
  const zIndex = useTransform(t, (v) => Math.round(100 - Math.abs(v) * 40));

  const isActive = index === activeIndex;

  return (
    <motion.div
      className="absolute"
      style={{
        rotate,
        zIndex,
        transformOrigin: ORIGIN,
        right: -80,
        top: "50%",
        marginTop: -(CARD_H / 2),
        width: CARD_W,
        height: CARD_H,
      }}
    >
      <motion.div
        className="h-full w-full overflow-hidden rounded-[24px] border-2 bg-white"
        style={{
          scale,
          opacity: frameOpacity,
          borderColor: isActive ? "rgba(6,39,131,0.3)" : "rgba(229,231,235,0.5)",
          boxShadow: isActive
            ? "0 50px 100px -25px rgba(0,0,0,0.25), 0 30px 60px -30px rgba(6,39,131,0.15), inset 0 1px 0 0 rgba(255,255,255,0.8)"
            : "0 25px 60px -20px rgba(0,0,0,0.12), inset 0 1px 0 0 rgba(255,255,255,0.6)",
          transition: "border-color 500ms, box-shadow 500ms",
        }}
      >
        {/* Browser chrome */}
        <div className="flex h-12 shrink-0 items-center gap-2 border-b-2 border-gray-border/40 bg-gradient-to-b from-gray-bg to-gray-bg/60 px-6 backdrop-blur-sm">
          <div className="h-[11px] w-[11px] rounded-full bg-[#FF5F57] shadow-sm" />
          <div className="h-[11px] w-[11px] rounded-full bg-[#FEBC2E] shadow-sm" />
          <div className="h-[11px] w-[11px] rounded-full bg-[#28C840] shadow-sm" />
          <div className="ml-6 h-6 flex-1 rounded-lg border-2 border-gray-border/25 bg-white/80 shadow-inner" />
        </div>

        {/* Screenshot */}
        <motion.div
          className="relative h-[calc(100%-48px)] w-full overflow-hidden bg-white"
          style={{ opacity: contentOpacity }}
        >
          {step.naturalScale ? (
            <Image
              src={step.image}
              alt={step.title}
              width={1200}
              height={900}
              className="w-full h-auto block"
            />
          ) : (
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-cover object-top"
            />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ── Composant principal ── */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIdx = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Desktop uniquement: scroll contrôle activeIndex
  // Sur mobile, seul le carousel contrôle activeIndex
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Ne rien faire sur mobile (< 1024px)
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    const idx = Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))));
    if (idx !== prevIdx.current) {
      prevIdx.current = idx;
      setActiveIndex(idx);
    }
  });

  // Mobile carousel: snap to closest card
  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    const swipeVelocityThreshold = 500;

    let newIndex = activeIndex;

    // Déterminer la direction basée sur offset ou velocity
    if (Math.abs(info.velocity.x) > swipeVelocityThreshold) {
      // Swipe rapide: utiliser la vélocité
      newIndex = info.velocity.x > 0 ? activeIndex - 1 : activeIndex + 1;
    } else if (Math.abs(info.offset.x) > swipeThreshold) {
      // Swipe lent: utiliser l'offset
      newIndex = info.offset.x > 0 ? activeIndex - 1 : activeIndex + 1;
    }

    // Contraindre l'index
    newIndex = Math.max(0, Math.min(N - 1, newIndex));
    setActiveIndex(newIndex);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative lg:h-[300vh]"
      aria-label="Nos services"
    >
      {/* ═══ VERSION MOBILE ═══ */}
      <div className="bg-[#FAFBFC] py-16 lg:hidden">
        <div className="mx-auto w-full max-w-[1280px] px-5">
          {/* Badge */}
          <div className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border-2 border-gray-border/60 bg-white px-5 py-2 shadow-sm">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="text-blue">
              <path
                d="M5 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-text">
              Services
            </span>
          </div>

          {/* Compteur d'étape */}
          <div className="mb-4 flex items-baseline gap-1.5 font-mono">
            <span className="text-3xl font-bold tabular-nums text-[#111111]">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-base font-medium text-gray-text/60">/</span>
            <span className="text-base font-medium tabular-nums text-gray-text/60">
              {String(N).padStart(2, "0")}
            </span>
          </div>

          {/* Barre de progression */}
          <div className="mb-8 flex gap-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full shadow-sm"
                style={{
                  width: i === activeIndex ? 56 : 16,
                  background: i <= activeIndex ? "#062783" : "#E5E7EB",
                  opacity: i < activeIndex ? 0.5 : 1,
                  transition:
                    "width 500ms cubic-bezier(0.16,1,0.3,1), background 400ms, opacity 400ms",
                }}
              />
            ))}
          </div>

          {/* Texte dynamique */}
          <div className="grid mb-6">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="col-start-1 row-start-1"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  transform:
                    i === activeIndex
                      ? "translateY(0)"
                      : i < activeIndex
                        ? "translateY(-16px)"
                        : "translateY(16px)",
                  transition:
                    "opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)",
                  pointerEvents: i === activeIndex ? "auto" : "none",
                }}
              >
                <h2 className="mb-3 font-display text-[clamp(1.75rem,5vw,3rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#111111]">
                  {step.title}
                </h2>
                <p className="max-w-md text-[15px] leading-[1.65] text-gray-text">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Carousel avec swipe - maintenant ici */}
          <div className="mb-8 w-full overflow-hidden">
            {/* Carousel container avec peek de la carte suivante */}
            <div className="relative w-full">
              <motion.div
                className="flex gap-4"
                drag="x"
                dragConstraints={{ left: -2000, right: 0 }}
                dragElastic={0.15}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                animate={{
                  x: `calc(-${activeIndex * 100}% + ${activeIndex * 44}px)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                }}
              >
                {STEPS.map((step, i) => (
                  <motion.div
                    key={i}
                    className="relative shrink-0"
                    style={{
                      width: "calc(100% - 60px)",
                    }}
                  >
                    <div className="overflow-hidden rounded-2xl border-2 border-gray-border/60 bg-white shadow-[0_25px_50px_-15px_rgba(6,39,131,0.2),0_10px_20px_-10px_rgba(0,0,0,0.1)]">
                      {/* Browser chrome */}
                      <div className="flex h-10 items-center gap-2 border-b-2 border-gray-border/40 bg-gradient-to-b from-gray-bg to-gray-bg/60 px-4">
                        <div className="h-[9px] w-[9px] rounded-full bg-[#FF5F57] shadow-sm" />
                        <div className="h-[9px] w-[9px] rounded-full bg-[#FEBC2E] shadow-sm" />
                        <div className="h-[9px] w-[9px] rounded-full bg-[#28C840] shadow-sm" />
                      </div>
                      {/* Screenshot */}
                      <div className="relative h-[280px] w-full overflow-hidden bg-white sm:h-[320px]">
                        {step.naturalScale ? (
                          <Image
                            src={step.image}
                            alt={step.title}
                            width={800}
                            height={600}
                            className="block h-auto w-full"
                          />
                        ) : (
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            className="object-cover object-top"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Indicateur visuel de swipe sur le côté droit */}
              <motion.div
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0.6, x: -10 }}
                animate={{
                  opacity: activeIndex === N - 1 ? 0 : [0.6, 0.9, 0.6],
                  x: activeIndex === N - 1 ? 0 : [-10, 0, -10],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue/10 backdrop-blur-sm">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-blue"
                  >
                    <path
                      d="M7.5 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* Dots de navigation */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="group relative"
                  aria-label={`Aller au service ${i + 1}`}
                >
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIndex ? 32 : 8,
                      background: i === activeIndex ? "#062783" : "#E5E7EB",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <ButtonBrand href="/nos-services" aria-label="Découvrir nos offres">
              Découvrir nos offres
            </ButtonBrand>
          </div>
        </div>
      </div>

      {/* ═══ VERSION DESKTOP ═══ */}
      {/* ── Sticky viewport (desktop only) ── */}
      <div className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
        {/* Split background — desktop only */}
        <div className="pointer-events-none absolute inset-0 hidden lg:flex" aria-hidden="true">
          <div className="w-1/2" style={{ background: "#FAFBFC" }} />
          <div className="w-px shrink-0" style={{ background: "#E5E7EB" }} />
          <div className="flex-1" style={{ background: "#F3F5F7" }} />
        </div>
        {/* Mobile background */}
        <div
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{ background: "#FAFBFC" }}
          aria-hidden="true"
        />

        {/* Background glows */}
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full opacity-20 blur-[100px] lg:h-[600px] lg:w-[600px] lg:opacity-25 lg:blur-[120px]"
          style={{ background: "#062783" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 -right-40 hidden h-[500px] w-[500px] rounded-full opacity-15 blur-[120px] lg:block"
          style={{ background: "#062783" }}
          aria-hidden="true"
        />

        {/* ── Content ── */}
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-5 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-center lg:px-10 lg:py-0">
          {/* ─── Left: texte dynamique ─── */}
          <div className="flex w-full flex-col justify-center lg:w-[40%] lg:pr-16">
            {/* Badge */}
            <div className="mb-4 inline-flex w-fit items-center gap-2.5 rounded-full border-2 border-gray-border/60 bg-white px-5 py-2 shadow-sm lg:mb-6">
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="text-blue">
                <path
                  d="M5 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-text">
                Services
              </span>
            </div>

            {/* Compteur d'étape */}
            <div className="mb-3 flex items-baseline gap-1.5 font-mono lg:mb-4">
              <span className="text-3xl font-bold tabular-nums text-[#111111] lg:text-4xl">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-base font-medium text-gray-text/60">/</span>
              <span className="text-base font-medium tabular-nums text-gray-text/60">
                {String(N).padStart(2, "0")}
              </span>
            </div>

            {/* Barre de progression */}
            <div className="mb-6 flex gap-2 lg:mb-6">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full shadow-sm"
                  style={{
                    width: i === activeIndex ? 56 : 16,
                    background: i <= activeIndex ? "#062783" : "#E5E7EB",
                    opacity: i < activeIndex ? 0.5 : 1,
                    transition:
                      "width 500ms cubic-bezier(0.16,1,0.3,1), background 400ms, opacity 400ms",
                  }}
                />
              ))}
            </div>

            {/* Blocs de texte animés avec grid pour éviter tout chevauchement */}
            <div className="grid mb-6 lg:mb-6">
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  className="col-start-1 row-start-1 flex flex-col justify-start"
                  style={{
                    opacity: i === activeIndex ? 1 : 0,
                    transform:
                      i === activeIndex
                        ? "translateY(0)"
                        : i < activeIndex
                          ? "translateY(-24px)"
                          : "translateY(24px)",
                    transition:
                      "opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)",
                    pointerEvents: i === activeIndex ? "auto" : "none",
                  }}
                >
                  <h2 className="mb-3 font-display text-[clamp(1.75rem,5vw,3rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#111111] lg:mb-4">
                    {step.title}
                  </h2>
                  <p className="mb-5 max-w-md text-[15px] leading-[1.65] text-gray-text lg:mb-6 lg:text-[16px] lg:leading-[1.6]">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2 lg:gap-2.5">
                    {step.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border-2 border-gray-border/50 bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-gray-text shadow-sm sm:px-4 lg:py-2 lg:text-xs"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <ButtonBrand href="/nos-services" aria-label="Découvrir nos offres">
                Découvrir nos offres
              </ButtonBrand>
            </div>
          </div>

          {/* ─── Right: Arc de cercle (Desktop) ─── */}
          <div className="relative hidden h-full w-[60%] lg:block">
            <div
              className="pointer-events-none absolute right-0 top-1/2 h-[360px] w-[500px] -translate-y-1/2 rounded-[60px] blur-[120px]"
              style={{ background: "#062783", opacity: 0.1 }}
              aria-hidden="true"
            />

            {STEPS.map((step, i) => (
              <ArcCard
                key={i}
                index={i}
                step={step}
                scrollYProgress={scrollYProgress}
                activeIndex={activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
