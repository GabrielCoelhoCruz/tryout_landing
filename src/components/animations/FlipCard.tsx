'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks'
import { flipTransition } from '@/lib/animations/transitions'

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
  /** Storm-themed accent color */
  accentColor?: string
  /** Optional storm glow effect */
  stormGlow?: boolean
}

/**
 * FlipCard - 3D card com flip interaction
 * Design atlético com efeitos storm opcionais
 * Premium feel com perspectiva 3D e transições suaves
 */
export function FlipCard({
  front,
  back,
  className = '',
  accentColor = '#FF7F00',
  stormGlow = false,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <div
      className={`group relative ${className}`}
      style={{ perspective: '1000px' }}
      onMouseEnter={() => !prefersReduced && setIsFlipped(true)}
      onMouseLeave={() => !prefersReduced && setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsFlipped(!isFlipped)
        }
      }}
      aria-label={isFlipped ? 'Mostrar frente do card' : 'Mostrar verso do card'}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={prefersReduced ? { duration: 0 } : flipTransition}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 p-8 overflow-hidden">
            {/* Storm Glow Effect */}
            {stormGlow && (
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${accentColor}15, transparent 70%)`,
                }}
              />
            )}

            {/* Accent Border Animation */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, ${accentColor}40, transparent)`,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <div className="relative z-10">{front}</div>

            {/* Corner Accent - Athletic Detail */}
            <div
              className="absolute top-0 right-0 w-20 h-20 opacity-10"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, transparent)`,
                clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
              }}
            />
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div
            className="relative w-full h-full rounded-2xl backdrop-blur-md border-2 p-8 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}05)`,
              borderColor: `${accentColor}40`,
            }}
          >
            {/* Animated Storm Pattern Background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundImage: `linear-gradient(45deg, ${accentColor}20 25%, transparent 25%, transparent 75%, ${accentColor}20 75%, ${accentColor}20),
                  linear-gradient(45deg, ${accentColor}20 25%, transparent 25%, transparent 75%, ${accentColor}20 75%, ${accentColor}20)`,
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 10px',
              }}
            />

            {/* Electric Glow Pulse */}
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background: `radial-gradient(circle at 50% 50%, ${accentColor}30, transparent 60%)`,
                filter: 'blur(40px)',
              }}
            />

            {/* Content */}
            <div className="relative z-10">{back}</div>

            {/* Diagonal Accent Stripe - Storm Energy */}
            <div
              className="absolute -right-12 top-0 bottom-0 w-24 opacity-20"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`,
                transform: 'skewX(-15deg)',
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Interaction Hint (só aparece no mobile) */}
      <div className="md:hidden absolute bottom-2 right-2 text-xs text-white/40 pointer-events-none">
        Toque para virar
      </div>
    </div>
  )
}

/**
 * FlipCardFront - Helper component para conteúdo da frente
 */
export function FlipCardFront({
  icon: Icon,
  title,
  description,
  iconColor = '#FF7F00',
}: {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
  iconColor?: string
}) {
  return (
    <div className="flex flex-col items-center text-center h-full justify-center gap-4">
      {Icon && (
        <motion.div
          className="p-4 rounded-2xl bg-white/5 border border-white/10"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div style={{ color: iconColor, filter: `drop-shadow(0 0 8px ${iconColor}40)` }}>
            <Icon className="w-10 h-10" />
          </div>
        </motion.div>
      )}
      <h3 className="text-2xl font-display font-bold text-white tracking-tight">
        {title}
      </h3>
      <p className="text-white/70 leading-relaxed">{description}</p>
    </div>
  )
}

/**
 * FlipCardBack - Helper component para conteúdo do verso
 */
export function FlipCardBack({
  stat,
  label,
  detail,
  accentColor = '#FF7F00',
}: {
  stat: string
  label: string
  detail?: string
  accentColor?: string
}) {
  return (
    <div className="flex flex-col items-center text-center h-full justify-center gap-4">
      <motion.div
        className="text-7xl font-display font-black tracking-tighter"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        style={{
          color: accentColor,
          textShadow: `0 0 30px ${accentColor}60, 0 0 60px ${accentColor}30`,
        }}
      >
        {stat}
      </motion.div>
      <div>
        <h4 className="text-xl font-display font-bold text-white mb-1">{label}</h4>
        {detail && (
          <p className="text-sm text-white/60 leading-relaxed max-w-xs">{detail}</p>
        )}
      </div>

      {/* Storm Energy Indicator */}
      <div className="flex gap-1 mt-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-8 rounded-full"
            style={{ backgroundColor: accentColor }}
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}
