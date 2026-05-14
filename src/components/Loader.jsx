import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const counterRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: () => setTimeout(onComplete, 200) })

    tl.to(barRef.current, { scaleX: 1, duration: 1.8, ease: 'power2.inOut' })

    const obj = { val: 0 }
    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current)
          counterRef.current.textContent = Math.round(obj.val).toString().padStart(3, '0')
      },
    }, 0)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'var(--bg)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute bottom-16 left-16">
        <span ref={counterRef} className="font-mono text-5xl font-black" style={{ color: 'var(--fg10)' }}>
          000
        </span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--bd05)' }}>
        <div
          ref={barRef}
          className="h-full origin-left"
          style={{ transform: 'scaleX(0)', background: 'var(--grad-main)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono text-2xl font-black tracking-widest"
        style={{ color: 'var(--fg)' }}
      >
        VK<span style={{ color: 'var(--accent)' }}>.</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-3 text-xs font-mono tracking-[0.4em] uppercase"
        style={{ color: 'var(--fg20)' }}
      >
        Portfolio 2026
      </motion.p>
    </motion.div>
  )
}
