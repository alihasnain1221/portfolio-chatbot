import { Link, useNavigate } from 'react-router-dom'
import { hero } from '../data/portfolio'
import AiTwinChat from './AiTwinChat'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section
      className="hero-bg overflow-visible relative -mx-[20px] md:-mx-[64px] -mt-28 md:-mt-40 px-6 md:px-16 shadow-lg"
      id="hero"
    >
      {/* ===== MOBILE / SMALL TABLET (< lg) ===== */}
      <div className="lg:hidden pt-28 md:pt-40 pb-8 flex flex-col items-center">
        {/* Text */}
        <div className="space-y-5 text-center max-w-md mx-auto">
          <h1 className="font-headline-xl text-[28px] sm:text-[32px] leading-[1.15] font-light text-on-surface tracking-tight">
            {hero.titleLight} <br />
            <span className="text-outline font-semibold">{hero.titleBold}</span>
          </h1>
          <p className="text-[14px] sm:text-[15px] text-on-surface-variant font-light leading-relaxed">
            {hero.blurb}
          </p>
          <div className="flex gap-3 justify-center flex-wrap pt-2">
            <a
              href="#projects"
              className="glass-panel text-on-surface px-6 py-3 rounded-xl text-[11px] drop-shadow-md tracking-widest inline-block"
            >
              {hero.primaryCta}
            </a>
            <Link
              to="/chat"
              className="bg-transparent border border-outline-variant px-6 py-3 rounded-xl text-[11px] text-on-surface-variant hover:bg-white/30 transition-all tracking-widest inline-block"
            >
              {hero.secondaryCta}
            </Link>
          </div>
        </div>

        {/* Portrait + floating AI button */}
        <div className="relative w-full mt-8 flex justify-center">
          <img
            src="/img/new_pic_2.png"
            alt="Ali Hasnain"
            className="w-auto max-w-full h-[260px] sm:h-[320px] md:h-[400px] object-contain object-bottom drop-shadow-[0px_20px_40px_rgba(0,0,0,0.18)] drop-shadow-[0px_8px_20px_rgba(0,0,0,0.14)]"
          />
          {/* Floating AI button */}
          <button
            onClick={() => navigate('/chat')}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 glass-panel-heavy rounded-full px-5 py-3 flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all shadow-lg group"
            aria-label="Chat with AI Twin"
          >
            <span
              className="material-symbols-outlined text-primary text-[22px] leading-none"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
            >
              hub
            </span>
            <span className="text-[11px] font-semibold tracking-widest text-on-surface uppercase">
              Ask my AI
            </span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </button>
        </div>
      </div>

      {/* ===== DESKTOP (lg+) ===== */}
      <div className="hidden lg:flex min-h-screen items-center pt-2 max-w-7xl mx-auto w-full">
        {/* Portrait behind content */}
        <img
          src="/img/new_pic_2.png"
          alt="Ali Hasnain"
          className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[80%] object-contain object-bottom z-10 drop-shadow-[0px_20px_40px_rgba(0,0,0,0.18)] drop-shadow-[0px_8px_20px_rgba(0,0,0,0.14)]"
        />

        {/* Text content - left */}
        <div className="max-w-xl space-y-6 wide:space-y-8 relative z-20 mr-10 xl:mr-20">
          <h1 className="font-headline-xl text-[28px] wide:text-[clamp(28px,2.5vw,52px)] leading-[1.15] font-light text-on-surface tracking-tight">
            {hero.titleLight} <br />
            <span className="text-outline font-semibold">{hero.titleBold}</span>
          </h1>
          <p className="text-[13px] wide:text-[clamp(13px,1.1vw,22px)] text-on-surface-variant max-w-[280px] wide:max-w-lg font-light leading-relaxed">
            {hero.blurb}
          </p>
          <div className="flex gap-3 wide:gap-4 flex-wrap">
            <a
              href="#projects"
              className="glass-panel text-on-surface px-5 wide:px-[clamp(20px,1.5vw,28px)] py-2.5 wide:py-[clamp(10px,0.5vw,14px)] rounded-xl text-[10px] wide:text-[clamp(10px,0.8vw,16px)] drop-shadow-md hover:shadow-xl transition-all tracking-widest inline-block"
            >
              {hero.primaryCta}
            </a>
            <Link
              to="/chat"
              className="bg-transparent border border-outline-variant px-5 wide:px-[clamp(20px,1.5vw,28px)] py-2.5 wide:py-[clamp(10px,0.5vw,14px)] rounded-xl text-[10px] wide:text-[clamp(10px,0.8vw,16px)] text-on-surface-variant hover:bg-white/30 transition-all tracking-widest inline-block"
            >
              {hero.secondaryCta}
            </Link>
          </div>
        </div>

        {/* AI Chat - right edge */}
        <div className="ml-auto relative z-20">
          <AiTwinChat />
        </div>
      </div>
    </section>
  )
}
