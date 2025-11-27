'use client'

import { useScroll, useVelocity, useTransform, MotionValue } from 'framer-motion'

interface UseScrollVelocityReturn {
  scrollY: MotionValue<number>
  scrollYProgress: MotionValue<number>
  scrollVelocity: MotionValue<number>
  velocityBlur: MotionValue<number>
}

/**
 * Hook que rastreia a velocidade do scroll
 * Retorna valores de scroll e blur baseado na velocidade
 * Usado para motion blur e intensificação de storms
 */
export function useScrollVelocity(): UseScrollVelocityReturn {
  const { scrollY, scrollYProgress } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  // Transforma velocidade em valor de blur (0-10px)
  // Velocidades entre -2000 e 2000 são mapeadas para blur
  const velocityBlur = useTransform(
    scrollVelocity,
    [-2000, 0, 2000],
    [10, 0, 10]
  )

  return {
    scrollY,
    scrollYProgress,
    scrollVelocity,
    velocityBlur,
  }
}
