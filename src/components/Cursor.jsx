import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    const ringEl = ringRef.current

    const onMove = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(ringEl, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power2.out' })
    }
    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    addHover()
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none gpu"
        style={{
          width: isClicking ? 6 : isHovering ? 0 : 8,
          height: isClicking ? 6 : isHovering ? 0 : 8,
          borderRadius: '50%',
          backgroundColor: 'var(--cursor-color)',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none gpu"
        style={{
          width: isHovering ? 56 : isClicking ? 28 : 40,
          height: isHovering ? 56 : isClicking ? 28 : 40,
          borderRadius: '50%',
          border: `1.5px solid ${isHovering ? 'var(--cursor-color)' : 'var(--fg25)'}`,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s cubic-bezier(0.25,0.46,0.45,0.94), height 0.3s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s',
        }}
      />
    </>
  )
}
