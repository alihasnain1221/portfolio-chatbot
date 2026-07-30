import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChatMarkdown from '../components/ChatMarkdown'
import { useChat } from '../hooks/useChat'
import EmojiPicker from '../components/EmojiPicker'
import { aiTwin, chatPage } from '../data/portfolio'

// Dedicated chat-focused screen, ported from the Stitch "AI Architect MVP
// (Chat Focus)" layout: a centered headline over one large glass chat slab on
// a mesh-gradient background with glowing orbs. Standalone shell (its own
// atmosphere) but reuses the shared Nav/Footer and the real /ask backend via
// useChat. The AI is the hub glyph; the mock's fake transcript and human
// headshot are gone. Bento tiles below the slab were dropped per request.
export default function ChatPage() {
  const { messages, input, setInput, loading, send, scrollRef } = useChat()
  const formRef = useRef<HTMLFormElement>(null)
  const chatboxRef = useRef<HTMLDivElement>(null)
  const [copyToast, setCopyToast] = useState<string | null>(null)
  const copyToastTimerRef = useRef<number | null>(null)

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

  useEffect(
    () => () => {
      if (copyToastTimerRef.current !== null) {
        window.clearTimeout(copyToastTimerRef.current)
      }
    },
    [],
  )

  const showCopyToast = (message: string) => {
    setCopyToast(message)
    if (copyToastTimerRef.current !== null) {
      window.clearTimeout(copyToastTimerRef.current)
    }
    copyToastTimerRef.current = window.setTimeout(() => {
      setCopyToast(null)
      copyToastTimerRef.current = null
    }, 1800)
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showCopyToast('Copied!')
    } catch {
      showCopyToast('Copy failed')
    }
  }

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
        <div className="text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl px-2 sm:px-4">
          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] wide:text-[40px] leading-tight tracking-tighter mb-3 sm:mb-4 text-on-surface font-light">
            {chatPage.heroTitle}
          </h1>
          <p className="text-on-surface-variant text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] wide:text-[20px] opacity-80 font-light leading-relaxed">
            {chatPage.heroSubtitle}
          </p>
        </div>

        {/* Central chat slab */}
        <div ref={chatboxRef} className="glass-slab w-full max-w-4xl rounded-[24px] sm:rounded-[28px] md:rounded-[32px] lg:rounded-[36px] wide:rounded-[40px] p-4 sm:p-5 md:p-6 lg:p-8 wide:p-10 flex flex-col gap-5 sm:gap-6 md:gap-8 relative overflow-hidden h-[70dvh] sm:h-[72dvh] md:h-[72dvh] lg:h-[600px] wide:h-[640px] min-h-[400px] sm:min-h-[440px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/30 pb-4 sm:pb-5 md:pb-6 bg-white/20 -mx-4 sm:-mx-5 md:-mx-6 lg:-mx-8 wide:-mx-10 px-4 sm:px-5 md:px-6 lg:px-8 wide:px-10 -mt-4 sm:-mt-5 md:-mt-6 lg:-mt-8 wide:-mt-10 pt-4 sm:pt-5 md:pt-6 lg:pt-8 wide:pt-10 rounded-t-[24px] sm:rounded-t-[28px] md:rounded-t-[32px] lg:rounded-t-[36px] wide:rounded-t-[40px]">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-white/40 flex items-center justify-center glass-rim border-2 border-white overflow-hidden drop-shadow-md">
                <img src="/img/new_pic_2.png" alt="AI Twin" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <div className="font-label-md text-[12px] sm:text-[13px] md:text-label-md text-on-surface">{aiTwin.name}</div>
                <div className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest text-primary font-bold">
                  {chatPage.agentTag}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label-sm text-[10px] sm:text-[11px] md:text-label-sm text-primary">
                {loading ? 'Thinking…' : chatPage.statusIdle}
              </span>
            </div>
          </div>

          {/* Message history */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto chat-scroll px-1 sm:px-1.5 md:px-2 py-1 space-y-4 sm:space-y-5 md:space-y-6">
            {messages.map((m, i) =>
              m.role === 'assistant' ? (
                <div key={i} className="flex gap-3 sm:gap-3.5 md:gap-4">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-primary-container shrink-0 flex items-center justify-center overflow-hidden border border-white drop-shadow-md">
                    <img src="/img/new_pic_2.png" alt="AI Twin" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <div className="bg-white/40 p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl rounded-tl-none border border-white/50 shadow-lg max-w-[85%] sm:max-w-[80%] md:max-w-lg text-on-surface-variant text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed break-words">
                      <ChatMarkdown text={m.text} />
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 pl-1">
                      <span className="text-[10px] sm:text-[11px] text-outline/60 font-medium">Ali</span>
                      <span className="text-outline/30">·</span>
                      <span className="text-[10px] sm:text-[11px] text-outline/50">{m.time}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(m.text)}
                        className="text-outline/50 hover:text-on-surface-variant transition-colors"
                        aria-label="Copy message"
                      >
                        <span className="material-symbols-outlined text-[11px] sm:text-[12px]">content_copy</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-3 sm:gap-3.5 md:gap-4 flex-row-reverse">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-surface-container-high shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[10px] sm:text-[12px] md:text-sm">person</span>
                  </div>
                  <div>
                    <div className="bg-primary/5 p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl rounded-tr-none border border-primary/10 shadow-lg max-w-[85%] sm:max-w-[80%] md:max-w-lg text-on-surface text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed break-words">
                      {m.text}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 justify-end pr-1">
                      <span className="text-[10px] sm:text-[11px] text-outline/60 font-medium">You</span>
                      <span className="text-outline/30">·</span>
                      <span className="text-[10px] sm:text-[11px] text-outline/50">{m.time}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(m.text)}
                        className="text-outline/50 hover:text-on-surface-variant transition-colors"
                        aria-label="Copy message"
                      >
                        <span className="material-symbols-outlined text-[11px] sm:text-[12px]">content_copy</span>
                      </button>
                    </div>
                  </div>
                </div>
              ),
            )}

            {loading && (
              <div className="flex gap-3 sm:gap-3.5 md:gap-4">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-primary-container shrink-0 flex items-center justify-center overflow-hidden border border-white drop-shadow-md">
                  <img src="/img/new_pic_2.png" alt="AI Twin" className="w-full h-full object-cover object-top" />
                </div>
                <div className="bg-white/40 p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl rounded-tl-none border border-white/50 shadow-lg text-on-surface-variant">
                  <span className="typing-dots" aria-label="Thinking">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pl-8 sm:pl-10 md:pl-12">
                {aiTwin.suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="border border-white/50 bg-white/30 text-on-surface-variant text-[10px] sm:text-[11px] md:text-xs px-3 sm:px-3.5 md:px-4 py-2 sm:py-2 md:py-2.5 rounded-full shadow-md hover:bg-white/50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            ref={formRef}
            className="relative flex items-center gap-1.5 sm:gap-2 md:gap-2.5"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <EmojiPicker formRef={formRef} chatboxRef={chatboxRef} onEmojiSelect={(emoji) => setInput((prev) => prev + emoji)} />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl sm:rounded-3xl py-2.5 sm:py-3 md:py-4 lg:py-5 px-2.5 sm:px-3 md:px-4 lg:px-5 font-body-md text-on-surface text-[14px] sm:text-[15px] md:text-[16px] focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all outline-none shadow-inner placeholder:text-outline/70"
              placeholder={chatPage.inputPlaceholder}
              type="text"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 flex items-center justify-center shrink-0"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">arrow_forward</span>
            </button>
          </form>
        </div>
      </main>

      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-full border border-[#34a853] bg-[#e6f4ea] px-4 py-2 shadow-xl text-[12px] font-medium tracking-wide text-[#137333]">
          {copyToast}
        </div>
      )}

      <Footer />
    </div>
  )
}
