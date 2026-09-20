import { useCallback, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import home from '../assets/phone-home.webp'
import library from '../assets/phone-library.webp'
import lyrics from '../assets/phone-lyrics.webp'
import player from '../assets/phone-player.webp'

const SLIDES = [
  { src: home, title: 'Home', alt: 'Home screen with Quick Picks and a songs list' },
  { src: player, title: 'Now Playing', alt: 'Now Playing screen showing lossless FLAC 24-bit playback' },
  { src: lyrics, title: 'Lyrics', alt: 'Full-screen synced lyrics with the current line highlighted' },
  { src: library, title: 'Library', alt: 'Library screen with favorites, albums, artists and playlists' },
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
  const [active, setActive] = useState(0)
  const drag = useRef<{ x: number; moved: boolean } | null>(null)

  const go = useCallback((delta: number) => setActive((a) => (a + delta + N) % N), [])

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
          const visible = Math.abs(off) <= 1
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
                  '--off': visible ? off : 0,
                  transform: `translateX(-50%) translateX(calc(var(--off) * var(--ph) * 0.56)) scale(${
                    isActive ? 1 : visible ? 0.84 : 0.6
                  })`,
                  opacity: isActive ? 1 : visible ? 0.45 : 0,
                  zIndex: isActive ? 3 : visible ? 2 : 1,
                  pointerEvents: visible ? 'auto' : 'none',
                } as CSSProperties
              }
              className="absolute left-1/2 top-3 aspect-[729/1529] h-[var(--ph)] origin-center transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            >
              <img
                src={s.src}
                alt={isActive ? s.alt : ''}
                width={729}
                height={1529}
                draggable={false}
                className={`h-full w-full drop-shadow-[0_30px_36px_rgba(0,0,0,0.55)] ${isActive ? '' : 'cursor-pointer'}`}
              />
            </div>
          )
        })}
      </div>

      <div className="mt-2 flex items-center justify-center gap-5">
        <ArrowButton dir="prev" onClick={() => go(-1)} />
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose screenshot">
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
        {`Showing ${SLIDES[active].title}, screenshot ${active + 1} of ${N}`}
      </p>
    </div>
  )
}

function ArrowButton({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Previous screenshot' : 'Next screenshot'}
      className="grid size-11 place-items-center rounded-full border border-olive-line bg-olive text-white transition hover:-translate-y-px hover:border-[#4a5022] hover:bg-[#25281a]"
    >
      <svg viewBox="0 0 24 24" className={`size-5 ${dir === 'prev' ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 5l-7 7 7 7" />
      </svg>
    </button>
  )
}
