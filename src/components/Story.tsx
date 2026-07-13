import { story } from '../data/portfolio'

export default function Story() {
  return (
    <section
      className="glass-panel-heavy rounded-[2rem] md:rounded-[3rem] p-8 sm:p-16 md:p-32 overflow-hidden relative"
      id="story"
    >
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-white/40 blur-[100px] rounded-full" />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
        <div className="space-y-12">
          <div className="inline-block px-6 py-2 rounded-full border border-outline-variant text-xs tracking-widest text-outline uppercase font-medium">
            {story.tag}
          </div>
          <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-light leading-tight text-on-surface">
            {story.heading}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed font-light">
            {story.blurb}
          </p>
          <div className="pt-10 border-t border-outline-variant/30 grid grid-cols-3 gap-10">
            {story.stats.map((s) => (
              <div key={s.label}>
                <p className="font-headline-md text-headline-md font-light text-on-surface">{s.value}</p>
                <p className="text-[10px] text-outline font-medium tracking-widest uppercase mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-[2.5rem] overflow-hidden glass-panel p-6">
            <img className="w-full h-full object-cover rounded-3xl" src={story.image} alt="Architectural model" />
          </div>
          <div
            className="hidden md:block absolute -top-12 -left-12 glass-panel-heavy p-8 rounded-3xl shadow-2xl animate-bounce"
            style={{ animationDuration: '6s' }}
          >
            <span className="material-symbols-outlined text-outline block text-center mb-4 text-3xl font-light">
              architecture
            </span>
            <p className="text-[10px] font-medium tracking-widest uppercase text-on-surface">{story.badge}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
