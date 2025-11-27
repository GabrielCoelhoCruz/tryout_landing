'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMousePosition, useReducedMotion } from '@/hooks'
import { distance } from '@/lib/animations/utils'
import { magneticTransition } from '@/lib/animations/transitions'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  attractRadius?: number
  strength?: number
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

/**
 * Botão com efeito magnético que atrai o cursor
 * Transform suave baseado na proximidade do mouse
 */
export function MagneticButton({
  children,
  className = '',
  attractRadius = 100,
  strength = 0.3,
  onClick,
  disabled = false,
  type = 'button',
  ariaLabel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const prefersReduced = useReducedMotion()
  const { x: mouseX, y: mouseY } = useMousePosition()

  // Motion values para X e Y
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animation para movimento suave
  const springConfig = prefersReduced
    ? { stiffness: 0, damping: 0 }
    : { stiffness: 150, damping: 15, mass: 0.1 }

  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    if (!buttonRef.current || prefersReduced) return

    const updatePosition = () => {
      if (!buttonRef.current) return

      const rect = buttonRef.current.getBoundingClientRect()
      const buttonCenterX = rect.left + rect.width / 2
      const buttonCenterY = rect.top + rect.height / 2

      // Calcular distância do mouse ao centro do botão
      const dist = distance(mouseX, mouseY, buttonCenterX, buttonCenterY)

      if (dist < attractRadius) {
        // Dentro do raio de atração
        const deltaX = mouseX - buttonCenterX
        const deltaY = mouseY - buttonCenterY

        // Aplicar força magnética (mais forte quanto mais perto)
        const force = 1 - dist / attractRadius
        x.set(deltaX * strength * force)
        y.set(deltaY * strength * force)
      } else {
        // Fora do raio, voltar ao normal
        x.set(0)
        y.set(0)
      }
    }

    updatePosition()
  }, [mouseX, mouseY, attractRadius, strength, prefersReduced, x, y])

  return (
    <motion.button
      ref={buttonRef}
      className={className}
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={
        prefersReduced
          ? {}
          : {
              scale: 1.02,
              transition: { duration: 0.3 },
            }
      }
      whileTap={
        prefersReduced
          ? {}
          : {
              scale: 0.98,
              transition: { duration: 0.15 },
            }
      }
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
}

// Wrapper para o GlowingButton existente com magnetic effect
interface GlowingMagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
}

/**
 * Versão do GlowingButton com efeito magnético integrado
 * Mantém o estilo existente mas adiciona magnetic interaction
 */
export function GlowingMagneticButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
}: GlowingMagneticButtonProps) {
  const baseClasses =
    variant === 'primary'
      ? 'relative px-8 py-4 bg-gradient-to-r from-primary to-secondary-2 text-white font-display text-lg rounded-full overflow-hidden group'
      : 'relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-display text-lg rounded-full overflow-hidden border border-white/20 group'

  return (
    <MagneticButton
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      attractRadius={100}
      strength={0.25}
    >
      {/* Glow overlay on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </MagneticButton>
  )
}
