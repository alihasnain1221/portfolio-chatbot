import { footer } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-outline-variant/30 w-full py-16 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-10">
        <div className="space-y-4 text-center md:text-left">
          <span className="font-headline-md text-headline-md block font-light tracking-widest uppercase text-on-surface">
            {footer.name}
          </span>
          <p className="text-outline font-label-sm text-label-sm max-w-sm font-light">{footer.copy}</p>
        </div>
        <div className="flex gap-10">
          {footer.links.map((l) => (
            <a
              key={l.label}
              className="text-outline hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-widest uppercase"
              href={l.href}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
