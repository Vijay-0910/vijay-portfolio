import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useFadeUp(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    const targets = options.selector ? el.querySelectorAll(options.selector) : [el]

    gsap.fromTo(
      targets,
      {
        y: options.y ?? 60,
        opacity: 0,
        scale: options.scale ?? 1,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: options.duration ?? 1,
        ease: options.ease ?? 'power3.out',
        stagger: options.stagger ?? 0.12,
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          ...options.scrollTrigger,
        },
      }
    )

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return ref
}

export function useParallax(speed = 0.3) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      yPercent: speed * -100,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  return ref
}
