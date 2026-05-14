import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionDivider() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="relative flex items-center justify-center py-4 px-16">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, var(--bd10), transparent)' }}
      />
    </div>
  )
}
