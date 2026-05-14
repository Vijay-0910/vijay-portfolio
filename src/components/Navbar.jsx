import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'About',    id: 'about' },
  { label: 'Growth',   id: 'experience' },
  { label: 'DevOps',   id: 'devops' },
  { label: 'Work',     id: 'work' },
  { label: 'Tech',     id: 'tech' },
  { label: 'Connect',  id: 'connect' },
]

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      data-cursor="hover"
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300"
      style={{
        borderColor: 'var(--bd15)',
        background: 'var(--sf03)',
      }}
    >
      {/* Sun */}
      <svg
        width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke={isDark ? 'var(--fg20)' : 'var(--accent)'}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transition: 'stroke 0.3s' }}
      >
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>

      {/* Pill track */}
      <div
        className="relative w-8 h-4 rounded-full transition-all duration-300"
        style={{ background: isDark ? 'var(--accent)' : 'var(--bd15)' }}
      >
        <motion.div
          animate={{ x: isDark ? 16 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white"
        />
      </div>

      {/* Moon */}
      <svg
        width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke={isDark ? 'var(--accent)' : 'var(--fg20)'}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transition: 'stroke 0.3s' }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 60))
  }, [scrollY])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
      className="fixed top-0 left-0 right-0 z-[100] px-8 py-5 flex items-center justify-between"
      style={{
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        background: scrolled ? 'var(--navbar-blur-bg)' : 'transparent',
        transition: 'backdrop-filter 0.4s, background 0.5s',
        borderBottom: scrolled ? '1px solid var(--navbar-border)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        data-cursor="hover"
        className="font-mono text-sm tracking-widest transition-colors duration-300"
        style={{ color: 'var(--fg60)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg60)')}
      >
        VK<span style={{ color: 'var(--accent)' }}>.</span>
      </button>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-7">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            data-cursor="hover"
            className="relative text-sm font-medium transition-colors duration-300 group"
            style={{ color: 'var(--fg40)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg40)')}
          >
            {link.label}
            <span
              className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          </button>
        ))}

        <ThemeToggle />

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="px-5 py-2 text-sm font-medium rounded-full transition-all duration-300"
          style={{
            border: '1px solid var(--bd15)',
            color: 'var(--fg60)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.color = 'var(--accent)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--bd15)'
            e.currentTarget.style.color = 'var(--fg60)'
          }}
        >
          LinkedIn ↗
        </a>
      </nav>

      {/* Mobile: toggle + hamburger */}
      <div className="md:hidden flex items-center gap-4">
        <ThemeToggle />
        <button
          className="flex flex-col gap-1.5 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          data-cursor="hover"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="block w-6 h-px origin-center"
            style={{ backgroundColor: 'var(--fg)' }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block w-6 h-px"
            style={{ backgroundColor: 'var(--fg)' }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="block w-6 h-px origin-center"
            style={{ backgroundColor: 'var(--fg)' }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? '0%' : '100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden"
        style={{ background: 'var(--bg)' }}
      >
        {links.map((link, i) => (
          <motion.button
            key={link.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 30 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => scrollTo(link.id)}
            className="text-4xl font-bold transition-colors duration-300"
            style={{ color: 'var(--fg70)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg70)')}
          >
            {link.label}
          </motion.button>
        ))}
      </motion.div>
    </motion.header>
  )
}
