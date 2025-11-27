'use client'

import { motion } from 'framer-motion'
import { PARTICLE_POSITIONS } from '@/constants/particles'

interface AnimatedBackgroundProps {
  /** Whether to use fixed positioning (for full-page backgrounds) */
  fixed?: boolean
  /** Number of particles to display (defaults to 12) */
  particleCount?: number
}

/**
 * Animated gradient background with floating particles
 * Used throughout the app for consistent atmospheric effects
 */
export function AnimatedBackground({
  fixed = false,
  particleCount = 12
}: AnimatedBackgroundProps) {
  const containerClass = fixed
    ? "fixed inset-0 overflow-hidden pointer-events-none"
    : "absolute inset-0 overflow-hidden"

  return (
    <div className={containerClass}>
      {/* Gradient base - Deep storm atmosphere - Athletic/Premium feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A2A] via-[#0F1A3D] to-[#0A1B4D]" />

      {/* Subtle animated gradient orbs - Premium ambient glow */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-gradient-radial from-[#FF7F00]/10 via-transparent to-transparent rounded-full blur-[100px]"
        animate={{
          x: [0, 60, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-gradient-radial from-[#00BFFF]/08 via-transparent to-transparent rounded-full blur-[100px]"
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-radial from-[#9D00FF]/05 via-transparent to-transparent rounded-full blur-[80px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle grid pattern - Editorial/Premium texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Clean floating particles - minimal, purposeful */}
      {PARTICLE_POSITIONS.slice(0, particleCount).map((pos, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            width: i % 3 === 0 ? '3px' : '2px',
            height: i % 3 === 0 ? '3px' : '2px',
            background: i % 2 === 0
              ? 'rgba(255, 127, 0, 0.4)'
              : 'rgba(0, 191, 255, 0.3)',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + (i % 4) * 1,
            repeat: Infinity,
            delay: (i % 8) * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle noise texture overlay for premium feel */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
