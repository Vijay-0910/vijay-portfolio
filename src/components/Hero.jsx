import { useEffect, useRef, lazy, Suspense } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

const sentence = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.3 } },
}
const letter = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
const name = 'Vijayakumar'

export default function Hero() {
  const { theme } = useTheme()
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })
  const orbX = useMotionValue(0)
  const orbSpringX = useSpring(orbX, { stiffness: 20, damping: 15 })
  const arrowRef = useRef(null)

  useEffect(() => {
    const handleMouse = (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 30)
      mouseY.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * 30)
    }
    const el = containerRef.current
    el?.addEventListener('mousemove', handleMouse, { passive: true })
    return () => el?.removeEventListener('mousemove', handleMouse)
  }, [])

  useEffect(() => {
    if (!arrowRef.current) return
    gsap.to(arrowRef.current, { y: 10, repeat: -1, yoyo: true, duration: 1.2, ease: 'sine.inOut' })
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* WebGL */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroCanvas mouseX={springX} mouseY={springY} theme={theme} />
        </Suspense>
      </div>

      {/* Gradient fade to bg */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: `linear-gradient(to bottom, var(--bg60), transparent, var(--bg))` }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-px" style={{ backgroundColor: 'var(--accent)' }} />
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
            Fullstack · Growing into DevOps
          </span>
          <span className="w-8 h-px" style={{ backgroundColor: 'var(--accent)' }} />
        </motion.div>

        {/* Name — letter reveal + CSS 3D depth */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-none tracking-tight hero-3d-text"
          style={{ perspective: '800px' }}
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {name.split('').map((char, i) => (
            <motion.span key={i} variants={letter} style={{ display: 'inline-block' }}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg md:text-2xl font-light max-w-2xl leading-relaxed"
          style={{ color: 'var(--fg40)' }}
        >
          Fullstack Developer growing into{' '}
          <span className="font-medium" style={{ color: 'var(--accent2)' }}>DevOps</span>
          {' '}— shipping{' '}
          <span className="font-medium" style={{ color: 'var(--accent)' }}>production projects</span>
          {', '}end-to-end.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center gap-6"
        >
          <button
            data-cursor="hover"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 font-semibold text-sm rounded-full overflow-hidden transition-all duration-300"
            style={{
              background: 'var(--accent)',
              color: 'var(--btn-text)',
              boxShadow: '0 0 0 rgba(0,0,0,0)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px color-mix(in srgb, var(--accent) 40%, transparent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)'
            }}
          >
            <span className="relative z-10">See What I've Built</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <button
            data-cursor="hover"
            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium transition-colors duration-300"
            style={{ color: 'var(--fg40)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg40)')}
          >
            View Tech Growth →
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div ref={arrowRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--fg20)' }}>
          Scroll
        </span>
        <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, var(--fg20), transparent)' }} />
      </div>

      {/* Parallax orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,146,62,0.07) 0%, transparent 70%)',
          x: springX,
          y: springY,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(109,74,217,0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,92,168,0.07) 0%, transparent 70%)',
          x: orbSpringX,
        }}
      />
    </section>
  )
}
