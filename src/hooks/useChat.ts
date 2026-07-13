import { useCallback, useRef, useState } from 'react'
import { aiTwin, API_BASE } from '../data/portfolio'
import { useTurnstile } from './useTurnstile'

export type ChatMsg = { role: 'assistant' | 'user'; text: string }

type AskResponse = { answer?: string; message?: string }

// Encapsulates the AI-twin conversation: client-held transcript (single-convo
// history), input state, loading, and the call to the stateless /ask backend
// (with graceful handling of the friendly 503 "busy" message).
export function useChat() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: 'assistant', text: aiTwin.greeting },
  ])
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

  const send = useCallback(
    async (text: string) => {
      const q = text.trim()
      if (!q || loading) return
      setInput('')
      setMessages((m) => [...m, { role: 'user', text: q }])
      setLoading(true)
      scrollToBottom()
      try {
        const turnstile_token = await getToken()
        const res = await fetch(`${API_BASE}/ask`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: q, turnstile_token }),
        })
        const data = (await res.json().catch(() => ({}))) as AskResponse
        // 200 -> answer; 503 busy / other -> friendly `message`; else fallback.
        const reply =
          data.answer ||
          data.message ||
          "Hmm, I couldn't reach my brain just now. Mind trying again in a moment?"
        setMessages((m) => [...m, { role: 'assistant', text: reply }])
      } catch {
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            text: 'Looks like my backend is offline right now. Try again shortly, or reach me on LinkedIn.',
          },
        ])
      } finally {
        setLoading(false)
        scrollToBottom()
      }
    },
    [loading, scrollToBottom, getToken],
  )

  return { messages, input, setInput, loading, send, scrollRef }
}
