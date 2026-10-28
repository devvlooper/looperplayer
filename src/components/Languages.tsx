import { extProps, LINKS } from '../config'
import { Reveal, SectionHead } from './Reveal'

// The app's languages, from lib/l10n/app_<code>.arb in the app repo. Each is shown in its own language.
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية', rtl: true },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'zh', name: '中文' },
]

export function Languages() {
  return (
    <section id="languages" className="relative px-4 py-12 sm:py-[clamp(56px,8vw,110px)]">
      <SectionHead
        eyebrow="Languages"
        title={
          <>
            Speaks <span className="text-badge">{LANGUAGES.length} languages</span>.
          </>
        }
        lede="Looper follows your device language. Missing yours, or spotted a typo? Translations are plain text files anyone can edit."
      />
      <Reveal className="mx-auto mt-8 flex max-w-[900px] flex-wrap justify-center gap-2 sm:mt-12 sm:gap-2.5">
        {LANGUAGES.map((l) => (
          <span
            key={l.code}
            lang={l.code}
            dir={l.rtl ? 'rtl' : undefined}
            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[15px] text-white/80 transition hover:border-badge/40 hover:text-white sm:text-[16px]"
          >
            {l.name}
          </span>
        ))}
      </Reveal>
      <Reveal className="mt-6 text-center sm:mt-8">
        <a
          href={LINKS.translations}
          {...extProps(LINKS.translations)}
          className="text-[15px] text-white/60 underline decoration-white/20 underline-offset-4 transition hover:text-badge"
        >
          Help translate on GitHub
        </a>
      </Reveal>
    </section>
  )
}
