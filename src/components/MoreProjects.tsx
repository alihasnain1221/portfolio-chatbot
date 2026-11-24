import { Link } from 'react-router-dom'
import { moreProjects, moreProjectsSection } from '../data/portfolio'

const linkClass =
  'inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-primary hover:text-on-surface transition-colors'

export default function MoreProjects() {
  return (
    <section className="space-y-8 sm:space-y-10 md:!mt-20" id="more-projects">
      <div className="space-y-2">
        <h3 className="font-headline-md text-headline-md font-light text-on-surface tracking-wide">
          {moreProjectsSection.heading}
        </h3>
        <p className="text-on-surface-variant font-light text-[14px] sm:text-base">{moreProjectsSection.sub}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {moreProjects.map((p) => (
          <div key={p.name} className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col gap-3">
            <span className="text-[10px] font-medium tracking-widest uppercase text-outline">{p.domain}</span>
            <h4 className="text-[19px] font-light text-on-surface">{p.name}</h4>
            <p className="text-[13px] text-on-surface-variant font-light leading-relaxed flex-1">{p.blurb}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 pt-3 border-t border-outline-variant/30">
              {p.tags.map((t) => (
                <span key={t} className="text-[10px] font-medium tracking-widest text-outline uppercase">
                  {t}
                </span>
              ))}
            </div>
            {p.to ? (
              <Link to={p.to} className={linkClass}>
                {p.cta ?? 'Open'} <span className="material-symbols-outlined text-[14px]">east</span>
              </Link>
            ) : p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Visit <span className="material-symbols-outlined text-[14px]">north_east</span>
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
