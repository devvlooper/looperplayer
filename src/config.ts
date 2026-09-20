// Every external URL and piece of shared copy lives here so the site can be wired up in one place.
// TODO: replace the "#" placeholders with the real destinations.

export const LINKS = {
  playStore: '#', // Google Play listing
  linuxDownload: '#', // Linux build (GitHub Releases / Flathub / AppImage …)
  github: '#', // Source repository
  issues: '#', // Issue tracker
  contribute: '#', // CONTRIBUTING guide
  privacy: '#',
  licenses: '#',
} as const

export const COPY = {
  headline: ['Made For The Music', 'You Already Own.'],
  subhead:
    "Looper Player Is An Offline Music Player Built For Android & Linux, With Everything You Need And Nothing You Don't.",
  badge: '10K+',
} as const

export const isExternal = (href: string) => /^https?:\/\//.test(href)
