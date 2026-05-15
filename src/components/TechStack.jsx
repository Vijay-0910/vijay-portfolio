import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const categoriesDark = [
  { label: 'Frontend',      color: '#00d4ff', techs: ['React','JavaScript','TypeScript','Tailwind CSS','Framer Motion','Three.js'] },
  { label: 'Backend',       color: '#5eead4', techs: ['Node.js','Express','Fastify','REST APIs','GraphQL','WebSockets'] },
  { label: 'Mobile',        color: '#00d4ff', techs: ['React Native','Expo','EAS Build','OTA Updates'] },
  { label: 'DevOps & Cloud',color: '#6d4ad9', techs: ['Docker','AWS','Nginx','GitHub Actions','CI/CD','Linux'] },
  { label: 'Database',      color: '#5eead4', techs: ['MongoDB','Mongoose','Redis','PostgreSQL'] },
]

const categoriesLight = [
  { label: 'Frontend',      color: '#FF923E', techs: ['React','JavaScript','TypeScript','Tailwind CSS','Framer Motion','Three.js'] },
  { label: 'Backend',       color: '#005CA8', techs: ['Node.js','Express','Fastify','REST APIs','GraphQL','WebSockets'] },
  { label: 'Mobile',        color: '#FF923E', techs: ['React Native','Expo','EAS Build','OTA Updates'] },
  { label: 'DevOps & Cloud',color: '#005CA8', techs: ['Docker','AWS','Nginx','GitHub Actions','CI/CD','Linux'] },
  { label: 'Database',      color: '#FF923E', techs: ['MongoDB','Mongoose','Redis','PostgreSQL'] },
]

const allTechs = categoriesDark.flatMap((c) => c.techs)

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const { theme } = useTheme()
  const categories = theme === 'light' ? categoriesLight : categoriesDark

  return (
    <section id="tech" className="relative py-24 md:py-40 px-5 sm:px-6 md:px-16 overflow-hidden">
      {/* Marquee ticker */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden py-4"
        style={{ borderTop: '1px solid var(--bd05)', borderBottom: '1px solid var(--bd05)' }}
      >
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(3)].flatMap(() =>
            allTechs.map((t, i) => (
              <span key={`${t}-${i}`} className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--fg10)' }}>
                {t}
              </span>
            ))
          )}
        </div>
      </div>

      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto mt-16"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px" style={{ backgroundColor: 'var(--accent3)' }} />
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent3)' }}>
              Tech Stack
            </span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight md:leading-none"
            style={{ color: 'var(--fg)' }}
          >
            Tools I<br />
            <span style={{ background: 'var(--grad-alt)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              master
            </span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ background: 'var(--bd05)' }}
        >
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 md:p-8 transition-colors duration-500"
              style={{ background: 'var(--bg)' }}
              data-cursor="hover"
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--sf02)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg)')}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${cat.color}0a 0%, transparent 60%)` }}
              />
              <div
                className="w-2 h-2 rounded-full mb-6"
                style={{ backgroundColor: cat.color, boxShadow: `0 0 12px ${cat.color}80` }}
              />
              <h3 className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: 'var(--fg30)' }}>
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm font-medium transition-colors duration-300"
                    style={{ color: 'var(--fg55)' }}
                  >
                    {tech}
                    <span style={{ color: 'var(--fg20)' }} className="ml-1">/</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Available tile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 md:p-8 flex flex-col justify-between"
            style={{ background: 'var(--bg)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
                Building in Public
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg40)' }}>
              Every project gets deployed and documented. Follow the journey on LinkedIn.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `}</style>
    </section>
  )
}
