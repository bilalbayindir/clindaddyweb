import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * NVIDIA Inception program badge.
 *
 * The supplied artwork is used unmodified: no recolouring, cropping, filters or
 * opacity changes. Callers set the height (see `ProgramBadges`: 40px desktop /
 * 32px mobile) and the width follows the intrinsic 500.43 × 216 ratio. Parents
 * must leave clear space of at least half the badge height on every side.
 */
export function NvidiaInceptionBadge({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const src =
    variant === "dark"
      ? "/images/nvidia-inception-badge-dark.svg"
      : "/images/nvidia-inception-badge-light.svg";

  return (
    <Image
      src={src}
      alt="NVIDIA Inception Program member"
      width={500}
      height={216}
      unoptimized
      className={cn("h-16 w-auto lg:h-20", className)}
    />
  );
}
