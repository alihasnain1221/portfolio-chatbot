import Hero from '../components/Hero'
import Projects from '../components/Projects'
import TechStack from '../components/TechStack'
import Story from '../components/Story'

// Landing page (ported from the Stitch "Stack (Silver Variant)" screen).
export default function HomePage() {
  return (
    <main className="relative pt-28 md:pt-40 pb-24 md:pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-24 md:space-y-40">
      <Hero />
      <Projects />
      <TechStack />
      <Story />
    </main>
  )
}
