import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '2+',  label: 'Years building fullstack' },
  { value: '15+', label: 'Projects shipped to production' },
  { value: '8+',  label: 'DevOps tools in active use' },
]

const traits = ['React', 'React Native', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Nginx', 'AWS', 'CI/CD']

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }
  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="about" className="relative py-40 px-6 md:px-16 overflow-hidden">
      {/* Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black select-none pointer-events-none whitespace-nowrap z-0"
        style={{ color: 'var(--fgwm)' }}
      >
        ABOUT
      </div>

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center"
      >
        {/* Left */}
        <div>
          <motion.span variants={item} className="inline-flex items-center gap-3 mb-8">
            <span className="w-8 h-px" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
              About Me
            </span>
          </motion.span>

          <motion.h2 variants={item} className="text-5xl md:text-7xl font-black leading-none mb-8" style={{ color: 'var(--fg)' }}>
            From shipping features<br />
            <span style={{ background: 'var(--grad-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              to owning deployment
            </span>
          </motion.h2>

          <motion.p variants={item} className="text-lg leading-relaxed mb-6" style={{ color: 'var(--fg50)' }}>
            I'm a fullstack developer who's expanded beyond the code editor — containerising apps,
            wiring up CI/CD pipelines, configuring Nginx, and deploying to AWS without breaking production.
          </motion.p>

          <motion.p variants={item} className="text-base leading-relaxed mb-10" style={{ color: 'var(--fg35)' }}>
            Each project I build now ships the full lifecycle: write it, dockerize it, deploy it, monitor it.
            That shift — from "developer who writes features" to "engineer who owns delivery" — is what this
            site documents.
          </motion.p>

          {/* Tags */}
          <motion.div variants={item} className="flex flex-wrap gap-2">
            {traits.map((t) => (
              <span
                key={t}
                data-cursor="hover"
                className="px-4 py-1.5 text-xs font-mono rounded-full transition-all duration-300 cursor-default"
                style={{ border: '1px solid var(--bd10)', color: 'var(--fg50)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.color = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--bd10)'
                  e.currentTarget.style.color = 'var(--fg50)'
                }}
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — Stats */}
        <div className="flex flex-col gap-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={item}
              className="group relative pl-8 transition-colors duration-500"
              style={{ borderLeft: '1px solid var(--bd10)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = 'var(--bd10)')}
            >
              <div
                className="text-7xl md:text-8xl font-black absolute -left-4 top-0 select-none transition-colors duration-500"
                style={{ color: 'var(--fg05)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="relative z-10">
                <div
                  className="text-5xl font-black mb-1 transition-colors duration-300"
                  style={{ color: 'var(--fg)' }}
                >
                  {s.value}
                </div>
                <div className="text-sm font-mono tracking-wider" style={{ color: 'var(--fg40)' }}>
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div variants={item}>
            <button
              onClick={() => document.getElementById('devops')?.scrollIntoView({ behavior: 'smooth' })}
              data-cursor="hover"
              className="group inline-flex items-center gap-3 text-sm font-medium transition-colors duration-300"
              style={{ color: 'var(--fg40)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg40)')}
            >
              <span
                className="w-10 h-px transition-all duration-300 group-hover:w-16"
                style={{ backgroundColor: 'var(--fg20)' }}
              />
              See the DevOps toolkit →
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
