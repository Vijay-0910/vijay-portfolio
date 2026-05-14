import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'

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

export default function HeroCanvas({ mouseX, mouseY, theme }) {
  const colors = theme === 'light'
    ? { star: '#FF923E', ring1: '#FF923E', ring2: '#005CA8', ring3: '#FF923E' }
    : { star: '#00d4ff', ring1: '#00d4ff', ring2: '#6d4ad9', ring3: '#5eead4' }

  return (
    <Canvas
      key={theme}
      camera={{ position: [0, 0, 4], fov: 60 }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene mouseX={mouseX} mouseY={mouseY} colors={colors} />
      </Suspense>
    </Canvas>
  )
}
