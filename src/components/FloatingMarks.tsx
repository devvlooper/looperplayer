import deco from '../assets/deco.png'

/** Faint olive logo-shards that peek out around the showcase. Purely decorative. */
export function FloatingMarks() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-full max-w-[1440px]">
      <img
        src={deco}
        alt=""
        width={125}
        height={115}
        className="absolute left-[5.2%] top-[-95px] w-[clamp(52px,7.1vw,102px)] animate-float"
      />
      <img
        src={deco}
        alt=""
        width={125}
        height={115}
        className="absolute left-[63.8%] top-[13px] w-[clamp(52px,7.1vw,102px)] animate-float-slow"
      />
    </div>
  )
}
