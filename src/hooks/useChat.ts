import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { aiTwin, API_BASE } from '../data/portfolio'
import { useTurnstile } from './useTurnstile'

export type ChatMsg = { role: 'assistant' | 'user'; text: string; time: string }

type AskResponse = { answer?: string; message?: string }

// The backend caps history too; this just keeps the request small.
const HISTORY_TURNS = 6
// Just under Cloudflare's 100s proxy limit, so we answer before it does.
const REQUEST_TIMEOUT_MS = 90_000

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

// Encapsulates the AI-twin conversation: client-held transcript, input state,
// loading, and the call to /ask. Recent turns go with each question so the bot
// can follow up; the greeting is UI only and isn't sent.
export function useChat() {
  const [messages, setMessages] = useState<ChatMsg[]>([{ role: 'assistant', text: aiTwin.greeting, time: now() }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { getToken } = useTurnstile()

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.current
      if (el) el.scrollTop = el.scrollHeight
    })
  }, [])

  // A long reply should be read from its first line, not from its sign-off. Runs after the
  // reply is rendered; measuring before that would find the previous message.
  const replyArrived = useRef(false)
  useLayoutEffect(() => {
    if (!replyArrived.current) return
    replyArrived.current = false
    const el = scrollRef.current
    const all = el?.querySelectorAll<HTMLElement>('[data-msg]')
    const last = all?.[all.length - 1]
    if (!el || !last) return
    el.scrollTop = last.offsetHeight > el.clientHeight * 0.6 ? last.offsetTop - 12 : el.scrollHeight
  }, [messages])

  const send = useCallback(
    async (text: string) => {
      const q = text.trim()
      if (!q || loading) return
      const history = messages
        .slice(1)
        .slice(-HISTORY_TURNS)
        .map(({ role, text }) => ({ role, text }))
      setInput('')
      setMessages((m) => [...m, { role: 'user', text: q, time: now() }])
      setLoading(true)
      scrollToBottom()
      const abort = new AbortController()
      const timer = window.setTimeout(() => abort.abort(), REQUEST_TIMEOUT_MS)
      let reply: string
      try {
        const turnstile_token = await getToken()
        const res = await fetch(`${API_BASE}/ask`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: q, history, turnstile_token }),
          signal: abort.signal,
        })
        const data = (await res.json().catch(() => ({}))) as AskResponse
        // 200 -> answer; 503 busy / other -> friendly `message`; else fallback.
        reply = data.answer || data.message || "Hmm, I couldn't reach my brain just now. Mind trying again in a moment?"
      } catch {
        reply = abort.signal.aborted
          ? "That one's taking me way too long. Mind asking again?"
          : 'Looks like my backend is offline right now. Try again shortly, or reach me on LinkedIn.'
      } finally {
        window.clearTimeout(timer)
      }
      replyArrived.current = true
      setMessages((m) => [...m, { role: 'assistant', text: reply, time: now() }])
      setLoading(false)
    },
    [loading, messages, scrollToBottom, getToken],
  )

  return { messages, input, setInput, loading, send, scrollRef }
}
