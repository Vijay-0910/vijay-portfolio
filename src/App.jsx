import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { useLenis } from './hooks/useLenis'

function PortfolioApp() {
  const [loading, setLoading] = useState(true)
  useLenis()

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  return (
    <>
      <Cursor />
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <>
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
