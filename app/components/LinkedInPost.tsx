"use client";

import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   LINKEDIN POST EMBED COMPONENT

   Affiche un post LinkedIn via l'iframe embed officiel.
   Plus fiable que l'oEmbed API, charge directement
   depuis LinkedIn sans passer par une route API.
   ═══════════════════════════════════════════════════════════ */

interface LinkedInPostProps {
  /** URL src de l'iframe embed LinkedIn */
  embedSrc: string;
  /** Hauteur de l'iframe (fournie par LinkedIn) */
  height?: number;
  /** Délai d'apparition en ms pour l'animation d'entrée */
  delay?: number;
}

export default function LinkedInPost({
  embedSrc,
  height = 670,
  delay = 0,
}: LinkedInPostProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-gray-border/40 bg-white shadow-sm transition-all duration-300 hover:border-gray-border/60 hover:shadow-md"
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Loading skeleton — visible tant que l'iframe n'a pas fini de charger */}
      {!loaded && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-gray-bg/30"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-border border-t-blue" />
            <p className="text-sm text-gray-text">Chargement...</p>
          </div>
        </div>
      )}

      <iframe
        src={embedSrc}
        height={height}
        width="100%"
        frameBorder="0"
        allowFullScreen
        title="Post LinkedIn"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="block w-full transition-opacity duration-500"
        style={{
          opacity: loaded ? 1 : 0,
          maxWidth: "100%",
        }}
      />
    </div>
  );
}
