import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from '../hooks/useInView'

const STATS = [
  { value: 10, suffix: 'K+', label: 'Downloads on GitHub' },
  { value: 18, suffix: '', label: 'Equalizer bands' },
  { value: 14, suffix: '', label: 'Languages' },
  { value: 12, suffix: '', label: 'Home-screen widgets' },
  { value: 0, suffix: '', label: 'Ads, accounts or trackers' },
]

export function Stats() {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className="mx-auto mt-10 sm:mt-[clamp(56px,7vw,96px)] w-[calc(100%-32px)] max-w-[1180px]">
      <div className="glow-line" />
      <dl className="grid grid-cols-2 gap-y-6 py-7 sm:grid-cols-3 sm:gap-y-8 sm:py-10 lg:grid-cols-5">
        {STATS.map((s, i) => (
          <div key={s.label} className={`text-center ${i === STATS.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}>
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-display text-[1.9rem] sm:text-[clamp(2.2rem,3.6vw,3rem)] font-extrabold leading-none tracking-[-0.03em]">
              <CountUp to={s.value} run={inView} delay={i * 120} />
              <span className="text-badge">{s.suffix}</span>
            </dd>
            <dd aria-hidden="true" className="mt-1.5 text-[13px] text-white/55 sm:mt-2 sm:text-[14px]">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
      <div className="glow-line" />
    </div>
  )
}

function CountUp({ to, run, delay }: { to: number; run: boolean; delay: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    const duration = prefersReducedMotion() ? 0 : 1400
    let raf = 0
    const begin = performance.now() + (duration ? delay : 0)
    const tick = (now: number) => {
      const t = duration ? Math.min(1, Math.max(0, (now - begin) / duration)) : 1
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to, delay])
  return <>{n}</>
}
