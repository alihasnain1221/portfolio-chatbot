/// <reference types="vite/client" />

// Minimal typing for the Cloudflare Turnstile global (loaded via script tag).
interface TurnstileRenderOptions {
  sitekey: string
  size?: 'normal' | 'flexible' | 'compact' | 'invisible'
  callback?: (token: string) => void
  'error-callback'?: () => void
  'expired-callback'?: () => void
}
interface TurnstileApi {
  ready?: (cb: () => void) => void
  render: (el: HTMLElement | string, opts: TurnstileRenderOptions) => string
  execute: (id: string) => void
  reset: (id?: string) => void
  remove: (id: string) => void
}
interface Window {
  turnstile?: TurnstileApi
}
