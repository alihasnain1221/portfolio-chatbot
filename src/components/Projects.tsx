import { heroProject, projectsSection, sideProjects } from '../data/portfolio'

export default function Projects() {
  return (
    <section className="space-y-16" id="projects">
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

      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-8 md:min-h-[750px]">
        {/* Hero project */}
        <div className="md:col-span-8 md:row-span-2 glass-panel rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between group hover:border-white transition-all duration-500 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <span className="border border-outline-variant text-on-surface text-[10px] font-medium tracking-widest uppercase px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                {heroProject.badge}
              </span>
              <span className="text-outline font-mono text-sm">{heroProject.index}</span>
            </div>
            <h3 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl mb-6 font-light tracking-wide text-on-surface">
              {heroProject.name}
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl font-light leading-relaxed">
              {heroProject.blurb}
            </p>
          </div>
          <div className="mt-16 relative z-10">
            <div className="flex flex-wrap gap-3 mb-10">
              {heroProject.tags.map((t) => (
                <span
                  key={t}
                  className="border border-outline-variant bg-transparent px-5 py-2 rounded-full text-xs font-label-md text-on-surface tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="w-full h-80 rounded-3xl overflow-hidden border border-outline-variant/30 shadow-2xl bg-[#eaf1f6] transition-transform group-hover:scale-[1.02] duration-700 ease-out">
              <img
                className="w-full h-full object-contain"
                src={heroProject.image}
                alt="SPiN AI content moderation pipeline: AWS Rekognition, OpenAI Moderation, GPT-4o, then verdict to MongoDB"
              />
            </div>
          </div>
        </div>

        {/* Side projects */}
        {sideProjects.map((p) => (
          <div
            key={p.name}
            className="md:col-span-4 glass-panel rounded-[2.5rem] p-10 flex flex-col justify-between hover:border-white transition-all duration-500 cursor-pointer group"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-headline-md text-headline-md font-light text-on-surface">{p.name}</h3>
                <span className="material-symbols-outlined text-outline font-light group-hover:text-on-surface transition-colors">
                  north_east
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                {p.blurb}
              </p>
            </div>
            <div className="flex gap-4 border-t border-outline-variant/30 pt-6">
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
