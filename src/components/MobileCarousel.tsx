import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { Clip } from './Clip'

// Real screen recordings (public/clips, built by scripts/prep-videos.sh). Each clip is ~4 s; the
// carousel moves on when the active clip ends, so phones change faster than the desktop showcase.
const SLIDES = [
  { clip: 'm-colours', title: 'Now Playing', alt: 'Now Playing: the screen takes on the colours of each album cover' },
  { clip: 'm-lyrics', title: 'Lyrics', alt: 'Word-synced lyrics lighting up as the song plays' },
  { clip: 'm-home', title: 'Home', alt: 'Opening the app: Quick Picks, songs and albums' },
  { clip: 'm-analyze', title: 'Looper Analyze', alt: 'Scrolling through Looper Analyze: listening time, streaks and top songs' },
  { clip: 'm-eq', title: 'Equalizer', alt: 'The 18-band equalizer with presets' },
]

const N = SLIDES.length
const SWIPE_PX = 48

/** Shortest signed distance from the active slide, wrapped so the carousel loops. */
const offsetOf = (i: number, active: number) => {
  let d = (i - active) % N
  if (d > N / 2) d -= N
  if (d < -N / 2) d += N
  return d
}

export function MobileCarousel() {
  // `prev` lets a slide that wraps from one end to the other jump there instead of sliding across.
  const [{ active, prev }, setPos] = useState({ active: 0, prev: 0 })
  const setActive = useCallback((n: number) => setPos((p) => ({ active: n, prev: p.active })), [])
  const drag = useRef<{ x: number; moved: boolean } | null>(null)

  const go = useCallback((delta: number) => setPos((p) => ({ active: (p.active + delta + N) % N, prev: p.active })), [])

  // The active clip advances the carousel when it ends; hovering or focusing loops it instead.
  const [paused, setPaused] = useState(false)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    go(e.key === 'ArrowLeft' ? -1 : 1)
  }
  const onPointerDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, moved: false }
  }
  const onPointerUp = (e: PointerEvent) => {
    const start = drag.current
    drag.current = null
    if (!start) return
    const dx = e.clientX - start.x
    if (Math.abs(dx) > SWIPE_PX) {
      start.moved = true
      go(dx < 0 ? 1 : -1)
    }
  }

  return (
    <div
      className="animate-rise"
      role="group"
      aria-roledescription="carousel"
      aria-label="Looper Player mobile screenshots"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{ '--ph': 'clamp(360px, 43.5vw, 620px)' } as CSSProperties}
    >
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current = null)}
        className="relative mx-auto h-[calc(var(--ph)+24px)] w-full max-w-[1006px] cursor-grab touch-pan-y select-none rounded-3xl active:cursor-grabbing"
      >
        {SLIDES.map((s, i) => {
          const off = offsetOf(i, active)
          const isActive = off === 0
          const dist = Math.abs(off)
          const visible = dist <= 2
          const wrapped = Math.abs(off - offsetOf(i, prev)) > 2
          return (
            <div
              key={s.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${N}: ${s.title}`}
              aria-hidden={!isActive}
              onClick={() => !isActive && visible && !drag.current?.moved && go(off)}
              style={
                {
                  '--off': off,
                  transform: `translateX(-50%) translateX(calc(${Math.sign(off) * [0, 0.5, 0.92][dist]} * var(--ph))) scale(${
                    [1, 0.84, 0.7][dist]
                  })`,
                  opacity: [1, 0.55, 0.25][dist],
                  zIndex: 3 - dist,
                  pointerEvents: visible ? 'auto' : 'none',
                  transitionProperty: wrapped ? 'none' : undefined,
                } as CSSProperties
              }
              className={`absolute left-1/2 top-3 h-[var(--ph)] origin-center transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                isActive ? '' : 'cursor-pointer'
              }`}
            >
              <PhoneFrame>
                <Clip
                  name={s.clip}
                  label={isActive ? s.alt : undefined}
                  state={isActive ? 'play' : off === 1 ? 'ready' : 'hold'}
                  loop={paused}
                  onEnded={() => go(1)}
                />
              </PhoneFrame>
            </div>
          )
        })}
      </div>

      <div className="mt-2 flex items-center justify-center gap-5">
        <ArrowButton dir="prev" onClick={() => go(-1)} />
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose screen">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              role="tab"
              aria-selected={i === active}
              aria-label={s.title}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-7 bg-lime' : 'w-2 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        <ArrowButton dir="next" onClick={() => go(1)} />
      </div>
      <p className="sr-only" aria-live="polite">
        {`Showing ${SLIDES[active].title}, ${active + 1} of ${N}`}
      </p>
    </div>
  )
}

/** A modern phone drawn in CSS: thin black bezel, metal rim, punch-hole camera. */
function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[432/960] h-full rounded-[calc(var(--ph)*0.072)] bg-[#050505] p-[calc(var(--ph)*0.013)] shadow-[0_0_0_1.5px_#3a3a3a,0_0_0_3px_#151515,0_40px_70px_-20px_rgba(0,0,0,0.85)]">
      <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--ph)*0.06)] bg-black">
        {children}
        <span className="absolute left-1/2 top-[1.6%] size-[calc(var(--ph)*0.018)] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
      </div>
    </div>
  )
}

function ArrowButton({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Previous screen' : 'Next screen'}
      className="grid size-11 place-items-center rounded-full border border-olive-line bg-olive text-white transition hover:-translate-y-px hover:border-[#4a5022] hover:bg-[#25281a]"
    >
      <svg viewBox="0 0 24 24" className={`size-5 ${dir === 'prev' ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 5l-7 7 7 7" />
      </svg>
    </button>
  )
}
