"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "@/content/types";
import { track } from "@/lib/track";

export default function MenuViewTracker({ lang }: { lang: Lang }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    track("menu_view", { language: lang });
  }, [lang]);
  return null;
}
