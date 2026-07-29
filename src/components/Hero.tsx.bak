import { Link } from 'react-router-dom'
import { hero } from '../data/portfolio'
import AiTwinChat from './AiTwinChat'

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center" id="hero">
      <div className="space-y-8">
        <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl leading-tight font-light text-on-surface">
          {hero.titleLight} <br />
          <span className="text-outline font-semibold">{hero.titleBold}</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg font-light leading-relaxed">
          {hero.blurb}
        </p>
        <div className="flex gap-6 flex-wrap">
          <a
            href="#projects"
            className="glass-panel text-on-surface px-10 py-4 rounded-xl font-label-md text-label-md hover:shadow-xl transition-all tracking-widest inline-block"
          >
            {hero.primaryCta}
          </a>
          <Link
            to="/chat"
            className="bg-transparent border border-outline-variant px-10 py-4 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-white/30 transition-all tracking-widest inline-block"
          >
            {hero.secondaryCta}
          </Link>
        </div>
      </div>
      <AiTwinChat />
    </section>
  )
}
