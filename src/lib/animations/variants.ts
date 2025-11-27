import { Variants } from 'framer-motion'

/**
 * Variantes reutilizáveis de animação
 * Usadas em toda a aplicação para consistência
 */

// Fade in com movimento vertical
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
  },
}

// Fade in simples
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6 }
  },
}

// Scale in
export const scaleIn: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
  },
}

// Slide in from left
export const slideInLeft: Variants = {
  initial: { x: -50, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
  },
}

// Slide in from right
export const slideInRight: Variants = {
  initial: { x: 50, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
  },
}

// Stagger children
export const staggerChildren: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Letter reveal (para uso com split text)
export const letterReveal: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1],
    },
  }),
}

// Storm shuffle (letras voam caoticamente)
export const stormShuffle: Variants = {
  initial: (i: number) => ({
    opacity: 0,
    x: (Math.random() - 0.5) * 100,
    y: (Math.random() - 0.5) * 100,
    rotate: (Math.random() - 0.5) * 90,
  }),
  animate: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
    },
  }),
}

// Card flip
export const cardFlip: Variants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
}

// Hover lift
export const hoverLift = {
  rest: { y: 0 },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
}

// Pulse
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Exit variants (para AnimatePresence)
export const exitVariants: Variants = {
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  },
}

// Storm transition exit
export const stormExit: Variants = {
  exit: {
    opacity: 0,
    scale: 0.8,
    filter: 'blur(10px)',
    transition: { duration: 0.4 },
  },
}

// Storm transition enter
export const stormEnter: Variants = {
  initial: {
    opacity: 0,
    scale: 1.2,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.4, delay: 0.4 },
  },
}
