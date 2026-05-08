"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════════════════
   PROCESS SECTION
   - GSAP ScrollTrigger pinned left column
   - 4 steps with animated illustrations
   - Progress bar
   ═══════════════════════════════════════════════════════════ */

const STEPS = [
  {
    num: "01",
    title: "Brief rapide",
    desc: "On échange par WhatsApp ou appel pour comprendre votre activité, vos besoins et vos objectifs. Simple et direct.",
  },
  {
    num: "02",
    title: "Design et validation",
    desc: "Je crée la maquette de votre site. Vous validez le design avant que je commence le développement. Pas de surprise.",
  },
  {
    num: "03",
    title: "Développement",
    desc: "Je développe votre site en suivant les meilleures pratiques. Code propre, rapide et optimisé pour mobile.",
  },
  {
    num: "04",
    title: "Livraison et formation",
    desc: "Je mets votre site en ligne, je vous explique comment l'utiliser. Vous êtes autonome et propriétaire du site.",
  },
];

/* ── Illustration 1: Wireframe & Conception ── */
function WireframeIllustration() {
  return (
    <div className="relative w-full max-w-[320px] rounded-xl border border-gray-200 bg-white shadow-xl shadow-black/5 overflow-hidden">
      {/* Fake UI Header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-[#FAFAFA] px-3 py-2">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] border border-black/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] border border-black/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27CA40] border border-black/10" />
        </div>
        <div className="h-4 w-16 rounded bg-gray-200" />
      </div>

      {/* Canvas */}
      <div className="flex h-[200px] bg-gray-50/50 p-4 gap-4">
        {/* Sidebar */}
        <div className="w-12 shrink-0 space-y-2">
          <div className="h-8 w-full rounded bg-gray-100 animate-pulse-slow" />
          <div className="h-8 w-full rounded bg-gray-100 animate-pulse-slow" style={{ animationDelay: '0.2s' }} />
          <div className="h-8 w-full rounded bg-gray-100 animate-pulse-slow" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Main Canvas with drawing elements */}
        <div className="relative flex-1 rounded bg-white shadow-sm border border-gray-100 p-3 overflow-hidden">
          <div className="h-4 w-1/3 rounded-full bg-blue/20 mb-4 animate-draw-width" />
          <div className="space-y-2">
            <div className="h-12 w-full rounded bg-gray-50 flex items-center px-2 animate-fade-in-up">
              <div className="h-8 w-8 rounded bg-gray-200" />
              <div className="ml-2 h-2 w-16 rounded-full bg-gray-200" />
            </div>
            <div className="h-12 w-full rounded bg-gray-50 flex items-center px-2 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="h-8 w-8 rounded bg-gray-200" />
              <div className="ml-2 h-2 w-16 rounded-full bg-gray-200" />
            </div>
            <div className="h-12 w-full rounded bg-gray-50 flex items-center px-2 animate-fade-in-up" style={{ animationDelay: '1s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="h-8 w-8 rounded bg-gray-200" />
              <div className="ml-2 h-2 w-16 rounded-full bg-gray-200" />
            </div>
          </div>

          {/* Animated cursor drawing a box */}
          <div className="absolute top-1/2 left-1/2 z-20 h-4 w-4 custom-cursor-anim">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black drop-shadow-md">
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes draw-width {
          0% { width: 0%; opacity: 0; }
          10% { opacity: 1; }
          100% { width: 33%; opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cursor-move {
          0% { transform: translate(50px, 80px); }
          20% { transform: translate(-30px, 10px); }
          50% { transform: translate(-30px, 10px); }
          70% { transform: translate(10px, 60px); }
          100% { transform: translate(50px, 80px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-draw-width { animation: draw-width 2s ease-out infinite alternate; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        .custom-cursor-anim { animation: cursor-move 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
}

/* ── Illustration 2: Architecture & Stack ── */
function ArchitectureIllustration() {
  return (
    <div className="relative w-full max-w-[320px] h-[220px] rounded-xl border border-gray-200 bg-[#FAFAFA] shadow-xl shadow-black/5 flex items-center justify-center perspective-[1000px]">

      {/* 3D Isometric Stack */}
      <div className="relative w-40 h-40 transform-style-3d custom-isometric-tilt">

        {/* Layer 1: Database (Bottom) */}
        <div className="absolute inset-0 bg-white border-2 border-green-500/30 rounded-xl shadow-lg flex items-center justify-end px-4 custom-layer layer-bottom">
          <div className="flex gap-2">
            <span className="text-[10px] font-mono text-green-500 font-bold opacity-0 custom-layer-text">BDD</span>
          </div>
        </div>

        {/* Data particles flying up */}
        <div className="absolute inset-0 flex justify-center items-center z-10 custom-data-container">
          <div className="h-16 w-0.5 bg-gradient-to-t from-green-500/0 via-blue to-blue/0 custom-data-flow" />
        </div>

        {/* Layer 2: API/Backend (Middle) */}
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm border-2 border-blue/30 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex items-center px-4 custom-layer layer-middle">
          <span className="text-[10px] font-mono text-blue font-bold opacity-0 custom-layer-text">API / CORE</span>
        </div>

        {/* Layer 3: Frontend (Top) */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md border-2 border-[#111111]/10 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col justify-center px-4 custom-layer layer-top">
          <div className="w-16 h-2 bg-gray-200 rounded-full mb-2" />
          <div className="w-24 h-[10px] bg-gray-100 rounded mb-1" />
          <div className="w-12 h-[10px] bg-blue/20 rounded" />
          <span className="absolute top-2 right-3 text-[10px] font-mono text-gray-400 font-bold opacity-0 custom-layer-text">UI</span>
        </div>

      </div>

      <style>{`
        .perspective-[1000px] { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        
        @keyframes iso-tilt {
          0%, 100% { transform: rotateX(60deg) rotateZ(-45deg) translateZ(-20px); }
          50% { transform: rotateX(55deg) rotateZ(-40deg) translateZ(-10px); }
        }
        .custom-isometric-tilt {
          animation: iso-tilt 6s ease-in-out infinite;
        }
        
        .custom-layer { transition: transform 0.8s; width: 100%; height: 100%; }
        
        /* Expansion keyframes: The stack opens and closes */
        @keyframes float-bottom { 
          0%, 20%, 80%, 100% { transform: translateZ(0px); } 
          40%, 60% { transform: translateZ(-25px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); } 
        }
        @keyframes float-middle { 
          0%, 20%, 80%, 100% { transform: translateZ(0px); } 
          40%, 60% { transform: translateZ(40px); } 
        }
        @keyframes float-top { 
          0%, 20%, 80%, 100% { transform: translateZ(0px); } 
          40%, 60% { transform: translateZ(105px); } 
        }
        
        .layer-bottom { animation: float-bottom 8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .layer-middle { animation: float-middle 8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .layer-top { animation: float-top 8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        
        /* Hide text when collapsed, show when expanded */
        @keyframes show-text {
          0%, 25%, 75%, 100% { opacity: 0; }
          40%, 60% { opacity: 1; }
        }
        .custom-layer-text { animation: show-text 8s linear infinite; }
        
        /* Fade the particles in and out based on state */
        @keyframes hide-particles {
          0%, 20%, 80%, 100% { opacity: 0; }
          40%, 60% { opacity: 0.6; }
        }
        .custom-data-container { animation: hide-particles 8s linear infinite; }

        @keyframes flow-up {
          0% { transform: translateY(20px) translateZ(30px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-40px) translateZ(90px); opacity: 0; }
        }
        .custom-data-flow { animation: flow-up 2s linear infinite; }
      `}</style>
    </div>
  );
}

/* ── Illustration 3: Custom Dev (Component Assembly) ── */
function DevelopmentIllustration() {
  return (
    <div className="relative w-full max-w-[320px] rounded-xl border border-gray-100 bg-[#FAFAFA] p-6 shadow-xl shadow-black/5 overflow-hidden flex flex-col items-center justify-center">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-40 z-0" style={{ backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

      {/* Assembly Container */}
      <div className="relative w-56 h-48 rounded-lg border-2 border-dashed border-gray-300 p-2 z-10 flex flex-col gap-2 bg-white/40 backdrop-blur-sm">

        {/* Navbar Piece */}
        <div className="w-full h-6 rounded bg-white shadow-sm border border-gray-100 p-1.5 flex items-center gap-2 opacity-0 custom-snap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-blue" />
          <div className="w-10 h-1.5 rounded-full bg-gray-200" />
          <div className="ml-auto w-4 h-1.5 rounded-full bg-gray-200" />
        </div>

        {/* Body Area */}
        <div className="flex-1 flex gap-2">
          {/* Sidebar Piece */}
          <div className="w-12 h-full rounded bg-white shadow-sm border border-gray-100 opacity-0 custom-snap-2 flex flex-col pt-3 gap-2 px-1.5 items-center">
            <div className="w-full h-1.5 rounded-full bg-gray-200" />
            <div className="w-full h-1.5 rounded-full bg-gray-200" />
            <div className="w-2/3 h-1.5 rounded-full bg-gray-200" />
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Main Banner Piece */}
            <div className="w-full flex-1 rounded-lg bg-gradient-to-br from-blue/10 to-transparent border border-blue/20 opacity-0 custom-snap-3 flex items-center justify-center">
              {/* Spinner inside the built feature */}
              <svg className="w-5 h-5 text-blue animate-spin opacity-50" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="30 30" strokeLinecap="round" />
              </svg>
            </div>

            {/* Bottom Cards Pieces */}
            <div className="h-10 w-full flex gap-2">
              <div className="flex-1 rounded-md bg-white shadow-sm border border-gray-100 opacity-0 custom-snap-4 p-1.5">
                <div className="w-1/2 h-1.5 rounded-full bg-gray-200 mb-1" />
                <div className="w-full h-1.5 rounded-full bg-gray-100" />
              </div>
              <div className="flex-1 rounded-md bg-white shadow-sm border border-gray-100 opacity-0 custom-snap-5 p-1.5">
                <div className="w-1/2 h-1.5 rounded-full bg-gray-200 mb-1" />
                <div className="w-full h-1.5 rounded-full bg-gray-100" />
              </div>
            </div>
          </div>
        </div>

        {/* Highlight/Scan effect on completion */}
        <div className="absolute inset-0 bg-blue/5 rounded-lg opacity-0 custom-build-flash pointer-events-none" />
      </div>

      {/* Progress Indicator Card */}
      <div className="mt-5 px-4 py-2 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-gray-100 z-10 flex items-center gap-2.5">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue opacity-75 custom-ping-stop"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue custom-dot-color"></span>
        </div>
        <span className="text-[10px] font-mono font-bold text-gray-700 uppercase tracking-widest custom-sprint-text w-24"></span>
      </div>

      <style>{`
        /* Snap Animations: Start high up, snap into position, then fade out */
        @keyframes snap-in {
          0% { transform: translateY(-30px); opacity: 0; }
          15%, 80% { transform: translateY(0); opacity: 1; }
          95%, 100% { transform: translateY(0); opacity: 0; }
        }
        /* Staggered timings mimicking systematic builds */
        .custom-snap-1 { animation: snap-in 7s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; animation-delay: 0s; }
        .custom-snap-2 { animation: snap-in 7s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; animation-delay: 0.6s; }
        .custom-snap-3 { animation: snap-in 7s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; animation-delay: 1.2s; }
        .custom-snap-4 { animation: snap-in 7s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; animation-delay: 1.8s; }
        .custom-snap-5 { animation: snap-in 7s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; animation-delay: 2.1s; }

        @keyframes build-flash {
          0%, 60% { opacity: 0; box-shadow: none; }
          65%, 80% { opacity: 1; box-shadow: inset 0 0 0 2px rgba(6,39,131,0.5); }
          90%, 100% { opacity: 0; }
        }
        .custom-build-flash { animation: build-flash 7s ease-out infinite; }
        
        @keyframes sprint-text-cycle {
          0%, 60% { content: "SPRINT EN COURS"; }
          65%, 100% { content: "REVUE VALIDÉE"; color: #10b981; } /* success green */
        }
        .custom-sprint-text::after {
          content: "SPRINT EN COURS";
          animation: sprint-text-cycle 7s infinite;
        }

        @keyframes stop-ping {
          0%, 60% { display: inline-flex; }
          65%, 100% { display: none; }
        }
        .custom-ping-stop { animation: stop-ping 7s infinite; }

        @keyframes dot-color {
          0%, 60% { background-color: #062783; }
          65%, 100% { background-color: #10b981; }
        }
        .custom-dot-color { animation: dot-color 7s infinite; }
      `}</style>
    </div>
  );
}

/* ── Illustration 4: Deploy & Performance ── */
function DeliveryIllustration() {
  return (
    <div className="relative w-full max-w-[320px] rounded-xl border border-gray-100 bg-white p-6 shadow-xl shadow-black/5 flex flex-col gap-5 overflow-hidden">
      {/* Top Banner: Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <span className="text-xs font-semibold text-gray-800">Production</span>
        </div>
        <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">v1.4.0</span>
      </div>

      {/* Deployment progress */}
      <div className="w-full">
        <div className="mb-1 flex justify-between text-[10px] text-gray-400 font-medium">
          <span>Building...</span>
          <span className="text-blue font-bold custom-counter">100%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue rounded-full relative custom-progress-bar">
            <div className="absolute inset-0 bg-white/20 custom-progress-shine" />
          </div>
        </div>
      </div>

      {/* Lighthouse Scores mockup */}
      <div className="flex justify-between items-center bg-gray-50/50 rounded-lg p-3 border border-gray-100">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            {/* Circular Progress SVG */}
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 36 36" className="w-8 h-8 -rotate-90">
                <path
                  className="text-gray-200 stroke-current text-opacity-30"
                  strokeWidth="3" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-green-500 stroke-current custom-circle-fill"
                  strokeWidth="3" strokeDasharray="100, 100" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-green-600">100</span>
            </div>
            <div className="h-1 w-4 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fill-bar {
          0% { width: 0%; }
          10%, 40% { width: 30%; }
          50%, 80% { width: 80%; }
          90%, 100% { width: 100%; }
        }
        .custom-progress-bar { animation: fill-bar 5s ease-in-out infinite; }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .custom-progress-shine { animation: shine 2s linear infinite; }

        @keyframes circle-draw {
          0% { stroke-dasharray: 0, 100; }
          100% { stroke-dasharray: 100, 100; }
        }
        .custom-circle-fill { animation: circle-draw 2s ease-out forwards; }
      `}</style>
    </div>
  );
}

const ILLUSTRATIONS = [
  WireframeIllustration,
  ArchitectureIllustration,
  DevelopmentIllustration,
  DeliveryIllustration,
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".step-row");

      rows.forEach((row) => {
        const leftCard = row.querySelector(".left-card");
        const rightCard = row.querySelector(".right-card");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "top 20%",
            scrub: 1,
            // markers: true, // Uncomment for debugging
          },
        });

        if (leftCard && rightCard) {
          // Carte gauche : mouvement + fade simultanés
          tl.fromTo(
            leftCard,
            { x: -80, y: 40, rotation: -3, opacity: 0 },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              ease: "power3.out",
              duration: 1
            },
            0
          );

          // Carte droite : légèrement décalée pour un effet cascade
          tl.fromTo(
            rightCard,
            { x: 80, y: 40, rotation: 3, opacity: 0 },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              ease: "power3.out",
              duration: 1
            },
            0.15
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="a-propos"
      className="relative w-full overflow-hidden"
      aria-label="Notre processus"
    >
      <div className="mx-auto max-w-[1024px] px-6 lg:px-10">
        {/* Section Header */}
        <div className="pt-24 lg:pt-32 mb-16 lg:mb-24 text-center max-w-4xl mx-auto">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            Notre Processus
          </p>
          <h2 className="mb-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-[#111111]">
            Un process clair, en 4 étapes
          </h2>
          <p className="text-lg lg:text-xl text-gray-text leading-relaxed max-w-2xl mx-auto">
            On avance étape par étape : vous savez ce qu'on fait, pourquoi on le fait, et ce qui vient ensuite.
          </p>
        </div>

        <div ref={containerRef} className="flex flex-col gap-12 lg:gap-16 pb-24 lg:pb-32">
          {STEPS.map((step, i) => {
            const Illustration = ILLUSTRATIONS[i];
            return (
              <div
                key={i}
                className="step-row grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch"
              >
                {/* ── Left Card (Text) ── */}
                <div className="left-card flex flex-col justify-center rounded-3xl border border-gray-border bg-white p-8 lg:p-12 shadow-sm">
                  <p className="mb-6 font-mono text-sm font-semibold text-blue">
                    {step.num} / {String(STEPS.length).padStart(2, "0")}
                  </p>
                  <h2 className="mb-4 font-display text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight text-[#111111]">
                    {step.title}
                  </h2>
                  <p className="text-base lg:text-lg leading-relaxed text-gray-text">
                    {step.desc}
                  </p>
                </div>

                {/* ── Right Card (Illustration) with visual offset ── */}
                <div className="lg:pt-24 h-full">
                  <div className="right-card flex h-full min-h-[320px] lg:min-h-[400px] items-center justify-center rounded-3xl border border-gray-border bg-[#F8F9FA] p-8 lg:p-12 shadow-sm">
                    <div className="w-full max-w-sm flex justify-center">
                      <Illustration />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

