import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkOutline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950",
  secondary:
    "border border-line-strong bg-white text-ink hover:border-navy-300 hover:bg-surface active:bg-surface-2",
  ghost: "text-ink hover:bg-surface active:bg-surface-2",
  onDark: "bg-white text-navy-900 hover:bg-teal-50 active:bg-teal-100",
  onDarkOutline: "border border-white/25 text-white hover:border-white/50 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.9375rem]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-colors duration-200 select-none disabled:pointer-events-none disabled:opacity-50";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Value for `data-analytics`; picked up by the global analytics listener. */
  analytics?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * The site's single button primitive. Renders a `next/link` when `href` is
 * given and a real `<button>` otherwise, so navigation stays semantic.
 */
export function Button({ variant = "primary", size = "md", className, children, analytics, ...props }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const tracking = analytics ? { "data-analytics": analytics } : {};

  if (props.href !== undefined) {
    const { href, ...linkProps } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...tracking} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...tracking} {...buttonProps}>
      {children}
    </button>
  );
}
