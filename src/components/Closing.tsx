import { Link } from 'react-router-dom'
import { closing } from '../data/portfolio'

export default function Closing() {
  return (
    <section className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8" id="contact">
      <h2 className="text-[24px] sm:text-[32px] leading-tight font-light text-on-surface tracking-tight">
        {closing.heading}
      </h2>
      <p className="text-[14px] sm:text-body-md text-on-surface-variant font-light leading-relaxed">{closing.sub}</p>
      <div className="flex gap-3 sm:gap-4 justify-center items-center flex-wrap pt-2">
        <Link to="/chat" className="ai-cta">
          <span className="ai-cta__inner px-6 py-3 text-[11px]">
            <span className="material-symbols-outlined ai-cta__spark text-[16px] leading-none">auto_awesome</span>
            ASK MY AI
          </span>
        </Link>
        <Link
          to="/hire"
          className="glass-panel text-on-surface px-6 py-3 rounded-full text-[11px] tracking-widest font-semibold"
        >
          HIRE ME
        </Link>
        <a
          href={`mailto:${closing.email}`}
          className="text-[11px] tracking-widest font-semibold text-outline hover:text-on-surface transition-colors px-2 py-3"
        >
          EMAIL ME
        </a>
      </div>
    </section>
  )
}
