import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/content";

/**
 * A product presentation block.
 *
 * Deliberately not a card grid: each product gets a full-width panel so the
 * positioning statement and the capability list have room to be read.
 */
export function ProductCard({
  product,
  children,
  className,
}: {
  product: Product;
  /** Optional visual (an interface mock) rendered beside the copy. */
  children?: ReactNode;
  className?: string;
}) {
  const accent = product.slug === "flashedc" ? "teal" : "navy";

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[6px] border border-line bg-white",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-px",
          accent === "teal" ? "bg-teal-400" : "bg-navy-400",
        )}
      />

      <div
        className={cn(
          "grid gap-10 p-7 sm:p-9 lg:p-10",
          children && "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12",
        )}
      >
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted">{product.index}</span>
            <span
              className={cn(
                "text-[13px]",
                accent === "teal" ? "text-brand" : "text-text-3",
              )}
            >
              {product.tagline}
            </span>
          </div>

          <h3 className="mt-5 text-[26px] font-medium sm:text-[1.75rem]">{product.name}</h3>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-body">{product.summary}</p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {product.capabilities.slice(0, 6).map((capability) => (
              <li key={capability}>
                <Badge tone="neutral">{capability}</Badge>
              </li>
            ))}
            {product.capabilities.length > 6 ? (
              <li>
                <Badge tone="neutral">+{product.capabilities.length - 6} more</Badge>
              </li>
            ) : null}
          </ul>

          <Link
            href={product.href}
            className={cn(
              "mt-8 inline-flex items-center gap-2 text-sm font-medium transition-colors",
              accent === "teal" ? "text-teal-700 hover:text-teal-800" : "text-navy-600 hover:text-navy-700",
            )}
            data-analytics="product_explore_click"
            data-analytics-label={product.name}
          >
            Explore {product.name}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        {children ? <div className="min-w-0">{children}</div> : null}
      </div>
    </article>
  );
}

