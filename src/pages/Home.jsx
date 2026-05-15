import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import SectionDivider from '../components/SectionDivider'

const About = lazy(() => import('../components/About'))
const Experience = lazy(() => import('../components/Experience'))
const DevOpsShowcase = lazy(() => import('../components/DevOpsShowcase'))
const Projects = lazy(() => import('../components/Projects'))
const TechStack = lazy(() => import('../components/TechStack'))
const Contact = lazy(() => import('../components/Contact'))
const Footer = lazy(() => import('../components/Footer'))

const SectionFallback = () => <div style={{ minHeight: '50vh' }} aria-hidden />

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
      <Suspense fallback={<SectionFallback />}>
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
      </Suspense>
    </motion.main>
  )
}
