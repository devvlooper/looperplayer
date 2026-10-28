import { useEffect, useState } from 'react'
import linux from '../assets/linux.png'
import { isExternal, LINKS } from '../config'
import { PlayStoreIcon } from './icons/PlayStore'
import { WindowsIcon } from './icons/Windows'
import { Logo } from './Logo'

const SECTIONS = [
  { label: 'Features', href: '#features' },
  { label: 'Lyrics', href: '#lyrics' },
  { label: 'Screenshots', href: '#showcase' },
  { label: 'Download', href: '#download' },
  { label: 'FAQ', href: '#faq' },
]

const btn =
  'flex h-10 items-center rounded-xl border border-white/20 bg-white/[0.08] text-white transition ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:-translate-y-px hover:border-white/35 hover:bg-white/[0.14] active:translate-y-0 sm:h-12 md:h-14 md:rounded-2xl'

export function Header() {
  // Past the hero the bar turns more solid so text scrolling underneath doesn't show through.
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-3 z-50 mx-auto mt-[clamp(16px,4.3vw,62px)] w-[calc(100%-32px)] max-w-[1294px] md:w-[calc(100%-118px)]">
      <div
        className={`flex h-[56px] items-center justify-between gap-2 rounded-[20px] pl-3.5 pr-2 backdrop-blur-xl transition-[background-color,box-shadow] duration-500 sm:h-[68px] sm:rounded-[26px] sm:pl-5 sm:pr-3 ${
          scrolled || menu ? 'bg-[#1c1d17]/85 shadow-[0_12px_40px_rgba(0,0,0,0.45)]' : 'bg-white/[0.11]'
        } md:h-[97px] md:rounded-[32px] md:pl-[37px] md:pr-[30px]`}
      >
        <a href="#top" aria-label="Looper Player — home" className="rounded-lg">
          <Logo className="h-[24px] w-auto sm:h-[28px] md:h-[33px]" />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
          {SECTIONS.map((sec) => (
            <a
              key={sec.href}
              href={sec.href}
              className="rounded-xl px-3.5 py-2 text-[15.5px] text-white/75 transition hover:bg-white/[0.06] hover:text-white"
            >
              {sec.label}
            </a>
          ))}
        </nav>

        <nav className="flex items-center gap-1.5 sm:gap-[9px]" aria-label="Get the app">
          <a
            href={LINKS.linuxDownload}
            aria-label="Download for Linux"
            title="Download for Linux"
            className={`${btn} w-10 justify-center sm:w-12 md:w-[57px]`}
            {...(isExternal(LINKS.linuxDownload) && { target: '_blank', rel: 'noreferrer' })}
          >
            <img src={linux} alt="" width={21} height={25} className="h-[18px] w-auto sm:h-[22px] md:h-[24px]" />
          </a>
          <a
            href={LINKS.windowsDownload}
            aria-label="Download for Windows"
            title="Download for Windows"
            className={`${btn} w-10 justify-center sm:w-12 md:w-[57px]`}
            {...(isExternal(LINKS.windowsDownload) && { target: '_blank', rel: 'noreferrer' })}
          >
            <WindowsIcon className="size-[17px] sm:size-[20px] md:size-[22px]" />
          </a>
          <a
            href={LINKS.playStore}
            aria-label="Get it on Google Play"
            className={`${btn} w-10 justify-center gap-2 sm:w-auto sm:px-3 md:w-[171px] md:justify-start md:pl-[19px] md:pr-3`}
            {...(isExternal(LINKS.playStore) && { target: '_blank', rel: 'noreferrer' })}
          >
            <PlayStoreIcon className="size-[20px] shrink-0 sm:size-[27px] md:size-[31px]" />
            <span className="hidden text-left leading-none sm:block">
              <span className="block text-[9px] font-medium uppercase tracking-[0.02em]">Get it on</span>
              <span className="mt-[3px] block whitespace-nowrap text-[16.3px] font-medium tracking-[-0.015em]">
                Google Play
              </span>
            </span>
          </a>
          <button
            type="button"
            aria-label={menu ? 'Close menu' : 'Open menu'}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu((m) => !m)}
            className={`${btn} w-10 justify-center sm:w-12 lg:hidden`}
          >
            <svg viewBox="0 0 24 24" className="size-[18px] sm:size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              {menu ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile / tablet menu */}
      <nav
        id="mobile-menu"
        aria-label="Sections"
        className={`absolute inset-x-0 top-full mt-2 grid gap-1 rounded-[24px] border border-white/[0.06] bg-[#1c1d17]/95 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition duration-300 lg:hidden ${
          menu ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        {SECTIONS.map((sec) => (
          <a
            key={sec.href}
            href={sec.href}
            onClick={() => setMenu(false)}
            className="rounded-2xl px-4 py-3.5 text-[17px] text-white/85 transition hover:bg-white/[0.06] hover:text-white"
          >
            {sec.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
