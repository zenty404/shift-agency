"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useVisible } from "@/app/hooks/useVisible";
import ButtonBrand from "@/app/components/ButtonBrand";
import CTACalendly from "@/app/components/CTACalendly";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import LinkedInPost from "@/app/components/LinkedInPost";
import { CATEGORIES, getPostsByAuthor } from "@/app/lib/linkedin-posts";
import type { LinkedInPostData } from "@/app/lib/linkedin-posts";

/* ═══════════════════════════════════════════════════════════
   RESSOURCES / LINKEDIN — Editorial layout with stats
   ═══════════════════════════════════════════════════════════ */


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

/* ── LinkedIn Carousel ── */
function LinkedInCarousel({ posts }: { posts: LinkedInPostData[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-carousel-card]")?.clientWidth ?? 340;
    el.scrollBy({
      left: direction === "right" ? cardWidth + 32 : -(cardWidth + 32),
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      {/* Navigation arrows */}
      <div className="flex items-center justify-end mb-6">
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Défiler vers la gauche"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-border/60 bg-white/80 backdrop-blur-sm text-[#0F172A] transition-all duration-200 hover:bg-white hover:border-gray-border hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:border-gray-border/60 disabled:hover:shadow-none"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Défiler vers la droite"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-border/60 bg-white/80 backdrop-blur-sm text-[#0F172A] transition-all duration-200 hover:bg-white hover:border-gray-border hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:border-gray-border/60 disabled:hover:shadow-none"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll container */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {posts.map((post, index) => (
            <div
              key={post.embedSrc}
              data-carousel-card
              className="flex-shrink-0 snap-start w-[85vw] sm:w-[360px] md:w-[340px]"
            >
              <LinkedInPost
                embedSrc={post.embedSrc}
                height={post.height}
                delay={index * 80}
              />
            </div>
          ))}
          {/* Spacer final pour que le dernier élément puisse se snap proprement */}
          <div className="flex-shrink-0 w-1" aria-hidden="true" />
        </div>

        {/* Gradient fade droite — indice visuel qu'il y a plus à voir */}
        {canScrollRight && (
          <div
            className="pointer-events-none absolute top-0 right-0 h-full w-16 sm:w-24"
            style={{
              background: "linear-gradient(to left, rgb(255 255 255 / 0.95), transparent)",
            }}
            aria-hidden="true"
          />
        )}

        {/* Gradient fade gauche */}
        {canScrollLeft && (
          <div
            className="pointer-events-none absolute top-0 left-0 h-full w-16 sm:w-24"
            style={{
              background: "linear-gradient(to right, rgb(255 255 255 / 0.95), transparent)",
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}

export default function RessourcesLinkedin() {
  const [loaded, setLoaded] = useState(false);
  const content = useVisible(0.1);
  const [activeCategory, setActiveCategory] = useState<string>("all");

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
        aria-label="Ressources LinkedIn Shift Agency"
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
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-border/50 bg-white/60 backdrop-blur-sm px-5 py-2.5 shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#0A66C2]">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-sm font-semibold text-[#0F172A]">
                  LinkedIn
                </span>
              </div>
            </div>
          </div>

          {/* H1 */}
          <h1 className="font-display leading-[1.08] tracking-[-0.02em]">
            <RevealLine delay={150} loaded={loaded}>
              <span className="text-[clamp(2.2rem,8vw,5rem)] font-bold text-[#0F172A]">
                Nos conseils gratuits.
              </span>
            </RevealLine>
            <RevealLine delay={250} loaded={loaded}>
              <span className="text-[clamp(2.2rem,8vw,5rem)] font-bold text-[#0F172A]">
                Pour vous aider au quotidien.
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
            Chaque jour, de nombreux praticiens suivent nos conseils sur
            LinkedIn. Retrouvez ici nos meilleures astuces pour faire connaître votre
            cabinet, avoir plus de patients, et améliorer votre site internet facilement.
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
            <ButtonBrand href="https://www.linkedin.com/in/arthur-lasnier-a5962435a" aria-label="Suivre sur LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Suivre sur LinkedIn
            </ButtonBrand>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-gray-border bg-white/60 backdrop-blur-sm px-7 py-3.5 text-[15px] font-medium text-[#0F172A] transition-all duration-300 hover:border-gray-border/80 hover:bg-white/80 hover:shadow-sm"
            >
              Retour à l&apos;accueil
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
            <MetricCard value="+500" label="Praticiens abonnés" delay={900} loaded={loaded} />
            <MetricCard value="10k+" label="Vues chaque semaine" delay={1000} loaded={loaded} />
            <MetricCard value="1 / jour" label="Conseil publié" delay={1100} loaded={loaded} />
            <MetricCard value="100%" label="Toujours gratuit" delay={1200} loaded={loaded} />
          </div>

        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-20 px-6 lg:py-28">
        <div ref={content.ref} className="mx-auto max-w-[1100px]">
          {/* Category filters */}
          <div
            className="flex flex-wrap gap-2 mb-12"
            style={{
              opacity: content.visible ? 1 : 0,
              transform: content.visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 700ms cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  cat.id === activeCategory
                    ? "bg-blue text-white"
                    : "bg-gray-bg text-gray-text hover:bg-gray-border/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Posts LinkedIn */}
          {(() => {
            const filteredPosts = getPostsByAuthor(activeCategory);

            if (filteredPosts.length === 0) {
              return (
                <div
                  className="rounded-2xl border border-gray-border/40 bg-gray-bg/30 p-12 text-center"
                  style={{
                    opacity: content.visible ? 1 : 0,
                    transform: content.visible ? "translateY(0)" : "translateY(30px)",
                    transition: "all 700ms cubic-bezier(0.4,0,0.2,1) 100ms",
                  }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-gray-text/30"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <div>
                      <p className="text-base font-medium text-[#0F172A] mb-2">
                        Aucun post pour le moment
                      </p>
                      <p className="text-sm text-gray-text mb-4">
                        Ajoutez vos URLs de posts LinkedIn dans{" "}
                        <code className="rounded bg-gray-border/30 px-2 py-0.5 font-mono text-xs">
                          app/lib/linkedin-posts.ts
                        </code>
                      </p>
                      <Link
                        href="https://www.linkedin.com/in/arthur-lasnier-a5962435a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue transition-colors hover:underline"
                      >
                        Suivre sur LinkedIn
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="transition-transform duration-200"
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
                </div>
              );
            }

            return (
              <div
                style={{
                  opacity: content.visible ? 1 : 0,
                  transform: content.visible ? "translateY(0)" : "translateY(30px)",
                  transition: "all 700ms cubic-bezier(0.4,0,0.2,1) 100ms",
                }}
              >
                <LinkedInCarousel posts={filteredPosts} />
              </div>
            );
          })()}
        </div> 
      </section>

    </div>
    <CTACalendly />
    </>
  );
}
