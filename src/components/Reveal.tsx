import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  id,
}: {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
  id?: string
}) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Tag
      ref={ref}
      id={id}
      data-in={inView || undefined}
      className={`reveal ${className}`}
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

/** Shared section heading: small lime eyebrow, big title, optional lede. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  center = true,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  center?: boolean
}) {
  return (
    <Reveal className={center ? 'mx-auto max-w-[860px] text-center' : 'max-w-[560px]'}>
      <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-badge">{eyebrow}</p>
      <h2 className="mt-2.5 font-display text-[1.65rem] sm:mt-3 sm:text-[clamp(1.9rem,3.6vw,3.1rem)] font-extrabold leading-[1.08] tracking-[-0.02em]">
        {title}
      </h2>
      {lede && <p className="mt-3 text-[15px] leading-[1.6] sm:mt-4 sm:text-[clamp(1rem,1.2vw,1.12rem)] sm:leading-[1.7] text-white/65">{lede}</p>}
    </Reveal>
  )
}
