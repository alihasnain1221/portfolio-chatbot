import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChatMarkdown from '../components/ChatMarkdown'
import { useChat } from '../hooks/useChat'
import { aiTwin, chatPage } from '../data/portfolio'

// Dedicated chat-focused screen, ported from the Stitch "AI Architect MVP
// (Chat Focus)" layout: a centered headline over one large glass chat slab on
// a mesh-gradient background with glowing orbs. Standalone shell (its own
// atmosphere) but reuses the shared Nav/Footer and the real /ask backend via
// useChat. The AI is the hub glyph; the mock's fake transcript and human
// headshot are gone. Bento tiles below the slab were dropped per request.
export default function ChatPage() {
  const { messages, input, setInput, loading, send, scrollRef } = useChat()

  // If we arrived from the home launcher (or anywhere passing an initial
  // message), send it once as the first message.
  const location = useLocation()
  const sentRef = useRef(false)
  useEffect(() => {
    const initial = (location.state as { initial?: string } | null)?.initial
    if (initial && !sentRef.current) {
      sentRef.current = true
      send(initial)
    }
  }, [location.state, send])

  return (
    <div className="mesh-gradient min-h-dvh flex flex-col relative overflow-x-hidden">
      {/* Atmospheric orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="glowing-orb bg-primary-container w-[600px] h-[600px] -top-32 -left-32 animate-pulse" />
        <div className="glowing-orb bg-tertiary-container w-[500px] h-[500px] top-1/2 -right-32" />
        <div className="glowing-orb bg-white w-[800px] h-[800px] -bottom-64 left-1/4 opacity-40" />
      </div>

      <Nav />

      <main className="flex-grow flex flex-col items-center justify-center pt-28 md:pt-32 pb-16 px-margin-mobile md:px-margin-desktop z-10 w-full">
        {/* Hero headline */}
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface tracking-tighter mb-4">
            {chatPage.heroTitle}
          </h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg opacity-80">
            {chatPage.heroSubtitle}
          </p>
        </div>

        {/* Central chat slab */}
        <div className="glass-slab w-full max-w-4xl rounded-[40px] p-6 sm:p-8 md:p-12 flex flex-col gap-8 relative overflow-hidden h-[72dvh] min-h-[440px] md:h-[600px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/30 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/40 flex items-center justify-center glass-rim">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {aiTwin.icon}
                </span>
              </div>
              <div>
                <div className="font-label-md text-label-md text-on-surface">{aiTwin.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-primary font-bold">
                  {chatPage.agentTag}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label-sm text-label-sm text-primary">
                {loading ? 'Thinking…' : chatPage.statusIdle}
              </span>
            </div>
          </div>

          {/* Message history */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto chat-scroll pr-2 sm:pr-4 space-y-6">
            {messages.map((m, i) =>
              m.role === 'assistant' ? (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary-container shrink-0 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-sm text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {aiTwin.icon}
                    </span>
                  </div>
                  <div className="bg-white/40 p-4 rounded-2xl rounded-tl-none glass-rim max-w-lg text-on-surface-variant">
                    <ChatMarkdown text={m.text} />
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-4 flex-row-reverse">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">person</span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-2xl rounded-tr-none border border-primary/10 max-w-lg text-on-surface">
                    {m.text}
                  </div>
                </div>
              ),
            )}

            {loading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary-container shrink-0 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-sm text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {aiTwin.icon}
                  </span>
                </div>
                <div className="bg-white/40 p-4 rounded-2xl rounded-tl-none glass-rim text-on-surface-variant">
                  <span className="typing-dots" aria-label="Thinking">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pl-12">
                {aiTwin.suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="glass-rim bg-white/30 text-on-surface-variant text-xs px-4 py-2.5 rounded-full hover:bg-white/50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            className="relative group"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-primary/60">terminal</span>
            </div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-white/50 backdrop-blur-md border border-white/60 rounded-3xl py-5 pl-16 pr-24 font-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all outline-none shadow-inner placeholder:text-outline/70"
              placeholder={chatPage.inputPlaceholder}
              type="text"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-2xl hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
