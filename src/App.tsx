import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ShowcaseTabs } from './components/ShowcaseTabs'

export default function App() {
  return (
    <div className="relative flow-root min-h-screen overflow-x-clip bg-bg font-sans text-white">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[720px]" />
      <Header />
      <main className="relative">
        <Hero />
        <ShowcaseTabs />
      </main>
      <Footer />
    </div>
  )
}
