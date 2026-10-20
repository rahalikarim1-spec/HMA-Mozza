"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Safety net: every client-side navigation lands at the top, unless the URL has a #hash (menu anchors) or the user
 * went back/forward (browser restores its own position). Instant, never smooth.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => {
      popped.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (popped.current) {
      popped.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
