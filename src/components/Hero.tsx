import { COPY } from '../config'
import { CtaRow } from './CtaRow'

export function Hero() {
  return (
    <section id="top" className="relative px-5 pt-[clamp(72px,10vw,144px)] text-center">
      <h1 className="mx-auto font-display text-[clamp(2.15rem,5.68vw,5.15rem)] font-extrabold leading-[1.09] tracking-[-0.014em] text-white">
        {COPY.headline[0]}
        <br /> {COPY.headline[1]}
      </h1>
      <p className="mx-auto mt-[clamp(24px,4vw,58px)] max-w-[790px] text-[clamp(1rem,1.32vw,1.2rem)] leading-[1.76] text-white/95">
        {COPY.subhead}
      </p>
      <CtaRow />
    </section>
  )
}
