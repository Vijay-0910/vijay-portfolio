import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

// User's actual skills — fullstack core + DevOps (hands-on with these 11 specifically).
// `source` = which CDN supplies the logo: 'simple' = simpleicons.org, 'devicon' = devicon.dev.
// `noLogo: true` = concept/topic with no brand logo (renders as a small accent dot).
// `mono: true` = monochrome icon, needs a theme-aware color so it stays visible.
const skills = [
  // Frontend
  { name: 'React',         source: 'simple',  slug: 'react',         color: '61DAFB' },
  { name: 'React Native',  source: 'devicon', slug: 'reactnative',   variant: 'original' },
  { name: 'Expo',          source: 'simple',  slug: 'expo',          color: '000020', mono: true },
  { name: 'Next.js',       source: 'simple',  slug: 'nextdotjs',     color: '000000', mono: true },
  { name: 'JavaScript',    source: 'simple',  slug: 'javascript',    color: 'F7DF1E' },
  { name: 'TypeScript',    source: 'simple',  slug: 'typescript',    color: '3178C6' },
  { name: 'HTML5',         source: 'simple',  slug: 'html5',         color: 'E34F26' },
  { name: 'CSS',           source: 'simple',  slug: 'css',           color: '663399' },
  { name: 'Tailwind CSS',  source: 'simple',  slug: 'tailwindcss',   color: '06B6D4' },
  { name: 'Bootstrap',     source: 'simple',  slug: 'bootstrap',     color: '7952B3' },

  // State Management
  { name: 'Redux',         source: 'simple',  slug: 'redux',         color: '764ABC' },
  { name: 'Zustand',       source: 'devicon', slug: 'zustand',       variant: 'original' },
  { name: 'TanStack Query', source: 'simple', slug: 'reactquery',    color: 'FF4154' },

  // Backend
  { name: 'Node.js',       source: 'simple',  slug: 'nodedotjs',     color: '5FA04E' },
  { name: 'Express',       source: 'simple',  slug: 'express',       color: '000000', mono: true },
  { name: 'Fastify',       source: 'simple',  slug: 'fastify',       color: '000000', mono: true },
  { name: 'REST APIs',     noLogo: true },
  { name: 'WebSocket',     source: 'simple',  slug: 'socketdotio',   color: '010101', mono: true },
  { name: 'Webhooks',      noLogo: true },

  // Databases
  { name: 'MongoDB',       source: 'simple',  slug: 'mongodb',       color: '47A248' },
  { name: 'SQL',           source: 'simple',  slug: 'mysql',         color: '4479A1' },
  { name: 'PostgreSQL',    source: 'simple',  slug: 'postgresql',    color: '4169E1' },

  // Integrations
  { name: 'Stripe',           source: 'simple',  slug: 'stripe',     color: '635BFF' },
  { name: 'Razorpay',         source: 'simple',  slug: 'razorpay',   color: '0C2451', mono: true },
  { name: 'Azure AD',         source: 'devicon', slug: 'azure',      variant: 'original' },
  { name: 'Microsoft Graph',  source: 'devicon', slug: 'azure',      variant: 'original' },

  // Tooling
  { name: 'ESLint',        source: 'simple',  slug: 'eslint',        color: '4B32C3' },
  { name: 'Git',           source: 'simple',  slug: 'git',           color: 'F05032' },
  { name: 'GitHub',        source: 'simple',  slug: 'github',        color: '181717', mono: true },

  // — DevOps (the 11 hands-on skills) —
  { name: 'AWS EC2',           source: 'devicon', slug: 'amazonwebservices', variant: 'original-wordmark' },
  { name: 'Linux',             source: 'simple',  slug: 'linux',       color: 'FCC624' },
  { name: 'SSH',               noLogo: true },
  { name: 'NGINX',             source: 'simple',  slug: 'nginx',       color: '009639' },
  { name: 'Reverse Proxy',     noLogo: true },
  { name: "Let's Encrypt",     source: 'simple',  slug: 'letsencrypt', color: '003A70' },
  { name: 'HTTPS / SSL',       noLogo: true },
  { name: 'Custom Domain',     noLogo: true },
  { name: 'Docker',            source: 'simple',  slug: 'docker',      color: '2496ED' },
  { name: 'GitHub Actions',    source: 'simple',  slug: 'githubactions', color: '2088FF' },
  { name: 'CI/CD Pipeline',    noLogo: true },
  { name: 'Zero-Downtime Deploy', noLogo: true },
  { name: 'Automated Deploys', noLogo: true },
]

// "Tools I use" grid — fullstack stack (primary) + DevOps stack (the 11 hands-on skills).
const categoriesDark = [
  { label: 'Frontend',          accent: '#00d4ff', techs: ['React','React Native','Expo','Next.js','JavaScript','TypeScript','HTML5','CSS','Tailwind CSS','Bootstrap'] },
  { label: 'State Management',  accent: '#5eead4', techs: ['Redux','Zustand','TanStack Query'] },
  { label: 'Backend',           accent: '#6d4ad9', techs: ['Node.js','Express','Fastify','REST APIs','WebSocket','Webhooks'] },
  { label: 'Databases',         accent: '#00d4ff', techs: ['MongoDB','SQL','PostgreSQL'] },
  { label: 'Integrations',      accent: '#5eead4', techs: ['Stripe','Razorpay','Azure AD','Microsoft Graph'] },
  { label: 'Tooling',           accent: '#6d4ad9', techs: ['ESLint','Git','GitHub'] },
  { label: 'Cloud & Server',    accent: '#00d4ff', techs: ['AWS EC2','Linux','SSH'] },
  { label: 'Web & Network',     accent: '#5eead4', techs: ['NGINX','Reverse Proxy','HTTPS / SSL','Custom Domain'] },
  { label: 'Containers',        accent: '#6d4ad9', techs: ['Docker','Dockerized Backend'] },
  { label: 'CI/CD',             accent: '#00d4ff', techs: ['GitHub Actions','CI/CD Pipeline','Automated Deploys','Zero-Downtime Deploy'] },
]

const categoriesLight = categoriesDark.map((c, i) => ({
  ...c,
  accent: i % 2 === 0 ? '#FF923E' : '#005CA8',
}))

function buildLogoSrc(tech, theme) {
  if (tech.source === 'devicon') {
    const variant = tech.variant || 'original'
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.slug}/${tech.slug}-${variant}.svg`
  }
  // simpleicons
  const color = tech.mono
    ? (theme === 'light' ? '1A1A2E' : 'F0F0F0')
    : tech.color
  return `https://cdn.simpleicons.org/${tech.slug}/${color}`
}

// Generic fallback icon — a code chevron `</>` rendered in the current theme color.
// Used for (a) concept-level skills with no brand logo, and (b) any CDN image that 404s.
function FallbackIcon({ size = 22, theme }) {
  const stroke = theme === 'light' ? '#1A1A2E' : '#F0F0F0'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block flex-shrink-0"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function TechLogo({ tech, size = 22, theme }) {
  const [errored, setErrored] = useState(false)

  if (tech.noLogo || errored) {
    return <FallbackIcon size={size} theme={theme} />
  }

  return (
    <img
      src={buildLogoSrc(tech, theme)}
      alt={tech.name}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      // If the CDN 404s, swap to the generic icon so the row stays balanced.
      onError={() => setErrored(true)}
      className="inline-block flex-shrink-0"
      style={{ height: size, width: size, objectFit: 'contain' }}
    />
  )
}

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const { theme } = useTheme()
  const categories = theme === 'light' ? categoriesLight : categoriesDark

  return (
    <section id="tech" className="relative py-24 md:py-40 px-5 sm:px-6 md:px-16 overflow-hidden">
      {/* Marquee — full resume skill list with brand logos */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden py-5"
        style={{
          borderTop: '1px solid var(--bd15)',
          borderBottom: '1px solid var(--bd15)',
          background: 'var(--sf03)',
        }}
      >
        <div className="flex gap-12 animate-marquee whitespace-nowrap items-center">
          {[...Array(3)].flatMap((_, repeat) =>
            skills.map((t, i) => (
              <span
                key={`${t.name}-${repeat}-${i}`}
                className="inline-flex items-center gap-2.5 font-semibold text-base"
                style={{ color: 'var(--fg)' }}
              >
                <TechLogo tech={t} size={22} theme={theme} />
                {t.name}
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
              use
            </span>
          </motion.h2>
        </div>

        {/* Categories grid — text only */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 rounded-2xl overflow-hidden"
          style={{ background: 'transparent' }}
        >
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: catIdx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 md:p-8 rounded-xl transition-colors duration-500"
              style={{ background: 'var(--bg)', border: '1px solid var(--bd10)' }}
              data-cursor="hover"
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--sf02)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg)')}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${cat.accent}0a 0%, transparent 60%)` }}
              />
              <div
                className="w-2 h-2 rounded-full mb-6"
                style={{ backgroundColor: cat.accent, boxShadow: `0 0 12px ${cat.accent}80` }}
              />
              <h3 className="text-xs font-mono tracking-widest uppercase mb-5" style={{ color: 'var(--fg50)' }}>
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {cat.techs.map((tech, i) => (
                  <span
                    key={tech}
                    className="text-sm font-medium"
                    style={{ color: 'var(--fg)' }}
                  >
                    {tech}
                    {i < cat.techs.length - 1 && (
                      <span style={{ color: 'var(--fg25)' }} className="ml-3">/</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

        </div>
      </motion.div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .animate-marquee { animation: marquee 45s linear infinite; }
      `}</style>
    </section>
  )
}
