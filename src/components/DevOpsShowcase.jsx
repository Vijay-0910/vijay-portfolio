import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const pipelineDark = [
  { label: 'GitHub',          sub: 'source · PRs',          icon: 'git',     color: '#00d4ff' },
  { label: 'GitHub Actions',  sub: 'CI · tests · build',    icon: 'gear',    color: '#6d4ad9' },
  { label: 'Docker',          sub: 'multi-stage image',     icon: 'box',     color: '#00d4ff' },
  { label: 'Nginx',           sub: 'reverse proxy · TLS',   icon: 'shield',  color: '#5eead4' },
  { label: 'AWS',             sub: 'EC2 · S3 · CloudWatch', icon: 'cloud',   color: '#00d4ff' },
]

const pipelineLight = pipelineDark.map((p, i) => ({
  ...p,
  color: i % 2 === 0 ? '#FF923E' : '#005CA8',
}))

const capabilities = [
  { title: 'AWS EC2 server setup',       detail: 'Provisioning EC2 instances, security groups, key pairs, and SSH access for production hosting.' },
  { title: 'Linux & NGINX configuration', detail: 'Ubuntu/Debian server admin — systemd, journalctl, ufw, NGINX virtual hosts and conf files.' },
  { title: 'Custom domain + HTTPS SSL',  detail: 'DNS records, NGINX server blocks, Let\'s Encrypt certificates with auto-renewal.' },
  { title: 'React frontend deployment',  detail: 'Vite build, static asset hosting, gzip + caching headers via NGINX.' },
  { title: 'Node.js backend deployment', detail: 'Express services running behind NGINX with PM2 or Docker, environment-isolated configs.' },
  { title: 'NGINX reverse proxy',        detail: 'Routing requests to backend services, TLS termination, gzip, proper headers and timeouts.' },
  { title: 'GitHub Actions CI/CD',       detail: 'Workflows for lint, build, and deploy on push — secrets and environments managed in GitHub.' },
  { title: 'SSH-based secure deploys',   detail: 'Key-based auth, ssh-agent forwarding, and Actions runners pushing artifacts to EC2.' },
  { title: 'Zero-downtime deployments',  detail: 'Health-checked container swaps behind NGINX so live traffic never hits a starting container.' },
  { title: 'Dockerized backend services', detail: 'Multi-stage Dockerfiles, .dockerignore hygiene, slim runtime images for Node.js apps.' },
  { title: 'Automated production deploys', detail: 'Every push to main runs the full chain — test, build, ship, restart — no manual steps.' },
]

function PipelineIcon({ icon, color }) {
  const stroke = color
  const s = 22
  switch (icon) {
    case 'git':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="12" r="2.5" />
          <path d="M6 8.5v7" />
          <path d="M8.5 6h7a2.5 2.5 0 0 1 0 5h-7" />
        </svg>
      )
    case 'gear':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      )
    case 'box':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="M3.3 7l8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      )
    case 'shield':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'cloud':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19a4.5 4.5 0 1 0 0-9 6 6 0 0 0-11.5 2A4 4 0 0 0 7 19h10.5z" />
        </svg>
      )
    default:
      return null
  }
}

function PipelineStage({ stage, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 + 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-row md:flex-col items-center md:text-center group gap-4 md:gap-0 w-full md:w-auto"
    >
      {/* Icon ring */}
      <div
        className="relative w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0"
        style={{
          background: 'var(--sf03)',
          border: `1px solid ${stage.color}30`,
          boxShadow: `0 0 24px ${stage.color}15`,
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${stage.color}15 0%, transparent 70%)` }}
        />
        <PipelineIcon icon={stage.icon} color={stage.color} />
      </div>

      {/* Label */}
      <div className="md:mt-4 text-left md:text-center min-w-0 flex-1 md:flex-none">
        <div className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>
          {stage.label}
        </div>
        <div className="mt-1 font-mono text-[10px] tracking-wider uppercase" style={{ color: 'var(--fg30)' }}>
          {stage.sub}
        </div>
      </div>
    </motion.div>
  )
}

function PipelineConnector({ index, inView, color }) {
  return (
    <>
      {/* Mobile: short vertical line, aligned with icon center (icon = w-14, padding-left = 28px) */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.12 + 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden h-6 w-px origin-top ml-7"
        style={{
          background: `linear-gradient(180deg, ${color}50, ${color}10)`,
        }}
      />
      {/* Desktop: horizontal line between stages */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex flex-1 items-center justify-center origin-left h-px self-start mt-10"
        style={{
          background: `linear-gradient(90deg, ${color}50, ${color}10)`,
        }}
      />
    </>
  )
}

export default function DevOpsShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const { theme } = useTheme()
  const pipeline = theme === 'light' ? pipelineLight : pipelineDark

  return (
    <section id="devops" className="relative py-24 md:py-40 px-5 sm:px-6 md:px-16 overflow-hidden">
      {/* Watermark */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[18vw] font-black select-none pointer-events-none whitespace-nowrap z-0 leading-none"
        style={{ color: 'var(--fgwm)' }}
      >
        DEVOPS
      </div>

      {/* Side glow */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent2) 8%, transparent) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px" style={{ backgroundColor: 'var(--accent2)' }} />
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent2)' }}>
              DevOps Toolkit
            </span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight md:leading-none mb-6"
            style={{ color: 'var(--fg)' }}
          >
            From local commit<br />
            <span style={{ background: 'var(--grad-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              to production
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base leading-relaxed max-w-2xl"
            style={{ color: 'var(--fg40)' }}
          >
            The pipeline I own end-to-end — every step is something I can write, debug, and ship without a hand-off.
          </motion.p>
        </div>

        {/* Pipeline diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-12 mb-14 md:mb-20"
          style={{
            background: 'var(--sf02)',
            border: '1px solid var(--bd06)',
          }}
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-0 md:gap-2">
            {pipeline.map((stage, i) => (
              <div
                key={stage.label}
                className="flex flex-col md:flex-1 md:flex-row md:items-start md:justify-center"
              >
                <PipelineStage stage={stage} index={i} inView={inView} />
                {i < pipeline.length - 1 && (
                  <PipelineConnector index={i} inView={inView} color={stage.color} />
                )}
              </div>
            ))}
          </div>

          {/* Bottom annotation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left"
            style={{ borderTop: '1px solid var(--bd06)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent3)' }} />
              <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: 'var(--fg40)' }}>
                Every push triggers the full chain
              </span>
            </div>
            <span className="font-mono text-[11px]" style={{ color: 'var(--fg20)' }}>
              push → test → build → deploy → live
            </span>
          </motion.div>
        </motion.div>

        {/* Capabilities grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ background: 'var(--bd05)' }}
        >
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 md:p-8 transition-colors duration-500"
              style={{ background: 'var(--bg)' }}
              data-cursor="hover"
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--sf02)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg)')}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--fg25)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="w-6 h-px" style={{ backgroundColor: 'var(--bd15)' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg)' }}>
                {cap.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg40)' }}>
                {cap.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
