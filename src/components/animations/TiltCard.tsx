'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  /** Maximum tilt angle in degrees */
  maxTilt?: number
  /** Storm-themed shine effect */
  stormShine?: 'hail' | 'snow' | 'fire' | 'rain' | 'thunder' | 'none'
  /** Enable 3D depth effect */
  depth?: boolean
}

const stormShineColors = {
  hail: {
    primary: '#E0F4FF',
    secondary: '#B8E0F6',
    glow: '#FFFFFF',
  },
  snow: {
    primary: '#FFFFFF',
    secondary: '#F0F8FF',
    glow: '#E0F4FF',
  },
  fire: {
    primary: '#FF7F00',
    secondary: '#FF4500',
    glow: '#FFD700',
  },
  rain: {
    primary: '#00BFFF',
    secondary: '#1E90FF',
    glow: '#4682B4',
  },
  thunder: {
    primary: '#9D00FF',
    secondary: '#FFD700',
    glow: '#FFFFFF',
  },
  none: {
    primary: '#FFFFFF',
    secondary: '#F0F0F0',
    glow: '#E0E0E0',
  },
}

/**
 * TiltCard - Card premium com 3D tilt interaction
 * Responde ao movimento do mouse com rotação suave
 * Storm shine overlay que segue o cursor
 * Design atlético e sofisticado
 */
export function TiltCard({
  children,
  className = '',
  maxTilt = 15,
  stormShine = 'none',
  depth = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // Motion values for tilt
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  // Motion values for shine position
  const shineX = useMotionValue(50)
  const shineY = useMotionValue(50)

  // Spring config for smooth motion
  const springConfig = { stiffness: 300, damping: 30 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  // Transform for depth effect
  const scale = useTransform(rotateYSpring, [-maxTilt, 0, maxTilt], [0.95, 1, 0.95])

  // Shine transforms - always call hooks, conditionally use results
  const shineBackground1 = useTransform(
    [shineX, shineY],
    ([x, y]: any) => {
      const colors = stormShineColors[stormShine]
      return `radial-gradient(circle at ${x}% ${y}%, ${colors.primary}40 0%, transparent 50%)`
    }
  )

  const shineBackground2 = useTransform(
    [shineX, shineY],
    ([x, y]: any) => {
      const colors = stormShineColors[stormShine]
      return `radial-gradient(circle at ${x}% ${y}%, ${colors.secondary}20 10%, transparent 60%)`
    }
  )

  const shineBackground3 = useTransform(
    [shineX, shineY],
    ([x, y]: any) => {
      const colors = stormShineColors[stormShine]
      return `radial-gradient(circle at ${x}% ${y}%, ${colors.glow}30 0%, transparent 40%)`
    }
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    // Calculate tilt based on mouse position
    // Center is 0, edges are ±maxTilt
    rotateY.set((x - 0.5) * maxTilt * 2)
    rotateX.set((0.5 - y) * maxTilt * 2)

    // Update shine position
    shineX.set(x * 100)
    shineY.set(y * 100)
  }

  const handleMouseLeave = () => {
    if (prefersReduced) return

    rotateX.set(0)
    rotateY.set(0)
    shineX.set(50)
    shineY.set(50)
  }

  const colors = stormShineColors[stormShine]

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden"
        style={{
          rotateX: prefersReduced ? 0 : rotateXSpring,
          rotateY: prefersReduced ? 0 : rotateYSpring,
          scale: prefersReduced ? 1 : depth ? scale : 1,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card Background with Glass Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10">
          {/* Storm-Themed Shine Overlay */}
          {stormShine !== 'none' && (
            <>
              {/* Primary Shine */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: shineBackground1,
                }}
              />

              {/* Secondary Glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{
                  background: shineBackground2,
                  filter: 'blur(20px)',
                }}
              />

              {/* Storm Sparkle Effect */}
              {stormShine === 'thunder' && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  style={{
                    background: shineBackground3,
                    mixBlendMode: 'screen',
                  }}
                />
              )}

              {/* Crystallize Effect for Hail */}
              {stormShine === 'hail' && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(30deg, ${colors.primary}30 12%, transparent 12.5%, transparent 87%, ${colors.primary}30 87.5%, ${colors.primary}30),
                      linear-gradient(150deg, ${colors.primary}30 12%, transparent 12.5%, transparent 87%, ${colors.primary}30 87.5%, ${colors.primary}30),
                      linear-gradient(30deg, ${colors.primary}30 12%, transparent 12.5%, transparent 87%, ${colors.primary}30 87.5%, ${colors.primary}30),
                      linear-gradient(150deg, ${colors.primary}30 12%, transparent 12.5%, transparent 87%, ${colors.primary}30 87.5%, ${colors.primary}30)
                    `,
                    backgroundSize: '20px 35px',
                    backgroundPosition: '0 0, 0 0, 10px 18px, 10px 18px',
                  }}
                />
              )}

              {/* Heat Shimmer for Fire */}
              {stormShine === 'fire' && (
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundImage: `linear-gradient(45deg, ${colors.primary}40 25%, transparent 25%, transparent 75%, ${colors.secondary}40 75%, ${colors.secondary}40)`,
                    backgroundSize: '30px 30px',
                  }}
                />
              )}
            </>
          )}
        </div>

        {/* Content */}
        <div
          className="relative z-10"
          style={{
            transform: depth ? 'translateZ(20px)' : 'none',
          }}
        >
          {children}
        </div>

        {/* Edge Highlight - Athletic Premium Detail */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `
              inset 0 1px 0 0 rgba(255,255,255,0.1),
              inset 0 -1px 0 0 rgba(0,0,0,0.1)
            `,
          }}
        />

        {/* Storm Energy Corner Accents */}
        {stormShine !== 'none' && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-16 h-16 opacity-30"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, transparent)`,
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-16 h-16 opacity-30"
              style={{
                background: `linear-gradient(315deg, ${colors.secondary}, transparent)`,
                clipPath: 'polygon(100% 100%, 0 100%, 100% 0)',
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

/**
 * TiltCardContent - Helper component para conteúdo padronizado
 */
export function TiltCardContent({
  icon: Icon,
  title,
  description,
  badge,
  stormType,
}: {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
  badge?: string
  stormType?: 'hail' | 'snow' | 'fire' | 'rain' | 'thunder'
}) {
  const colors = stormType ? stormShineColors[stormType] : stormShineColors.none

  return (
    <div className="p-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        {Icon && (
          <div
            className="p-4 rounded-xl bg-white/5 border border-white/10"
            style={{
              boxShadow: `0 4px 20px ${colors.glow}20`,
            }}
          >
            <div style={{ color: colors.primary }}>
              <Icon className="w-8 h-8" />
            </div>
          </div>
        )}
        {badge && (
          <span
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
            style={{
              backgroundColor: `${colors.primary}20`,
              color: colors.primary,
              border: `1px solid ${colors.primary}40`,
            }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow">
        <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-white/70 leading-relaxed">{description}</p>
      </div>

      {/* Storm Indicator Bar */}
      {stormType && (
        <div className="mt-6 flex gap-1">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 h-1 rounded-full"
              style={{ backgroundColor: colors.primary }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
