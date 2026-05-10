"use client";

import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

const base =
  "group inline-flex items-center gap-3 rounded-[10px] bg-[#111111] px-8 py-4 text-[15px] font-medium text-white transition-all duration-200 hover:bg-[#111111]/90";

const boxShadow = "-82px 54px 27px 0px rgba(0,0,0,.01),-52px 35px 25px 0px rgba(0,0,0,.04),-29px 19px 21px 0px rgba(0,0,0,.15),-13px 9px 16px 0px rgba(0,0,0,.25),-3px 2px 9px 0px rgba(0,0,0,.29)";

function Arrow() {
  return (
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
  );
}

type ButtonBrandProps = {
  href?: string;
  arrow?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
} & Omit<
  ComponentPropsWithoutRef<"a"> &
    ComponentPropsWithoutRef<"button">,
  "href" | "className" | "style" | "children"
>;

export default function ButtonBrand({
  href,
  arrow = true,
  className = "",
  style,
  children,
  ...rest
}: ButtonBrandProps) {
  const cls = `${base} ${className}`.trim();
  const mergedStyle = { boxShadow, ...style };

  // Anchor link (#contact, etc.)
  if (href?.startsWith("#")) {
    return (
      <a href={href} className={cls} style={mergedStyle} {...rest}>
        {children}
        {arrow && <Arrow />}
      </a>
    );
  }

  if (href && /^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        style={mergedStyle}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
        {arrow && <Arrow />}
      </a>
    );
  }

  // Internal navigation (/contact, etc.)
  if (href) {
    return (
      <Link href={href} className={cls} style={mergedStyle} {...rest}>
        {children}
        {arrow && <Arrow />}
      </Link>
    );
  }

  // Default: <button> (forms)
  return (
    <button className={cls} style={mergedStyle} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
