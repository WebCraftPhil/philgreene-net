import { useEffect, useRef } from 'react'
import { trackEvent, type ConversionEvent } from '@/lib/analytics'

export function useTrackedSection(eventName: ConversionEvent) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent(eventName)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [eventName])

  return ref
}

