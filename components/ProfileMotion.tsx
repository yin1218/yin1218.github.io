'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export default function ProfileMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = root.current
    if (!container || !('IntersectionObserver' in window)) return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const animations = new Set<Animation>()
    let observer: IntersectionObserver | undefined

    const stop = () => {
      observer?.disconnect()
      animations.forEach((animation) => animation.cancel())
      animations.clear()
    }

    const start = () => {
      stop()
      if (preference.matches) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            observer?.unobserve(entry.target)
            if (!(entry.target instanceof HTMLElement) || !entry.target.animate) return
            const animation = entry.target.animate(
              [
                { opacity: 0, transform: 'translateY(14px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
            )
            animations.add(animation)
            animation.onfinish = () => animations.delete(animation)
          })
        },
        { threshold: 0.08 }
      )

      container.querySelectorAll('[data-reveal]').forEach((section) => observer?.observe(section))
    }

    start()
    preference.addEventListener('change', start)
    return () => {
      stop()
      preference.removeEventListener('change', start)
    }
  }, [])

  // Content stays visible without JavaScript or when motion is disabled.
  return (
    <div ref={root} className="academic-home">
      {children}
    </div>
  )
}
