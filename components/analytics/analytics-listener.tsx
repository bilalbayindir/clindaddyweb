"use client";

import { useEffect } from "react";

import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Turns declarative `data-analytics` attributes into tracked events.
 *
 * Doing this with one delegated listener keeps every call-to-action on the site
 * a plain server-rendered link — no per-button client component, and no
 * analytics code shipped into each section.
 */
export function AnalyticsListener() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const element = target?.closest?.("[data-analytics]");
      if (!element) return;

      const name = element.getAttribute("data-analytics");
      if (!name) return;

      const label = element.getAttribute("data-analytics-label") ?? element.textContent?.trim() ?? undefined;
      const location = element.getAttribute("data-analytics-location") ?? undefined;

      track(name as AnalyticsEvent, { label, location });
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
