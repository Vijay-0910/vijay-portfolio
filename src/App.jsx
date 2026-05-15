import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { useLenis } from './hooks/useLenis'

const Cursor = lazy(() => import('./components/Cursor'))

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[200] pointer-events-none"
      style={{ scaleX, background: 'linear-gradient(90deg, var(--accent), var(--accent2))' }}
    />
  )
}

function PortfolioApp() {
  const [loading, setLoading] = useState(true)
  useLenis()

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  return (
    <>
      <Suspense fallback={null}>
        <Cursor />
      </Suspense>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <>
          <a href="#hero" className="skip-link">Skip to content</a>
          <ScrollProgress />
          <Navbar />
          <Home />
        </>
      )}
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  )
}
