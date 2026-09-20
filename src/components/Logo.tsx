import logo from '../assets/logo.png'

export function Logo({ className = '' }: { className?: string }) {
  return <img src={logo} alt="Looper Player" width={47} height={33} className={className} draggable={false} />
}
