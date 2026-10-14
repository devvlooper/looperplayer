import { useEffect, useRef } from 'react'
import { prefersReducedMotion, useInView } from '../hooks/useInView'

/**
 * What a clip should be doing:
 * - `play`  — it's the slide on show
 * - `ready` — it's up next: paused on its first frame, so it starts without a jump
 * - `hold`  — anything else: paused wherever it stopped (no seeking, so nothing flashes)
 */
export type ClipState = 'play' | 'ready' | 'hold'

/** A muted, inline screen recording. Only plays while it's the active slide and on screen. */
export function Clip({
  name,
  label,
  state,
  loop,
  onEnded,
  className = 'h-full w-full object-cover',
}: {
  name: string
  label?: string
  state: ClipState
  loop: boolean
  onEnded: () => void
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [wrap, inView] = useInView<HTMLDivElement>({ once: false, margin: '0px' })

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (state === 'play') {
      // Jumped straight here (a dot or chip) rather than from "ready": rewind first.
      if (v.ended || v.currentTime > 0.2) v.currentTime = 0
      if (inView && !prefersReducedMotion()) v.play().catch(() => {})
      else v.pause()
    } else {
      v.pause()
      if (state === 'ready' && v.currentTime !== 0) v.currentTime = 0
    }
  }, [state, inView])

  return (
    <div ref={wrap} className="h-full w-full">
      <video
        ref={ref}
        src={`/clips/${name}.mp4`}
        poster={`/clips/${name}.webp`}
        muted
        playsInline
        loop={loop}
        preload="auto"
        onEnded={() => state === 'play' && onEnded()}
        aria-label={label}
        aria-hidden={!label}
        draggable={false}
        className={className}
      />
    </div>
  )
}
