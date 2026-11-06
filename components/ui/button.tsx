import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkOutline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink-strong text-white hover:bg-ink-deep active:bg-ink-deep",
  secondary:
    "px-0 text-ink underline decoration-1 underline-offset-4 hover:text-brand active:text-ink-strong",
  ghost: "text-ink hover:text-brand active:text-ink-strong",
  onDark: "bg-white text-ink-strong hover:bg-paper active:bg-surface-2",
  onDarkOutline:
    "px-0 text-white underline decoration-1 underline-offset-4 hover:text-white/80",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-[22px] text-[15px]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[4px] font-medium tracking-[-0.005em] transition-colors duration-200 select-none disabled:pointer-events-none disabled:opacity-50";

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
