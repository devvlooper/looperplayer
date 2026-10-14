import phoneAnalyze from '../assets/shots/phone-analyze.webp'
import { useInView } from '../hooks/useInView'
import { Reveal, SectionHead } from './Reveal'

const GENRES = [
  { name: 'Indie', pct: 38, color: '#d8ff00' },
  { name: 'Rock', pct: 27, color: '#ff5c8a' },
  { name: 'Bollywood', pct: 21, color: '#ffa62b' },
  { name: 'Electronic', pct: 14, color: '#7aa7ff' },
]

export function Analyze() {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <section id="analyze" className="relative overflow-hidden px-4 py-12 sm:py-[clamp(72px,10vw,140px)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[620px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(216,255,0,0.07),transparent)]"
      />
      <SectionHead
        eyebrow="Looper Analyze"
        title="A report card for your listening."
        lede="Time listened, streaks, top songs and artists, your busiest day and a genre breakdown. Songs are ranked by how much of them you actually heard, not just how often you tapped play."
      />

      <div ref={ref} className="relative mx-auto mt-8 grid max-w-[1100px] items-center gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <div className="grid gap-3 sm:gap-4">
          <Reveal className="card p-5 sm:p-6">
            <p className="text-[13px] text-white/50">Listening time</p>
            <p className="mt-1 font-display text-[34px] sm:text-[40px] font-extrabold tracking-[-0.03em]">
              2h <span className="text-badge">52m</span>
            </p>
            <div className="mt-4 flex h-14 items-end gap-1.5">
              {[30, 52, 41, 70, 58, 92, 64].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-md bg-gradient-to-t from-white/10 to-white/25 transition-[height] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ height: inView ? `${h}%` : '6%', transitionDelay: `${i * 80}ms`, ...(i === 5 && { background: '#d8ff00' }) }}
                />
              ))}
            </div>
          </Reveal>
          <Reveal delay={100} className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="card p-4 sm:p-5">
              <p className="text-[13px] text-white/50">Current streak</p>
              <p className="mt-1 font-display text-[22px] sm:text-[26px] font-extrabold">4 days 🔥</p>
            </div>
            <div className="card p-4 sm:p-5">
              <p className="text-[13px] text-white/50">Busiest day</p>
              <p className="mt-1 font-display text-[22px] sm:text-[26px] font-extrabold">Wed</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={60} className="mx-auto">
          <img
            src={phoneAnalyze}
            alt="Looper Analyze on Android: your number one song, listening time, streaks and highlights"
            width={516}
            height={1100}
            loading="lazy"
            className="h-[380px] sm:h-[clamp(440px,48vw,580px)] w-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
          />
        </Reveal>

        <Reveal delay={160} className="card p-5 sm:p-6">
          <p className="text-[13px] text-white/50">Genre breakdown</p>
          <div className="mt-4 flex items-center gap-5">
            <Donut run={inView} />
            <ul className="grid flex-1 gap-2 text-[14px]">
              {GENRES.map((g) => (
                <li key={g.name} className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                  <span className="text-white/75">{g.name}</span>
                  <span className="ml-auto tabular-nums text-white/45">{g.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 border-t border-white/[0.06] pt-5">
            <p className="text-[13px] text-white/50">Top artists</p>
            <div className="mt-3 flex -space-x-2">
              {['#b3264f', '#8fae00', '#c46a00', '#2c5bd6', '#6b2fb3'].map((c, i) => (
                <span
                  key={c}
                  className="size-10 rounded-full border-2 border-[#151515] transition duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${c}, #111)`,
                    transform: inView ? 'none' : 'translateX(-12px)',
                    opacity: inView ? 1 : 0,
                    transitionDelay: `${300 + i * 90}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
      <p className="relative mt-5 text-center sm:mt-6 text-[13px] text-white/40">Sample numbers. Yours are worked out on your device and never leave it.</p>
    </section>
  )
}

function Donut({ run }: { run: boolean }) {
  const r = 34
  const c = 2 * Math.PI * r
  const lens = GENRES.map((g) => (g.pct / 100) * c)
  const starts = lens.map((_, i) => lens.slice(0, i).reduce((a, b) => a + b, 0))
  return (
    <svg viewBox="0 0 88 88" className="size-[96px] shrink-0 -rotate-90" aria-hidden="true">
      <circle cx="44" cy="44" r={r} fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="11" />
      {GENRES.map((g, i) => {
        const len = lens[i]
        return (
          <circle
            key={g.name}
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke={g.color}
            strokeWidth="11"
            strokeDasharray={`${run ? len - 2 : 0} ${c}`}
            strokeDashoffset={-starts[i]}
            style={{ transition: `stroke-dasharray 1s cubic-bezier(0.22,1,0.36,1) ${i * 150}ms` }}
          />
        )
      })}
    </svg>
  )
}
