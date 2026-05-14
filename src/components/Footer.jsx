export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative px-6 md:px-16 py-10" style={{ borderTop: '1px solid var(--bd05)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--fg20)' }}>
          © {year} Vijayakumar — All rights reserved
        </span>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
          <span className="font-mono text-xs" style={{ color: 'var(--fg20)' }}>
            Fullstack · DevOps · Shipping in public
          </span>
        </div>

        <span className="font-mono text-xs" style={{ color: 'var(--fg10)' }}>
          Built with React · Vite · GSAP · Three.js
        </span>
      </div>
    </footer>
  )
}
