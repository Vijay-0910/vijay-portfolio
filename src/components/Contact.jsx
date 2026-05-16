import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const socials = [
  { label: 'LinkedIn', handle: '/in/vijayakumar-manoharan', href: 'https://www.linkedin.com/in/vijayakumar-manoharan-49a164175', note: 'Where I post the journey' },
  { label: 'GitHub',   handle: '@Vijay-0910',               href: 'https://github.com/Vijay-0910',                                note: 'Pipelines, infra, and code' },
  { label: 'Phone',    handle: '+91 9965395522',            href: 'tel:+919965395522',                                            note: 'Coimbatore, India · IST' },
  { label: 'Email',    handle: 'vijayakumar.m.dev@gmail.com', href: 'mailto:vijayakumar.m.dev@gmail.com',                         note: 'Direct line — copy or click', copyable: true },
]

function SocialRow({ social: s, isLast }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(s.handle)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = s.handle
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch {}
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const labelBlock = (
    <div className="text-sm sm:text-base font-semibold transition-colors duration-300" style={{ color: 'var(--fg)' }}>
      {s.label}
    </div>
  )
  const handleBlock = (
    <>
      <div className="font-mono text-[11px] sm:text-xs transition-colors duration-300 truncate" style={{ color: 'var(--fg40)' }}>
        {s.handle}
      </div>
      <div className="text-[10px] sm:text-[11px] mt-1 transition-colors duration-300 truncate" style={{ color: 'var(--fg25)' }}>
        {s.note}
      </div>
    </>
  )

  const rowStyle = { borderBottom: isLast ? 'none' : '1px solid var(--bd06)' }

  if (s.copyable) {
    // Email row: container is a div (no nested-button-in-anchor invalid HTML)
    return (
      <motion.div
        whileHover={{ x: 8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group relative grid grid-cols-12 items-center py-5 md:py-6 gap-2 transition-colors duration-300"
        style={rowStyle}
      >
        <div className="col-span-4 sm:col-span-3">{labelBlock}</div>
        <a
          href={s.href}
          aria-label={`Send email to ${s.handle}`}
          data-cursor="hover"
          className="col-span-6 sm:col-span-7 min-w-0 group-hover:opacity-90"
        >
          {handleBlock}
        </a>
        <div className="col-span-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Email copied' : 'Copy email to clipboard'}
            data-cursor="hover"
            className="px-2 py-1 rounded text-[10px] font-mono transition-all whitespace-nowrap"
            style={{
              border: '1px solid var(--bd15)',
              color: copied ? 'var(--accent3, #4ade80)' : 'var(--fg40)',
              background: copied ? 'color-mix(in srgb, var(--accent3, #4ade80) 12%, transparent)' : 'transparent',
            }}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      aria-label={`${s.label}: ${s.handle}`}
      whileHover={{ x: 8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative grid grid-cols-12 items-center py-5 md:py-6 gap-2 transition-colors duration-300"
      style={rowStyle}
    >
      <div className="col-span-4 sm:col-span-3">{labelBlock}</div>
      <div className="col-span-6 sm:col-span-7 min-w-0">{handleBlock}</div>
      <div className="col-span-2 flex justify-end">
        <span className="text-lg transition-all duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--fg25)' }}>↗</span>
      </div>
    </motion.a>
  )
}

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
    <section id="connect" className="relative py-24 md:py-40 px-5 sm:px-6 md:px-16 overflow-hidden">
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

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left — heading + intro */}
          <div>
            <motion.h2
              custom={1}
              variants={item}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight md:leading-none mb-6 md:mb-8"
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
              Not job hunting — just showcasing the DevOps skills I'm building alongside fullstack
              work, one shipped project at a time.
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
              for a conversation about EC2 setup, NGINX, Docker, or GitHub Actions deploys.
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
              <SocialRow
                key={s.label}
                social={s}
                isLast={i === socials.length - 1}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
