import linux from '../assets/linux.png'
import { isExternal, LINKS } from '../config'
import { PlayStoreIcon } from './icons/PlayStore'
import { Logo } from './Logo'

const btn =
  'flex h-14 items-center rounded-2xl border-2 border-[#7d8748] bg-bg text-white shadow-[0_0_0_2px_rgba(190,205,120,0.12)] transition ' +
  'hover:-translate-y-px hover:border-[#a9b955] active:translate-y-0'

export function Header() {
  return (
    <header className="sticky top-3 z-50 mx-auto mt-[clamp(16px,4.3vw,62px)] w-[calc(100%-32px)] max-w-[1294px] md:w-[calc(100%-118px)]">
      <div className="flex h-[68px] items-center justify-between rounded-[26px] bg-white/[0.11] pl-5 pr-3 backdrop-blur-[3px] md:h-[97px] md:rounded-[32px] md:pl-[37px] md:pr-[30px]">
        <a href="#top" aria-label="Looper Player — home" className="rounded-lg">
          <Logo className="h-[28px] w-auto md:h-[33px]" />
        </a>

        <nav className="flex items-center gap-[9px]" aria-label="Get the app">
          <a
            href={LINKS.linuxDownload}
            aria-label="Download for Linux"
            className={`${btn} w-[52px] justify-center md:w-[57px]`}
            {...(isExternal(LINKS.linuxDownload) && { target: '_blank', rel: 'noreferrer' })}
          >
            <img src={linux} alt="" width={21} height={25} className="h-[22px] w-auto md:h-[24px]" />
          </a>
          <a
            href={LINKS.playStore}
            aria-label="Get it on Google Play"
            className={`${btn} gap-2 px-3.5 md:w-[171px] md:justify-start md:pl-[19px] md:pr-3`}
            {...(isExternal(LINKS.playStore) && { target: '_blank', rel: 'noreferrer' })}
          >
            <PlayStoreIcon className="size-[31px] shrink-0" />
            <span className="text-left leading-none">
              <span className="block text-[9px] font-medium uppercase tracking-[0.02em]">Get it on</span>
              <span className="mt-[3px] block whitespace-nowrap text-[16.3px] font-medium tracking-[-0.015em]">
                Google Play
              </span>
            </span>
          </a>
        </nav>
      </div>
    </header>
  )
}
