"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════
   TESTIMONIALS — Awards Strip + Double Marquee + Trust Bar
   ═══════════════════════════════════════════════════════════ */

/* ── Stats data ── */

const STATS = [
  {
    value: 5,
    suffix: "★",
    label: "Note Google",
    description: "Avis clients",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    value: 7,
    suffix: "j",
    label: "Livraison rapide",
    description: "Dès 1 000€",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    value: 2,
    suffix: "h",
    label: "Réponse WhatsApp",
    description: "En moyenne",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

/* ── Data ── */

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const ROW1_REVIEWS: Review[] = [
  {
    name: "Fey Taieb",
    role: "Client Shift Agency",
    text: "Arthur est professionnel, réactif. Les landing pages sont impeccables, aussi bien sur le design que sur la vitesse de chargement. Je recommande sans hésiter si vous cherchez un site efficace.",
    rating: 5,
  },
  {
    name: "Sophie Mercier",
    role: "Coach en développement personnel",
    text: "Site livré en 6 jours comme promis. Le design est moderne et reflète parfaitement mon image de marque. Mes clients adorent la simplicité de navigation.",
    rating: 5,
  },
  {
    name: "Elio Charnay",
    role: "Client Shift Agency",
    text: "Arthur a su répondre à mes attentes en réalisant un site selon mes besoins qui m'a permis d'améliorer ma présence en ligne. Merci !",
    rating: 5,
  },
  {
    name: "Lucas Fontaine",
    role: "Photographe professionnel",
    text: "J'avais besoin d'un portfolio rapide pour présenter mon travail. Arthur a compris ma vision dès le premier échange. Le résultat dépasse mes attentes.",
    rating: 5,
  },
  {
    name: "Michael Clement",
    role: "Client Shift Agency",
    text: "Arthur m'a créé mon site Web. Tout s'est très bien passé, il explique très bien les choses, je recommande. Très rapide et très efficace.",
    rating: 5,
  },
  {
    name: "Marie Dubois",
    role: "Boulangère artisanale",
    text: "Mon site vitrine est exactement ce dont j'avais besoin pour attirer de nouveaux clients. Simple, élégant et optimisé pour mobile. Parfait !",
    rating: 5,
  },
  {
    name: "Thomas Lefebvre",
    role: "Consultant en marketing",
    text: "La qualité du code et l'attention aux détails sont remarquables. Mon site charge en moins d'une seconde. C'est du travail de pro.",
    rating: 5,
  },
];

const ROW2_REVIEWS: Review[] = [
  {
    name: "Julie Martin",
    role: "Propriétaire salon de coiffure",
    text: "Depuis que j'ai mon site, j'ai 40% de réservations en plus. Arthur a su mettre en avant mes prestations de manière claire et attractive.",
    rating: 5,
  },
  {
    name: "Alexandre Petit",
    role: "Architecte d'intérieur",
    text: "Le site reflète parfaitement mon univers créatif. Les photos de mes projets sont mises en valeur, et le formulaire de contact fonctionne à merveille.",
    rating: 5,
  },
  {
    name: "Camille Rousseau",
    role: "Naturopathe",
    text: "Communication fluide, délais respectés, résultat au-delà de mes attentes. Arthur a vraiment écouté mes besoins et y a répondu avec précision.",
    rating: 5,
  },
  {
    name: "David Laurent",
    role: "Plombier-chauffagiste",
    text: "J'avais besoin d'un site simple mais efficace. Mission accomplie ! Mes clients me trouvent facilement maintenant et le téléphone sonne plus souvent.",
    rating: 5,
  },
  {
    name: "Emma Bernard",
    role: "Professeur de yoga",
    text: "Mon site est à mon image : zen, épuré et fonctionnel. Les inscriptions aux cours se font directement en ligne. Un vrai gain de temps !",
    rating: 5,
  },
  {
    name: "Nicolas Moreau",
    role: "Agent immobilier",
    text: "Arthur a créé un site professionnel qui inspire confiance à mes clients. Le design moderne et les fonctionnalités sont parfaitement adaptés à mon activité.",
    rating: 5,
  },
  {
    name: "Laura Girard",
    role: "Chef à domicile",
    text: "Site magnifique qui met en valeur mes prestations culinaires. Les photos rendent super bien et j'ai déjà reçu plusieurs demandes de devis.",
    rating: 5,
  },
];

/* ── Hooks & Helpers ── */

function useCountUp(target: number, duration: number = 2000, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ── Sub-components ── */

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} étoiles sur 5`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={i < count ? "#FBBF24" : "#E5E7EB"}
          aria-hidden="true"
        >
          <path d="M8 0l2.47 4.94L16 5.76l-4 3.85L12.94 16 8 13.27 3.06 16 4 9.61 0 5.76l5.53-.82L8 0z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Laurel wreath SVGs (extracted from reference site) ── */
function LeftLaurel() {
  return (
    <svg width="24" height="48" viewBox="0 24 24 48" fill="none" aria-hidden="true">
      {/* Left laurel paths from reference */}
      <path d="M17.833 6.52406C18.843 4.95824 19.2795 3.5 19.2795 3.5C19.2795 3.5 17.9555 3.93668 16.3291 5.20629C14.8419 6.52793 13.1199 8.82937 13.2412 11.8405C15.465 10.0899 16.9327 8.21529 17.833 6.52406Z" fill="#062783" opacity="0.7" transform="translate(-4, 0)" />
      <path d="M9.34303 23.9184L9.25675 25.1484C9.24132 25.4104 9.42371 25.6427 9.69 25.6492C9.94609 25.6699 10.1774 25.4574 10.1916 25.2043L10.2787 23.9779C12.1054 22.8964 13.3582 21.3533 14.147 19.9774C14.5444 19.2148 14.9012 18.5279 15.1574 18.035C15.3647 17.5118 15.4997 17.1948 15.4997 17.1948C15.4997 17.1948 14.3118 17.3077 12.851 18.2425C11.8173 19.0158 10.4278 20.4269 9.91322 22.6747C9.90988 22.6742 9.90684 22.6716 9.90285 22.6709C9.91958 20.3528 9.63436 18.509 9.0439 17.0427C8.50487 15.3108 7.72784 14.2409 7.72784 14.2409C7.72784 14.2409 7.60214 14.6647 7.40181 15.34C7.22965 16.0283 7.00627 16.9712 7.07237 18.074C7.08696 20.0712 7.59842 22.4142 9.34303 23.9184Z" fill="#062783" opacity="0.7" transform="translate(-4, 0)" />
      <path d="M10.485 17.5511C10.3906 17.807 10.5377 18.0722 10.7935 18.1525C11.0348 18.229 11.2871 18.0753 11.3793 17.8343L11.7728 16.7021C13.7634 16.1164 15.061 14.8244 16.1877 13.766C16.7713 13.1615 17.1901 12.5603 17.4694 12.1161C17.7749 11.6839 17.9752 11.4303 17.9752 11.4303C17.9752 11.4303 16.7444 11.2128 15.329 11.8753C14.1509 12.3797 12.6685 13.4037 11.7009 15.3234C11.6911 15.3204 11.6827 15.3169 11.6735 15.3147C12.1619 13.1934 12.1779 11.4318 11.9789 9.97406C11.671 8.17496 11.2501 7.06487 11.2501 7.06487C11.0876 6.90791 8.11217 12.7222 10.8595 16.4559L10.485 17.5511Z" fill="#062783" opacity="0.7" transform="translate(-4, 0)" />
      <path d="M13.2219 39.1394C13.5677 39.6319 14.2094 40.5271 14.259 40.4799C14.454 40.6768 14.7617 40.6985 14.9441 40.5188C15.1253 40.3375 15.1386 40.0378 14.9563 39.8575C14.9063 39.8928 14.2627 39.0015 13.9382 38.5464C15.6164 33.4031 14.5777 29.2934 14.7614 29.0176C14.7614 29.0176 13.4265 29.7329 12.6973 31.3755C11.9194 32.81 11.495 35.4729 13.1283 38.1442C13.1176 38.1521 13.1062 38.1558 13.0961 38.1638C13.0788 38.1755 13.0699 38.1948 13.0557 38.2084C11.1529 35.7267 9.52959 33.9302 8.01497 32.5248C6.22359 30.9851 5.01431 30.1985 5.01537 30.1911C4.91654 30.1526 5.27295 32.5025 6.71196 35.0005C8.037 37.2838 10.5249 39.2416 13.2219 39.1394Z" fill="#062783" opacity="0.7" transform="translate(-4, 0)" />
      <path d="M19.0821 44.5691L22.1144 46.4319C22.3445 46.5827 22.6426 46.4664 22.7489 46.2416C22.8597 45.9898 22.7474 45.7297 22.531 45.588L19.5398 43.7424C19.4088 40.9 18.6277 38.5887 17.9632 36.9621C17.3454 35.1562 16.6059 33.9949 16.657 33.9424C16.657 33.9424 15.6329 35.0995 15.4977 37.09C15.2042 38.963 16.0326 41.685 18.7817 43.733C18.7632 43.7528 18.7411 43.7692 18.7247 43.7935C15.8616 42.0003 13.3186 40.9958 11.3348 40.1189C9.04312 39.2881 7.47331 38.9469 7.47331 38.9469C7.47331 38.9469 7.686 39.5317 8.31497 40.3292C8.95559 41.0975 9.81615 42.1887 11.0018 43.0933C13.2858 44.8076 16.4653 45.8284 19.0821 44.5691Z" fill="#062783" opacity="0.7" transform="translate(-4, 0)" />
      <path d="M9.87681 31.9677L10.3368 33.623C10.4114 33.8845 10.6634 34.0396 10.9067 33.944C11.1507 33.8486 11.2879 33.5693 11.22 33.3179L10.779 31.726C12.4616 29.821 13.5346 27.7595 14.03 26.0783C14.7798 24.2425 14.791 22.7591 14.8754 22.7363C14.8754 22.7363 13.5197 23.0847 12.2013 24.4799C10.9767 25.6849 9.72011 27.9592 10.2042 31.0413C10.1704 31.0392 10.1373 31.0323 10.1038 31.0379C9.30188 28.0336 8.34672 25.7427 7.37689 24.0249C6.2386 22.111 5.15447 21.0197 5.15447 21.0197C5.15447 21.0197 5.02177 21.5406 5.0452 22.4114C5.04018 23.276 5.10003 24.4851 5.31091 25.7635C5.9132 28.2204 7.22994 31.0126 9.87681 31.9677Z" fill="#062783" opacity="0.7" transform="translate(-4, 0)" />
    </svg>
  );
}

function RightLaurel() {
  return (
    <svg width="24" height="48" viewBox="88 24 24 48" fill="none" aria-hidden="true">
      {/* Right laurel paths from reference */}
      <path d="M94.167 6.52406C93.157 4.95824 92.7205 3.5 92.7205 3.5C92.7205 3.5 94.0445 3.93668 95.6709 5.20629C97.1581 6.52793 98.8801 8.82937 98.7588 11.8405C96.535 10.0899 95.0673 8.21529 94.167 6.52406Z" fill="#062783" opacity="0.7" transform="translate(4, 0)" />
      <path d="M102.657 23.9184L102.743 25.1484C102.759 25.4104 102.576 25.6427 102.31 25.6492C102.054 25.6699 101.823 25.4574 101.808 25.2043L101.721 23.9779C99.8946 22.8964 98.6418 21.3533 97.853 19.9774C97.4556 19.2148 97.0988 18.5279 96.8426 18.035C96.6353 17.5118 96.5003 17.1948 96.5003 17.1948C96.5003 17.1948 97.6882 17.3077 99.149 18.2425C100.183 19.0158 101.572 20.4269 102.087 22.6747C102.09 22.6742 102.093 22.6716 102.097 22.6709C102.08 20.3528 102.366 18.509 102.956 17.0427C103.495 15.3108 104.272 14.2409 104.272 14.2409C104.272 14.2409 104.398 14.6647 104.598 15.34C104.77 16.0283 104.994 16.9712 104.928 18.074C104.913 20.0712 104.402 22.4142 102.657 23.9184Z" fill="#062783" opacity="0.7" transform="translate(4, 0)" />
      <path d="M101.515 17.5511C101.609 17.807 101.462 18.0722 101.207 18.1525C100.965 18.229 100.713 18.0753 100.621 17.8343L100.227 16.7021C98.2366 16.1164 96.939 14.8244 95.8123 13.766C95.2287 13.1615 94.8099 12.5603 94.5306 12.1161C94.2251 11.6839 94.0248 11.4303 94.0248 11.4303C94.0248 11.4303 95.2556 11.2128 96.671 11.8753C97.8491 12.3797 99.3315 13.4037 100.299 15.3234C100.309 15.3204 100.317 15.3169 100.326 15.3147C99.8381 13.1934 99.8221 11.4318 100.021 9.97406C100.329 8.17496 100.75 7.06487 100.75 7.06487C100.912 6.90791 103.888 12.7222 101.14 16.4559L101.515 17.5511Z" fill="#062783" opacity="0.7" transform="translate(4, 0)" />
      <path d="M98.7781 39.1394C98.4323 39.6319 97.7906 40.5271 97.741 40.4799C97.546 40.6768 97.2383 40.6985 97.0559 40.5188C96.8747 40.3375 96.8614 40.0378 97.0437 39.8575C97.0937 39.8928 97.7373 39.0015 98.0618 38.5464C96.3836 33.4031 97.4223 29.2934 97.2386 29.0176C97.2386 29.0176 98.5735 29.7329 99.3027 31.3755C100.081 32.81 100.505 35.4729 98.8717 38.1442C98.8824 38.1521 98.8938 38.1558 98.9039 38.1638C98.9212 38.1755 98.9301 38.1948 98.9443 38.2084C100.847 35.7267 102.47 33.9302 103.985 32.5248C105.776 30.9851 106.986 30.1985 106.985 30.1911C107.083 30.1526 106.727 32.5025 105.288 35.0005C103.963 37.2838 101.475 39.2416 98.7781 39.1394Z" fill="#062783" opacity="0.7" transform="translate(4, 0)" />
      <path d="M92.9179 44.5691L89.8856 46.4319C89.6555 46.5827 89.3574 46.4664 89.2511 46.2416C89.1403 45.9898 89.2526 45.7297 89.469 45.588L92.4602 43.7424C92.5912 40.9 93.3723 38.5887 94.0368 36.9621C94.6546 35.1562 95.3941 33.9949 95.343 33.9424C95.343 33.9424 96.3671 35.0995 96.5023 37.09C96.7958 38.963 95.9674 41.685 93.2183 43.733C93.2368 43.7528 93.2589 43.7692 93.2753 43.7935C96.1384 42.0003 98.6814 40.9958 100.665 40.1189C102.957 39.2881 104.527 38.9469 104.527 38.9469C104.527 38.9469 104.314 39.5317 103.685 40.3292C103.044 41.0975 102.184 42.1887 100.998 43.0933C98.7142 44.8076 95.5347 45.8284 92.9179 44.5691Z" fill="#062783" opacity="0.7" transform="translate(4, 0)" />
      <path d="M102.123 31.9677L101.663 33.623C101.589 33.8845 101.337 34.0396 101.093 33.944C100.849 33.8486 100.712 33.5693 100.78 33.3179L101.221 31.726C99.5384 29.821 98.4654 27.7595 97.97 26.0783C97.2202 24.2425 97.209 22.7591 97.1246 22.7363C97.1246 22.7363 98.4803 23.0847 99.7987 24.4799C101.023 25.6849 102.28 27.9592 101.796 31.0413C101.83 31.0392 101.863 31.0323 101.896 31.0379C102.698 28.0336 103.653 25.7427 104.623 24.0249C105.761 22.111 106.846 21.0197 106.846 21.0197C106.846 21.0197 106.978 21.5406 106.955 22.4114C106.96 23.276 106.9 24.4851 106.689 25.7635C106.087 28.2204 104.77 31.0126 102.123 31.9677Z" fill="#062783" opacity="0.7" transform="translate(4, 0)" />
    </svg>
  );
}

/* ── Stat circle (screenshot style, site DA colors) ── */
function StatCircle({
  stat,
  started,
}: {
  stat: (typeof STATS)[0];
  started: boolean;
}) {
  const count = useCountUp(stat.value, 2000, started);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Circle */}
      <div
        className="flex h-[170px] w-[170px] flex-col items-center justify-center rounded-full sm:h-[200px] sm:w-[200px] lg:h-[230px] lg:w-[230px]"
        style={{
          border: "1px solid rgba(6, 39, 131, 0.18)",
          background: "rgba(6, 39, 131, 0.03)",
        }}
      >
        {/* Laurels + Icon */}
        <div className="mb-3 flex items-center gap-0.5">
          <LeftLaurel />
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-light text-blue">
            {stat.icon}
          </div>
          <RightLaurel />
        </div>

        {/* Number */}
        <p className="font-display text-3xl font-black tracking-[-0.03em] text-[#111] sm:text-4xl">
          {count}
          <span className="text-[#111]">{stat.suffix}</span>
        </p>
      </div>

      {/* Label */}
      <div className="flex flex-col items-center text-center">
        <p className="text-sm font-semibold text-[#111] sm:text-[15px]">
          {stat.label}
        </p>
        <p className="mt-0.5 text-xs text-gray-text">
          {stat.description}
        </p>
      </div>
    </div>
  );
}

function MarqueeCard({ review }: { review: Review }) {
  return (
    <div className="w-[320px] shrink-0 rounded-2xl border border-gray-border/40 bg-white p-6 sm:w-[400px]">
      {/* Author + Stars */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue/10 font-display text-sm font-bold text-blue">
          {getInitials(review.name)}
        </div>
        <div>
          <p className="font-display text-[15px] font-semibold text-[#111]">
            {review.name}
          </p>
          <Stars count={review.rating} />
        </div>
      </div>

      {/* Role */}
      <p className="mt-4 text-[13px] font-medium text-gray-text">
        {review.role}
      </p>

      {/* Review text */}
      <p className="mt-2 text-sm leading-relaxed text-[#333]">{review.text}</p>
    </div>
  );
}

function MarqueeRow({
  reviews,
  direction,
}: {
  reviews: Review[];
  direction: "left" | "right";
}) {
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-5 ${direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
          } hover:[animation-play-state:paused]`}
      >
        {[...reviews, ...reviews].map((review, i) => (
          <MarqueeCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ── */

export default function Testimonials() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsObserved = useRef(false);

  /* Stats intersection observer (one-shot) */
  const observeStats = useCallback((node: HTMLElement | null) => {
    if (!node || statsObserved.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          statsObserved.current = true;
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(node);
  }, []);

  return (
    <section
      id="projets"
      className="relative overflow-hidden bg-gray-bg"
      aria-label="Témoignages clients"
    >
      {/* ── Stats circles strip ── */}
      <div className="relative w-full py-16 sm:py-20 lg:py-24">
        {/* Subtle decorative gradient behind circles */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(6,39,131,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          ref={observeStats}
          className="relative mx-auto grid max-w-[1000px] grid-cols-1 justify-items-center gap-10 px-6 sm:grid-cols-3 sm:gap-6 lg:gap-12"
        >
          {STATS.map((stat) => (
            <StatCircle key={stat.label} stat={stat} started={statsVisible} />
          ))}
        </div>
      </div>

      {/* ── Testimonials header ── */}
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-text">
              Social proof
            </p>
            <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-[#111111] sm:text-4xl">
              Ce qu&apos;en disent nos clients.
            </h2>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-gray-border px-5 py-2.5 text-sm font-medium text-[#111111] transition-colors hover:bg-white sm:self-auto"
          >
            WhatsApp — lancer mon projet
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
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
          </a>
        </div>
      </div>

      {/* ── Marquee Rows (full width) ── */}
      <div className="space-y-5">
        <MarqueeRow reviews={ROW1_REVIEWS} direction="left" />
        <MarqueeRow reviews={ROW2_REVIEWS} direction="right" />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 pb-24 lg:px-10 lg:pb-32">
        {/* ── Trust badges ── */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {[
            { label: "Google", count: "5★", color: "#4285F4" },
            { label: "WhatsApp", count: "Réponse 2h", color: "#25D366" },
            { label: "Paris", count: "France", color: "#0A66C2" },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2.5 rounded-full border border-gray-border/50 bg-white px-5 py-2.5"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: badge.color }}
              />
              <span className="text-xs font-semibold text-[#111]">
                {badge.label}
              </span>
              <span className="text-xs text-gray-text">{badge.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
