export type Platform = 'android' | 'linux' | 'windows'

/** Best guess at the visitor's OS. Null for anything we don't ship (iOS, macOS, ChromeOS) or can't tell. */
export function detectPlatform(): Platform | null {
  if (typeof navigator === 'undefined') return null
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } }
  const s = `${nav.userAgentData?.platform ?? ''} ${nav.userAgent}`.toLowerCase()
  if (s.includes('android')) return 'android'
  if (s.includes('cros') || s.includes('iphone') || s.includes('ipad') || s.includes('mac')) return null
  if (s.includes('win')) return 'windows'
  if (s.includes('linux')) return 'linux'
  return null
}

export const PLATFORM = detectPlatform()
