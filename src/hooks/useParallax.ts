import { useEffect, useRef } from 'react'

// Attaches a subtle mouse-move parallax to descendant elements matching
// `selector` within the returned container ref.
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  selector = '.circle',
  factor = 15,
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      const els = ref.current?.querySelectorAll<HTMLElement>(selector) ?? []
      els.forEach((el, i) => {
        const speed = (i + 1) * factor
        el.style.transform = `translate(${(x - 0.5) * speed}px, ${(y - 0.5) * speed}px)`
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [selector, factor])

  return ref
}
