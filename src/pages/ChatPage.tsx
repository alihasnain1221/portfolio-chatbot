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
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Grow the textarea with its content, up to ~5 lines, and shrink back after send.
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`
    el.style.overflowY = el.scrollHeight > 140 ? 'auto' : 'hidden'
  }, [input])
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
    // Phones get an app-like screen: exactly one viewport tall, only the message list scrolls.
    <div className="mesh-gradient h-dvh md:h-auto md:min-h-dvh flex flex-col relative overflow-x-hidden">
      {/* Atmospheric orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="glowing-orb bg-primary-container w-[600px] h-[600px] -top-32 -left-32 animate-pulse" />
        <div className="glowing-orb bg-tertiary-container w-[500px] h-[500px] top-1/2 -right-32" />
        <div className="glowing-orb bg-white w-[800px] h-[800px] -bottom-64 left-1/4 opacity-40" />
      </div>

      <Nav />

      <main className="flex-1 min-h-0 flex flex-col items-center md:justify-center pt-16 md:pt-32 md:pb-16 md:px-margin-desktop z-10 w-full">
        {/* Hero headline: desktop only, on phones the whole screen is the chat */}
        <div className="hidden md:block text-center md:mb-12 max-w-2xl px-4">
          <h1 className="text-[32px] lg:text-[36px] wide:text-[40px] leading-tight tracking-tighter mb-4 text-on-surface font-light">
            {chatPage.heroTitle}
          </h1>
          <p className="text-on-surface-variant text-[16px] lg:text-[18px] wide:text-[20px] opacity-80 font-light leading-relaxed">
            {chatPage.heroSubtitle}
          </p>
        </div>

        {/* Central chat slab: edge to edge on phones, a floating card from md up */}
        <div ref={chatboxRef} className="glass-slab w-full max-w-4xl rounded-none border-x-0 md:border-x md:rounded-[32px] lg:rounded-[36px] wide:rounded-[40px] p-3 md:p-6 lg:p-8 wide:p-10 flex flex-col gap-3 md:gap-6 relative overflow-hidden flex-1 min-h-0 md:flex-none md:h-[78dvh] lg:h-[680px] wide:h-[720px] md:min-h-[440px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/30 py-2.5 md:pb-5 bg-white/20 -mx-3 md:-mx-6 lg:-mx-8 wide:-mx-10 px-3 md:px-6 lg:px-8 wide:px-10 -mt-3 md:-mt-6 lg:-mt-8 wide:-mt-10 md:pt-6 lg:pt-8 wide:pt-10 md:rounded-t-[32px] lg:rounded-t-[36px] wide:rounded-t-[40px]">
            <div className="flex items-center gap-2.5 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full md:rounded-xl bg-white/40 flex items-center justify-center border-2 border-white overflow-hidden drop-shadow-sm">
                <img src="/img/new_pic_2.png" alt="AI Twin" className="w-full h-full object-cover object-top" />
              </div>
              <div className="leading-tight">
                <div className="text-[13px] md:text-[14px] font-medium text-on-surface">{aiTwin.name}</div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-primary/80 font-semibold">
                  {chatPage.agentTag}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full bg-primary ${loading ? 'animate-pulse' : ''}`} />
              <span className="text-[11px] md:text-[12px] text-primary/80">
                {loading ? 'Typing…' : chatPage.statusIdle}
              </span>
            </div>
          </div>

          {/* Message history: messaging-app density, small type, short bubbles */}
          <div ref={scrollRef} className="relative flex-1 min-h-0 overflow-y-auto overscroll-contain chat-scroll px-0.5 md:px-2 py-1 space-y-3 md:space-y-4">
            {messages.map((m, i) =>
              m.role === 'assistant' ? (
                <div key={i} data-msg className="flex items-end gap-2 md:gap-2.5">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full shrink-0 overflow-hidden border border-white drop-shadow-sm mb-5">
                    <img src="/img/new_pic_2.png" alt="AI Twin" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="min-w-0 max-w-[82%] md:max-w-lg">
                    <div className="bg-white/55 px-3 py-2 md:px-3.5 md:py-2.5 rounded-2xl rounded-bl-md border border-white/60 shadow-sm text-on-surface-variant text-[13px] md:text-[14px] leading-[1.5] break-words">
                      <ChatMarkdown text={m.text} />
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 pl-1 text-[10px] text-outline/60">
                      <span>{m.time}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(m.text)}
                        className="inline-flex items-center justify-center w-7 h-7 -my-1.5 rounded-md hover:text-on-surface-variant active:bg-white/40 transition-colors"
                        aria-label="Copy message"
                      >
                        <span className="material-symbols-outlined text-[13px]">content_copy</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={i} data-msg className="flex justify-end">
                  <div className="min-w-0 max-w-[82%] md:max-w-lg flex flex-col items-end">
                    <div className="bg-primary/10 px-3 py-2 md:px-3.5 md:py-2.5 rounded-2xl rounded-br-md border border-primary/10 shadow-sm text-on-surface text-[13px] md:text-[14px] leading-[1.5] break-words whitespace-pre-wrap">
                      {m.text}
                    </div>
                    <div className="mt-0.5 pr-1 text-[10px] text-outline/60">{m.time}</div>
                  </div>
                </div>
              ),
            )}

            {loading && (
              <div className="flex items-end gap-2 md:gap-2.5">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full shrink-0 overflow-hidden border border-white drop-shadow-sm">
                  <img src="/img/new_pic_2.png" alt="AI Twin" className="w-full h-full object-cover object-top" />
                </div>
                <div className="bg-white/55 px-3 py-2.5 rounded-2xl rounded-bl-md border border-white/60 shadow-sm text-on-surface-variant">
                  <span className="typing-dots" aria-label="Typing">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-1.5 md:gap-2 pl-8 md:pl-10">
                {aiTwin.suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="border border-white/60 bg-white/40 text-on-surface-variant text-[12px] px-3 h-8 rounded-full shadow-sm hover:bg-white/60 active:bg-white/70 transition-colors"
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
            className="relative flex items-end gap-2 md:gap-2.5 pb-[env(safe-area-inset-bottom)]"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            {/* Phones have an emoji keyboard; the picker only earns its space on desktop. */}
            <div className="hidden md:flex self-center">
              <EmojiPicker formRef={formRef} chatboxRef={chatboxRef} onEmojiSelect={(emoji) => setInput((prev) => prev + emoji)} />
            </div>
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault()
                  send(input)
                }
              }}
              enterKeyHint="send"
              aria-label="Message"
              className="flex-1 resize-none bg-white/60 backdrop-blur-md border border-white/70 rounded-[20px] py-[9px] md:py-3 px-3.5 md:px-4 text-on-surface text-[14px] leading-[1.4] focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all outline-none shadow-inner placeholder:text-outline/70 chat-scroll"
              placeholder={chatPage.inputPlaceholder}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="bg-primary text-white w-10 h-10 md:w-11 md:h-11 rounded-full hover:scale-105 active:scale-95 transition-transform disabled:opacity-40 flex items-center justify-center shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
            </button>
          </form>
        </div>
      </main>

      {copyToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 md:top-auto md:left-auto md:translate-x-0 md:bottom-6 md:right-6 z-50 rounded-full border border-[#34a853] bg-[#e6f4ea] px-4 py-2 shadow-xl text-[12px] font-medium tracking-wide text-[#137333]">
          {copyToast}
        </div>
      )}

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  )
}
