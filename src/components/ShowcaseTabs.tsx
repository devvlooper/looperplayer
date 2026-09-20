import { useState, type KeyboardEvent } from 'react'
import { DesktopShowcase } from './DesktopShowcase'
import { FloatingMarks } from './FloatingMarks'
import { MobileCarousel } from './MobileCarousel'

const TABS = [
  { id: 'mobile', label: 'Mobile' },
  { id: 'desktop', label: 'Desktop' },
] as const
type TabId = (typeof TABS)[number]['id']

/** Desktop is the design default; on phones the mobile screenshots make more sense first. */
const initialTab = (): TabId =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches ? 'mobile' : 'desktop'

export function ShowcaseTabs() {
  const [tab, setTab] = useState<TabId>(initialTab)
  const index = TABS.findIndex((t) => t.id === tab)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const next = TABS[(index + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length]
    setTab(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  return (
    <section
      id="showcase"
      aria-label="App screenshots"
      className="relative mt-[clamp(48px,6.8vw,98px)] pb-[clamp(72px,12.9vw,186px)]"
    >
      <FloatingMarks />

      <div
        role="tablist"
        aria-label="Choose screenshot platform"
        onKeyDown={onKeyDown}
        className="relative z-10 mx-auto grid h-[58px] w-[214px] grid-cols-2 rounded-[19px] border border-white/[0.035] bg-[#161616] p-[5.5px]"
      >
        <span
          aria-hidden="true"
          className="absolute left-[5.5px] top-[5.5px] h-[47px] w-[calc((100%-11px)/2)] rounded-[14px] bg-olive shadow-[inset_0_-1.5px_0_rgba(165,178,28,0.5),inset_0_1px_0_rgba(255,255,255,0.03)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(${index * 100}%)` }}
        />
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            aria-controls="showcase-panel"
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            className={`relative z-10 rounded-[14px] text-[18px] tracking-[-0.005em] text-white transition-opacity ${
              tab === t.id ? '' : 'opacity-90 hover:opacity-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        id="showcase-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        className="relative z-10 mt-7"
      >
        {tab === 'desktop' ? <DesktopShowcase key="d" /> : <MobileCarousel key="m" />}
      </div>
    </section>
  )
}
