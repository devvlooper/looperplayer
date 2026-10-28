import { useState, type ReactNode } from 'react'
import linux from '../assets/linux.png'
import { extProps, LINKS } from '../config'
import { useLatestRelease, type AssetId } from '../hooks/useLatestRelease'
import { PLATFORM, type Platform } from '../lib/platform'
import { PlayStoreIcon } from './icons/PlayStore'
import { WindowsIcon } from './icons/Windows'
import { Reveal, SectionHead } from './Reveal'

const DISTROS = [
  { id: 'deb', label: 'Debian / Ubuntu', file: '.deb', cmd: 'sudo apt install ./looper-player_*_amd64.deb' },
  { id: 'rpm', label: 'Fedora / openSUSE', file: '.rpm', cmd: 'sudo dnf install ./looper-player-*.x86_64.rpm' },
  {
    id: 'appimage',
    label: 'AppImage',
    file: 'AppImage',
    cmd: 'chmod +x looper-player_*_x86_64.AppImage && ./looper-player_*_x86_64.AppImage',
  },
  {
    id: 'tar',
    label: 'Any distro (.tar.gz)',
    file: '.tar.gz',
    cmd: 'tar -xzf looper-player_*_linux_x64.tar.gz && cd universal && ./run.sh',
  },
] as const satisfies readonly { id: AssetId; label: string; file: string; cmd: string }[]

type Links = ReturnType<typeof useLatestRelease>

/** A direct file downloads in place; the release-page fallback opens in a new tab. */
const file = (l: Links, id: AssetId) => {
  const href = l.href(id)
  return { href, ...(href === LINKS.releases ? extProps(href) : {}) }
}

const primaryBtn =
  'flex h-12 sm:h-14 items-center justify-center gap-3 rounded-2xl bg-badge font-semibold text-bg transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(216,255,0,0.3)]'
const secondaryBtn =
  'flex h-12 sm:h-14 items-center justify-center gap-2 rounded-2xl border border-olive-line bg-olive text-white transition hover:border-[#4a5022] hover:bg-[#25281a]'

/** Button label with the version and size underneath once the release has loaded. */
function BtnLabel({ children, meta }: { children: ReactNode; meta: string }) {
  return (
    <span className="flex flex-col items-center leading-tight">
      <span>{children}</span>
      {meta && <span className="mt-0.5 text-[11.5px] font-normal opacity-60">{meta}</span>}
    </span>
  )
}

function CardHead({ icon, title, sub, mine }: { icon: ReactNode; title: string; sub: string; mine: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-[22px] font-bold">{title}</h3>
          {mine && (
            <span className="rounded-full bg-badge/15 px-2 py-0.5 text-[11.5px] font-semibold text-badge">Your device</span>
          )}
        </div>
        <p className="text-[14px] text-white/50">{sub}</p>
      </div>
    </div>
  )
}

function AndroidCard({ l, mine }: { l: Links; mine: boolean }) {
  return (
    <>
      <CardHead
        mine={mine}
        title="Android"
        sub="Android phones and tablets"
        icon={
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#3ddc84]/15">
            <svg viewBox="0 0 24 24" className="size-6 fill-[#3ddc84]" aria-hidden="true">
              <path d="M17.6 9.48l1.84-3.18a.38.38 0 0 0-.66-.38l-1.86 3.22a11.4 11.4 0 0 0-9.84 0L5.22 5.92a.38.38 0 0 0-.66.38L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
            </svg>
          </span>
        }
      />
      <a href={LINKS.playStore} {...extProps(LINKS.playStore)} className={`mt-6 sm:mt-8 ${primaryBtn}`}>
        <PlayStoreIcon className="size-6" />
        Get it on Google Play
      </a>
      <a {...file(l, 'apk')} className={`mt-3 ${secondaryBtn}`}>
        <BtnLabel meta={l.meta('apk')}>Download the APK (arm64)</BtnLabel>
      </a>
      <p className="mt-4 text-[14px] leading-[1.6] sm:mt-5 text-white/50">
        <span className="text-white/75">arm64-v8a</span> fits almost every phone from the last few years. Older or
        unusual device?{' '}
        <a href={LINKS.releases} {...extProps(LINKS.releases)} className="text-white/75 underline underline-offset-2 hover:text-white">
          Other APKs
        </a>
        . The GitHub build can update itself from inside the app.
      </p>
    </>
  )
}

function LinuxCard({ l, mine }: { l: Links; mine: boolean }) {
  const [distro, setDistro] = useState<(typeof DISTROS)[number]['id']>('deb')
  const [copied, setCopied] = useState(false)
  const d = DISTROS.find((x) => x.id === distro)!

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(d.cmd)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked: the command is still selectable */
    }
  }

  return (
    <>
      <CardHead
        mine={mine}
        title="Linux"
        sub="x86_64 · all major distros"
        icon={
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/[0.07]">
            <img src={linux} alt="" width={21} height={25} className="h-6 w-auto" />
          </span>
        }
      />

      <div role="tablist" aria-label="Choose your distribution" className="mt-6 grid grid-cols-2 gap-1 rounded-2xl bg-[#161616] p-1 sm:mt-8">
        {DISTROS.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={distro === x.id}
            onClick={() => setDistro(x.id)}
            className={`rounded-xl px-2 py-2.5 text-[13px] leading-tight transition sm:text-[14px] ${
              distro === x.id ? 'bg-olive text-white shadow-[inset_0_-1.5px_0_rgba(165,178,28,0.5)]' : 'text-white/55 hover:text-white'
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-2xl border border-white/[0.06] bg-black/40 p-4 font-mono text-[13px] leading-[1.6] text-white/85">
        <span className="select-none text-badge">$</span>
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:thin]">{d.cmd}</code>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-lg bg-white/[0.07] px-2.5 py-1 font-sans text-[12px] text-white/70 transition hover:bg-white/[0.12] hover:text-white"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <a {...file(l, d.id)} className={`mt-5 sm:mt-6 ${secondaryBtn}`}>
        <BtnLabel meta={l.meta(d.id)}>Download {d.file}</BtnLabel>
      </a>
    </>
  )
}

function WindowsCard({ l, mine }: { l: Links; mine: boolean }) {
  return (
    <>
      <CardHead
        mine={mine}
        title="Windows"
        sub="Windows 10 and 11 · x64"
        icon={
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#00a4ef]/15">
            <WindowsIcon className="size-6 text-[#00a4ef]" />
          </span>
        }
      />
      <a {...file(l, 'exe')} className={`mt-6 sm:mt-8 ${primaryBtn}`}>
        <BtnLabel meta={l.meta('exe')}>Download the installer (.exe)</BtnLabel>
      </a>
      <a {...file(l, 'zip')} className={`mt-3 ${secondaryBtn}`}>
        <BtnLabel meta={l.meta('zip')}>Portable .zip, no install</BtnLabel>
      </a>
      <p className="mt-4 text-[14px] leading-[1.6] sm:mt-5 text-white/50">
        The app isn&apos;t code-signed yet. If SmartScreen warns you, choose{' '}
        <span className="text-white/75">More info → Run anyway</span>.
      </p>
    </>
  )
}

const CARDS: { id: Platform; Card: typeof AndroidCard }[] = [
  { id: 'android', Card: AndroidCard },
  { id: 'linux', Card: LinuxCard },
  { id: 'windows', Card: WindowsCard },
]

export function Download() {
  const links = useLatestRelease()
  // The visitor's own platform goes first and gets a highlight.
  const cards = PLATFORM ? [...CARDS].sort((a, b) => Number(b.id === PLATFORM) - Number(a.id === PLATFORM)) : CARDS
  const sums = links.release?.assets.sums?.url

  return (
    <section id="download" className="relative px-4 py-12 sm:py-[clamp(72px,10vw,140px)]">
      <SectionHead
        eyebrow="Download"
        title="Free on Android, Linux and Windows."
        lede="No account, no subscription. Install it and point it at your music."
      />

      <div className="mx-auto mt-8 grid max-w-[1100px] gap-3 sm:mt-14 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ id, Card }, i) => {
          const mine = id === PLATFORM
          return (
            <Reveal
              key={id}
              delay={i * 100}
              className={`card card-spot flex flex-col p-5 sm:p-9 ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''} ${
                mine ? 'ring-1 ring-badge/40' : ''
              }`}
            >
              <Card l={links} mine={mine} />
            </Reveal>
          )
        })}
      </div>

      <p className="mx-auto mt-6 max-w-[1100px] text-center text-[13.5px] text-white/45">
        {links.release ? `Latest version ${links.release.version}. ` : ''}
        <a href={LINKS.releases} {...extProps(LINKS.releases)} className="underline underline-offset-2 hover:text-white">
          All files and release notes
        </a>
        {sums && (
          <>
            {' · '}
            <a href={sums} {...extProps(sums)} className="underline underline-offset-2 hover:text-white">
              SHA-256 checksums
            </a>
          </>
        )}
      </p>
    </section>
  )
}
