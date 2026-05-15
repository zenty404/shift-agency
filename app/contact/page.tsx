"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useVisible } from "@/app/hooks/useVisible";
import ButtonBrand from "@/app/components/ButtonBrand";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════
   CONTACT — Split layout: form + info
   ═══════════════════════════════════════════════════════════ */

const FIELDS = [
  { name: "lastName", label: "Nom", type: "text", half: true },
  { name: "firstName", label: "Prénom", type: "text", half: true },
  { name: "email", label: "Email", type: "email", half: true },
  { name: "company", label: "Nom du cabinet (facultatif)", type: "text", half: true },
  { name: "phone", label: "Téléphone", type: "tel", half: true },
  { name: "sector", label: "Spécialité", type: "text", half: true },
  { name: "message", label: "Message", type: "textarea", half: false },
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

export default function Contact() {
  const [loaded, setLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      sector: formData.get("sector") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage("Message envoyé ! Nous vous répondrons rapidement.");
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

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section
        className="relative flex flex-col items-center justify-start overflow-hidden px-3 sm:px-6 pt-24 pb-20 sm:pb-24 md:pb-28"
        aria-label="Contact Shift Agency"
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
                  Contact
                </span>
              </div>
            </div>
          </div>

          {/* H1 */}
          <h1 className="font-display leading-[1.08] tracking-[-0.02em]">
            <RevealLine delay={150} loaded={loaded}>
              <span className="text-[clamp(2.2rem,8vw,5rem)] font-bold text-[#0F172A]">
                On est là pour vous.
              </span>
            </RevealLine>
            <RevealLine delay={250} loaded={loaded}>
              <span className="text-[clamp(2.2rem,8vw,5rem)] font-bold text-[#0F172A]">
                Discutons de votre cabinet.
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
           Remplissez ce petit formulaire et on vous répond très vite. On peut aussi se parler directement par WhatsApp si vous préférez, c&apos;est très simple.
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </ButtonBrand>
            <Link
              href="mailto:contact@arthur-dev.eu"
              className="group inline-flex items-center gap-2 rounded-full border border-gray-border bg-white/60 backdrop-blur-sm px-7 py-3.5 text-[15px] font-medium text-[#0F172A] transition-all duration-300 hover:border-gray-border/80 hover:bg-white/80 hover:shadow-sm"
            >
              Email
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
            <MetricCard value="Rapide" label="Réponse WhatsApp" delay={900} loaded={loaded} />
            <MetricCard value="24h" label="Échange gratuit" delay={1000} loaded={loaded} />
            <MetricCard value="5★" label="Avis Google" delay={1100} loaded={loaded} />
            <MetricCard value="100%" label="Sans engagement" delay={1200} loaded={loaded} />
          </div>

        </div>
      </section>

      {/* ── Form section ── */}
      <section className="py-20 px-6 lg:py-28 bg-gray-bg/30">
        <div className="mx-auto max-w-[1100px] grid gap-16 lg:grid-cols-5">
          {/* ── Form (3/5) ── */}
          <form
            className="lg:col-span-3"
            onSubmit={handleSubmit}
          >
            <h2 className="font-display text-2xl font-bold text-[#111111] mb-6">
              Parlez-nous de vous et de ce dont vous avez besoin
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div
                  key={f.name}
                  className={f.half ? "" : "sm:col-span-2"}
                >
                  <label
                    htmlFor={f.name}
                    className="block text-xs font-medium text-[#111111] mb-1.5"
                  >
                    {f.label}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      id={f.name}
                      name={f.name}
                      rows={5}
                      className="w-full rounded-xl border border-gray-border bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-gray-text/40 transition-colors focus:border-blue focus:bg-white focus:outline-none"
                      placeholder={`Votre ${f.label.toLowerCase()}...`}
                    />
                  ) : (
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      className="w-full rounded-xl border border-gray-border bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-gray-text/40 transition-colors focus:border-blue focus:bg-white focus:outline-none"
                      placeholder={f.label}
                    />
                  )}
                </div>
              ))}
            </div>

<<<<<<< HEAD
            <ButtonBrand type="submit" className="mt-8" disabled={isSubmitting}>
              {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
=======
            <ButtonBrand type="submit" className="mt-8">
              Envoyer mon message
>>>>>>> 0a297ad (copywriting patient)
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

          {/* ── Contact info (2/5) ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* WhatsApp */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-text/60 mb-2">
                WhatsApp (on répond vite)
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-[#111111] hover:text-blue transition-colors"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </div>

            {/* Email */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-text/60 mb-2">
                Email
              </div>
              <a
                href="mailto:contact@arthur-dev.eu"
                className="text-base font-medium text-[#111111] hover:text-blue transition-colors"
              >
                contact@arthur-dev.eu
              </a>
            </div>

            {/* Location */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-text/60 mb-2">
                Localisation
              </div>
              <div className="text-sm text-gray-text leading-relaxed">
                <div className="font-medium text-[#111111]">Paris, France</div>
              </div>
            </div>

            {/* Reassurance */}
            <div className="rounded-xl border border-gray-border/40 bg-white p-5">
              <ul className="space-y-2">
                {[
                  "On vous répond doucement, sans vous presser",
                  "Devis gratuit, sans engagement",
                  "Pas d'abonnement — le site vous appartient",
                ].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-blue">
                        <path d="M3.5 7.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm text-gray-text">{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
