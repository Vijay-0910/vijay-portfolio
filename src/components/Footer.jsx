export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative px-5 sm:px-6 md:px-16 py-8 md:py-10" style={{ borderTop: '1px solid var(--bd05)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-center">
        <span className="font-mono text-[11px] sm:text-xs tracking-widest" style={{ color: 'var(--fg20)' }}>
          © {year} Vijayakumar — All rights reserved
        </span>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
          <span className="font-mono text-[11px] sm:text-xs" style={{ color: 'var(--fg20)' }}>
            Full Stack · Showcasing DevOps · Shipping in public
          </span>
        </div>

        <span className="font-mono text-[11px] sm:text-xs" style={{ color: 'var(--fg10)' }}>
          Built with React · Vite · GSAP · Three.js
        </span>
      </div>
    </footer>
  )
}
