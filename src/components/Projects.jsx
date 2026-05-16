import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const projectsDark = [
  { id: 1, num: '01', title: 'Personal Portfolio',          subtitle: 'AWS EC2 · NGINX · GitHub Actions', tags: ['AWS EC2','NGINX','Docker','GitHub Actions'], color: '#6d4ad9', description: 'This site — Linux on EC2, NGINX reverse proxy with Let\'s Encrypt HTTPS, Dockerized backend, GitHub Actions pipeline for zero-downtime SSH deploys on every push.', year: '2026' },
  { id: 2, num: '02', title: 'AI Low-Code Platform',        subtitle: 'Enterprise Fullstack Project',     tags: ['React','Node.js','Express','MongoDB'],       color: '#00d4ff', description: 'Enterprise low-code builder — drag-and-drop dashboards, form schemas, RBAC, document management. Built end-to-end with the MERN stack.',                          year: '2024' },
  { id: 3, num: '03', title: 'HRMS Mobile — Canara Bank',   subtitle: 'React Native · 40K users',         tags: ['React Native','Redux','TypeScript','REST'],  color: '#5eead4', description: 'Modern React Native HRMS for 40,000+ banking employees on Android and iOS, integrated with PeopleSoft REST APIs.',                                              year: '2023' },
  { id: 4, num: '04', title: 'Doctor Appointment Portal',   subtitle: 'React SPA · Teams Integration',    tags: ['React','Node.js','Microsoft Graph','WebSocket'], color: '#00d4ff', description: 'Single Page App for clinics with Microsoft Teams/Outlook calendar sync and WebSocket real-time appointment updates.',                                       year: '2024' },
  { id: 5, num: '05', title: 'Sportzia — Event Platform',   subtitle: 'React Native · Cross-platform',    tags: ['React Native','Node.js','MongoDB','Stripe'], color: '#6d4ad9', description: 'Sports event management app with real-time score updates, Stripe/Razorpay payments, and cross-platform mobile + web reach.',                                  year: '2025' },
]

const projectsLight = projectsDark.map((p, i) => ({
  ...p,
  color: i % 2 === 0 ? '#FF923E' : '#005CA8',
}))

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative py-12 cursor-pointer"
      style={{ borderBottom: '1px solid var(--bd06)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{ background: `radial-gradient(circle at 0% 50%, ${project.color}10 0%, transparent 60%)` }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10 grid grid-cols-12 items-center gap-3 sm:gap-6 px-2 sm:px-4">
        {/* Number */}
        <div className="col-span-2 md:col-span-1">
          <span className="font-mono text-xs transition-colors duration-300" style={{ color: hovered ? 'var(--fg40)' : 'var(--fg20)' }}>
            {project.num}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-7 md:col-span-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight transition-colors duration-300" style={{ color: 'var(--fg)' }}>
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm mt-1 font-mono" style={{ color: 'var(--fg30)' }}>{project.subtitle}</p>
        </div>

        {/* Description on hover */}
        <div className="hidden md:block col-span-4">
          <motion.p
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-sm leading-relaxed"
            style={{ color: 'var(--fg40)' }}
          >
            {project.description}
          </motion.p>
        </div>

        {/* Tags — hidden on mobile, mobile shows year+arrow instead */}
        <div className="hidden md:flex md:col-span-2 flex-wrap gap-1.5 justify-end">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded transition-colors duration-300"
              style={{
                border: '1px solid var(--bd10)',
                color: 'var(--fg30)',
                borderColor: hovered ? 'var(--bd20)' : 'var(--bd10)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Year + Arrow */}
        <div className="col-span-3 md:col-span-1 flex items-center justify-end gap-3 md:gap-4">
          <span className="text-[11px] sm:text-xs font-mono" style={{ color: 'var(--fg20)' }}>{project.year}</span>
          <motion.div
            animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            style={{ color: project.color }}
            className="text-lg font-light"
          >
            ↗
          </motion.div>
        </div>
      </div>

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        style={{ backgroundColor: project.color, originY: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const { theme } = useTheme()
  const projects = theme === 'light' ? projectsLight : projectsDark

  return (
    <section id="work" className="relative py-24 md:py-40 px-5 sm:px-6 md:px-16 overflow-hidden">
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 text-[18vw] font-black select-none pointer-events-none whitespace-nowrap z-0 leading-none"
        style={{ color: 'var(--fgwm)' }}
      >
        WORK
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-px" style={{ backgroundColor: 'var(--accent2)' }} />
              <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent2)' }}>
                Selected Work
              </span>
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight md:leading-none"
              style={{ color: 'var(--fg)' }}
            >
              Featured<br />
              <span style={{ background: 'var(--grad-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Projects
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
            Enterprise fullstack work plus personal projects where I'm learning DevOps end-to-end.
          </motion.p>
        </div>

        <div>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://www.linkedin.com/in/vijayakumar-manoharan-49a164175"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            aria-label="More on LinkedIn"
            className="group inline-flex items-center gap-4 text-sm font-mono transition-colors duration-300"
            style={{ color: 'var(--fg30)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg30)')}
          >
            More on LinkedIn ↗
            <span className="w-8 h-px transition-all duration-300 group-hover:w-16" style={{ backgroundColor: 'var(--fg20)' }} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
