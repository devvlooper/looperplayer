import { useEffect, useRef, type CSSProperties } from 'react'
import { prefersReducedMotion } from '../hooks/useInView'

// Album-style colours the top glow cycles through, as "r g b" for the --c variable in .hero-glow.
const COLOURS = ['206 245 0', '255 72 128', '255 150 30', '80 140 255', '170 95 255', '0 215 185']

const HOLD_MS = 4500 // time each colour rests
const SWEEP_MS = 2400 // time the next colour takes to sweep in
const FEATHER = 30 // degrees, must match the 30deg soft edge in .glow-top / .glow-base
const PIVOT_Y = -360 // the sweep turns around a point this far above the glow (50% -50% in CSS)

const ease = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2

/**
 * The sweep angles that cover exactly the visible glow (measured clockwise from "east" of the pivot).
 * With the pivot above the screen the edge moves across at an even pace instead of snapping along the top.
 */
const range = (width: number) => {
  const first = (Math.atan2(-PIVOT_Y, width / 2) * 180) / Math.PI // top-right corner
  return [first, 180 - first + FEATHER] as const
}

/**
 * The half-circle glow behind the header. Every few seconds the next colour sweeps in clockwise
 * (right → bottom → left). The old colour is masked out exactly where the new one is masked in, so when
 * the sweep ends only the new colour is showing and swapping the layers changes nothing on screen.
 * Everything is written straight to the DOM inside one animation frame, so there's no in-between frame.
 */
export function HeroGlow() {
  const wrap = useRef<HTMLDivElement>(null)
  const base = useRef<HTMLDivElement>(null)
  const top = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const w = wrap.current
    const b = base.current
    const t = top.current
    if (!w || !b || !t || prefersReducedMotion()) return

    let i = 0
    let start = performance.now()
    let raf = 0
    const paint = (deg: number) => w.style.setProperty('--sweep', `${deg}deg`)
    let [from, to] = range(w.clientWidth)
    paint(from)

    const frame = (now: number) => {
      const elapsed = now - start
      if (elapsed >= HOLD_MS + SWEEP_MS) {
        // Sweep done: the top colour becomes the base, and the next colour waits (hidden) on top.
        i = (i + 1) % COLOURS.length
        b.style.setProperty('--c', COLOURS[i])
        t.style.setProperty('--c', COLOURS[(i + 1) % COLOURS.length])
        ;[from, to] = range(w.clientWidth)
        paint(from)
        start = now
      } else if (elapsed > HOLD_MS && window.scrollY < 900) {
        paint(from + ease((elapsed - HOLD_MS) / SWEEP_MS) * (to - from))
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={wrap} aria-hidden="true" className="glow-wrap pointer-events-none absolute inset-x-0 top-0 h-[720px]">
      <div ref={base} className="hero-glow glow-base absolute inset-0" style={{ '--c': COLOURS[0] } as CSSProperties} />
      <div ref={top} className="hero-glow glow-top absolute inset-0" style={{ '--c': COLOURS[1] } as CSSProperties} />
    </div>
  )
}
