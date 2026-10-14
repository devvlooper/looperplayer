import { useState } from 'react'
import linux from '../assets/linux.png'
import { extProps, LINKS } from '../config'
import { PlayStoreIcon } from './icons/PlayStore'
import { Reveal, SectionHead } from './Reveal'

const DISTROS = [
  { id: 'deb', label: 'Debian / Ubuntu', file: '.deb', cmd: 'sudo apt install ./looper-player_*_amd64.deb' },
  { id: 'rpm', label: 'Fedora / openSUSE', file: '.rpm', cmd: 'sudo dnf install ./looper-player-*.x86_64.rpm' },
  {
    id: 'tar',
    label: 'Any distro',
    file: '.tar.gz',
    cmd: 'tar -xzf looper-player_*_linux_x64.tar.gz && cd universal && ./run.sh',
  },
] as const

export function Download() {
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
    <section id="download" className="relative px-4 py-[clamp(72px,10vw,140px)]">
      <SectionHead
        eyebrow="Download"
        title="Free on Android and Linux."
        lede="No account, no subscription. Install it and point it at your music."
      />

      <div className="mx-auto mt-14 grid max-w-[1100px] gap-4 md:grid-cols-2">
        <Reveal className="card card-spot flex flex-col p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-[#3ddc84]/15">
              <svg viewBox="0 0 24 24" className="size-6 fill-[#3ddc84]" aria-hidden="true">
                <path d="M17.6 9.48l1.84-3.18a.38.38 0 0 0-.66-.38l-1.86 3.22a11.4 11.4 0 0 0-9.84 0L5.22 5.92a.38.38 0 0 0-.66.38L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
              </svg>
            </span>
            <div>
              <h3 className="font-display text-[22px] font-bold">Android</h3>
              <p className="text-[14px] text-white/50">Android phones and tablets</p>
            </div>
          </div>
          <a
            href={LINKS.playStore}
            {...extProps(LINKS.playStore)}
            className="mt-8 flex h-14 items-center justify-center gap-3 rounded-2xl bg-badge font-semibold text-bg transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(216,255,0,0.3)]"
          >
            <PlayStoreIcon className="size-6" />
            Get it on Google Play
          </a>
          <a
            href={LINKS.releases}
            {...extProps(LINKS.releases)}
            className="mt-3 flex h-14 items-center justify-center rounded-2xl border border-olive-line bg-olive text-white transition hover:border-[#4a5022] hover:bg-[#25281a]"
          >
            Download the APK from GitHub
          </a>
          <p className="mt-5 text-[14px] leading-[1.6] text-white/50">
            Not sure which APK? <span className="text-white/75">arm64-v8a</span> fits almost every phone from the last few
            years. The GitHub build can update itself from inside the app.
          </p>
        </Reveal>

        <Reveal delay={100} className="card card-spot flex flex-col p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/[0.07]">
              <img src={linux} alt="" width={21} height={25} className="h-6 w-auto" />
            </span>
            <div>
              <h3 className="font-display text-[22px] font-bold">Linux</h3>
              <p className="text-[14px] text-white/50">x86_64 · .deb, .rpm and .tar.gz</p>
            </div>
          </div>

          <div role="tablist" aria-label="Choose your distribution" className="mt-8 grid grid-cols-3 gap-1 rounded-2xl bg-[#161616] p-1">
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

          <a
            href={LINKS.releases}
            {...extProps(LINKS.releases)}
            className="mt-auto flex h-14 items-center justify-center gap-2 rounded-2xl border border-olive-line bg-olive pt-0 text-white transition hover:border-[#4a5022] hover:bg-[#25281a] max-md:mt-6 md:mt-6"
          >
            Download {d.file} from GitHub
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
