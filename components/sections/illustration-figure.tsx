import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A framed editorial illustration with an optional caption.
 *
 * Every illustration on the site is explicitly labelled as illustrative, so a
 * screenshot of a page can never be mistaken for a real study, a real
 * deployment, or a real regulatory outcome.
 */
export function IllustrationFigure({
  src,
  alt,
  caption,
  width,
  height,
  sizes = "(min-width: 1024px) 40rem, 100vw",
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-[6px] border border-line bg-surface", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
      {caption ? (
        <figcaption className="border-t border-line bg-white px-5 py-3.5 text-xs leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

