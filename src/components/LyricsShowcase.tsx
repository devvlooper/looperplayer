import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useInView } from '../hooks/useInView'
import { Reveal, SectionHead } from './Reveal'

/*
 * A live, working copy of Looper's lyrics screen. Lyrics are original demo lines (not real songs); timings
 * are generated so every line gets the same rhythm. The page colours follow the "artwork" of each track,
 * the same way the app picks colours from the album cover.
 */

type Song = {
  title: string
  artist: string
  accent: string
  blobs: [string, string, string]
  art: string
  lines: string[]
}

const SONGS: Song[] = [
  {
    title: 'Paper Moons',
    artist: 'Velvet Hour',
    accent: '#ff5c8a',
    blobs: ['#7a1236', '#3b0a24', '#b3264f'],
    art: 'radial-gradient(circle at 30% 30%, #ffb3c7 0 14%, transparent 15%), linear-gradient(135deg, #b3264f, #3b0a24)',
    lines: [
      'I keep your letters in a paper moon',
      'Folded small enough to fit my hand',
      'Every word still sounds just like you',
      'Even when I do not understand',
      'Turn it up and let the chorus in',
      'This is where the music starts again',
    ],
  },
  {
    title: 'Neon Rivers',
    artist: 'Midnight Static',
    accent: '#d8ff00',
    blobs: ['#4b5a00', '#16300f', '#8fae00'],
    art: 'linear-gradient(160deg, transparent 55%, #d8ff00 56% 60%, transparent 61%), linear-gradient(135deg, #8fae00, #16300f)',
    lines: [
      'We drove out past the city light',
      'Windows down, the radio was loud',
      'Every song we knew by heart that night',
      'Singing like there was nobody around',
      'Hold the moment, play it back again',
      'Some songs never really end',
    ],
  },
  {
    title: 'Golden Static',
    artist: 'Ferris & The Tide',
    accent: '#ffa62b',
    blobs: ['#7a4300', '#2e1a05', '#c46a00'],
    art: 'radial-gradient(circle at 70% 35%, #ffd27a 0 18%, transparent 19%), linear-gradient(135deg, #c46a00, #2e1a05)',
    lines: [
      'Sunlight spilling on the kitchen floor',
      'Coffee cold, a record on repeat',
      'I never needed anything more',
      'Than a slow song and the summer heat',
      'Let it play until the evening falls',
      'Let it echo down the empty halls',
    ],
  },
]

const INTRO = 2.6 // seconds of ♫ before the first line
const LINE = 3.3 // seconds per line
const OUTRO = 1.6

type Word = { text: string; start: number; end: number }
type Line = { start: number; end: number; words: Word[] }

/** Spreads each line's words across its time, weighted by length, ending a little before the next line. */
function timeLines(lines: string[]): Line[] {
  return lines.map((text, i) => {
    const start = INTRO + i * LINE
    const sung = LINE * 0.86
    const words = text.split(' ')
    const total = words.reduce((n, w) => n + w.length + 1, 0)
    let t = start
    return {
      start,
      end: start + LINE,
      words: words.map((w) => {
        const d = (sung * (w.length + 1)) / total
        const word = { text: w, start: t, end: t + d }
        t += d
        return word
      }),
    }
  })
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

type Style = 'word' | 'line'

export function LyricsShowcase() {
  const [songIndex, setSongIndex] = useState(0)
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [style, setStyle] = useState<Style>('word')
  const [stageRef, visible] = useInView<HTMLDivElement>({ once: false, margin: '0px' })

  const song = SONGS[songIndex]
  const lines = useMemo(() => timeLines(song.lines), [song])
  const duration = INTRO + song.lines.length * LINE + OUTRO

  // Clock: advances only while playing and on screen.
  useEffect(() => {
    if (!playing || !visible) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      setTime((t) => t + dt)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, visible])

  // At the end of a track, roll over to the next one.
  if (time >= duration) {
    setSongIndex((songIndex + 1) % SONGS.length)
    setTime(0)
  }

  const active = lines.findIndex((l) => time >= l.start && time < l.end)
  const intro = time < INTRO
  // Row 0 is the ♫ intro row, lyric rows follow; after the last line we stay on it.
  const focus = intro ? 0 : (active === -1 ? lines.length - 1 : active) + 1

  // Measure each row so lines that wrap still centre correctly.
  const viewport = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState({ height: 0, centres: [] as number[] })
  useLayoutEffect(() => {
    const el = viewport.current
    if (!el) return
    const measure = () =>
      setLayout({
        height: el.clientHeight,
        centres: Array.from(el.querySelectorAll<HTMLElement>('[data-row]'), (r) => r.offsetTop + r.offsetHeight / 2),
      })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [song, style])
  const shift = layout.height * 0.38 - (layout.centres[focus] ?? 0)

  const switchSong = (delta: number) => {
    setSongIndex((i) => (i + delta + SONGS.length) % SONGS.length)
    setTime(0)
  }

  const stageVars = { '--fill': song.accent, '--dim': 'rgb(255 255 255 / 0.42)' } as CSSProperties

  return (
    <section id="lyrics" className="relative px-4 py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHead
            center={false}
            eyebrow="Lyrics"
            title={
              <>
                Lyrics that sing <span className="text-badge">with you.</span>
              </>
            }
            lede="Every word lights up the moment it's sung. Tap any line to jump there, nudge the timing if it's off, and watch the whole screen take on the colours of the album cover."
          />

          <Reveal delay={120} className="mt-8 flex flex-wrap items-center gap-3">
            <div role="radiogroup" aria-label="Sync style" className="flex rounded-2xl border border-white/[0.06] bg-[#161616] p-1">
              {(['word', 'line'] as const).map((s) => (
                <button
                  key={s}
                  role="radio"
                  aria-checked={style === s}
                  onClick={() => setStyle(s)}
                  className={`rounded-xl px-4 py-2 text-[15px] transition ${
                    style === s ? 'bg-olive text-white shadow-[inset_0_-1.5px_0_rgba(165,178,28,0.5)]' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {s === 'word' ? 'Word by word' : 'Line by line'}
                </button>
              ))}
            </div>
            <span className="text-[14px] text-white/45">Try it, it's live.</span>
          </Reveal>

          <Reveal as="ul" delay={200} className="mt-9 grid gap-3 text-[15.5px] text-white/75 sm:grid-cols-2">
            {[
              'Word-synced and line-synced lyrics',
              'Fetched online or from your own .lrc',
              'Tap a line to seek to it',
              'Per-song timing offset',
              'Search your library by a lyric line',
              'Full-screen view on phone and desktop',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-badge" />
                {t}
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div
            ref={stageRef}
            style={stageVars}
            className="relative isolate overflow-hidden rounded-[34px] border border-white/[0.07] bg-[#0d0d0d] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
          >
            {/* Colours from the artwork */}
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <span className="blob left-[-10%] top-[-15%] size-[70%]" style={{ '--blob': song.blobs[0] } as CSSProperties} />
              <span className="blob right-[-15%] top-[20%] size-[65%]" style={{ '--blob': song.blobs[1] } as CSSProperties} />
              <span className="blob bottom-[-20%] left-[15%] size-[60%]" style={{ '--blob': song.blobs[2] } as CSSProperties} />
              <div className="absolute inset-0 bg-black/35" />
            </div>

            {/* Track header */}
            <div className="flex items-center gap-3 px-5 pt-5 sm:gap-3.5 sm:px-8 sm:pt-7">
              <div
                aria-hidden="true"
                className="size-12 shrink-0 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-[background] duration-700"
                style={{ background: song.art }}
              />
              <div className="min-w-0">
                <p className="truncate text-[17px] font-semibold">{song.title}</p>
                <p className="truncate text-[14px] text-white/55">{song.artist}</p>
              </div>
              <span className="ml-auto shrink-0 whitespace-nowrap rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[10.5px] font-medium tracking-wide text-white/70 sm:px-3 sm:text-[11.5px]">
                {style === 'word' ? 'WORD SYNC' : 'LINE SYNC'}
              </span>
            </div>

            {/* Lyrics */}
            <div
              ref={viewport}
              className="relative h-[clamp(320px,44vw,460px)] overflow-hidden [mask-image:linear-gradient(transparent,#000_14%,#000_78%,transparent)]"
            >
              <ol aria-label={`Lyrics for ${song.title}`} className="px-5 sm:px-8">
                <li
                  data-row
                  className="py-3"
                  style={rowStyle(0, focus, shift)}
                >
                  <span className={`inline-flex gap-1.5 text-[clamp(1.5rem,2.6vw,2.15rem)] ${intro ? '' : 'opacity-40'}`}>
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="inline-block size-2.5 rounded-full transition-colors duration-300"
                        style={{
                          backgroundColor: intro && time > (INTRO / 3) * d ? song.accent : 'rgb(255 255 255 / 0.3)',
                          transform: intro ? `scale(${1 + 0.25 * Math.sin(time * 5 + d)})` : undefined,
                        }}
                      />
                    ))}
                  </span>
                </li>
                {lines.map((line, i) => {
                  const isActive = i === active
                  const past = time >= line.end
                  return (
                    <li
                      key={`${songIndex}-${i}`}
                      data-row
                      style={rowStyle(i + 1, focus, shift)}
                      className="py-2.5"
                    >
                      <button
                        type="button"
                        onClick={() => setTime(line.start + 0.01)}
                        className="text-left font-display text-[clamp(1.2rem,5.2vw,1.45rem)] font-extrabold sm:text-[clamp(1.45rem,2.55vw,2.1rem)] leading-[1.22] tracking-[-0.015em] transition-[color,opacity] duration-500"
                        style={{
                          color: style === 'line' && isActive ? song.accent : undefined,
                          opacity: isActive ? 1 : past ? 0.22 : 0.34,
                        }}
                      >
                        {style === 'word' && isActive
                          ? line.words.map((w, k) => (
                              <span
                                key={k}
                                className="lyric-word"
                                style={{ '--p': clamp01((time - w.start) / (w.end - w.start)) } as CSSProperties}
                              >
                                {w.text}{' '}
                              </span>
                            ))
                          : line.words.map((w) => w.text).join(' ')}
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* Player */}
            <div className="px-5 pb-5 sm:px-8 sm:pb-7">
              <div
                className="relative h-1.5 cursor-pointer rounded-full bg-white/15"
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect()
                  setTime(clamp01((e.clientX - r.left) / r.width) * duration * 0.999)
                }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${(time / duration) * 100}%`, backgroundColor: song.accent }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[12px] tabular-nums text-white/55">
                <span>{fmt(time)}</span>
                <span>{fmt(duration)}</span>
              </div>
              <div className="mt-3 flex justify-center gap-2.5">
                <Ctrl label="Previous track" onClick={() => switchSong(-1)}>
                  <path d="M6 5h2v14H6zM20 5v14L9 12z" />
                </Ctrl>
                <Ctrl label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying((p) => !p)} wide>
                  {playing ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
                </Ctrl>
                <Ctrl label="Next track" onClick={() => switchSong(1)}>
                  <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
                </Ctrl>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-[13px] text-white/40">Demo tracks with original lyrics, shown the way Looper plays them.</p>
        </Reveal>
      </div>
    </section>
  )
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/** Elastic follow: rows near the focus move first, farther rows trail behind, like the app. */
function rowStyle(i: number, focus: number, shift: number): CSSProperties {
  const dist = Math.abs(i - focus)
  return {
    transform: `translate3d(0, ${shift}px, 0)`,
    transition: `transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${Math.min(dist, 6) * 45}ms`,
  }
}

function Ctrl({
  label,
  onClick,
  wide,
  children,
}: {
  label: string
  onClick: () => void
  wide?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid h-12 place-items-center rounded-2xl bg-white/[0.08] text-white backdrop-blur transition hover:bg-white/[0.14] active:scale-95 ${
        wide ? 'w-20' : 'w-16'
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
        {children}
      </svg>
    </button>
  )
}
