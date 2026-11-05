/**
 * Site-wide configuration: identity, navigation, and contact routing.
 *
 * Anything an operator is expected to change before launch lives here rather
 * than being scattered through components. Values that must differ per
 * environment are read from `NEXT_PUBLIC_*` env vars — see `.env.example`.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const site = {
  name: "ClinDaddy",
  /** Used in metadata, JSON-LD, and the sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.clindaddy.com",
  title: "ClinDaddy | Clinical Data Automation from Protocol to Submission",
  description:
    "ClinDaddy automates clinical data workflows from protocol and EDC study design through data capture, analysis, QC, and regulatory submission.",
  /**
   * PLACEHOLDER — replace before launch by setting NEXT_PUBLIC_CONTACT_EMAIL.
   * Used as the destination for contact-form notifications and the mailto
   * fallback shown when no email provider is configured.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@clindaddy.com",
  productNames: ["FlashEDC", "FlashAnalysis"] as const,
} as const;

/** The one primary conversion action, reused across every page. */
export const primaryCTA = {
  label: "Request a Demo",
  href: "/contact?interest=demo",
} as const;

export const secondaryCTA = {
  label: "Explore the Platform",
  href: "/platform",
} as const;

export const navigation: NavItem[] = [
  {
    label: "Platform",
    href: "/platform",
    children: [
      {
        label: "Platform overview",
        href: "/platform",
        description: "One platform. Two engines. One clinical data lifecycle.",
      },
      {
        label: "FlashEDC",
        href: "/flashedc",
        description: "Protocol → EDC & Data Capture",
      },
      {
        label: "FlashAnalysis",
        href: "/flashanalysis",
        description: "Clinical Data → Analysis → Submission",
      },
    ],
  },
  { label: "Technology", href: "/technology" },
  { label: "Trust", href: "/trust" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "CROs",
        href: "/solutions#cros",
        description: "Turn data operations into a competitive advantage.",
      },
      {
        label: "Pharma & Biotech",
        href: "/solutions#pharma-biotech",
        description: "Speed, consistency, and traceability.",
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Investors", href: "/investors" },
];

export const footerNavigation: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Platform",
    links: [
      { label: "Platform overview", href: "/platform" },
      { label: "FlashEDC", href: "/flashedc" },
      { label: "FlashAnalysis", href: "/flashanalysis" },
      { label: "Technology", href: "/technology" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { label: "Trust & governance", href: "/trust" },
      { label: "Deterministic execution", href: "/trust#deterministic-execution" },
      { label: "Independent QC", href: "/trust#independent-qc" },
      { label: "Traceability", href: "/trust#traceability" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Investors", href: "/investors" },
      { label: "Solutions", href: "/solutions" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/**
 * In-page jump targets shown on the trust page. Kept beside the navigation so
 * labels and section ids cannot drift apart.
 */
export const trustAnchors = [
  { label: "Deterministic execution", href: "#deterministic-execution" },
  { label: "Traceability", href: "#traceability" },
  { label: "Independent QC", href: "#independent-qc" },
  { label: "Human in the loop", href: "#human-in-the-loop" },
] as const;
