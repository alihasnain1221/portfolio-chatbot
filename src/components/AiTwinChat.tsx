import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { aiTwin } from '../data/portfolio'

// Home hero "chat launcher". It looks like a chat, but it doesn't talk to the
// backend here — any message (typed, or a suggestion chip) navigates to the
// dedicated /chat page and is replayed there as the first message. This keeps
// every real conversation on the chat page and makes the home a single funnel.
export default function AiTwinChat({ className = '' }: { className?: string }) {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const launch = (text: string) => {
    const q = text.trim()
    if (!q) return
    navigate('/chat', { state: { initial: q } })
  }

  return (
    <div className={`glass-panel-heavy rounded-[1.5rem] wide:rounded-[clamp(1.5rem,2vw,2.5rem)] p-4 wide:pt-[clamp(16px,1.5vw,40px)] wide:pb-[clamp(12px,1vw,32px)] wide:px-[clamp(16px,1.5vw,40px)] relative overflow-hidden h-[320px] wide:h-full wide:min-h-[clamp(320px,30vw,480px)] wide:max-h-[clamp(380px,35vw,560px)] flex flex-col w-[240px] wide:min-w-[clamp(240px,25vw,440px)] wide:max-w-[clamp(280px,30vw,540px)] ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 wide:gap-[clamp(8px,0.5vw,16px)] mb-3 wide:mb-[clamp(12px,0.8vw,24px)] border-b border-outline-variant/30 pb-3 wide:pb-[clamp(12px,0.5vw,20px)]">
        <span
          className="material-symbols-outlined text-primary text-[26px] wide:text-[clamp(26px,2vw,42px)] leading-none"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
        >
          {aiTwin.icon}
        </span>
        <div>
          <p className="text-[11px] wide:text-[clamp(11px,0.9vw,16px)] text-on-surface tracking-wider font-medium">{aiTwin.name}</p>
          <p className="text-[8px] wide:text-[clamp(8px,0.6vw,13px)] uppercase tracking-widest text-outline mt-0.5 font-medium">
            {aiTwin.status}
          </p>
        </div>
      </div>

      {/* Greeting + suggestion chips (both routes into /chat) */}
      <div className="flex-grow space-y-3 wide:space-y-[clamp(12px,0.8vw,24px)] overflow-y-auto pr-2 wide:pr-4 custom-scrollbar">
        <div className="flex justify-start">
          <div className="silver-wire-chat rounded-xl wide:rounded-2xl rounded-tl-none p-3 wide:p-[clamp(12px,0.8vw,20px)] max-w-[90%] text-on-surface text-[11px] wide:text-[clamp(11px,0.9vw,16px)] font-light leading-relaxed shadow-lg">
            {aiTwin.greeting}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {aiTwin.suggestions.map((s) => (
            <button
              key={s}
              onClick={() => launch(s)}
              className="border border-outline-variant bg-white/20 text-on-surface-variant text-[9px] wide:text-[clamp(9px,0.7vw,14px)] px-2 wide:px-[clamp(8px,0.5vw,16px)] py-1 wide:py-[clamp(4px,0.3vw,10px)] rounded-full shadow-md hover:bg-white/40 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input — sending navigates to /chat with the message */}
      <form
        className="mt-3 wide:mt-[clamp(12px,0.8vw,24px)] relative"
        onSubmit={(e) => {
          e.preventDefault()
          launch(input)
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-transparent border border-outline-variant rounded-lg wide:rounded-xl py-2 wide:py-[clamp(8px,0.6vw,16px)] px-3 wide:px-[clamp(12px,0.8vw,20px)] text-[11px] wide:text-[clamp(11px,0.9vw,16px)] focus:border-outline focus:ring-0 focus:outline-none backdrop-blur-md font-light text-on-surface placeholder:text-outline/60"
          placeholder={aiTwin.placeholder}
          type="text"
        />
        <button
          type="submit"
          className="absolute right-1 wide:right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-1.5 wide:p-[clamp(6px,0.5vw,14px)] rounded-lg wide:rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
          aria-label="Start chatting"
        >
          <span className="material-symbols-outlined text-[12px] wide:text-[clamp(12px,0.8vw,18px)]">arrow_forward</span>
        </button>
      </form>

      {/* Refractive rim highlight */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/40 blur-3xl rounded-full pointer-events-none" />
    </div>
  )
}
