import { useEffect, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { Reveal, SectionHead } from './Reveal'

/** Tracks the pointer so the card's spotlight follows it (see .card-spot in index.css). */
const spot = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function Card({
  title,
  body,
  visual,
  className = '',
  delay = 0,
}: {
  title: string
  body: string
  visual?: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <Reveal delay={delay} className={className}>
      <article onPointerMove={spot} className="card card-spot flex h-full flex-col p-5 sm:p-7">
        {visual && <div className="relative mb-5 flex-1 sm:mb-6">{visual}</div>}
        <h3 className="font-display text-[18px] font-bold sm:text-[20px] tracking-[-0.01em]">{title}</h3>
        <p className="mt-1.5 text-[14.5px] leading-[1.6] text-white/60 sm:mt-2 sm:text-[15px]">{body}</p>
      </article>
    </Reveal>
  )
}

export function Features() {
  return (
    <section id="features" className="relative px-4 py-12 sm:py-[clamp(72px,10vw,140px)]">
      <SectionHead
        eyebrow="Features"
        title={
          <>
            Everything you need.
            <br />
            <span className="text-white/45">Nothing you don't.</span>
          </>
        }
        lede="Point Looper at a folder and it builds a library you can browse by song, album, artist, genre or folder, then gets out of the way."
      />

      <div className="mx-auto mt-8 grid max-w-[1180px] auto-rows-auto gap-3 sm:mt-14 sm:gap-4 md:grid-cols-6">
        <Card
          className="md:col-span-4"
          title="Colours from the artwork"
          body="The player, the lyrics and the accents across the app pick up the colours of the current cover. Or choose your own theme and font."
          visual={<ArtworkColours />}
        />
        <Card
          className="md:col-span-2"
          delay={80}
          title="18-band equalizer"
          body="Drag the curve to shape the sound, ±20 dB per band."
          visual={<Equalizer />}
        />
        <Card
          className="md:col-span-2"
          title="Fast search"
          body="Find a song by title, artist, album, or a line from its lyrics."
          visual={<SearchDemo />}
        />
        <Card
          className="md:col-span-2"
          delay={80}
          title="12 home-screen widgets"
          body="Control playback from your Android home screen, in the layout you like."
          visual={<Widgets />}
        />
        <Card
          className="md:col-span-2"
          delay={160}
          title="A real desktop app"
          body="On Linux and Windows: a sidebar, wide grids and media keys, plus MPRIS on Linux, so your desktop controls just work."
          visual={<Desktop />}
        />
        <Card
          className="md:col-span-3"
          title="Picks up where you left off"
          body="The queue, the track and the position are all restored when you open the app again."
          visual={<Resume />}
        />
        <Card
          className="md:col-span-3"
          delay={80}
          title="Backups"
          body="Export your app data to a file and import it again later, on the same device or a new one."
          visual={<Backup />}
        />
      </div>

      <Languages />
    </section>
  )
}

/* ───────────── Card visuals ───────────── */

const COVERS = [
  { a: '#b3264f', b: '#3b0a24', accent: '#ff5c8a' },
  { a: '#8fae00', b: '#16300f', accent: '#d8ff00' },
  { a: '#c46a00', b: '#2e1a05', accent: '#ffa62b' },
  { a: '#2c5bd6', b: '#0b1636', accent: '#7aa7ff' },
]

function ArtworkColours() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % COVERS.length), 2600)
    return () => clearInterval(id)
  }, [])
  const c = COVERS[i]
  return (
    <div
      className="relative flex h-full min-h-[150px] items-center gap-5 sm:min-h-[200px] overflow-hidden rounded-2xl p-5 transition-[background] duration-1000"
      style={{ background: `radial-gradient(120% 120% at 0% 0%, ${c.a}, ${c.b} 70%)` }}
    >
      <div className="flex shrink-0 gap-2">
        {COVERS.map((k, n) => (
          <button
            key={n}
            type="button"
            aria-label={`Album ${n + 1}`}
            onClick={() => setI(n)}
            className={`size-[clamp(44px,6vw,64px)] rounded-xl transition duration-500 ${
              n === i ? 'scale-110 ring-2 ring-white/80' : 'opacity-60 hover:opacity-90'
            }`}
            style={{ background: `linear-gradient(135deg, ${k.a}, ${k.b})` }}
          />
        ))}
      </div>
      <div className="hidden min-w-0 flex-1 rounded-2xl bg-black/30 p-4 backdrop-blur sm:block">
        <div className="h-2.5 w-2/3 rounded-full bg-white/80" />
        <div className="mt-2 h-2 w-1/3 rounded-full bg-white/40" />
        <div className="mt-5 h-1.5 rounded-full bg-white/15">
          <div className="h-full w-[62%] rounded-full transition-colors duration-1000" style={{ backgroundColor: c.accent }} />
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              className="h-7 w-10 rounded-lg transition-colors duration-1000"
              style={{ backgroundColor: n === 1 ? c.accent : 'rgb(255 255 255 / 0.12)' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Two "poses" per band that each bar breathes between: a gentle bass-boost curve.
const BANDS = Array.from({ length: 18 }, (_, i) => {
  const base = 0.35 + 0.45 * Math.exp(-((i - 2) ** 2) / 10) + 0.25 * Math.exp(-((i - 13) ** 2) / 8)
  return { a: Math.min(1, base * 0.7), b: Math.min(1, base + 0.12) }
})

function Equalizer() {
  return (
    <div className="flex h-[124px] sm:h-[150px] items-end gap-[3px] rounded-2xl bg-black/25 px-3 pb-3 pt-6" aria-hidden="true">
      {BANDS.map((b, i) => (
        <span
          key={i}
          className="eq-bar h-full flex-1 rounded-full bg-gradient-to-t from-[#8fae00] to-badge"
          style={{ '--i': i, '--a': b.a, '--b': b.b } as CSSProperties}
        />
      ))}
    </div>
  )
}

const QUERIES = ['paper moon', 'Midnight Static', 'play it back again']

function SearchDemo() {
  const [q, setQ] = useState(0)
  const [len, setLen] = useState(0)
  useEffect(() => {
    const word = QUERIES[q]
    const id = setTimeout(
      () => {
        if (len < word.length) setLen(len + 1)
        else {
          setLen(0)
          setQ((q + 1) % QUERIES.length)
        }
      },
      len < word.length ? 85 : 1800,
    )
    return () => clearTimeout(id)
  }, [q, len])
  const kind = ['Song', 'Artist', 'Lyric'][q]
  return (
    <div className="flex h-[124px] sm:h-[150px] flex-col justify-center gap-3" aria-hidden="true">
      <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[15px]">
        <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-white/50" fill="none" stroke="currentColor" strokeWidth="2.4">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="truncate">{QUERIES[q].slice(0, len)}</span>
        <span className="-ml-1.5 h-4 w-px animate-pulse bg-badge" />
      </div>
      <div
        className={`flex items-center gap-3 rounded-2xl bg-white/[0.05] px-3 py-2.5 transition duration-300 ${
          len === QUERIES[q].length ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
      >
        <span className="size-8 rounded-lg bg-gradient-to-br from-[#b3264f] to-[#3b0a24]" />
        <span className="text-[13.5px] text-white/80">{QUERIES[q]}</span>
        <span className="ml-auto rounded-full bg-badge/15 px-2 py-0.5 text-[11px] font-semibold text-badge">{kind}</span>
      </div>
    </div>
  )
}

function Widgets() {
  // 12 little tiles in different shapes; one lights up at a time.
  const [lit, setLit] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setLit((n) => (n + 1) % 12), 700)
    return () => clearInterval(id)
  }, [])
  const spans = ['col-span-2', '', '', 'col-span-2', '', '', '', 'col-span-2', '', '', '', '']
  return (
    <div className="grid h-[124px] sm:h-[150px] grid-cols-4 grid-rows-3 gap-1.5" aria-hidden="true">
      {spans.slice(0, 9).map((s, i) => (
        <span
          key={i}
          className={`${s} rounded-lg transition-colors duration-500 ${i === lit % 9 ? 'bg-badge/80' : 'bg-white/[0.07]'}`}
        />
      ))}
    </div>
  )
}

function Desktop() {
  return (
    <div className="flex h-[124px] sm:h-[150px] overflow-hidden rounded-2xl border border-white/10 bg-black/30" aria-hidden="true">
      <div className="flex w-1/4 flex-col gap-2 border-r border-white/10 p-3">
        <span className="h-2 w-4/5 rounded-full bg-badge/80" />
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="h-1.5 w-3/4 rounded-full bg-white/20" />
        ))}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <div className="grid flex-1 grid-cols-3 gap-2">
          {[0, 1, 2].map((n) => (
            <span key={n} className="rounded-md bg-white/[0.08] animate-pulse" style={{ animationDelay: `${n * 300}ms` }} />
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-md bg-white/[0.06] px-2 py-1.5">
          <span className="size-3 rounded-sm bg-white/30" />
          <span className="h-1 flex-1 rounded-full bg-white/15">
            <span className="block h-full w-1/2 rounded-full bg-badge/80" />
          </span>
          <kbd className="rounded border border-white/15 px-1 text-[9px] text-white/60">⏯</kbd>
        </div>
      </div>
    </div>
  )
}

function Resume() {
  return (
    <div className="flex h-[100px] sm:h-[120px] items-center gap-4 rounded-2xl bg-black/25 p-4" aria-hidden="true">
      <span className="size-14 shrink-0 rounded-xl bg-gradient-to-br from-[#c46a00] to-[#2e1a05]" />
      <div className="flex-1">
        <div className="text-[13px] text-white/50">Resuming</div>
        <div className="text-[15px] font-semibold">Golden Static</div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/15">
          <div className="resume-fill h-full rounded-full bg-[#ffa62b]" />
        </div>
      </div>
      <span className="text-[13px] tabular-nums text-white/50">2:41</span>
    </div>
  )
}

function Backup() {
  return (
    <div className="flex h-[100px] sm:h-[120px] items-center justify-center gap-4 rounded-2xl bg-black/25" aria-hidden="true">
      <span className="grid size-14 place-items-center rounded-2xl bg-white/[0.08]">
        <svg viewBox="0 0 24 24" className="size-6 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
          <path d="M10.5 18.5h3" />
        </svg>
      </span>
      <span className="relative h-px w-24 bg-white/15">
        <span className="backup-dot absolute -top-1 size-2 rounded-full bg-badge shadow-[0_0_12px_#d8ff00]" />
      </span>
      <span className="grid size-14 place-items-center rounded-2xl bg-white/[0.08]">
        <svg viewBox="0 0 24 24" className="size-6 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5M9 13h6M9 17h4" />
        </svg>
      </span>
    </div>
  )
}

const HELLOS = [
  'Hello',
  'नमस्ते',
  'こんにちは',
  '안녕하세요',
  '你好',
  'مرحبا',
  'Hola',
  'Bonjour',
  'Hallo',
  'Ciao',
  'Olá',
  'Привет',
  'Merhaba',
  'Dag',
]

function Languages() {
  const row = [...HELLOS, ...HELLOS]
  return (
    <Reveal className="mx-auto mt-10 max-w-[1180px] sm:mt-16">
      <p className="text-center text-[14px] text-white/50">Speaks 14 languages, including Hindi, Arabic, Japanese, Korean and Chinese</p>
      <div className="mt-4 overflow-hidden sm:mt-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee flex w-max gap-3" aria-hidden="true">
          {row.map((h, i) => (
            <span
              key={i}
              className="rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-2 font-display text-[16px] sm:px-5 sm:py-2.5 sm:text-[18px] font-semibold text-white/80"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
