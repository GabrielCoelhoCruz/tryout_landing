'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RotateCcw,
  Star,
  Zap,
  FileText,
  CheckCircle2,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import { GlowingButton, ContactLinks } from '@/components/ui'
import { createWhatsAppLink } from '@/constants/contact'
import type { ApprovedRegistration, TeamAssignment } from '@/types/approved-member'
import { TEAM_CONFIG, getPositionLabel } from '../constants'
import { FormCard } from './FormCard'
import { AthleteRegistrationForm } from './AthleteRegistrationForm'

// Celebration constants
const CELEBRATION_DURATION_MS = 5000
const PARTICLE_COUNT = 50

type ParticleType = 'confetti' | 'star' | 'circle' | 'diamond'

type Particle = {
  id: number
  type: ParticleType
  x: number
  color: string
  delay: number
  duration: number
  rotation: number
  size: number
}

// Brand colors for particles
const VICTORY_COLORS = [
  '#FF7F00',
  '#00BFFF',
  '#FF9933',
  '#0099CC',
]

// Team logo images mapping
const TEAM_LOGOS: Record<string, string> = {
  snowstorm: '/images/Snowstorm.jpg',
  hailstorm: '/images/Hailstorm.jpg',
  rainstorm: '/images/Rainstorm.jpg',
}

// Decorative white stars configuration for shareable card
const DECORATIVE_STARS = [
  { x: 8, y: 10, size: 14, delay: 0, opacity: 0.9 },
  { x: 92, y: 6, size: 12, delay: 0.2, opacity: 0.8 },
  { x: 4, y: 40, size: 10, delay: 0.4, opacity: 0.7 },
  { x: 96, y: 45, size: 16, delay: 0.1, opacity: 0.9 },
  { x: 8, y: 80, size: 12, delay: 0.3, opacity: 0.8 },
  { x: 90, y: 85, size: 14, delay: 0.5, opacity: 0.9 },
  { x: 18, y: 22, size: 8, delay: 0.6, opacity: 0.6 },
  { x: 82, y: 28, size: 10, delay: 0.7, opacity: 0.7 },
  { x: 3, y: 60, size: 12, delay: 0.8, opacity: 0.8 },
  { x: 97, y: 65, size: 8, delay: 0.9, opacity: 0.6 },
  { x: 50, y: 5, size: 10, delay: 0.15, opacity: 0.7 },
  { x: 25, y: 92, size: 10, delay: 0.35, opacity: 0.7 },
  { x: 75, y: 95, size: 12, delay: 0.55, opacity: 0.8 },
]

// 4-point star SVG component (like in the reference image)
function FourPointStar({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
    </svg>
  )
}

// Lightning bolt SVG component
function LightningBolt({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M13 2L4.5 12.5H11L10 22L18.5 11.5H12L13 2Z" />
    </svg>
  )
}

// Decorative corner accent component
function CornerAccent({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const baseClasses = "absolute w-16 h-16 md:w-20 md:h-20"
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
  }

  return (
    <div className={`${baseClasses} ${positionClasses[position]} pointer-events-none`}>
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        {/* Corner lines */}
        <path
          d="M0 30 L0 0 L30 0"
          stroke="url(#cornerGradient)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 20 L0 5 L5 0 L20 0"
          stroke="#FF7F00"
          strokeWidth="1"
          strokeOpacity="0.3"
          fill="none"
        />
        {/* Lightning accent */}
        <g transform="translate(8, 8) scale(0.5)">
          <path
            d="M13 2L4.5 12.5H11L10 22L18.5 11.5H12L13 2Z"
            fill="#FF7F00"
            fillOpacity="0.4"
          />
        </g>
        <defs>
          <linearGradient id="cornerGradient" x1="0" y1="0" x2="30" y2="30">
            <stop offset="0%" stopColor="#FF7F00" />
            <stop offset="100%" stopColor="#00BFFF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

type ApprovedStateProps = {
  registration: ApprovedRegistration
  onRetry: () => void
}

type TeamAssignmentCardProps = {
  assignment: TeamAssignment
  index: number
}

/**
 * Individual team assignment card with team branding
 */
function TeamAssignmentCard({ assignment, index }: TeamAssignmentCardProps) {
  const config = TEAM_CONFIG[assignment.team]
  const positionLabel = getPositionLabel(assignment.position)

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-white/10 bg-[#000c1f]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      {/* Team color accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: config?.color || '#FF7F00' }}
      />

      <div className="p-4 pt-5">
        <div className="flex items-start justify-between gap-3">
          {/* Team info */}
          <div className="flex-1">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
              Time
            </p>
            <h4
              className="text-white font-semibold text-lg"
              style={{ color: config?.color }}
            >
              {config?.name || assignment.team}
            </h4>
            <p className="text-white/40 text-xs">{config?.level}</p>
          </div>

          {/* Position badge */}
          <div
            className="px-3 py-1.5 rounded-full text-sm font-medium"
            style={{
              backgroundColor: `${config?.color}20`,
              color: config?.color || '#00BFFF',
            }}
          >
            {positionLabel}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

type TeamAssignmentsDisplayProps = {
  assignments: TeamAssignment[]
}

const TEAM_ASSIGNMENT_MESSAGE = 'Olá! Fui aprovado(a) no tryout mas ainda não recebi a definição do meu time e posição. Podem me ajudar?'

/**
 * Display team assignments - supports 0, 1, or 2 teams
 */
function TeamAssignmentsDisplay({ assignments }: TeamAssignmentsDisplayProps) {
  if (!assignments || assignments.length === 0) {
    const whatsappLink = createWhatsAppLink(TEAM_ASSIGNMENT_MESSAGE)

    return (
      <div className="bg-[#000c1f] rounded-xl p-6 border border-white/10 text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FF7F00]/20 flex items-center justify-center">
          <Star className="w-6 h-6 text-[#FF7F00]" />
        </div>
        <p className="text-white/70 text-sm font-medium mb-1">
          Time e posição ainda não definidos
        </p>
        <p className="text-white/40 text-xs mb-4">
          Entre em contato para saber mais sobre sua alocação
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-medium rounded-full transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Falar no WhatsApp
        </a>
      </div>
    )
  }

  const isSingleTeam = assignments.length === 1

  return (
    <div className="space-y-3">
      <p className="text-[#FF7F00]/60 text-xs uppercase tracking-wider">
        {isSingleTeam ? 'Time Aprovado' : 'Times Aprovados'}
      </p>
      <div className={isSingleTeam ? '' : 'grid md:grid-cols-2 gap-3'}>
        {assignments.map((assignment, index) => (
          <TeamAssignmentCard
            key={`${assignment.team}-${assignment.position}`}
            assignment={assignment}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

type ShareableCardProps = {
  firstName: string
  assignments: TeamAssignment[]
  revealStage: number
}

/**
 * Shareable Card - Designed for social media screenshots
 * Contains the celebration content with decorative elements
 */
function ShareableCard({ firstName, assignments, revealStage }: ShareableCardProps) {
  const hasAssignments = assignments && assignments.length > 0

  return (
    <div className="relative mx-auto max-w-md md:max-w-lg">
      {/* ===== SHAREABLE CARD CONTAINER ===== */}
      <motion.div
        className="relative overflow-hidden rounded-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          boxShadow: '0 0 80px rgba(0, 100, 200, 0.2), 0 0 120px rgba(0, 50, 100, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/images/fundo site.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Dark overlay to ensure readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(5, 15, 40, 0.85) 0%, rgba(3, 10, 30, 0.9) 50%, rgba(2, 8, 25, 0.95) 100%)',
          }}
        />

        {/* Blue glow effects */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 20% 20%, rgba(0, 100, 200, 0.15) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 80%, rgba(0, 80, 180, 0.12) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 120, 220, 0.08) 0%, transparent 60%)',
          }}
        />

        {/* Lightning effect overlay at top */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 150, 255, 0.1) 0%, transparent 100%)',
          }}
        />

        {/* Decorative border */}
        <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none" />
        <div className="absolute inset-[2px] rounded-[22px] border border-blue-500/10 pointer-events-none" />

        {/* Animated decorative WHITE 4-point stars */}
        {DECORATIVE_STARS.map((star, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.6, 1, 0.6],
              opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
            }}
            transition={{
              duration: 2.5 + star.delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: star.delay,
            }}
          >
            <FourPointStar
              className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
              style={{ width: star.size, height: star.size }}
            />
          </motion.div>
        ))}

        {/* Lightning bolts decorations - blue tones */}
        <motion.div
          className="absolute top-[12%] left-[2%] text-blue-400/40"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <LightningBolt className="w-8 h-8 md:w-10 md:h-10 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </motion.div>
        <motion.div
          className="absolute top-[8%] right-[8%] text-blue-300/30 rotate-12"
          animate={{
            opacity: [0.2, 0.45, 0.2],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <LightningBolt className="w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
        </motion.div>
        <motion.div
          className="absolute top-[5%] left-[25%] text-cyan-400/25 -rotate-6"
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <LightningBolt className="w-5 h-5 md:w-6 md:h-6" />
        </motion.div>

        {/* ===== CARD CONTENT ===== */}
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">

          {/* ----- 1. BEM VINDO(A) AO SKY HIGH ----- */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: revealStage >= 1 ? 1 : 0, y: revealStage >= 1 ? 0 : 15 }}
          >
            <motion.div
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Zap className="w-5 h-5 text-[#FF7F00] drop-shadow-[0_0_8px_rgba(255,127,0,0.5)]" fill="#FF7F00" />
            </motion.div>
            <span
              className="font-display text-xs md:text-sm tracking-[0.25em] uppercase"
              style={{
                background: 'linear-gradient(90deg, #FF7F00 0%, #FFB347 50%, #FF7F00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(255, 127, 0, 0.3)',
              }}
            >
              Bem-vindo(a) ao Sky High
            </span>
            <motion.div
              animate={{ rotate: [10, -10, 10] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Zap className="w-5 h-5 text-[#FF7F00] drop-shadow-[0_0_8px_rgba(255,127,0,0.5)]" fill="#FF7F00" />
            </motion.div>
          </motion.div>

          {/* ----- 2. NAME ----- */}
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: revealStage >= 2 ? 1 : 0,
              scale: revealStage >= 2 ? 1 : 0.7,
            }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 150 }}
          >
            <h2
              className="font-display text-5xl md:text-7xl leading-none"
              style={{
                background: 'linear-gradient(180deg, #FF7F00 0%, #FF9933 50%, #FFB347 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 20px rgba(255, 127, 0, 0.4))',
              }}
            >
              {firstName}
            </h2>
          </motion.div>

          {/* ----- 3. VOCÊ FOI APROVADO(A) ----- */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: revealStage >= 3 ? 1 : 0, y: revealStage >= 3 ? 0 : 10 }}
          >
            <p className="font-display text-xl md:text-2xl text-white/90">
              Você foi{' '}
              <span
                className="font-bold"
                style={{
                  background: 'linear-gradient(90deg, #00BFFF 0%, #00E5FF 50%, #00BFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 15px rgba(0, 191, 255, 0.5))',
                }}
              >
                APROVADO(A)
              </span>
              !
            </p>
          </motion.div>

          {/* ----- 4. EQUIPES: LOGOS + NOMES ----- */}
          {hasAssignments && (
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: revealStage >= 4 ? 1 : 0 }}
            >
              {/* Divider line */}
              <motion.div
                className="w-24 h-[2px] mx-auto mb-6 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, #FF7F00, #00BFFF, transparent)',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: revealStage >= 4 ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              {/* EQUIPES label */}
              <motion.p
                className="text-white/50 text-xs uppercase tracking-[0.3em] mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: revealStage >= 4 ? 1 : 0, y: revealStage >= 4 ? 0 : 10 }}
              >
                {assignments.length === 1 ? 'Equipe' : 'Equipes'}
              </motion.p>

              {/* Team logos with names */}
              <div className={`flex justify-center ${assignments.length > 1 ? 'gap-10 md:gap-14' : ''}`}>
                {assignments.map((assignment, index) => {
                  const config = TEAM_CONFIG[assignment.team]
                  const teamLogo = TEAM_LOGOS[assignment.team]
                  const color = config?.color || '#FF7F00'
                  const size = assignments.length === 1 ? 'w-32 h-32 md:w-40 md:h-40' : 'w-24 h-24 md:w-32 md:h-32'

                  return (
                    <motion.div
                      key={assignment.team}
                      className="flex flex-col items-center"
                      initial={{ scale: 0, y: 30 }}
                      animate={{
                        scale: revealStage >= 4 ? 1 : 0,
                        y: revealStage >= 4 ? 0 : 30
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 180,
                        damping: 15,
                        delay: 0.15 + index * 0.2
                      }}
                    >
                      {/* Logo container with animated rings and glow */}
                      <div className={`relative ${size}`}>
                        {/* Outer glow */}
                        <motion.div
                          className="absolute -inset-3 rounded-full blur-xl"
                          style={{ backgroundColor: `${color}30` }}
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [0.95, 1.05, 0.95],
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                        />

                        {/* Pulsing ring */}
                        <motion.div
                          className="absolute -inset-3 rounded-full border-2"
                          style={{ borderColor: `${color}50` }}
                          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                        />

                        {/* Outer ring */}
                        <motion.div
                          className="absolute -inset-1 rounded-full border-2"
                          style={{
                            borderColor: color,
                            boxShadow: `0 0 20px ${color}40`,
                          }}
                          animate={{ rotate: index === 0 ? 360 : -360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        />

                        {/* Logo */}
                        <motion.div
                          className="absolute inset-1 rounded-full shadow-2xl overflow-hidden"
                          style={{
                            boxShadow: `0 10px 40px ${color}50, inset 0 0 20px rgba(0,0,0,0.3)`,
                            border: `3px solid ${color}`,
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: revealStage >= 4 ? 1 : 0 }}
                          transition={{ delay: 0.35 + index * 0.15, type: 'spring', stiffness: 250 }}
                        >
                          {teamLogo ? (
                            <Image
                              src={teamLogo}
                              alt={`Logo ${config?.name || assignment.team}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 128px, 160px"
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              style={{ backgroundColor: color }}
                            >
                              <Star className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-lg" />
                            </div>
                          )}
                        </motion.div>
                      </div>

                      {/* Team name below logo */}
                      <motion.p
                        className="mt-4 font-display text-xl md:text-2xl font-bold tracking-wide"
                        style={{
                          color,
                          textShadow: `0 0 20px ${color}60`,
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: revealStage >= 4 ? 1 : 0,
                          y: revealStage >= 4 ? 0 : 10
                        }}
                        transition={{ delay: 0.55 + index * 0.15 }}
                      >
                        {config?.name || assignment.team}
                      </motion.p>

                      {/* Team level below name */}
                      <motion.p
                        className="text-xs md:text-sm tracking-widest uppercase"
                        style={{ color: `${color}90` }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: revealStage >= 4 ? 1 : 0,
                          y: revealStage >= 4 ? 0 : 10
                        }}
                        transition={{ delay: 0.65 + index * 0.15 }}
                      >
                        {config?.level}
                      </motion.p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ----- 5. SKY HIGH ALL STAR 2026 ----- */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: revealStage >= 5 ? 1 : 0 }}
          >
            {/* Divider line */}
            <motion.div
              className="w-16 h-[1px] mx-auto mb-4 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: revealStage >= 5 ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
            <p
              className="text-sm md:text-base tracking-[0.2em] uppercase font-medium"
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.7), rgba(255,255,255,0.4))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Sky High All Star 2026
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

/**
 * ApprovedState - Celebration + Member Data + Form Area
 * Clean design with solid colors from brand palette
 */
export function ApprovedState({ registration, onRetry }: ApprovedStateProps) {
  const [showCelebration, setShowCelebration] = useState(true)
  const [revealStage, setRevealStage] = useState(0)
  // Initialize with registration completion status from database
  const [formCompleted, setFormCompleted] = useState(
    registration.athleteRegistrationCompleted
  )

  const handleFormSuccess = useCallback(() => {
    setFormCompleted(true)
  }, [])

  // Generate particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      type: (['confetti', 'star', 'circle', 'diamond'] as ParticleType[])[i % 4],
      x: Math.random() * 100,
      color: VICTORY_COLORS[i % VICTORY_COLORS.length],
      delay: Math.random() * 1.2,
      duration: 2.5 + Math.random() * 2,
      rotation: Math.random() * 720 - 360,
      size: 6 + Math.random() * 10,
    }))
  }, [])

  // Staged reveal
  useEffect(() => {
    const stages = [200, 600, 1200, 1800, 2400, 3000]
    const timers = stages.map((delay, index) =>
      setTimeout(() => setRevealStage(index + 1), delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  // End celebration
  useEffect(() => {
    const timer = setTimeout(() => setShowCelebration(false), CELEBRATION_DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  // Get first 2 names for display
  const nameParts = registration.name.split(' ')
  const displayName = nameParts.slice(0, 2).join(' ')

  return (
    <div className="relative max-w-2xl mx-auto px-4">
      {/* ===== CELEBRATION OVERLAY ===== */}
      <AnimatePresence>
        {showCelebration && (
          <div
            className="absolute inset-0 -top-24 pointer-events-none overflow-hidden z-20"
            style={{ height: 'calc(100% + 6rem)' }}
            aria-hidden="true"
          >
            {/* Particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute"
                style={{
                  left: `${particle.x}%`,
                  width: particle.size,
                  height: particle.size,
                }}
                initial={{ y: -20, opacity: 0, rotate: 0, scale: 0 }}
                animate={{
                  y: '100vh',
                  opacity: [0, 1, 1, 0],
                  rotate: particle.rotation,
                  scale: [0, 1, 1, 0.5],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: 'easeOut',
                }}
              >
                {particle.type === 'confetti' && (
                  <div className="w-full h-full rounded-sm" style={{ backgroundColor: particle.color }} />
                )}
                {particle.type === 'star' && (
                  <Star className="w-full h-full" style={{ color: particle.color }} fill={particle.color} />
                )}
                {particle.type === 'circle' && (
                  <div className="w-full h-full rounded-full" style={{ backgroundColor: particle.color }} />
                )}
                {particle.type === 'diamond' && (
                  <div className="w-full h-full rotate-45" style={{ backgroundColor: particle.color }} />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10">
        {/* ===== SHAREABLE CARD SECTION ===== */}
        <ShareableCard
          firstName={displayName}
          assignments={registration.teamAssignments}
          revealStage={revealStage}
        />

        {/* Spacer after shareable card */}
        <div className="h-8" />

        {/* ----- MEMBER DATA CARD ----- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealStage >= 5 ? 1 : 0 }}
          className="mb-6"
        >
          <FormCard
            icon={Star}
            title="Seus Dados"
            subtitle="Informações da aprovação"
            variant="celebration"
            delay={0}
          >
            <div className="space-y-4">
              {/* Personal info row */}
              <div className="grid md:grid-cols-2 gap-3">
                {/* Name */}
                <div className="bg-[#000c1f] rounded-xl p-4 border border-white/10">
                  <p className="text-[#FF7F00]/60 text-xs uppercase tracking-wider mb-1">Nome</p>
                  <p className="text-white font-medium">{registration.name}</p>
                </div>

                {/* Email */}
                <div className="bg-[#000c1f] rounded-xl p-4 border border-white/10">
                  <p className="text-[#00BFFF]/60 text-xs uppercase tracking-wider mb-1">E-mail</p>
                  <p className="text-white font-medium truncate">{registration.email}</p>
                </div>
              </div>

              {/* Team assignments section */}
              <TeamAssignmentsDisplay assignments={registration.teamAssignments} />
            </div>
          </FormCard>
        </motion.div>

        {/* ----- FORM SECTION ----- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealStage >= 6 ? 1 : 0 }}
          className="mb-6"
        >
          {formCompleted ? (
            <FormCard
              icon={CheckCircle2}
              title="Cadastro Completo!"
              subtitle="Seus dados foram salvos"
              variant="celebration"
              delay={0}
            >
              <div className="text-center py-4">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-white/70 text-sm">
                  Nossa equipe entrará em contato em breve com os próximos passos.
                </p>
              </div>
            </FormCard>
          ) : (
            <FormCard
              icon={FileText}
              title="Complete seu Cadastro"
              subtitle="Preencha os dados para finalizar"
              variant="action"
              delay={0.2}
            >
              <AthleteRegistrationForm
                registration={registration}
                onSuccess={handleFormSuccess}
              />
            </FormCard>
          )}
        </motion.div>

        {/* ----- CONTACT & BACK ----- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealStage >= 6 ? 1 : 0 }}
          className="text-center"
        >
          <p className="text-white/40 text-sm mb-4">
            Dúvidas? Entre em contato:
          </p>
          <div className="mb-6">
            <ContactLinks />
          </div>

          <GlowingButton variant="secondary" onClick={onRetry}>
            <RotateCcw className="w-5 h-5" aria-hidden="true" />
            Verificar Outro Email
          </GlowingButton>
        </motion.div>
      </div>
    </div>
  )
}
