import { isExternal, LINKS } from '../config'
import { Logo } from './Logo'

const COLUMNS = [
  [
    { label: 'Features', href: '#features' },
    { label: 'Screenshots', href: '#showcase' },
    { label: 'Download', href: '#download' },
  ],
  [
    { label: 'GitHub', href: LINKS.github },
    { label: 'Report An Issue', href: LINKS.issues },
    { label: 'Contribute', href: LINKS.contribute },
  ],
  [
    { label: 'Support on Ko-fi', href: LINKS.kofi },
    { label: 'Privacy', href: LINKS.privacy },
    { label: 'License (GPL-3.0)', href: LINKS.licenses },
  ],
]

export function Footer() {
  return (
    <footer className="mx-auto mb-4 sm:mb-[clamp(24px,4.2vw,61px)] w-[calc(100%-32px)] max-w-[1321px] rounded-3xl border border-line bg-card px-6 py-8 sm:px-8 sm:py-10 md:w-[calc(100%-118px)] lg:py-0 lg:pl-[63px] lg:pr-8">
      <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 sm:gap-y-9 lg:h-[198px] lg:grid-cols-[305fr_330fr_330fr_240fr] lg:items-start lg:gap-x-0 lg:pt-[48px]">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Logo className="h-[31.5px] w-auto md:mt-[6px]" />
        </div>
        {COLUMNS.map((links, i) => (
          <ul key={i} className={`flex flex-col gap-2.5 sm:gap-[11.5px] ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="whitespace-nowrap rounded text-[16px] leading-[24px] sm:text-[17px] sm:leading-[25px] text-white/95 transition hover:text-badge md:text-[19px]"
                  {...(isExternal(l.href) && { target: '_blank', rel: 'noreferrer' })}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-1.5 border-t border-line py-5 text-[13px] sm:mt-10 sm:gap-2 sm:py-6 sm:text-[13.5px] text-white/40 sm:flex-row sm:justify-between lg:mt-0">
        <span>© {new Date().getFullYear()} Looper Player · Free and open source under GPL-3.0</span>
        <span>Made with Flutter, for people who own their music.</span>
      </div>
    </footer>
  )
}
