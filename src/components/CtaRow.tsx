import { COPY, isExternal, LINKS } from '../config'
import { PlayGithubIcon } from './icons/PlayGithub'

export function CtaRow() {
  return (
    <div id="download" className="mt-[clamp(40px,6.8vw,98px)] flex flex-wrap items-center justify-center gap-1.5">
      <a
        href={LINKS.github}
        aria-label={`${COPY.badge} downloads and stars — view on GitHub`}
        className="group flex h-12 items-center gap-[3px] rounded-[14px] bg-badge pl-3 pr-2.5 text-[12.5px] font-extrabold tracking-[-0.01em] text-bg shadow-[0_8px_18px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.28)] transition hover:-translate-y-px hover:shadow-[0_12px_24px_rgba(0,0,0,0.45),0_0_26px_rgba(216,255,0,0.25),inset_0_0_0_1px_rgba(255,255,255,0.4)]"
        {...(isExternal(LINKS.github) && { target: '_blank', rel: 'noreferrer' })}
      >
        <PlayGithubIcon className="h-[22px] w-auto" />
        {COPY.badge}
      </a>
      <a
        href={LINKS.playStore}
        className="flex h-12 items-center rounded-[14px] border border-olive-line bg-olive px-[18px] text-[18.5px] tracking-[-0.005em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:-translate-y-px hover:border-[#4a5022] hover:bg-[#25281a]"
        {...(isExternal(LINKS.playStore) && { target: '_blank', rel: 'noreferrer' })}
      >
        Download Now
      </a>
    </div>
  )
}
