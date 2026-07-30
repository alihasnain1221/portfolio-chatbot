import { type ComponentType, type RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  onEmojiSelect: (emoji: string) => void
  formRef: RefObject<HTMLFormElement | null>
  chatboxRef: RefObject<HTMLDivElement | null>
}

type PickerProps = {
  onEmojiClick: (data: { emoji: string }) => void
  width: number
  height: number
  previewConfig: { showPreview: boolean }
}

export default function EmojiPicker({ onEmojiSelect, formRef, chatboxRef }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [Picker, setPicker] = useState<ComponentType<PickerProps> | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (
        buttonRef.current?.contains(e.target as Node) ||
        popoverRef.current?.contains(e.target as Node)
      )
        return
      setIsOpen(false)
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || Picker) return
    import('emoji-picker-react').then((mod) => setPicker(() => mod.default))
  }, [isOpen, Picker])

  const [size, setSize] = useState({ width: 320, height: 380 })
  const [emojiSize, setEmojiSize] = useState(28)
  const [isDesktop, setDesktop] = useState(false)

  const measure = useCallback(() => {
    const form = formRef.current
    const chatbox = chatboxRef.current
    if (!form || !chatbox) return

    const formRect = form.getBoundingClientRect()
    const chatboxRect = chatbox.getBoundingClientRect()

    const desktop = window.innerWidth >= 768
    const pickerW = formRect.width * 0.9
    const availableH = formRect.top - chatboxRect.top - 8
    const pickerH = desktop
      ? Math.min(Math.max(availableH * 0.65, 100), 450)
      : Math.min(Math.max(availableH * 0.55, 80), 200)
    setSize({ width: desktop ? Math.min(pickerW, 500) : pickerW, height: pickerH })
    setEmojiSize(Math.max(14, Math.min(28, Math.round(pickerW / 16))))
    setDesktop(desktop)
  }, [formRef, chatboxRef])

  useEffect(() => {
    if (!isOpen) return
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [isOpen, measure])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="bg-white/50 backdrop-blur-md border border-white/60 p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center shrink-0"
        aria-label="Open emoji picker"
      >
        <span className="material-symbols-outlined text-primary/60 text-[clamp(18px,2.5vw,24px)]">
          emoji_emotions
        </span>
      </button>
      {isOpen &&
        formRef.current &&
        createPortal(
          <div
            ref={popoverRef}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              right: 0,
              zIndex: 50,
              display: 'flex',
              justifyContent: isDesktop ? 'flex-start' : 'center',
              padding: isDesktop ? '0 0 6px 16px' : '0 0 6px',
            }}
          >
            {Picker ? (
              <div
                style={{
                  '--epr-emoji-size': `${emojiSize}px`,
                  '--epr-emoji-padding': `${Math.max(1, Math.round(emojiSize / 9))}px`,
                  '--epr-emoji-gap': `${Math.max(0, Math.round(emojiSize / 18))}px`,
                  '--epr-search-bar-height': `${Math.max(14, Math.min(28, Math.round(size.width / 16)))}px`,
                  '--epr-search-font-size': `${Math.max(10, Math.round(size.width / 40))}px`,
                  '--epr-category-label-height': '0px',
                  '--epr-category-label-font-size': '0px',
                  '--epr-category-navigation-height': isDesktop ? `${Math.max(16, Math.min(30, Math.round(size.width / 18)))}px` : '0px',
                  '--epr-header-padding': `${Math.max(1, Math.round(size.width / 48))}px`,
                  '--epr-picker-border-radius': `${Math.max(2, Math.round(size.width / 64))}px`,
                } as React.CSSProperties}
              >
                {!isDesktop && <style>{`.epr-category-nav { display: none !important; }`}</style>}
                <Picker
                  onEmojiClick={(emojiData) => {
                    onEmojiSelect(emojiData.emoji)
                    setIsOpen(false)
                  }}
                  width={size.width}
                  height={size.height}
                  previewConfig={{ showPreview: false }}
                />
              </div>
            ) : (
              <div className="bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl flex items-center justify-center" style={{ width: size.width, height: size.height }}>
                <span className="typing-dots" aria-label="Loading">
                  <span /><span /><span />
                </span>
              </div>
            )}
          </div>,
          formRef.current,
        )}
    </>
  )
}
