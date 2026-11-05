import type { ElementType, ReactNode } from "react";

/**
 * Content wrappers.
 *
 * These used to fade content in on first view. That made every wrapped section
 * invisible until hydration and an intersection event, which is a bad trade for
 * a marketing site: a slow connection, a JS failure or a full-page screenshot
 * would show blank sections. They now render their children immediately. The
 * API is kept so pages do not have to change.
 */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: ElementType;
}) {
  const Tag = as as ElementType;
  return <Tag className={className}>{children}</Tag>;
}

export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
