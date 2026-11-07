"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Gentle reveal on scroll. Always visible without JS and with reduced motion. */
export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) { setSeen(true); setArmed(true); return; }
    setArmed(true);
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const hidden = armed && !seen;
  return (
    <div ref={ref} className={`motion-safe:transition-all motion-safe:duration-500 ${hidden ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"} ${className}`}>
      {children}
    </div>
  );
}

