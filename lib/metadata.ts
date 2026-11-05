import type { Metadata } from "next";

import { site } from "./site";

/**
 * Per-page metadata.
 *
 * Next.js replaces `openGraph` and `twitter` wholesale when a page defines
 * them, so anything the page omits — the social card, the card type — is lost
 * rather than inherited from the root layout. Building every page's metadata
 * here keeps those fields present on every route by construction.
 */

export const OG_IMAGE = {
  url: "/images/og.png",
  width: 1200,
  height: 630,
  alt: "ClinDaddy — From Protocol to Submission.",
} as const;

export function pageMetadata({
  title,
  description,
  path,
  /** Use the title verbatim instead of applying the `%s | ClinDaddy` template. */
  absolute = false,
}: {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
}): Metadata {
  const socialTitle = absolute ? title : `${title} | ${site.name}`;

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: socialTitle,
      description,
      url: path,
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
