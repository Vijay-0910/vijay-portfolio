import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const milestonesDark = [
  {
    year: '2021 — 2022',
    title: 'Software Engineering Trainee',
    summary: 'First production code: shipped ERP modules with React and Node.js. Learned how a real product gets built.',
    skills: ['React', 'Node.js', 'JavaScript', 'REST APIs'],
    color: '#5eead4',
  },
  {
    year: '2022 — 2024',
    title: 'Fullstack Developer',
    summary: 'Built frontend and backend for enterprise platforms across banking, healthcare, and B2B — React, Node.js, Express, MongoDB at scale.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'REST APIs'],
    color: '#00d4ff',
  },
  {
    year: '2024 — 2025',
    title: 'Mobile + Architecture',
    summary: 'Expanded into React Native + Expo, microfrontend architecture, real-time WebSocket flows, and Microsoft Graph integrations.',
    skills: ['React Native', 'Expo', 'Next.js', 'Fastify', 'WebSocket', 'Microsoft Graph'],
    color: '#5eead4',
  },
  {
    year: '2025 — 2026',
    title: 'Started DevOps · Personal Projects',
    summary: 'Began hosting my own projects end-to-end: AWS EC2, Linux + NGINX, custom domains with HTTPS, Dockerized Node.js, and GitHub Actions CI/CD with zero-downtime SSH deploys.',
    skills: ['AWS EC2', 'Linux', 'NGINX', 'HTTPS / SSL', 'Docker', 'GitHub Actions', 'Zero-Downtime'],
    color: '#6d4ad9',
  },
]

const milestonesLight = milestonesDark.map((m, i) => ({
  ...m,
  color: i % 2 === 0 ? '#FF923E' : '#005CA8',
}))

function MilestoneCard({ milestone, index, isLast }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-12 gap-4 md:gap-6 pb-12 md:pb-20"
    >
      {/* Left rail — year + dot */}
      <div className="col-span-12 md:col-span-3 flex md:flex-col gap-4 md:gap-3 items-center md:items-end">
        <div className="relative md:pr-10">
          <div
            className="text-2xl md:text-3xl font-black leading-none whitespace-nowrap transition-colors duration-500"
            style={{ color: milestone.color, opacity: inView ? 1 : 0.3 }}
          >
            {milestone.year}
          </div>
          {/* Dot anchored to vertical line */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 + 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              backgroundColor: milestone.color,
              boxShadow: `0 0 16px ${milestone.color}80`,
              transform: 'translate(50%, -50%)',
            }}
          />
        </div>
      </div>

      {/* Right — content */}
      <div className="col-span-12 md:col-span-9 md:pl-12 relative">
        <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--fg)' }}>
          {milestone.title}
        </h3>
        <p className="text-base leading-relaxed mb-6 max-w-xl" style={{ color: 'var(--fg50)' }}>
          {milestone.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {milestone.skills.map((s) => (
            <span
              key={s}
              className="px-3 py-1 text-[11px] font-mono rounded-full transition-all duration-300"
              style={{
                border: `1px solid ${milestone.color}30`,
                color: 'var(--fg55)',
                backgroundColor: `${milestone.color}06`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const { theme } = useTheme()
  const milestones = theme === 'light' ? milestonesLight : milestonesDark

  return (
    <section id="experience" className="relative py-24 md:py-40 px-5 sm:px-6 md:px-16 overflow-hidden">
      {/* Watermark */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 text-[18vw] font-black select-none pointer-events-none whitespace-nowrap z-0 leading-none"
        style={{ color: 'var(--fgwm)' }}
      >
        GROWTH
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-px" style={{ backgroundColor: 'var(--accent3)' }} />
              <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent3)' }}>
                Tech Growth
              </span>
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight md:leading-none"
              style={{ color: 'var(--fg)' }}
            >
              Career, year<br />
              <span style={{ background: 'var(--grad-alt)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                by year
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm font-mono max-w-xs leading-relaxed"
            style={{ color: 'var(--fg30)' }}
          >
            Each year, the scope of what I own has expanded — from features, to pipelines, to platforms.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — runs through the center of dots on md+ */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute top-0 bottom-0 origin-top w-px"
            style={{
              left: 'calc(25% + 0px)',
              background: 'linear-gradient(to bottom, transparent, var(--bd15) 8%, var(--bd15) 92%, transparent)',
            }}
          />

          {milestones.map((m, i) => (
            <MilestoneCard
              key={m.year}
              milestone={m}
              index={i}
              isLast={i === milestones.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
