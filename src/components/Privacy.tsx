import { extProps, LINKS } from '../config'
import { Reveal, SectionHead } from './Reveal'

const POINTS = [
  {
    title: 'No account',
    body: 'Open the app and play. There is nothing to sign up for.',
    icon: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0M3 3l18 18" />,
  },
  {
    title: 'No ads, no tracking',
    body: 'No banners, no pop-ups, and nothing watching what you play.',
    icon: <path d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6l8-3zM9 12l2 2 4-4" />,
  },
  {
    title: 'Your music stays yours',
    body: 'Your library and your stats live on your device. The app goes online only to fetch lyrics and check for updates.',
    icon: <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />,
  },
  {
    title: 'Open source',
    body: 'Every line of code is on GitHub under the GPL-3.0 licence. Read it, build it, improve it.',
    icon: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />,
  },
]

export function Privacy() {
  return (
    <section id="privacy" className="relative px-4 py-12 sm:py-[clamp(72px,10vw,140px)]">
      <SectionHead
        eyebrow="Privacy"
        title={
          <>
            No account. No ads. <span className="text-badge">No tracking.</span>
          </>
        }
        lede="Looper is a music player, not a data business. It plays the files you already own and leaves you alone."
      />
      <div className="mx-auto mt-8 grid max-w-[1180px] gap-3 sm:mt-14 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {POINTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 80} className="card p-5 sm:p-6">
            <span className="grid size-11 place-items-center rounded-xl bg-badge/10 text-badge">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {p.icon}
              </svg>
            </span>
            <h3 className="mt-4 font-display text-[18px] sm:mt-5 font-bold">{p.title}</h3>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-white/60">{p.body}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6 text-center sm:mt-8">
        <a href={LINKS.github} {...extProps(LINKS.github)} className="text-[15px] text-white/60 underline decoration-white/20 underline-offset-4 transition hover:text-badge">
          Read the source on GitHub
        </a>
      </Reveal>
    </section>
  )
}
