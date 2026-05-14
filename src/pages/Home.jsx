import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import DevOpsShowcase from '../components/DevOpsShowcase'
import Projects from '../components/Projects'
import TechStack from '../components/TechStack'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import SectionDivider from '../components/SectionDivider'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="noise"
    >
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <DevOpsShowcase />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <TechStack />
      <SectionDivider />
      <Contact />
      <Footer />
    </motion.main>
  )
}
