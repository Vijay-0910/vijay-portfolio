import { Component, Suspense, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'

function detectWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const attrs = { antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }
    const gl = canvas.getContext('webgl2', attrs)
         || canvas.getContext('webgl', attrs)
         || canvas.getContext('experimental-webgl', attrs)
    if (!gl || !gl.getParameter) return false
    gl.getParameter(gl.VERSION)
    const lose = gl.getExtension('WEBGL_lose_context')
    if (lose) lose.loseContext()
    return true
  } catch {
    return false
  }
}

class WebGLBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err) {
    if (typeof console !== 'undefined') {
      console.warn('[HeroCanvas] WebGL render failed, falling back:', err?.message)
    }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function StarField({ starColor }) {
  const ref = useRef()
  const count = 3000

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x -= delta * 0.02
    ref.current.rotation.y -= delta * 0.01
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent color={starColor} size={0.015}
        sizeAttenuation depthWrite={false} opacity={0.5}
      />
    </Points>
  )
}

function FloatingRing({ position, color, speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.2
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3
  })
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[1.2, 0.008, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  )
}

function Scene({ mouseX, mouseY, colors }) {
  const groupRef = useRef()

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += (mouseX.get() * 0.001 - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x += (mouseY.get() * 0.001 - groupRef.current.rotation.x) * 0.05
  })

  return (
    <group ref={groupRef}>
      <StarField starColor={colors.star} />
      <FloatingRing position={[0, 0, -3]}  color={colors.ring1} speed={0.8} />
      <FloatingRing position={[2, -1, -5]} color={colors.ring2} speed={1.2} />
      <FloatingRing position={[-2, 1, -4]} color={colors.ring3} speed={0.6} />
    </group>
  )
}

// Pure-CSS fallback: three 3D-tilted rotating rings, offset in space
// to mimic the WebGL torus positions ([0,0,-3], [2,-1,-5], [-2,1,-4]).
// Used when WebGL is unavailable (hardware accel off, blocked extensions, etc.).
function CssRingsFallback({ colors }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
    >
      <style>{`
        @keyframes hero-ring-orbit-1 {
          0%   { transform: translate(-50%, -50%) rotateX(65deg) rotateY(0deg)   rotateZ(0deg); }
          100% { transform: translate(-50%, -50%) rotateX(65deg) rotateY(360deg) rotateZ(180deg); }
        }
        @keyframes hero-ring-orbit-2 {
          0%   { transform: translate(-50%, -50%) rotateX(-55deg) rotateY(0deg)    rotateZ(0deg); }
          100% { transform: translate(-50%, -50%) rotateX(-55deg) rotateY(-360deg) rotateZ(-180deg); }
        }
        @keyframes hero-ring-orbit-3 {
          0%   { transform: translate(-50%, -50%) rotateX(40deg) rotateY(0deg)   rotateZ(0deg); }
          100% { transform: translate(-50%, -50%) rotateX(40deg) rotateY(360deg) rotateZ(360deg); }
        }
        @keyframes hero-ring-bob {
          0%, 100% { translate: 0 0; }
          50%      { translate: 0 16px; }
        }
        .hero-css-ring-wrap {
          position: absolute;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .hero-css-ring-disc {
          position: absolute;
          top: 50%; left: 50%;
          transform-style: preserve-3d;
          border-radius: 50%;
          border-style: solid;
          border-width: 1px;
          opacity: 0.5;
          will-change: transform;
        }
      `}</style>

      {/* Ring 1 — center, the main one, tilted forward */}
      <div
        className="hero-css-ring-wrap"
        style={{
          top: '50%', left: '50%',
          width: '1px', height: '1px',
          animation: 'hero-ring-bob 6s ease-in-out infinite',
        }}
      >
        <div
          className="hero-css-ring-disc"
          style={{
            width: 'min(28vw, 280px)', aspectRatio: '1',
            color: colors.ring1,
            borderColor: colors.ring1,
            animation: 'hero-ring-orbit-1 18s linear infinite',
          }}
        />
      </div>

      {/* Ring 2 — offset right & down, smaller, tilted back */}
      <div
        className="hero-css-ring-wrap"
        style={{
          top: '58%', left: '58%',
          width: '1px', height: '1px',
          animation: 'hero-ring-bob 7s ease-in-out infinite',
        }}
      >
        <div
          className="hero-css-ring-disc"
          style={{
            width: 'min(22vw, 220px)', aspectRatio: '1',
            color: colors.ring2,
            borderColor: colors.ring2,
            animation: 'hero-ring-orbit-2 14s linear infinite',
          }}
        />
      </div>

      {/* Ring 3 — offset left & up, mid size, gentle tilt */}
      <div
        className="hero-css-ring-wrap"
        style={{
          top: '42%', left: '42%',
          width: '1px', height: '1px',
          animation: 'hero-ring-bob 9s ease-in-out infinite',
        }}
      >
        <div
          className="hero-css-ring-disc"
          style={{
            width: 'min(25vw, 250px)', aspectRatio: '1',
            color: colors.ring3,
            borderColor: colors.ring3,
            animation: 'hero-ring-orbit-3 22s linear infinite',
          }}
        />
      </div>
    </div>
  )
}

export default function HeroCanvas({ mouseX, mouseY, theme }) {
  const [webglOk, setWebglOk] = useState(() => detectWebGL())

  const colors = theme === 'light'
    ? { star: '#FF923E', ring1: '#FF923E', ring2: '#005CA8', ring3: '#FF923E' }
    : { star: '#00d4ff', ring1: '#00d4ff', ring2: '#6d4ad9', ring3: '#5eead4' }

  // No WebGL? Render the CSS fallback rings instead of an empty void.
  if (!webglOk) return <CssRingsFallback colors={colors} />

  return (
    <WebGLBoundary>
      <Canvas
        key={theme}
        camera={{ position: [0, 0, 4], fov: 60 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false, powerPreference: 'default' }}
        onCreated={({ gl }) => {
          const canvasEl = gl.domElement
          const handleLost = (e) => { e.preventDefault(); setWebglOk(false) }
          canvasEl.addEventListener('webglcontextlost', handleLost, { once: true })
        }}
      >
        <Suspense fallback={null}>
          <Scene mouseX={mouseX} mouseY={mouseY} colors={colors} />
        </Suspense>
      </Canvas>
    </WebGLBoundary>
  )
}
