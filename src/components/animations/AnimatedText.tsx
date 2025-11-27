'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { splitTextIntoCharacters } from '@/lib/animations/utils'
import { letterReveal, stormShuffle } from '@/lib/animations/variants'
import { useReducedMotion } from '@/hooks'

type AnimatedTextVariant = 'letter-reveal' | 'storm-shuffle' | 'gradient-shift'

interface AnimatedTextProps {
  children: string
  variant?: AnimatedTextVariant
  delay?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  gradientColors?: string[]
}

/**
 * Componente de texto animado com múltiplas variantes
 * - letter-reveal: Caracteres aparecem um por um
 * - storm-shuffle: Letras voam caoticamente antes de se posicionar (tema storm)
 * - gradient-shift: Gradiente animado nas cores da marca
 */
export function AnimatedText({
  children,
  variant = 'letter-reveal',
  delay = 0,
  className = '',
  as: Component = 'span',
  gradientColors = ['#FF7F00', '#00BFFF', '#1E3A8A'],
}: AnimatedTextProps) {
  const prefersReduced = useReducedMotion()
  const characters = splitTextIntoCharacters(children)

  // Se usuário prefere movimento reduzido, apenas mostrar texto
  if (prefersReduced) {
    return <Component className={className}>{children}</Component>
  }

  // Gradient shift variant
  if (variant === 'gradient-shift') {
    return (
      <Component className={`relative inline-block ${className}`}>
        <motion.span
          className="bg-gradient-to-r bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {children}
        </motion.span>
      </Component>
    )
  }

  // Letter-based animations
  const variants = variant === 'storm-shuffle' ? stormShuffle : letterReveal

  return (
    <Component className={`inline-block ${className}`}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="inline-block">
        {characters.map((char, index) => {
          // Preservar espaços
          if (char === ' ') {
            return (
              <span key={index} className="inline-block" style={{ width: '0.25em' }}>
                &nbsp;
              </span>
            )
          }

          return (
            <motion.span
              key={index}
              custom={index}
              variants={variants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-50px' }}
              className="inline-block"
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          )
        })}
      </span>
    </Component>
  )
}

// Componentes de atalho para headings
export function AnimatedH1(props: Omit<AnimatedTextProps, 'as'>) {
  return <AnimatedText {...props} as="h1" />
}

export function AnimatedH2(props: Omit<AnimatedTextProps, 'as'>) {
  return <AnimatedText {...props} as="h2" />
}

export function AnimatedH3(props: Omit<AnimatedTextProps, 'as'>) {
  return <AnimatedText {...props} as="h3" />
}
