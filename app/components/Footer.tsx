"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   FOOTER — Corporate avec horloges multiples + grand logo
   ═══════════════════════════════════════════════════════════ */

const TIMEZONES = [
  { city: "Paris", offset: 1 }, // UTC+1
];

export default function Footer() {
  const [times, setTimes] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;

      const newTimes = TIMEZONES.map((tz) => {
        const localTime = new Date(utc + 3600000 * tz.offset);
        return localTime.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      });

      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-t-[3rem] bg-gray-bg">
      <footer
        className="relative w-full overflow-hidden rounded-t-[3rem] bg-white pb-0 pt-24 text-foreground"
        aria-label="Pied de page"
      >
        <div className="mx-auto w-full max-w-7xl overflow-hidden px-6 md:px-12">
          <div className="mb-12 flex flex-col items-start justify-between gap-16 md:mb-24 md:flex-row md:gap-8">
            {/* ─── Left: Logo + Info ─── */}
            <div className="flex max-w-sm flex-col gap-6 md:gap-8">
              <Link href="/" aria-label="Shift Agency — Accueil">
                <Image
                  alt="Shift Agency"
                  src="/shiftagency.svg"
                  width={160}
                  height={50}
                  className="h-10 w-auto object-contain md:h-12"
                />
              </Link>

              <div className="flex flex-col gap-1.5 text-sm font-light leading-relaxed text-gray-text">
                <p>Paris, France</p>
                <a
                  href="mailto:contact@arthur-dev.eu"
                  className="mt-2 text-foreground transition-colors hover:text-blue"
                >
                  contact@arthur-dev.eu
                </a>
                <a
                  href="https://wa.me/33652379343"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-blue"
                >
                  WhatsApp: 06 52 37 93 43
                </a>
              </div>

              <div className="mt-2 text-[10px] font-medium uppercase tracking-widest text-gray-text/60">
                <p>© 2026 Shift Agency™</p>
              </div>
            </div>

            {/* ─── Right: Clocks + Legal ─── */}
            <div className="flex w-full flex-col gap-10 text-left md:w-auto md:gap-12 md:text-right">
              {/* Horloges multiples */}
              <div className="flex max-sm:justify-between gap-8 md:gap-12">
                {TIMEZONES.map((tz, i) => (
                  <div
                    key={tz.city}
                    className="flex flex-col items-start gap-0.5 md:items-end"
                  >
                    <div className="font-sans text-2xl font-normal tabular-nums tracking-tight text-foreground md:text-3xl">
                      {times[i] || "--:--"}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-blue md:text-xs">
                      {tz.city}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legal links */}
              <div className="flex flex-col gap-3 text-xs font-medium text-gray-text md:items-end md:text-sm">
                <Link
                  href="/mentions-legales"
                  className="w-fit transition-colors hover:text-blue"
                >
                  Mentions Légales
                </Link>
                <Link
                  href="/cgv"
                  className="w-fit transition-colors hover:text-blue"
                >
                  CGV
                </Link>
                <Link
                  href="/politique-confidentialite"
                  className="w-fit transition-colors hover:text-blue"
                >
                  Confidentialité &amp; RGPD
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Grand logo "ARTHUR.DEV" coupé en bas ─── */}
        <div className="pointer-events-none flex w-full select-none items-end justify-center overflow-hidden pb-0 leading-none">
          <h2 className="relative translate-y-[35%] whitespace-nowrap font-display text-[13vw] font-black tracking-tighter text-foreground md:text-[14vw]">
            SHIFT AGENCY
          </h2>
        </div>
      </footer>
    </div>
  );
}
