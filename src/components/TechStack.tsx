import { stackCategories, stackSection, strengths } from '../data/portfolio'

export default function TechStack() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start max-w-5xl mx-auto"
      id="stack"
    >
      <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-40">
        <h2 className="font-headline-lg text-headline-lg font-light text-on-surface tracking-wide">
          {stackSection.heading} <br />
          {stackSection.headingBreak}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
          {stackSection.blurb}
        </p>
        <div className="space-y-6 sm:space-y-8 pt-4">
          {strengths.map((s) => (
            <div key={s.label} className="border-l-2 border-on-surface/70 pl-4">
              <p className="font-label-md text-on-surface tracking-widest uppercase text-xs">{s.label}</p>
              <p className="mt-1.5 text-[13px] text-on-surface-variant font-light leading-relaxed">{s.shipped}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-8">
        {stackCategories.map((c) => (
          <div
            key={c.title}
            className="glass-panel p-4 sm:p-10 rounded-3xl space-y-3 sm:space-y-6 flex flex-col items-center text-center"
          >
            <span className="material-symbols-outlined text-outline text-3xl sm:text-4xl font-light">{c.icon}</span>
            <h4 className="font-label-md text-[11px] sm:text-label-md tracking-widest text-on-surface uppercase">
              {c.title}
            </h4>
            <ul className="text-[12px] sm:text-sm text-on-surface-variant space-y-2 sm:space-y-3 font-light">
              {c.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
