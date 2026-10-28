// Every external URL and piece of shared copy lives here so the site can be wired up in one place.

const REPO = 'https://github.com/sthrnilshaaa/looper'

export const LINKS = {
  site: 'https://looperplayer.vercel.app',
  playStore: 'https://play.google.com/store/apps/details?id=com.looper.player', // Google Play listing
  releases: `${REPO}/releases/latest`, // APK, Linux packages (.deb, .rpm, .tar.gz) and Windows (.exe, .zip)
  linuxDownload: '#download', // Header penguin → the download section with every Linux package
  windowsDownload: '#download', // Header Windows button → the download section
  github: REPO, // Source repository
  issues: `${REPO}/issues`, // Issue tracker
  contribute: `${REPO}#contributing`, // Contributing section of the README
  contributors: `${REPO}/graphs/contributors`,
  contributorsImage: 'https://contrib.rocks/image?repo=SthrNilshaaa/looper',
  privacy: '#privacy', // On-page privacy section
  licenses: `${REPO}/blob/main/LICENSE.md`, // GPL-3.0
  kofi: 'https://ko-fi.com/L2L124TL7L',
  telegram: 'https://t.me/looperPlayer',
} as const

export const COPY = {
  headline: ['Made For The Music', 'You Already Own.'],
  subhead:
    "Looper Player Is An Offline Music Player Built For Android, Linux & Windows, With Everything You Need And Nothing You Don't.",
  // 10,796 GitHub release downloads on 2026-10-14 (Play Store installs not counted).
  badge: '10K+',
} as const

export const isExternal = (href: string) => /^https?:\/\//.test(href)

/** Spread onto an <a> so external links open in a new tab. */
export const extProps = (href: string) => (isExternal(href) ? { target: '_blank', rel: 'noreferrer' } : {})
