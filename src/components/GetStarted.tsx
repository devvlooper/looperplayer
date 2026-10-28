import { Reveal, SectionHead } from './Reveal'

const STEPS = [
  {
    title: 'Install it',
    body: 'Google Play or the APK on Android. The installer or a package on Windows and Linux.',
    icon: <path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />,
  },
  {
    title: 'Point it at your music',
    body: 'Allow access on Android, or pick your music folder on the desktop setup screen. Looper reads your tags and artwork.',
    icon: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM13 11v5m0-5 3-1M13 16a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />,
  },
  {
    title: 'Press play',
    body: 'Lyrics are found for you, and the whole app takes on the colours of the cover that is playing.',
    icon: <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />,
  },
]

export function GetStarted() {
  return (
    <section id="get-started" className="relative px-4 py-12 sm:py-[clamp(72px,10vw,140px)]">
      <SectionHead eyebrow="Get started" title="Up and running in a minute." lede="No account to make and nothing to configure." />
      <ol className="mx-auto mt-8 grid max-w-[1100px] gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 90} className="card relative overflow-hidden p-5 sm:p-7">
            <span
              className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[120px] font-extrabold leading-none text-white/[0.04]"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className="grid size-11 place-items-center rounded-xl bg-badge/10 text-badge">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {s.icon}
              </svg>
            </span>
            <p className="mt-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white/40 sm:mt-5">Step {i + 1}</p>
            <h3 className="mt-1 font-display text-[19px] font-bold">{s.title}</h3>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-white/60">{s.body}</p>
          </Reveal>
        ))}
      </ol>
      <Reveal className="mt-7 text-center sm:mt-9">
        <a
          href="#download"
          className="inline-flex h-12 items-center rounded-2xl bg-badge px-6 font-semibold text-bg transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(216,255,0,0.3)]"
        >
          Go to downloads
        </a>
      </Reveal>
    </section>
  )
}
