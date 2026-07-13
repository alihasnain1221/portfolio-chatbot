import { useState } from 'react'
import { Link } from 'react-router-dom'
import { nav } from '../data/portfolio'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/20 backdrop-blur-3xl border-b border-white/60 shadow-[inset_0px_1px_2px_rgba(255,255,255,0.8)]">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link to="/" onClick={close} className="flex items-center gap-3 group">
          <span
            className="material-symbols-outlined text-primary text-[30px] leading-none"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
          >
            hub
          </span>
          <span className="font-headline-md text-headline-md tracking-widest text-on-surface uppercase font-light group-hover:text-primary transition-colors">
            {nav.name}
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-12 items-center">
          {nav.links.map((l) => (
            <a
              key={l.href}
              className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md tracking-widest"
              href={l.href}
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/hire"
            className="bg-transparent border border-outline text-primary font-label-md text-label-md px-8 py-2.5 rounded-full hover:bg-white/40 active:scale-95 transition-all duration-300"
          >
            {nav.cta}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2.5 text-on-surface"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-white/60 bg-white/50 backdrop-blur-3xl px-margin-mobile py-6 flex flex-col gap-1">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md tracking-widest py-3"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/hire"
            onClick={close}
            className="mt-3 text-center bg-transparent border border-outline text-primary font-label-md text-label-md px-8 py-3 rounded-full hover:bg-white/40 active:scale-95 transition-all duration-300"
          >
            {nav.cta}
          </Link>
        </div>
      )}
    </nav>
  )
}
