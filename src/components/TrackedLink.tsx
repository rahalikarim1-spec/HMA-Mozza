"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type TrackName, type TrackParams } from "@/lib/track";

interface Props {
  href: string;
  event?: TrackName;
  params?: TrackParams;
  className?: string;
  children: ReactNode;
  external?: boolean;
  ariaLabel?: string;
  ariaCurrent?: "page";
  lang?: string;
  /** set false for links to other-language pages (different root layout => full page load anyway) */
  prefetch?: boolean;
  /** marks a Reserve link so the reservation modal (Phase F) can intercept the click */
  dataReserve?: boolean;
}

/** Anchor that pushes a demo dataLayer event on click. */
export default function TrackedLink({
  href,
  event,
  params,
  className,
  children,
  external,
  ariaLabel,
  ariaCurrent,
  lang,
  prefetch,
  dataReserve,
}: Props) {
  const onClick = event && params ? () => track(event, params) : undefined;
  const common = {
    className,
    onClick,
    "aria-label": ariaLabel,
    "aria-current": ariaCurrent,
    lang,
    hrefLang: lang,
    ...(dataReserve ? { "data-reserve": "true" } : {}),
  };
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...common}>
        {children}
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link href={href} prefetch={prefetch} {...common}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...common}>
      {children}
    </a>
  );
}
