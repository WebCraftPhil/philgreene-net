export type ConversionEvent =
  | 'hero_cta_clicked'
  | 'audit_form_started'
  | 'audit_form_submitted'
  | 'pilot_cta_clicked'
  | 'email_link_clicked'
  | 'phone_link_clicked'
  | 'services_viewed'
  | 'workflow_viewed'
  | 'assistant_opened'
  | 'assistant_completed'
  | 'package_selected'
  | 'website_audit_cta_clicked'
  | 'audit_submitted'
  | 'scanner_opened'
  | 'scan_started'
  | 'scan_succeeded'
  | 'scan_failed'
  | 'top_findings_viewed'
  | 'report_gate_started'
  | 'report_requested'
  | 'full_report_viewed'
  | 'scanner_audit_clicked'
  | 'no_website_selected'
  | 'scanner_share_clicked'
  | 'scanner_share_completed'
  | 'scanner_share_cancelled'
  | 'scanner_share_failed'
  | 'scanner_link_copied'
  | 'scanner_link_copy_failed'
  | 'scanner_email_forward_clicked'

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void
  }
}

export function initAnalytics() {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN?.trim()

  if (!domain || document.querySelector('script[data-phil-analytics]')) {
    return
  }

  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = domain
  script.dataset.philAnalytics = 'plausible'
  script.src = 'https://plausible.io/js/script.js'
  document.head.appendChild(script)
}

export function trackEvent(
  name: ConversionEvent,
  properties?: Record<string, string | number | boolean>,
) {
  window.plausible?.(name, properties ? { props: properties } : undefined)
}
