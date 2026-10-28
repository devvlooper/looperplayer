/** Four-pane Windows logo. Inherits colour from `currentColor`. */
export function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M3 5.1 10.4 4v7.1H3V5.1zm8.3-1.2L21 2.5v8.6h-9.7V3.9zM3 12.9h7.4V20L3 18.9v-6zm8.3 0H21v8.6l-9.7-1.4v-7.2z" />
    </svg>
  )
}
