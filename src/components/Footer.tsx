import { isExternal, LINKS } from '../config'
import { Logo } from './Logo'

const COLUMNS = [
  [
    { label: 'Features', href: LINKS.github },
    { label: 'Screenshots', href: '#showcase' },
    { label: 'Download', href: '#download' },
  ],
  [
    { label: 'GitHub', href: LINKS.github },
    { label: 'Report An Issue', href: LINKS.issues },
    { label: 'Contribute', href: LINKS.contribute },
  ],
  [
    { label: 'Legal', href: LINKS.licenses },
    { label: 'Privacy Policy', href: LINKS.privacy },
    { label: 'Licenses', href: LINKS.licenses },
  ],
]

export function Footer() {
  return (
    <footer className="mx-auto mb-[clamp(24px,4.2vw,61px)] w-[calc(100%-32px)] max-w-[1321px] rounded-3xl border border-line bg-card px-8 py-10 md:w-[calc(100%-118px)] md:py-0 md:pl-[63px] md:pr-8">
      <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:h-[198px] md:grid-cols-[305fr_371fr_398fr_152fr] md:items-start md:gap-x-0 md:pt-[48px]">
        <div className="col-span-2 md:col-span-1">
          <Logo className="h-[31.5px] w-auto md:mt-[6px]" />
        </div>
        {COLUMNS.map((links, i) => (
          <ul key={i} className={`flex flex-col gap-[11.5px] ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="whitespace-nowrap rounded text-[17px] leading-[25px] text-white/95 transition hover:text-badge md:text-[19px]"
                  {...(isExternal(l.href) && { target: '_blank', rel: 'noreferrer' })}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </footer>
  )
}
