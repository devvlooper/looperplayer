import desktop from '../assets/desktop.webp'

export function DesktopShowcase() {
  return (
    <div className="animate-rise mx-auto w-[min(1006px,calc(100%-32px))]">
      <img
        src={desktop}
        alt="Looper Player on Linux: sidebar navigation, recently played songs, albums and the playback bar"
        width={1209}
        height={781}
        className="block h-auto w-full drop-shadow-[0_36px_56px_rgba(0,0,0,0.32)]"
        draggable={false}
      />
    </div>
  )
}
