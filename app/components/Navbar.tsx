"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/app/lib/constants";

/* ═══════════════════════════════════════════════════════════
   NAVBAR — Floating Pill (DA Ikovaline)
   Desktop: pill centered, scroll down contracts, scroll up expands
   Mobile: transparent bar, logo left, burger right, fullscreen menu
   ═══════════════════════════════════════════════════════════ */

const DESKTOP_LINKS = NAV_LINKS.filter((l) => l.href !== "/contact");

export default function Navbar() {
  const [contracted, setContracted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const SCROLL_THRESHOLD = 20; // Seuil pour ignorer micro-scrolls

    const updateNavbar = () => {
      const y = window.scrollY;
      const delta = Math.abs(y - lastScrollY.current);

      // Ignorer les petits changements
      if (delta < SCROLL_THRESHOLD) {
        ticking.current = false;
        return;
      }

      // Vérifier la direction
      if (y > 50 && y > lastScrollY.current) {
        setContracted(true);
      } else if (y < lastScrollY.current) {
        setContracted(false);
      }

      lastScrollY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setExpanded(true), 300);
    return () => clearTimeout(t);
  }, []);

  const showFull = !contracted;

  return (
    <>
      {/* ════════════════════════════════════════════
          MOBILE NAVBAR — transparent, full-width
          ════════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex h-16 items-center justify-between px-5">
          {/* Logo icon */}
          <Link
            href="/"
            aria-label="Shift Agency — Accueil"
            className="select-none cursor-pointer"
          >
            <img src="/logo.svg" alt="Shift Agency" className="h-10 w-10" />
          </Link>

          {/* Burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex flex-col items-center justify-center w-10 h-10 cursor-pointer"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`h-[2px] w-6 rounded-full transition-all duration-300 ${
                mobileOpen
                  ? "translate-y-[1px] rotate-45 bg-[#111111]"
                  : "bg-[#111111] -translate-y-1"
              }`}
            />
            <span
              className={`h-[2px] w-6 rounded-full transition-all duration-300 ${
                mobileOpen
                  ? "-translate-y-[1px] -rotate-45 bg-[#111111]"
                  : "bg-[#111111] translate-y-1"
              }`}
            />
          </button>
        </div>

        {/* Mobile fullscreen menu */}
        <div
          className={`fixed inset-0 bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col justify-center items-start h-full px-8 gap-6">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-display font-semibold text-[#111111] cursor-pointer transition-all duration-300"
                style={{
                  transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#111111] px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 cursor-pointer"
              style={{
                transitionDelay: mobileOpen ? `${NAV_LINKS.length * 60}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
              }}
            >
              Démarrer un projet
            </Link>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          DESKTOP NAVBAR — floating pill
          ════════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center px-4 pt-4">
        <nav
          aria-label="Navigation principale"
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
            contracted
              ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/[0.04]"
              : "bg-white shadow-md shadow-black/[0.06]"
          } ${
            expanded
              ? showFull
                ? "w-full max-w-[780px] rounded-full"
                : "w-full max-w-[380px] rounded-full"
              : "w-[180px] rounded-full"
          }`}
          style={{
            border: "1px solid rgba(229, 231, 235, 0.6)",
          }}
        >
          <div
            className={`flex h-14 items-center transition-opacity duration-500 ${
              expanded ? "opacity-100" : "opacity-0"
            } ${showFull ? "justify-between px-6" : "justify-between px-3"}`}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="Shift Agency — Accueil"
              className="relative select-none shrink-0 cursor-pointer"
            >
              <img
                src="/arthurdev.svg"
                alt="Shift Agency"
                className={`h-10 w-auto transition-all duration-500 ${
                  showFull ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
              <img
                src="/logo.svg"
                alt="Ikovaline"
                className={`absolute top-1/2 left-0 -translate-y-1/2 h-14 w-14 transition-all duration-500 ${
                  !showFull ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
            </Link>

            {/* Nav links (full state) */}
            <ul
              className={`flex items-center gap-7 absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                showFull
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {DESKTOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative text-[13px] font-medium font-display text-gray-text transition-colors duration-200 hover:text-[#111111] cursor-pointer whitespace-nowrap after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-blue after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* "Prendre un appel" (contracted state) */}
            <div
              className={`flex absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                !showFull
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <Link
                href="/contact"
                className="inline-flex items-center rounded-[8px] bg-gray-bg px-4 py-1.5 text-[12px] font-medium font-display text-[#111111] transition-all duration-200 hover:bg-gray-border/50 cursor-pointer whitespace-nowrap"
              >
                Prendre un appel
              </Link>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className={`inline-flex items-center bg-[#111111] font-medium font-display text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 cursor-pointer whitespace-nowrap ${
                showFull
                  ? "rounded-full px-5 py-2 text-[13px] hover:bg-[#111111]/90"
                  : "rounded-full px-4 py-1.5 text-[12px] hover:bg-[#111111]/90"
              }`}
              aria-label="Démarrer un projet"
            >
              {showFull ? "Démarrer un projet" : "Contact"}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
