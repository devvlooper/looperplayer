import type { CSSProperties } from 'react'
import { COPY } from '../config'
import { CtaRow } from './CtaRow'

export function Hero() {
  return (
    <section id="top" className="relative px-5 pt-12 sm:pt-[clamp(72px,10vw,144px)] text-center">
      <h1 className="mx-auto font-display text-[clamp(1.75rem,7.4vw,5.15rem)] sm:text-[clamp(2.15rem,5.68vw,5.15rem)] font-extrabold leading-[1.09] tracking-[-0.014em] text-white">
        {COPY.headline[0]}
        <br /> {COPY.headline[1]}
      </h1>
      <p className="mx-auto mt-5 max-w-[790px] text-[15px] leading-[1.65] sm:mt-[clamp(24px,4vw,58px)] sm:text-[clamp(1rem,1.32vw,1.2rem)] sm:leading-[1.76] text-white/95">
        {COPY.subhead}
      </p>
      <CtaRow />
      <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[13px] sm:mt-6 sm:gap-x-5 sm:gap-y-2 sm:text-[14px] text-white/55" aria-label="Highlights">
        {['Android, Linux & Windows', 'Free & open source', 'No ads, no tracking'].map((t) => (
          <li key={t} className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="size-4 text-badge" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
            {t}
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="hero-eq mx-auto mt-7 flex h-8 sm:mt-10 sm:h-10 w-[min(420px,80%)] items-end justify-center gap-[5px] opacity-60">
        {Array.from({ length: 28 }, (_, i) => (
          <span
            key={i}
            className="h-full w-[4px] rounded-full bg-gradient-to-t from-lime/20 to-lime"
            style={{ '--i': i, height: `${40 + 60 * Math.abs(Math.sin(i * 0.7))}%` } as CSSProperties}
          />
        ))}
      </div>
    </section>
  )
}
