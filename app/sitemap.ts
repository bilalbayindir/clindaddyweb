import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/**
 * Every public route, in the order a visitor is most likely to need it.
 *
 * Kept as an explicit list rather than generated from the filesystem so that
 * adding a route is a deliberate act — an accidentally public page is a worse
 * failure than a missing sitemap entry.
 */
const ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/platform", priority: 0.9, changeFrequency: "monthly" },
  { path: "/flashedc", priority: 0.9, changeFrequency: "monthly" },
  { path: "/flashanalysis", priority: 0.9, changeFrequency: "monthly" },
  { path: "/roadmap", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pilot", priority: 0.9, changeFrequency: "monthly" },
  { path: "/technology", priority: 0.8, changeFrequency: "monthly" },
  { path: "/trust", priority: 0.9, changeFrequency: "monthly" },
  { path: "/solutions", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/investors", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${site.url}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
