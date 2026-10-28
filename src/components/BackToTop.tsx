import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useInView'

/** Floating button that appears once you're well down the page. */
export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 2)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
      className={`fixed bottom-4 right-4 z-40 grid size-11 place-items-center rounded-2xl border border-white/15 bg-[#1c1d17]/85 text-white shadow-[0_12px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-badge/50 hover:text-badge sm:bottom-6 sm:right-6 sm:size-12 ${
        show ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0'
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
