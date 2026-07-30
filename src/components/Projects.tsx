import { heroProject, projectsSection, sideProjects } from '../data/portfolio'

export default function Projects() {
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

      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 sm:gap-7 md:gap-8 md:min-h-[750px]">
        {/* Hero project */}
        <div className="md:col-span-8 md:row-span-2 glass-panel rounded-[2rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col min-[1111px]:justify-between group hover:border-white transition-all duration-500 relative overflow-hidden min-[1111px]:min-h-[560px]">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-5 sm:mb-6 md:mb-5 gap-4 flex-wrap">
              <span className="border border-outline-variant text-on-surface text-[10px] font-medium tracking-widest uppercase px-3 sm:px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                {heroProject.badge}
              </span>
              <span className="text-outline font-mono text-sm">{heroProject.index}</span>
            </div>
            <h3 className="font-headline-xl text-headline-md sm:text-[clamp(38px,4vw,48px)] md:text-headline-xl mb-3 md:mb-2 font-light tracking-wide text-on-surface">
              {heroProject.name}
            </h3>
            <p className="font-body-lg text-[13px] sm:text-[15px] md:text-[clamp(16px,1.25vw,24px)] text-on-surface-variant font-light leading-relaxed max-w-3xl md:max-w-[52ch] mb-5 sm:mb-7 min-[1111px]:mb-0">
              {heroProject.blurb}
            </p>
          </div>
          <div className="hidden min-[1111px]:flex flex-1 items-center justify-start">
            <div className="space-y-2.5">
              {heroProject.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[14px] md:text-[16px] mt-0.5 shrink-0">check</span>
                  <span className="text-[12px] md:text-[13px] lg:text-[14px] text-on-surface-variant font-light leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden min-[1111px]:flex flex-wrap gap-2.5 sm:gap-3 mb-3 sm:mb-4 md:mb-4">
            {heroProject.tags.map((t) => (
              <span
                key={t}
                className="border border-outline-variant bg-transparent px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-label-md text-on-surface tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl md:translate-y-0 md:mt-0">
            <img
              className="w-full h-auto max-h-[180px] sm:max-h-[280px] min-[1111px]:max-h-none object-contain md:scale-[1.02] origin-center"
              src={heroProject.image}
              alt="SPiN AI content moderation pipeline: AWS Rekognition, OpenAI Moderation, GPT-4o, then verdict to MongoDB"
            />
          </div>
          <div className="flex justify-center mt-4 sm:mt-6 min-[1111px]:mt-6">
            <a
              href={heroProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-full border border-outline-variant text-on-surface text-xs font-semibold tracking-widest uppercase hover:bg-white/20 transition-colors"
            >
              Visit Project
            </a>
          </div>
          <div className="flex min-[1111px]:hidden flex-wrap gap-3 sm:gap-4 border-t border-outline-variant/30 pt-4 sm:pt-5 mt-4 sm:mt-5">
            {heroProject.tags.map((t) => (
              <span key={t} className="text-[10px] font-medium tracking-widest text-outline uppercase">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Side projects */}
        {sideProjects.map((p) => (
          <div
            key={p.name}
            className="md:col-span-4 glass-panel rounded-[2rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col justify-between hover:border-white transition-all duration-500 cursor-pointer group"
          >
            <div>
              <div className="flex justify-between items-start mb-4 sm:mb-6 gap-4">
                <h3 className="font-headline-md text-headline-md font-light text-on-surface">{p.name}</h3>
                <span className="material-symbols-outlined text-outline font-light group-hover:text-on-surface transition-colors">
                  north_east
                </span>
              </div>
              <p className="font-body-md text-[13px] sm:text-[15px] text-on-surface-variant font-light leading-relaxed">
                {p.blurb}
              </p>
            </div>
            <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl mt-5 sm:mt-6">
              <img
                className="w-full h-auto object-contain"
                src={p.image}
                alt={`${p.name} architecture diagram`}
              />
            </div>
            {p.url ? (
              <div className="flex justify-center mt-4 sm:mt-5">
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
            <div className="flex flex-wrap gap-3 sm:gap-4 border-t border-outline-variant/30 pt-5 sm:pt-6 mt-5 sm:mt-6">
              {p.tags.map((t) => (
                <span key={t} className="text-[10px] font-medium tracking-widest text-outline uppercase">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
