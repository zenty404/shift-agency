"use client";

import { useState, useRef, useEffect } from "react";
import { useVisible } from "@/app/hooks/useVisible";
import ButtonBrand from "@/app/components/ButtonBrand";

/* ═══════════════════════════════════════════════════════════
   CONFIGURATEUR — Multi-step project quiz
   Step 0 → Project type
   Step 1 → Formula selection
   Step 2 → Detail + CTA
   ═══════════════════════════════════════════════════════════ */

/* ── Data ── */

const PROJECT_TYPES = [
  {
    id: "site-simple",
    label: "Site simple",
    desc: "Plus de patient en 7 jours",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: "site-complet",
    label: "Site Complet",
    desc: "Une crédibilité et un référencement Google superbe",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  // {
  //   id: "projet-custom",
  //   label: "Web App & Automatisation",
  //   desc: "Pack OnTime: +15 h / semaine pour vos équipes",
  //   icon: (
  //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
  //       <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  //       <circle cx="12" cy="12" r="3" />
  //     </svg>
  //   ),
  // },
];

interface Formula {
  id: string;
  label: string;
  subtitle?: string;
  tagline: string;
  priceMin: string | null;
  priceMax: string | null;
  delay: string;
  features: string[];
  objective?: string;
  result?: string;
}

const FORMULAS: Record<string, Formula[]> = {
  "site-simple": [
    {
      id: "pack-onconversion",
      label: "Le Site Simple",
      tagline:
        "On vous fait obtenir des patients en continu, avec un site prêt en 7 jours.",
      priceMin: "1 000",
      priceMax: null,
      delay: "7 jours",
      features: [
        "Une belle page qui rassure vos futurs patients",
        "Des mots clairs qui encouragent à prendre rendez-vous",
        "Vous êtes bien référencé sur Google",
        "Le site vous appartient (aucun abonnement)",
        "Satisfait ou remboursé 7 jours après la mise en ligne",
      ],
      objective: "Que vous soyez facilement trouvable sur internet.",
      result:
        "Plus de patients en toute simplicité.",
    },
  ],
  "site-complet": [
    {
      id: "pack-oncomplete",
      label: "Le Site Complet",
      tagline:
        "Vos futurs patients comprendront en quelques secondes comment vous pouvez les aider.",
      priceMin: "2 000",
      priceMax: null,
      delay: "2 semaines",
      features: [
        "Jusqu'à 8 pages (Accueil, Services, À propos, Contact…)",
        "Un blog pour être encore mieux vu par Google",
        "Une présentation adaptée à vos goûts",
        "Le site vous appartient (aucun abonnement)",
        "Satisfait ou remboursé 14 jours après la livraison finale",
      ],
      objective: "Présenter tout votre cabinet avec une image professionnelle.",
      result: "Un site complet qui donne confiance et apporte de nouveaux patients.",
    },
  ],
 /* "projet-custom": [
    {
      id: "pack-ontime",
      label: "Pack OnTime (Web App & Automatisation)",
      tagline:
        "Gagner +15 h/semaine pour vos équipes avec un outil sur-mesure livré en ~30 jours. Un outil qui fera gagner du temps à vos équipes et vous fera gagner de l'argent à vous.",
      priceMin: null,
      priceMax: null,
      delay: "~30 jours",
      features: [
        "Web app sur-mesure (SaaS interne, dashboard, outil métier)",
        "Automatisation des flux (contrats, stocks, emails, facturation…)",
        "UI pensée pour l'adoption immédiate par les équipes",
        "Backend sécurisé et scalable",
        "Documentation & transfert de compétences",
        "Propriété complète du code",
        "Itérations gratuites jusqu'à l'objectif de productivité validé ensemble",
      ],
      objective: "Éliminer les tâches répétitives et centraliser les données pour décider plus vite.",
      result: "Gain de temps massif, moins d'erreurs, outil aligné sur votre façon de travailler.",
    },
  ],*/
};

/* ── Helpers ── */

function formatPrice(min: string | null, max: string | null) {
  if (!min && !max) return "Sur devis";
  if (min && max) return `${min} € – ${max} € HT`;
  return `${min} € HT`;
}


/* ── Component ── */

const CONTACT_FIELDS = [
  { name: "lastName", label: "Nom", type: "text", required: true, half: true },
  { name: "firstName", label: "Prénom", type: "text", required: true, half: true },
  { name: "email", label: "Email", type: "email", required: true, half: true },
  { name: "phone", label: "Téléphone", type: "tel", required: true, half: true },
  { name: "company", label: "Entreprise (facultatif)", type: "text", required: false, half: true },
  { name: "city", label: "Ville / Localisation", type: "text", required: true, half: true },
  { name: "details", label: "Un détail à ajouter ? (optionnel)", type: "textarea", required: false, half: false },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [formulaId, setFormulaId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const { ref: sectionRef, visible } = useVisible<HTMLElement>(0.1);

  const formulas = projectType ? FORMULAS[projectType] ?? [] : [];
  const selectedFormula = formulas.find((f) => f.id === formulaId) ?? null;

  const goTo = (s: number) => setStep(s);

  const handleProjectSelect = (id: string) => {
    setProjectType(id);
    setFormulaId(null);
    setTimeout(() => goTo(1), 150);
  };

  const handleFormulaSelect = (id: string) => {
    setFormulaId(id);
    setTimeout(() => goTo(2), 150);
  };

  const scrollToQuiz = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleBack = () => {
    if (step === 2) { setFormulaId(null); goTo(1); }
    else if (step === 1) { setProjectType(null); goTo(0); }
    scrollToQuiz();
  };

  const handleRestart = () => {
    setStep(0);
    setProjectType(null);
    setFormulaId(null);
    setSubmitStatus("idle");
    setSubmitMessage("");
    scrollToQuiz();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFormula || !projectType) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      lastName: formData.get("lastName") as string,
      firstName: formData.get("firstName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      city: formData.get("city") as string,
      details: formData.get("details") as string,
      projectType: PROJECT_TYPES.find((p) => p.id === projectType)?.label || projectType,
      formulaLabel: selectedFormula.label,
      formulaPrice: formatPrice(selectedFormula.priceMin, selectedFormula.priceMax),
      formulaDelay: selectedFormula.delay,
      formulaFeatures: selectedFormula.features,
    };

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage("Votre demande a été envoyée ! Nous vous répondrons sous 24h.");
        // Reset form
        e.currentTarget.reset();
      } else {
        setSubmitStatus("error");
        setSubmitMessage(result.error || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setSubmitStatus("error");
      setSubmitMessage("Impossible d'envoyer le formulaire. Réessayez plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = ["Projet", "Formule", "Résumé"];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-bg py-24 lg:py-32"
      aria-label="Configurateur : quel est votre projet ?"
    >
      <div
        className="mx-auto max-w-[880px] px-6"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 700ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* ── Section badge ── */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-border bg-white px-4 py-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-blue">
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs font-medium text-gray-text tracking-wide">Configurateur</span>
          </div>
        </div>

        {/* ── Progress stepper ── */}
        <div className="mb-12 flex items-center justify-center gap-2 sm:gap-3">
          {stepLabels.map((label, s) => (
            <div key={label} className="flex items-center gap-2 sm:gap-3">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                    s < step
                      ? "bg-blue text-white shadow-[0_4px_12px_-2px_rgba(6,39,131,0.4)]"
                      : s === step
                        ? "bg-blue text-white shadow-[0_4px_12px_-2px_rgba(6,39,131,0.4)]"
                        : "bg-white border border-gray-border text-gray-text"
                  }`}
                >
                  {s < step ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    s + 1
                  )}
                </div>
                <span className={`text-[10px] font-medium hidden sm:block transition-colors duration-300 ${s <= step ? "text-blue" : "text-gray-text"}`}>
                  {label}
                </span>
              </div>
              {s < 2 && (
                <div className="relative h-[2px] w-10 sm:w-16 bg-gray-border/40 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-blue rounded-full transition-all duration-500 ease-out"
                    style={{ width: s < step ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Steps ── */}
        <div className="relative overflow-hidden">

          {/* ──── Step 0: Project type ──── */}
          <div
            style={{
              transform: step === 0 ? "translateX(0)" : "translateX(-100%)",
              opacity: step === 0 ? 1 : 0,
              position: step === 0 ? "relative" : "absolute",
              top: 0, left: 0, right: 0,
              transition: step === 0
                ? "opacity 350ms cubic-bezier(0.16,1,0.3,1) 80ms, transform 400ms cubic-bezier(0.16,1,0.3,1)"
                : "opacity 150ms ease, transform 400ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <h2 className="mb-2 text-center font-display text-2xl font-bold text-[#111111] sm:text-3xl">
              Quel est votre projet ?
            </h2>
            <p className="mb-10 text-center text-gray-text">
              Sélectionnez le type de projet qui vous correspond.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PROJECT_TYPES.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => handleProjectSelect(p.id)}
                  className={`group flex items-center gap-3 rounded-2xl border-[1.5px] p-4 sm:p-5 text-left transition-all duration-250 cursor-pointer ${
                    projectType === p.id
                      ? "border-blue bg-blue-light shadow-[0_8px_24px_-6px_rgba(6,39,131,0.2)]"
                      : "border-gray-border/40 bg-white hover:border-blue/40 hover:bg-blue-light/30 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(6,39,131,0.12)]"
                  }`}
                  style={{
                    transitionDelay: step === 0 ? `${i * 50}ms` : "0ms",
                  }}
                >
                  {/* Icon */}
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-250 ${
                    projectType === p.id
                      ? "bg-blue text-white shadow-[0_6px_16px_-3px_rgba(6,39,131,0.35)]"
                      : "bg-blue-light text-gray-text group-hover:bg-blue group-hover:text-white group-hover:shadow-[0_6px_16px_-3px_rgba(6,39,131,0.35)]"
                  }`}>
                    {p.icon}
                  </div>
                  <p className="flex-1 min-w-0 truncate text-sm sm:text-base">
                    <span className="font-display font-semibold text-[#111111]">{p.label}</span>
                    <span className="text-gray-text"> · {p.desc}</span>
                  </p>
                  {/* Arrow */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-gray-text/30 transition-all duration-250 group-hover:text-blue group-hover:translate-x-0.5">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* ──── Step 1: Formula selection ──── */}
          <div
            style={{
              transform: step === 1 ? "translateX(0)" : step > 1 ? "translateX(-100%)" : "translateX(100%)",
              opacity: step === 1 ? 1 : 0,
              position: step === 1 ? "relative" : "absolute",
              top: 0, left: 0, right: 0,
              transition: step === 1
                ? "opacity 350ms cubic-bezier(0.16,1,0.3,1) 80ms, transform 400ms cubic-bezier(0.16,1,0.3,1)"
                : "opacity 150ms ease, transform 400ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <h2 className="mb-2 text-center font-display text-2xl font-bold text-[#111111] sm:text-3xl">
              Choisissez votre formule
            </h2>
            <p className="mb-10 text-center text-gray-text">
              {PROJECT_TYPES.find((p) => p.id === projectType)?.label} — Sélectionnez une offre
            </p>
            <div className="flex flex-col gap-3">
              {formulas.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => handleFormulaSelect(f.id)}
                  className={`group flex flex-col gap-2 rounded-2xl border-[1.5px] p-6 text-left transition-all duration-250 cursor-pointer sm:flex-row sm:items-center sm:justify-between ${
                    formulaId === f.id
                      ? "border-blue bg-blue-light shadow-[0_8px_24px_-6px_rgba(6,39,131,0.2)]"
                      : "border-gray-border/40 bg-white hover:border-blue/40 hover:bg-blue-light/30 hover:shadow-[0_8px_20px_-6px_rgba(6,39,131,0.1)]"
                  }`}
                  style={{
                    transitionDelay: step === 1 ? `${i * 40}ms` : "0ms",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-base font-semibold text-[#111111]">
                      {f.label}
                    </div>
                    {f.subtitle && (
                      <div className="text-xs text-blue font-medium mt-0.5">{f.subtitle}</div>
                    )}
                    <div className="mt-1 text-sm text-gray-text line-clamp-2">{f.tagline}</div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 sm:text-right">
                    <div>
                      <div className="font-display text-base font-bold text-[#111111]">
                        {formatPrice(f.priceMin, f.priceMax)}
                      </div>
                      <div className="text-[11px] text-gray-text">{f.delay}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-text/30 group-hover:text-blue group-hover:translate-x-0.5 transition-all duration-250 shrink-0">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={handleBack}
              className="mt-8 flex items-center gap-1.5 text-sm font-medium text-gray-text transition-all duration-200 hover:text-blue hover:gap-2 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 hover:-translate-x-0.5">
                <path d="M9 11l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Retour
            </button>
          </div>

          {/* ──── Step 2: Detail ──── */}
          <div
            style={{
              transform: step === 2 ? "translateX(0)" : "translateX(100%)",
              opacity: step === 2 ? 1 : 0,
              position: step === 2 ? "relative" : "absolute",
              top: 0, left: 0, right: 0,
              transition: step === 2
                ? "opacity 350ms cubic-bezier(0.16,1,0.3,1) 80ms, transform 400ms cubic-bezier(0.16,1,0.3,1)"
                : "opacity 150ms ease, transform 400ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {selectedFormula && (
              <div className="rounded-2xl border border-gray-border/50 bg-white shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] overflow-hidden">
                {/* Header */}
                <div className="relative bg-[#111111] px-6 py-7 sm:px-8 overflow-hidden">
                  {/* Subtle glow accent */}
                  <div className="pointer-events-none absolute -top-20 -right-20 h-[200px] w-[200px] rounded-full opacity-15 blur-[60px]" style={{ background: "#062783" }} aria-hidden="true" />
                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue/20 text-blue">
                          {PROJECT_TYPES.find((p) => p.id === projectType)?.icon}
                        </div>
                        <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                          {selectedFormula.label}
                        </h3>
                      </div>
                      {selectedFormula.subtitle && (
                        <div className="text-sm text-white/50 ml-11">{selectedFormula.subtitle}</div>
                      )}
                    </div>
                    <div className="sm:text-right">
                      <div className="font-display text-2xl font-bold text-white">
                        {formatPrice(selectedFormula.priceMin, selectedFormula.priceMax)}
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 mt-1.5">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-blue">
                          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                          <path d="M6 3v3l2 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                        </svg>
                        <span className="text-[11px] text-white/70 font-medium">{selectedFormula.delay}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 py-7 sm:px-8">
                  {selectedFormula.objective && (
                    <div className="mb-7 flex items-start gap-3 rounded-xl bg-blue-light/50 border border-blue/10 px-5 py-4">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5 shrink-0 text-blue">
                        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
                        <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.2" />
                        <circle cx="9" cy="9" r="1" fill="currentColor" />
                      </svg>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-blue mb-1">
                          Objectif
                        </div>
                        <p className="text-sm text-[#111111] font-medium leading-relaxed">
                          {selectedFormula.objective}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue">
                      <path d="M4 8.5l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                      Ce qui est inclus
                    </span>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {selectedFormula.features.map((feat, i) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-blue-light/30"
                        style={{
                          opacity: step === 2 ? 1 : 0,
                          transform: step === 2 ? "translateY(0)" : "translateY(8px)",
                          transition: `all 400ms cubic-bezier(0.16,1,0.3,1) ${200 + i * 40}ms`,
                        }}
                      >
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue/10">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-blue">
                            <path d="M4 8.5l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-text leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {selectedFormula.result && (
                    <div className="mt-7 flex items-start gap-3 rounded-xl bg-gray-bg/80 border border-gray-border/30 px-5 py-4">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-blue">
                        <path d="M2 13l3-8 3 4 2-3 4 7H2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-text/50 mb-1">
                          Résultat attendu
                        </div>
                        <p className="text-sm text-gray-text leading-relaxed">
                          {selectedFormula.result}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Separator + form */}
                  <div className="mt-8 border-t border-gray-border/30 pt-7">
                    <div className="flex items-center justify-between mb-7">
                      <div className="text-sm text-gray-text">
                        Total estimé
                      </div>
                      <div className="font-display text-lg font-bold text-[#111111]">
                        {formatPrice(selectedFormula.priceMin, selectedFormula.priceMax)}
                      </div>
                    </div>

                    {/* Contact form */}
                    <div className="rounded-2xl bg-gray-bg/60 border border-gray-border/30 p-6 sm:p-7">
                      <div className="flex items-center gap-2.5 mb-5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-light text-blue">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M2 5.5l6 3.5 6-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <h4 className="font-display text-base font-semibold text-[#111111]">
                          Recevoir mon devis par mail
                        </h4>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {CONTACT_FIELDS.map((f) => (
                            <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
                              <label
                                htmlFor={`quiz-${f.name}`}
                                className="block text-xs font-medium text-[#111111] mb-1.5"
                              >
                                {f.label}
                              </label>
                              {f.type === "textarea" ? (
                                <textarea
                                  id={`quiz-${f.name}`}
                                  name={f.name}
                                  rows={3}
                                  required={f.required}
                                  className="w-full rounded-xl border border-gray-border/60 bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-gray-text/40 transition-all duration-200 focus:border-blue focus:shadow-[0_0_0_3px_rgba(6,39,131,0.1)] focus:outline-none"
                                  placeholder={f.label.replace(" (facultatif)", "").replace(" (optionnel)", "").replace(" ?", "")}
                                />
                              ) : (
                                <input
                                  id={`quiz-${f.name}`}
                                  name={f.name}
                                  type={f.type}
                                  required={f.required}
                                  className="w-full rounded-xl border border-gray-border/60 bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-gray-text/40 transition-all duration-200 focus:border-blue focus:shadow-[0_0_0_3px_rgba(6,39,131,0.1)] focus:outline-none"
                                  placeholder={f.label.replace(" (facultatif)", "").replace(" (optionnel)", "")}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                        <ButtonBrand type="submit" className="mt-6" disabled={isSubmitting}>
                          {isSubmitting ? "Envoi en cours..." : "Recevoir mon devis par mail"}
                        </ButtonBrand>

                        {/* Message de feedback */}
                        {submitStatus !== "idle" && (
                          <div
                            className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                              submitStatus === "success"
                                ? "bg-green-50 text-green-800 border border-green-200"
                                : "bg-red-50 text-red-800 border border-red-200"
                            }`}
                          >
                            {submitMessage}
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-8 flex items-center gap-5">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-text transition-all duration-200 hover:text-blue hover:gap-2 cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 11l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Retour
              </button>
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-text transition-all duration-200 hover:text-blue cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7a5 5 0 019.5-1.5M12 7a5 5 0 01-9.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11.5 2v3.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Recommencer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
