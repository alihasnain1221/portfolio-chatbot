import { useEffect, useState } from 'react'
import { featuredProjects, projectsSection } from '../data/portfolio'

export default function Projects() {
  const [featured, setFeatured] = useState(featuredProjects[0])
  const [isDesktop, setIsDesktop] = useState(false)

  // Desktop-only spotlight swap: the lg: grid (big card + stacked side cards)
  // is the layout that gets the interaction. Below lg everything stacks in the
  // original static order no matter what `featured` holds.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const big = isDesktop ? featured : featuredProjects[0]
  const sideCards = isDesktop
    ? featuredProjects.filter((p) => p !== featured)
    : featuredProjects.slice(1)

  return (
    <section className="space-y-12 sm:space-y-16" id="projects">
      <div className="flex justify-between items-end flex-wrap gap-4">
        <div className="space-y-4">
          <h2 className="font-headline-lg text-headline-lg font-light text-on-surface tracking-wide">
            {projectsSection.heading}
          </h2>
          <p className="text-on-surface-variant font-light">{projectsSection.sub}</p>
        </div>
        <button className="text-outline font-label-md text-label-md flex items-center gap-2 hover:text-on-surface transition-colors tracking-widest uppercase">
          {projectsSection.allLabel} <span className="material-symbols-outlined font-light">east</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-6 sm:gap-7 md:gap-8 lg:min-h-[750px]">
        {/* Featured (big) card — keyed wrapper remounts content on swap so the
            staggered reveal replays every time the featured project changes */}
        <div className="lg:col-span-8 lg:row-span-2 glass-panel rounded-[2rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col group hover:border-white transition-all duration-500 relative overflow-hidden lg:min-h-[560px]">
          <div key={big.name} className="flex flex-col flex-1 lg:justify-between">
            <div className="reveal-item relative z-10" style={{ animationDelay: '0ms' }}>
              <div className="flex justify-between items-start mb-5 sm:mb-6 md:mb-5 gap-4 flex-wrap">
                <span className="border border-outline-variant text-on-surface text-[10px] font-medium tracking-widest uppercase px-3 sm:px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                  {big.badge}
                </span>
                <div className="flex items-center gap-2.5">
                  <span className="hidden lg:inline-flex items-center gap-1.5 border border-primary/40 text-primary text-[10px] font-medium tracking-widest uppercase px-3 sm:px-4 py-2 rounded-full bg-primary/10">
                    <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                    Featured
                  </span>
                  <span className="text-outline font-mono text-sm">{big.index}</span>
                </div>
              </div>
              <h3 className="font-headline-xl text-headline-md sm:text-[clamp(38px,4vw,48px)] md:text-headline-xl mb-3 md:mb-2 font-light tracking-wide text-on-surface truncate">
                {big.name}
              </h3>
              <p className="font-body-lg text-[13px] sm:text-[15px] md:text-[clamp(16px,1.25vw,24px)] text-on-surface-variant font-light leading-relaxed max-w-3xl md:max-w-[52ch] mb-5 sm:mb-7 lg:mb-0">
                {big.blurb}
              </p>
            </div>
            <div className="reveal-item hidden lg:flex flex-1 items-center justify-start" style={{ animationDelay: '70ms' }}>
              <div className="space-y-2.5">
                {big.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[14px] md:text-[16px] mt-0.5 shrink-0">check</span>
                    <span className="text-[12px] md:text-[13px] lg:text-[14px] text-on-surface-variant font-light leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-item hidden lg:flex flex-wrap gap-2.5 sm:gap-3 mb-3 sm:mb-4 md:mb-4" style={{ animationDelay: '130ms' }}>
              {big.tags.map((t) => (
                <span
                  key={t}
                  className="border border-outline-variant bg-transparent px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-label-md text-on-surface tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="reveal-item w-full overflow-hidden rounded-2xl sm:rounded-3xl md:translate-y-0 md:mt-0" style={{ animationDelay: '190ms' }}>
              <img
                className="w-full h-auto max-h-[180px] sm:max-h-[280px] lg:max-h-none object-contain md:scale-[1.02] origin-center"
                src={big.image}
                alt={`${big.name} architecture diagram`}
              />
            </div>
            <div className="reveal-item flex justify-center mt-4 sm:mt-6 lg:mt-6" style={{ animationDelay: '240ms' }}>
              {big.url ? (
                <a
                  href={big.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-full border border-outline-variant text-on-surface text-xs font-semibold tracking-widest uppercase hover:bg-white/20 transition-colors"
                >
                  Visit Project
                </a>
              ) : null}
            </div>
            <div className="reveal-item flex lg:hidden flex-wrap gap-3 sm:gap-4 border-t border-outline-variant/30 pt-4 sm:pt-5 mt-4 sm:mt-5" style={{ animationDelay: '70ms' }}>
              {big.tags.map((t) => (
                <span key={t} className="text-[10px] font-medium tracking-widest text-outline uppercase">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Side cards — clicking one features it in the big card (desktop only) */}
        {sideCards.map((p) => {
          const clickable = isDesktop
          return (
            <div
              key={p.name}
              role={clickable ? 'button' : undefined}
              tabIndex={clickable ? 0 : undefined}
              aria-label={clickable ? `Show ${p.name} as featured project` : undefined}
              onClick={clickable ? () => setFeatured(p) : undefined}
              onKeyDown={
                clickable
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setFeatured(p)
                      }
                    }
                  : undefined
              }
              className={`lg:col-span-4 glass-panel rounded-[2rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col justify-between transition-all duration-500 cursor-pointer group ${
                clickable ? 'hover:border-white active:scale-[0.99]' : ''
              }`}
            >
              <div key={p.name} className="flex flex-col flex-1 justify-between">
                <div className="reveal-item" style={{ animationDelay: '0ms' }}>
                  <div className="flex justify-between items-start mb-4 sm:mb-6 gap-4">
                    <h3 className="font-headline-md text-headline-md font-light text-on-surface min-w-0 flex-1 truncate">{p.name}</h3>
                    <span className="material-symbols-outlined text-outline font-light group-hover:text-on-surface transition-colors shrink-0">
                      north_east
                    </span>
                  </div>
                  <p className="font-body-md text-[13px] sm:text-[15px] text-on-surface-variant font-light leading-relaxed">
                    {p.blurb}
                  </p>
                </div>
                <div className="reveal-item w-full overflow-hidden rounded-2xl sm:rounded-3xl mt-5 sm:mt-6" style={{ animationDelay: '60ms' }}>
                  <img
                    className="w-full h-auto object-contain"
                    src={p.image}
                    alt={`${p.name} architecture diagram`}
                  />
                </div>
                {p.url ? (
                  <div className="reveal-item flex justify-center mt-4 sm:mt-5" style={{ animationDelay: '120ms' }}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 rounded-full border border-outline-variant text-on-surface text-xs font-semibold tracking-widest uppercase hover:bg-white/20 transition-colors"
                    >
                      Visit Project
                    </a>
                  </div>
                ) : null}
                <div className="reveal-item flex flex-wrap gap-3 sm:gap-4 border-t border-outline-variant/30 pt-5 sm:pt-6 mt-5 sm:mt-6" style={{ animationDelay: '120ms' }}>
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] font-medium tracking-widest text-outline uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
