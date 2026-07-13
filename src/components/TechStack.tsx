import { masteryBars, stackCategories, stackSection } from '../data/portfolio'

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
        <div className="space-y-14 pt-8">
          {masteryBars.map((b) => (
            <div key={b.label}>
              <div className="flex justify-between items-end mb-4">
                <span className="font-label-md text-label-md text-on-surface tracking-widest uppercase text-xs">
                  {b.label}
                </span>
                <span className="font-mono text-outline text-sm">{b.pct}%</span>
              </div>
              <div className="h-[2px] w-full bg-outline-variant/30 overflow-hidden">
                <div className="h-full bg-on-surface mastery-bar-fill" style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {stackCategories.map((c) => (
          <div
            key={c.title}
            className="glass-panel p-10 rounded-3xl space-y-6 flex flex-col items-center text-center"
          >
            <span className="material-symbols-outlined text-outline text-4xl font-light">{c.icon}</span>
            <h4 className="font-label-md text-label-md tracking-widest text-on-surface uppercase">
              {c.title}
            </h4>
            <ul className="text-sm text-on-surface-variant space-y-3 font-light">
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
