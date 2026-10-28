import { Analyze } from './components/Analyze'
import { BackToTop } from './components/BackToTop'
import { Community } from './components/Community'
import { Download } from './components/Download'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { GetStarted } from './components/GetStarted'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HeroGlow } from './components/HeroGlow'
import { Languages } from './components/Languages'
import { LyricsShowcase } from './components/LyricsShowcase'
import { Privacy } from './components/Privacy'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { Stats } from './components/Stats'
import { WhatsNew } from './components/WhatsNew'

export default function App() {
  return (
    <div className="relative flow-root min-h-screen overflow-x-clip bg-bg font-sans text-white">
      <HeroGlow />
      <Header />
      <main className="relative">
        <Hero />
        <ShowcaseTabs />
        <Stats />
        <LyricsShowcase />
        <Features />
        <Analyze />
        <WhatsNew />
        <GetStarted />
        <Download />
        <Privacy />
        <Languages />
        <Community />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
