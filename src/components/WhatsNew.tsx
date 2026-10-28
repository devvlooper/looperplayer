import { extProps, LINKS } from '../config'
import { useLatestRelease } from '../hooks/useLatestRelease'
import { Reveal, SectionHead } from './Reveal'

const MAX_ITEMS = 6

/** Tag colour per release-note group; anything unknown falls back to neutral. */
const TONE: Record<string, string> = {
  new: 'bg-badge/15 text-badge',
  improved: 'bg-[#00a4ef]/15 text-[#5cc8ff]',
  fixed: 'bg-[#ff8a3d]/15 text-[#ffab70]',
}

/** The latest release notes, read live from GitHub. Hidden if they can't be loaded. */
export function WhatsNew() {
  const { release } = useLatestRelease()
  if (!release?.notes.length) return null

  const date = release.date
    ? new Date(release.date).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <section id="whats-new" className="relative px-4 py-12 sm:py-[clamp(72px,10vw,140px)]">
      <SectionHead
        eyebrow="What's new"
        title={
          <>
            Version <span className="text-badge">{release.version}</span>
          </>
        }
        lede={date ? `Released ${date}. Looper gets regular updates, and the GitHub build can install them for you.` : undefined}
      />

      <div className="mx-auto mt-8 grid max-w-[1100px] gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3">
        {release.notes.slice(0, 3).map((g, i) => {
          const extra = g.items.length - MAX_ITEMS
          return (
            <Reveal key={g.title} delay={i * 90} className="card p-5 sm:p-7">
              <span
                className={`inline-block rounded-full px-3 py-1 text-[12.5px] font-semibold ${
                  TONE[g.title.toLowerCase()] ?? 'bg-white/[0.08] text-white/80'
                }`}
              >
                {g.title}
              </span>
              <ul className="mt-4 space-y-2.5 sm:mt-5">
                {g.items.slice(0, MAX_ITEMS).map((item) => (
                  <li key={item} className="flex gap-2.5 text-[14.5px] leading-[1.55] text-white/75">
                    <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-white/30" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              {extra > 0 && <p className="mt-3 text-[13.5px] text-white/45">and {extra} more</p>}
            </Reveal>
          )
        })}
      </div>

      <Reveal className="mt-6 text-center sm:mt-8">
        <a
          href={release.url}
          {...extProps(LINKS.releases)}
          className="text-[15px] text-white/60 underline decoration-white/20 underline-offset-4 transition hover:text-badge"
        >
          Full release notes on GitHub
        </a>
      </Reveal>
    </section>
  )
}
