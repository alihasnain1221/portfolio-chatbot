import { useState, useRef, useEffect } from 'react'

const EMOJIS = [
  '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊',
  '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😗',
  '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭',
  '🤔', '🤐', '😐', '😑', '😶', '😏', '😒', '🙄',
  '😬', '😮', '😯', '😲', '😳', '🥺', '😢', '😭',
  '😤', '😡', '🤬', '😈', '👿', '💀', '☠️', '💩',
  '👍', '👎', '👊', '✊', '🤛', '🤜', '👏', '🙌',
  '🤲', '🤝', '🙏', '✌️', '🤟', '🤘', '👌', '❤️',
  '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '💯',
  '🔥', '✨', '⭐', '🌟', '💡', '🎯', '🎉', '🎊',
  '🎈', '🎁', '🏆', '🚀', '💪', '👀', '🧠', '🗣️',
]

interface Props {
  onSelect: (emoji: string) => void
}

export default function EmojiPicker({ onSelect }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center p-0 bg-transparent border-none cursor-pointer"
        aria-label="Emoji picker"
      >
        <span className="material-symbols-outlined text-primary/60 text-[18px] sm:text-[20px] hover:text-primary transition-colors">
          emoji_emotions
        </span>
      </button>
      {open && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[300px] max-w-[calc(100vw-32px)] max-h-[40vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-white/60 p-3 pt-8 grid grid-cols-8 gap-1 z-50">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white rounded-lg text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Close emoji picker"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => {
                onSelect(emoji)
              }}
              className="text-[20px] sm:text-[22px] p-1 hover:bg-primary/10 rounded-lg transition-colors"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
