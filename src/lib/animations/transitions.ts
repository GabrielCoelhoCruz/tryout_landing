import { Transition } from 'framer-motion'

/**
 * Configurações de transição reutilizáveis
 * Define timing, easing e comportamentos de animação
 */

// Easing curves customizadas
export const easings = {
  // Expo out - aceleração suave
  easeOutExpo: [0.19, 1, 0.22, 1],

  // Cubic out - padrão suave
  easeOutCubic: [0.33, 1, 0.68, 1],

  // Back out - overshoot sutil
  easeOutBack: [0.34, 1.56, 0.64, 1],

  // Elastic - bounce effect
  easeOutElastic: [0.68, -0.55, 0.265, 1.55],
}

// Spring config suave
export const springGentle: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1,
}

// Spring config médio
export const springDefault: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1,
}

// Spring config rápido
export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
  mass: 0.5,
}

// Tween padrão
export const tweenDefault: Transition = {
  duration: 0.6,
  ease: easings.easeOutExpo,
}

// Tween rápido
export const tweenFast: Transition = {
  duration: 0.3,
  ease: easings.easeOutCubic,
}

// Tween lento
export const tweenSlow: Transition = {
  duration: 1.2,
  ease: easings.easeOutExpo,
}

// Delay escalonado
export function staggerDelay(index: number, baseDelay: number = 0.1): number {
  return index * baseDelay
}

// Configuração de hover padrão
export const hoverTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut',
}

// Configuração de tap padrão
export const tapTransition: Transition = {
  duration: 0.15,
  ease: 'easeOut',
}

// Loop infinito
export const loopTransition: Transition = {
  duration: 2,
  repeat: Infinity,
  ease: 'linear',
}

// Storm particle movement
export const stormParticleTransition: Transition = {
  duration: 3,
  repeat: Infinity,
  ease: 'linear',
  repeatType: 'loop',
}

// Card flip transition
export const flipTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  duration: 0.6,
}

// Magnetic button transition
export const magneticTransition: Transition = {
  type: 'spring',
  stiffness: 150,
  damping: 15,
  mass: 0.1,
}

// Scroll-linked transition (sem duration)
export const scrollLinked: Transition = {
  ease: 'linear',
}
