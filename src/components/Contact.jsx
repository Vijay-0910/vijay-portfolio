import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const socials = [
  { label: 'LinkedIn', handle: '/in/vijayakumar', href: 'https://linkedin.com', note: 'Where I post the journey' },
  { label: 'GitHub',   handle: '@vijayakumar',    href: 'https://github.com',   note: 'Code lives here' },
  { label: 'Twitter',  handle: '@vijayakumar',    href: 'https://twitter.com',  note: 'Occasional dev notes' },
  { label: 'Email',    handle: 'aravindfinal1@gmail.com', href: 'mailto:aravindfinal1@gmail.com', note: 'Direct line' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section id="connect" className="relative py-40 px-6 md:px-16 overflow-hidden">
      {/* Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black select-none pointer-events-none whitespace-nowrap z-0 leading-none"
        style={{ color: 'var(--fgwm)' }}
      >
        CONNECT
      </div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <motion.span
          custom={0}
          variants={item}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="w-8 h-px" style={{ backgroundColor: 'var(--accent)' }} />
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
            Let's Connect
          </span>
        </motion.span>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left — heading + intro */}
          <div>
            <motion.h2
              custom={1}
              variants={item}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-5xl md:text-7xl font-black leading-none mb-8"
              style={{ color: 'var(--fg)' }}
            >
              Sharing the<br />
              <span style={{ background: 'var(--grad-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                journey
              </span>
            </motion.h2>

            <motion.p
              custom={2}
              variants={item}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-base leading-relaxed mb-6 max-w-md"
              style={{ color: 'var(--fg50)' }}
            >
              I'm not hunting for a new role — I'm documenting the climb from fullstack into DevOps,
              one shipped project at a time.
            </motion.p>

            <motion.p
              custom={3}
              variants={item}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-sm leading-relaxed max-w-md"
              style={{ color: 'var(--fg35)' }}
            >
              If something here resonates — a tool, a project, a decision — find me on any of these. Always up
              for a conversation about pipelines, containers, or what to learn next.
            </motion.p>
          </div>

          {/* Right — Social grid */}
          <motion.div
            custom={4}
            variants={item}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col"
          >
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                data-cursor="hover"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid grid-cols-12 items-center py-6 transition-colors duration-300"
                style={{ borderBottom: i < socials.length - 1 ? '1px solid var(--bd06)' : 'none' }}
              >
                <div className="col-span-3">
                  <div className="text-base font-semibold transition-colors duration-300" style={{ color: 'var(--fg)' }}>
                    {s.label}
                  </div>
                </div>
                <div className="col-span-7">
                  <div
                    className="font-mono text-xs transition-colors duration-300"
                    style={{ color: 'var(--fg40)' }}
                  >
                    {s.handle}
                  </div>
                  <div
                    className="text-[11px] mt-1 transition-colors duration-300"
                    style={{ color: 'var(--fg25)' }}
                  >
                    {s.note}
                  </div>
                </div>
                <div className="col-span-2 flex justify-end">
                  <span
                    className="text-lg transition-all duration-300 group-hover:text-[var(--accent)]"
                    style={{ color: 'var(--fg25)' }}
                  >
                    ↗
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
