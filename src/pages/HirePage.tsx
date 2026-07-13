import { useState } from 'react'
import { hirePage } from '../data/portfolio'

// "Hire Me" page, ported from the Stitch "Blueprint Variant": a centered inquiry
// title over a two-column blueprint slab (engagement details + contact form).
// Uses the shared Layout (nav/background/footer). The form has no backend, so
// submit composes a prefilled mailto to the contact address.
export default function HirePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [engagement, setEngagement] = useState(hirePage.form.engagementOptions[0])
  const [message, setMessage] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Inquiry (${engagement})${name ? ' from ' + name : ''}`
    const body =
      `Name / Organization: ${name}\n` +
      `Email: ${email}\n` +
      `Engagement: ${engagement}\n\n` +
      `${message}`
    window.location.href =
      `mailto:${hirePage.form.to}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`
  }

  const field =
    'w-full bg-white/40 border border-outline-variant/50 rounded-xl py-3 px-4 focus:border-outline focus:ring-0 focus:outline-none backdrop-blur-sm font-light text-on-surface transition-colors'
  const fieldLabel =
    'block font-label-sm text-label-sm text-on-surface tracking-wider uppercase'

  return (
    <main className="relative pt-32 md:pt-40 pb-24 md:pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto min-h-dvh flex flex-col justify-center">
      <div className="text-center space-y-4 mb-10">
        <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl leading-tight font-light text-on-surface">
          {hirePage.title}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
          {hirePage.subtitle}
        </p>
      </div>

      <section className="glass-blueprint-slab rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col lg:flex-row gap-16 lg:gap-0">
        {/* Left: engagement details */}
        <div className="lg:w-1/2 lg:pr-16 space-y-12">
          <div className="space-y-4 border-b border-outline-variant/30 pb-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <h3 className="font-label-md text-label-md tracking-widest text-on-surface uppercase font-medium">
                {hirePage.availabilityLabel}
              </h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
              {hirePage.availability}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-label-md text-label-md tracking-widest text-on-surface uppercase font-medium">
              {hirePage.engagementLabel}
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {hirePage.engagementModels.map((m, i) => (
                <div
                  key={m.title}
                  className={`p-6 rounded-2xl bg-white/20 border border-white/40 hover:bg-white/30 transition-colors ${
                    i === hirePage.engagementModels.length - 1 ? 'opacity-80' : ''
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-headline-md text-lg font-light text-on-surface">{m.title}</h4>
                    <span className="material-symbols-outlined text-outline font-light">{m.icon}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant font-light">{m.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-label-md text-label-md tracking-widest text-on-surface uppercase font-medium">
              {hirePage.domainsLabel}
            </h3>
            <div className="flex flex-wrap gap-3">
              {hirePage.domains.map((d) => (
                <span
                  key={d}
                  className="border border-outline-variant bg-white/20 px-4 py-1.5 rounded-full text-xs font-label-md text-on-surface tracking-wider"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: contact form */}
        <div className="lg:w-1/2 lg:pl-16 lg:blueprint-divider flex flex-col justify-center">
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-10 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            <div className="mb-8">
              <h2 className="font-headline-md text-headline-md font-light text-on-surface mb-2">
                {hirePage.form.heading}
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant font-light">
                {hirePage.form.sub}
              </p>
            </div>
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className={fieldLabel} htmlFor="name">
                  Name / Organization
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={field}
                  placeholder="Jane Doe / Acme Corp"
                />
              </div>
              <div className="space-y-2">
                <label className={fieldLabel} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={field}
                  placeholder="jane@acme.com"
                />
              </div>
              <div className="space-y-2">
                <label className={fieldLabel} htmlFor="engagement">
                  Engagement type
                </label>
                <select
                  id="engagement"
                  value={engagement}
                  onChange={(e) => setEngagement(e.target.value)}
                  className={`${field} appearance-none`}
                >
                  {hirePage.form.engagementOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className={fieldLabel} htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${field} h-32 resize-none`}
                  placeholder="What are you building? Current architecture, bottlenecks, or the vision..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 font-label-md text-label-md py-4 rounded-xl transition-all duration-300 tracking-widest mt-4"
              >
                {hirePage.form.submit}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
