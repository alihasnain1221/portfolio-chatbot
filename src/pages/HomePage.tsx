import Hero from '../components/Hero'
import ProofStrip from '../components/ProofStrip'
import Projects from '../components/Projects'
import MoreProjects from '../components/MoreProjects'
import AiWork from '../components/AiWork'
import TechStack from '../components/TechStack'
import Story from '../components/Story'
import Closing from '../components/Closing'

// Landing page (ported from the Stitch "Stack (Silver Variant)" screen).
export default function HomePage() {
  return (
    <main className="relative pt-28 md:pt-40 pb-24 md:pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-12 sm:space-y-16 md:space-y-40">
      <Hero />
      <ProofStrip />
      <Projects />
      <MoreProjects />
      <AiWork />
      <TechStack />
      <Story />
      <Closing />
    </main>
  )
}
