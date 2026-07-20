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
