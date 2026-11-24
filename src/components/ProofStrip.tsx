import { proof } from '../data/portfolio'

// Four facts on record, straight under the hero, so the first scroll lands on proof.
export default function ProofStrip() {
  return (
    <section aria-label="Highlights" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:!mt-16">
      {proof.map((p) => (
        <div key={p.value} className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7">
          <p className="text-[20px] sm:text-[26px] md:text-[30px] leading-tight font-light text-on-surface tracking-tight">
            {p.value}
          </p>
          <p className="mt-2 text-[11px] sm:text-[13px] text-on-surface-variant font-light leading-snug">{p.label}</p>
        </div>
      ))}
    </section>
  )
}
