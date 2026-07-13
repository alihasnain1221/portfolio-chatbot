import { useCallback, useEffect, useRef } from 'react'

const SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string) || ''

// Cloudflare Turnstile bot check. Renders one invisible widget (off-screen) and
// hands out a FRESH single-use token per call via getToken(). When no site key
// is configured, getToken() resolves '' and the backend (which also no-ops
// without its secret) stays open, so local dev needs no keys.
export function useTurnstile() {
  const widgetId = useRef<string | null>(null)
  const resolver = useRef<((t: string) => void) | null>(null)

  useEffect(() => {
    if (!SITE_KEY) return
    let cancelled = false
    const container = document.createElement('div')
    container.style.cssText = 'position:fixed;left:0;bottom:0;width:0;height:0;overflow:hidden;'
    document.body.appendChild(container)

    const render = (): boolean => {
      const t = window.turnstile
      if (!t || cancelled || widgetId.current) return widgetId.current != null
      try {
        widgetId.current = t.render(container, {
          sitekey: SITE_KEY,
          size: 'invisible',
          callback: (token) => {
            resolver.current?.(token)
            resolver.current = null
          },
          'error-callback': () => {
            resolver.current?.('')
            resolver.current = null
          },
          'expired-callback': () => {
            resolver.current?.('')
            resolver.current = null
          },
        })
      } catch {
        /* script not ready yet; retried on next tick */
      }
      return widgetId.current != null
    }

    // The Turnstile script loads async, so poll until window.turnstile exists.
    let iv: number | undefined
    if (!render()) {
      iv = window.setInterval(() => {
        if (render() && iv) window.clearInterval(iv)
      }, 200)
      window.setTimeout(() => iv && window.clearInterval(iv), 10000)
    }

    return () => {
      cancelled = true
      if (iv) window.clearInterval(iv)
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current)
        } catch {
          /* ignore */
        }
      }
      container.remove()
    }
  }, [])

  const getToken = useCallback(
    (): Promise<string> =>
      new Promise((resolve) => {
        const t = window.turnstile
        if (!SITE_KEY || !t || widgetId.current == null) return resolve('')
        // Never let a stuck challenge hang the send.
        const to = window.setTimeout(() => {
          resolver.current = null
          resolve('')
        }, 8000)
        resolver.current = (tok) => {
          window.clearTimeout(to)
          resolve(tok)
        }
        try {
          t.reset(widgetId.current)
          t.execute(widgetId.current)
        } catch {
          window.clearTimeout(to)
          resolver.current = null
          resolve('')
        }
      }),
    [],
  )

  return { getToken }
}
