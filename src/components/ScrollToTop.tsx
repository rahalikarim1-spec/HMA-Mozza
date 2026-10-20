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

  // A link to the page you are already on has no route change: scroll to the top for it too (unless it has a #hash).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const u = new URL(a.href, window.location.href);
      if (u.origin === window.location.origin && u.pathname === window.location.pathname && !u.hash && u.search === window.location.search) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }
    };
    // capture phase: Next <Link> calls preventDefault() in its own handler, which would make us bail out if we ran after it
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
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
