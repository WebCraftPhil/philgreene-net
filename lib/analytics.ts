declare global {
  interface Window {
    plausible?: (
      event: string,
      opts?: { props?: Record<string, unknown> }
    ) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (name: string, options?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    window.plausible?.(name, { props: options });
    window.gtag?.('event', name, options);
  }
};
