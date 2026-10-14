import { useEffect, useState } from 'react'
import analyze from '../assets/shots/desk-analyze.webp'
import { prefersReducedMotion } from '../hooks/useInView'
import { Clip } from './Clip'

// Linux screen recordings (public/clips) plus one still that slowly pans. Clips advance when they end,
// so each screen stays up for its full recording (5–8 s), longer than the phone slides.
const SCREENS = [
  { clip: 'd-home', title: 'Home', alt: 'Looper on Linux: browsing the home screen and the album grid' },
  { clip: 'd-album', title: 'Album', alt: 'Opening an album on the Linux desktop' },
  { clip: 'd-lyrics', title: 'Lyrics', alt: 'Full-window word-synced lyrics on the Linux desktop' },
  { still: analyze, title: 'Analyze', alt: 'Looper Analyze on desktop: top songs, artists, trends and genres' },
] as const

const STILL_MS = 6000

export function DesktopShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const next = () => setActive((a) => (a + 1) % SCREENS.length)

  // The still has no "ended" event, so it gets a timer.
  const cur = SCREENS[active]
  useEffect(() => {
    if (!('still' in cur) || paused || prefersReducedMotion()) return
    const id = setTimeout(next, STILL_MS)
    return () => clearTimeout(id)
  }, [cur, paused])

  return (
    <div
      className="animate-rise mx-auto w-[min(1080px,calc(100%-32px))]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* Laptop: the screen opening has the recording's exact 1600:874 ratio, so nothing is letterboxed. */}
      <div className="relative mx-auto w-[92%] rounded-t-[clamp(12px,1.8vw,22px)] bg-[#0b0b0b] p-[clamp(6px,1vw,12px)] pb-[clamp(10px,1.5vw,18px)] shadow-[0_0_0_1.5px_#3a3a3a,0_50px_100px_-30px_rgba(0,0,0,0.9)]">
        <span className="absolute left-1/2 top-[clamp(2px,0.4vw,5px)] size-[clamp(3px,0.4vw,5px)] -translate-x-1/2 rounded-full bg-[#222]" />
        <div className="relative aspect-[1600/874] overflow-hidden rounded-[4px] bg-black">
          {SCREENS.map((s, i) => (
            <div
              key={s.title}
              aria-hidden={i !== active}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              {'clip' in s ? (
                <Clip
                  name={s.clip}
                  label={i === active ? s.alt : undefined}
                  state={i === active ? 'play' : i === (active + 1) % SCREENS.length ? 'ready' : 'hold'}
                  loop={paused}
                  onEnded={next}
                />
              ) : (
                <img
                  src={s.still}
                  alt={i === active ? s.alt : ''}
                  loading="lazy"
                  draggable={false}
                  className={`h-full w-full object-cover object-left-top ${i === active ? 'ken-burns' : ''}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Base */}
      <div className="relative mx-auto h-[clamp(10px,1.3vw,16px)] w-full rounded-b-[clamp(10px,1.4vw,18px)] bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
        <span className="absolute left-1/2 top-0 h-[40%] w-[14%] -translate-x-1/2 rounded-b-lg bg-[#121212]" />
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Choose desktop screen">
        {SCREENS.map((s, i) => (
          <button
            key={s.title}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`rounded-xl px-4 py-2 text-[14px] transition ${
              i === active ? 'bg-olive text-white shadow-[inset_0_-1.5px_0_rgba(165,178,28,0.5)]' : 'bg-white/[0.04] text-white/55 hover:text-white'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>
    </div>
  )
}
