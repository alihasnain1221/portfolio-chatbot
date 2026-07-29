import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { aiTwin } from '../data/portfolio'

// Home hero "chat launcher". It looks like a chat, but it doesn't talk to the
// backend here — any message (typed, or a suggestion chip) navigates to the
// dedicated /chat page and is replayed there as the first message. This keeps
// every real conversation on the chat page and makes the home a single funnel.
export default function AiTwinChat() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const launch = (text: string) => {
    const q = text.trim()
    if (!q) return
    navigate('/chat', { state: { initial: q } })
  }

  return (
    <div className="glass-panel-heavy rounded-[2.5rem] p-10 relative overflow-hidden h-[550px] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 border-b border-outline-variant/30 pb-6">
        <span
          className="material-symbols-outlined text-primary text-[44px] leading-none"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
        >
          {aiTwin.icon}
        </span>
        <div>
          <p className="font-label-md text-label-md text-on-surface tracking-wider">{aiTwin.name}</p>
          <p className="text-xs uppercase tracking-widest text-outline mt-1 font-medium">
            {aiTwin.status}
          </p>
        </div>
      </div>

      {/* Greeting + suggestion chips (both routes into /chat) */}
      <div className="flex-grow space-y-6 overflow-y-auto pr-4 custom-scrollbar">
        <div className="flex justify-start">
          <div className="silver-wire-chat rounded-2xl rounded-tl-none p-5 max-w-[85%] text-on-surface text-sm font-light leading-relaxed">
            {aiTwin.greeting}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {aiTwin.suggestions.map((s) => (
            <button
              key={s}
              onClick={() => launch(s)}
              className="border border-outline-variant bg-white/20 text-on-surface-variant text-xs px-4 py-2.5 rounded-full hover:bg-white/40 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input — sending navigates to /chat with the message */}
      <form
        className="mt-8 relative"
        onSubmit={(e) => {
          e.preventDefault()
          launch(input)
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-transparent border border-outline-variant rounded-2xl py-4 px-6 focus:border-outline focus:ring-0 focus:outline-none backdrop-blur-md font-light text-on-surface placeholder:text-outline/60"
          placeholder={aiTwin.placeholder}
          type="text"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border border-outline-variant text-on-surface-variant p-3 rounded-xl hover:bg-white/40 transition-colors"
          aria-label="Start chatting"
        >
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </form>

      {/* Refractive rim highlight */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/40 blur-3xl rounded-full pointer-events-none" />
    </div>
  )
}
