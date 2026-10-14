import { extProps, LINKS } from '../config'
import { Reveal, SectionHead } from './Reveal'

const VIDEOS = [
  {
    id: 't8LsCkGY9-4',
    title: 'Introducing Looper Player',
    by: 'Neelesh Suthar',
    note: 'The official intro',
  },
  {
    id: 'KnoETY34sgk',
    title: '10 Mejores APLICACIONES Android 2026',
    by: 'YouTutosJeff',
    note: 'Featured in',
  },
]

const FAQ = [
  {
    q: 'Is Looper really free?',
    a: 'Yes. No ads, no subscription, no paid tier. If you want to help, you can buy us a coffee on Ko-fi.',
  },
  {
    q: 'Does it stream music?',
    a: "No. Looper plays the music files already on your device. Point it at a folder and it builds your library from what's there.",
  },
  {
    q: 'Where do the lyrics come from?',
    a: 'Looper looks them up online from several lyrics services, with word-by-word timing where it exists. You can also load your own .lrc files, and adjust the timing per song.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. Playback, your library, stats and saved lyrics all work without a connection. The app goes online only to fetch lyrics and check for updates.',
  },
  {
    q: 'Which Linux distributions are supported?',
    a: 'There are .deb packages for Debian, Ubuntu and Mint, .rpm packages for Fedora and openSUSE, and a .tar.gz you can run on any x86_64 distro.',
  },
  {
    q: 'Google Play or GitHub, which should I install?',
    a: 'Either. Google Play updates automatically through the store. The GitHub APK can update itself from inside the app.',
  },
  {
    q: 'How can I help?',
    a: 'Report bugs, suggest features, translate, or send a pull request on GitHub. Sharing the app with a friend helps too.',
  },
]

export function Community() {
  return (
    <>
      <section id="videos" className="relative px-4 py-10 sm:py-[clamp(56px,8vw,110px)]">
        <SectionHead eyebrow="Videos" title="See it in action." />
        <div className="mx-auto mt-8 grid max-w-[1000px] gap-4 sm:mt-12 sm:gap-5 sm:grid-cols-2">
          {VIDEOS.map((v, i) => (
            <Reveal key={v.id} delay={i * 100}>
              <a
                href={`https://youtu.be/${v.id}`}
                {...extProps('https://youtu.be')}
                className="card group block p-3"
              >
                <div className="relative overflow-hidden rounded-[20px]">
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt=""
                    width={480}
                    height={360}
                    loading="lazy"
                    className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-black/25 transition group-hover:bg-black/10">
                    <span className="grid size-16 place-items-center rounded-full bg-badge text-bg shadow-[0_0_40px_rgba(216,255,0,0.35)] transition duration-500 group-hover:scale-110">
                      <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </div>
                <div className="px-2 pb-1 pt-4">
                  <p className="text-[12.5px] uppercase tracking-[0.14em] text-white/45">{v.note}</p>
                  <p className="mt-1 font-semibold">{v.title}</p>
                  <p className="text-[14px] text-white/50">by {v.by}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="faq" className="relative px-4 py-10 sm:py-[clamp(56px,8vw,110px)]">
        <SectionHead eyebrow="FAQ" title="Questions, answered." />
        <div className="mx-auto mt-8 grid max-w-[820px] gap-2.5 sm:mt-12 sm:gap-3">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 40}>
              <details className="card group px-5 py-4 sm:px-6 sm:py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold sm:text-[17px]">
                  {f.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/[0.06] text-badge transition duration-300 group-open:rotate-45">
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="pt-3 text-[14.5px] leading-[1.65] sm:text-[15.5px] sm:leading-[1.7] text-white/60">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="support" className="relative px-4 pb-12 pt-6 sm:pb-[clamp(72px,10vw,130px)] sm:pt-[clamp(40px,6vw,80px)]">
        <Reveal className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[28px] border border-badge/15 sm:rounded-[36px] bg-[radial-gradient(120%_140%_at_50%_0%,rgba(216,255,0,0.14),rgba(30,32,21,0.6)_45%,#151515_80%)] px-5 py-10 text-center sm:px-12 sm:py-14">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-badge">Made by people who love music</p>
          <h2 className="mx-auto mt-3 max-w-[640px] font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">
            Help keep Looper free.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-[1.7] text-white/60">
            Star the repo, report a bug, translate a screen, or buy us a coffee. Every bit helps.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:mt-8 sm:gap-3">
            <a
              href={LINKS.kofi}
              {...extProps(LINKS.kofi)}
              className="flex h-12 items-center gap-2 rounded-2xl bg-badge px-5 font-semibold text-bg transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(216,255,0,0.3)]"
            >
              ☕ Support on Ko-fi
            </a>
            <a
              href={LINKS.github}
              {...extProps(LINKS.github)}
              className="flex h-12 items-center gap-2 rounded-2xl border border-olive-line bg-olive px-5 text-white transition hover:border-[#4a5022] hover:bg-[#25281a]"
            >
              ★ Star on GitHub
            </a>
            <a
              href={LINKS.telegram}
              {...extProps(LINKS.telegram)}
              className="flex h-12 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-white transition hover:bg-white/[0.08]"
            >
              Join on Telegram
            </a>
          </div>
          <div className="mt-8 sm:mt-12">
            <p className="text-[13px] text-white/45">Contributors</p>
            <a href={LINKS.contributors} {...extProps(LINKS.contributors)} className="mt-3 inline-block">
              <img
                src={LINKS.contributorsImage}
                alt="Avatars of the people who contributed to Looper"
                loading="lazy"
                className="h-12 w-auto transition hover:scale-105"
              />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
