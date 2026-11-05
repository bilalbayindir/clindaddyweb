import Image from "next/image";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The ClinDaddy lockup.
 *
 * Uses the supplied brand artwork as transparent PNGs so the mark and wordmark
 * stay exact at every size and on both light and dark surfaces. The mark is the
 * character, so on dark surfaces it keeps its own colours rather than being
 * reduced to a single-ink silhouette — see `scripts/prepare-assets.py`.
 *
 * The wordmark carries no tagline: "Clinical Data Automation" belonged to the
 * previous logo and was retired with it.
 */
export function Logo({
  variant = "default",
  className,
  priority = false,
}: {
  variant?: "default" | "inverse";
  className?: string;
  priority?: boolean;
}) {
  const suffix = variant === "inverse" ? "-inverse" : "";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={`/images/clindaddy-mark${suffix}.png`}
        alt=""
        aria-hidden
        width={259}
        height={447}
        priority={priority}
        className="h-9 w-auto shrink-0"
      />
      <Image
        src={`/images/clindaddy-wordmark${suffix}.png`}
        alt={site.name}
        width={740}
        height={155}
        priority={priority}
        className="h-[1.35rem] w-auto"
      />
    </span>
  );
}

/**
 * Mark-only lockup for tight spaces, with the company name exposed to screen
 * readers since the artwork alone would be announced as decorative.
 */
export function LogoMark({ className, variant = "default" }: { className?: string; variant?: "default" | "inverse" }) {
  const suffix = variant === "inverse" ? "-inverse" : "";
  return (
    <Image
      src={`/images/clindaddy-mark${suffix}.png`}
      alt={site.name}
      width={259}
      height={447}
      className={cn("h-9 w-auto", className)}
    />
  );
}
