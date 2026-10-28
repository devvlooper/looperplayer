import { useEffect, useState } from 'react'
import { LINKS, RELEASE_API } from '../config'

/** Release files the site links to, matched by name so they keep working across versions. */
const ASSETS = {
  apk: /-arm64-v8a-release\.apk$/,
  deb: /_amd64\.deb$/,
  rpm: /\.x86_64\.rpm$/,
  appimage: /\.AppImage$/,
  tar: /_linux_x64\.tar\.gz$/,
  exe: /_windows_x64-setup\.exe$/,
  zip: /_windows_x64\.zip$/,
  sums: /^SHA256SUMS/,
} as const

export type AssetId = keyof typeof ASSETS
export type Asset = { url: string; size: number }
export type Release = { version: string; assets: Partial<Record<AssetId, Asset>> }

const CACHE_KEY = 'looper-release-v1'
let pending: Promise<Release | null> | null = null

function load(): Promise<Release | null> {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) return Promise.resolve(JSON.parse(cached) as Release)
  } catch {
    /* storage blocked: just fetch */
  }
  pending ??= fetch(RELEASE_API, { headers: { Accept: 'application/vnd.github+json' } })
    .then((r) => (r.ok ? r.json() : null))
    .then((data: { tag_name?: string; assets?: { name: string; size: number; browser_download_url: string }[] } | null) => {
      if (!data?.tag_name || !data.assets) return null
      const release: Release = { version: data.tag_name.replace(/^v/, ''), assets: {} }
      for (const [id, re] of Object.entries(ASSETS) as [AssetId, RegExp][]) {
        const a = data.assets.find((x) => re.test(x.name))
        if (a) release.assets[id] = { url: a.browser_download_url, size: a.size }
      }
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(release))
      } catch {
        /* ignore */
      }
      return release
    })
    .catch(() => null)
  return pending
}

/** The latest GitHub release, or null until it loads (or if GitHub is unreachable / rate-limited). */
export function useLatestRelease() {
  const [release, setRelease] = useState<Release | null>(null)
  useEffect(() => {
    let live = true
    load().then((r) => live && setRelease(r))
    return () => {
      live = false
    }
  }, [])

  /** Direct file link when known, otherwise the release page. */
  const href = (id: AssetId) => release?.assets[id]?.url ?? LINKS.releases
  /** "v2.7.4 · 24 MB", or '' until the release loads. */
  const meta = (id: AssetId) => {
    const a = release?.assets[id]
    return a ? `v${release.version} · ${Math.round(a.size / 1e6)} MB` : ''
  }
  return { release, href, meta }
}
