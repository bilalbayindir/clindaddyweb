import { track as vercelTrack } from "@vercel/analytics";

/**
 * The events the site reports.
 *
 * The primary KPI is qualified conversations generated, so the events that
 * matter most are the demo, investor, and contact conversions.
 */
export type AnalyticsEvent =
  | "cta_demo_click"
  | "cta_platform_click"
  | "cta_investor_click"
  | "cta_contact_click"
  | "cta_how_it_works_click"
  | "cta_validation_click"
  | "product_demo_click"
  | "product_explore_click"
  | "pilot_form_submit"
  | "contact_form_submit"
  | "contact_form_success"
  | "contact_form_error"
  | "demo_tab_interaction"
  | "demo_step_interaction"
  | "nav_click"
  | "outbound_email_click";

type EventProps = Record<string, string | number | boolean | null | undefined>;

/**
 * Report an event. Vercel Analytics discards these when the site is not
 * running on Vercel, and a failure here must never break the interaction, so
 * the call is guarded.
 */
export function track(event: AnalyticsEvent, props?: EventProps) {
  try {
    vercelTrack(event, props);
  } catch {
    // Analytics is best-effort; never surface a failure to the visitor.
  }
}
