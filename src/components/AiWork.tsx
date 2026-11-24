import { aiWork } from '../data/portfolio'

export default function AiWork() {
  return (
    <section className="max-w-5xl mx-auto space-y-8 sm:space-y-12" id="ai">
      <div className="space-y-5 max-w-2xl">
        <div className="inline-block px-5 py-2 rounded-full border border-outline-variant text-[10px] sm:text-xs tracking-widest text-outline uppercase font-medium">
          {aiWork.tag}
        </div>
        <h2 className="font-headline-lg text-[26px] leading-tight sm:text-headline-lg font-light text-on-surface tracking-wide">
          {aiWork.heading}
        </h2>
        <p className="font-body-md text-[14px] sm:text-body-md text-on-surface-variant font-light leading-relaxed">
          {aiWork.blurb}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {aiWork.items.map((it) => (
          <div key={it.title} className="glass-panel rounded-3xl p-6 sm:p-8 space-y-3">
            <span className="material-symbols-outlined text-primary text-3xl font-light">{it.icon}</span>
            <h3 className="font-label-md text-label-md tracking-widest text-on-surface uppercase">{it.title}</h3>
            <p className="text-[13px] sm:text-sm text-on-surface-variant font-light leading-relaxed">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
