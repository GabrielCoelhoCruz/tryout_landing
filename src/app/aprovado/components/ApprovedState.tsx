'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  Star,
  Zap,
  FileText,
  CheckCircle2,
  Snowflake,
  CloudLightning,
  CloudRain,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react'
import { GlowingButton, ContactLinks } from '@/components/ui'
import { createWhatsAppLink } from '@/constants/contact'
import type { ApprovedRegistration, TeamAssignment } from '@/types/approved-member'
import { TEAM_CONFIG, POSITION_LABELS } from '../constants'
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

// Team icons mapping
const TEAM_ICONS: Record<string, LucideIcon> = {
  snowstorm: Snowflake,
  hailstorm: CloudLightning,
  rainstorm: CloudRain,
}

type ApprovedStateProps = {
  registration: ApprovedRegistration
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
  const positionLabel = POSITION_LABELS[assignment.position] || assignment.position

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
              {index === 0 ? 'Time Principal' : 'Time Secundário'}
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

type TeamBadgesProps = {
  assignments: TeamAssignment[]
}

/**
 * Team badges display - shows team icon(s) based on assignments
 */
function TeamBadges({ assignments }: TeamBadgesProps) {
  const hasAssignments = assignments && assignments.length > 0
  const isSingleTeam = assignments?.length === 1
  const isMultipleTeams = assignments?.length === 2

  // Get primary team color for styling
  const primaryTeam = hasAssignments ? assignments[0].team : null
  const primaryConfig = primaryTeam ? TEAM_CONFIG[primaryTeam] : null
  const primaryColor = primaryConfig?.color || '#FF7F00'

  // For single team, show large badge
  if (isSingleTeam && primaryTeam) {
    const TeamIcon = TEAM_ICONS[primaryTeam] || Star
    return (
      <motion.div
        className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
      >
        {/* Pulsing ring */}
        <motion.div
          className="absolute -inset-2 rounded-full border-2"
          style={{ borderColor: `${primaryColor}40` }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4"
          style={{ borderColor: `${primaryColor}40` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-2"
          style={{ borderColor: `${primaryColor}30` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />

        {/* Badge with team color */}
        <div
          className="absolute inset-3 md:inset-4 rounded-full shadow-lg flex items-center justify-center"
          style={{ backgroundColor: primaryColor, boxShadow: `0 10px 25px ${primaryColor}40` }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
          >
            <TeamIcon className="w-12 h-12 md:w-14 md:h-14 text-white drop-shadow-lg" />
          </motion.div>
        </div>
      </motion.div>
    )
  }

  // For multiple teams, show side by side badges
  if (isMultipleTeams) {
    return (
      <div className="flex justify-center gap-4 md:gap-6 mb-8">
        {assignments.map((assignment, index) => {
          const config = TEAM_CONFIG[assignment.team]
          const TeamIcon = TEAM_ICONS[assignment.team] || Star
          const color = config?.color || '#FF7F00'

          return (
            <motion.div
              key={assignment.team}
              className="relative w-24 h-24 md:w-28 md:h-28"
              initial={{ scale: 0, rotate: index === 0 ? -180 : 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 + index * 0.15 }}
            >
              {/* Pulsing ring */}
              <motion.div
                className="absolute -inset-1 rounded-full border-2"
                style={{ borderColor: `${color}40` }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
              />

              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-3"
                style={{ borderColor: `${color}40` }}
                animate={{ rotate: index === 0 ? 360 : -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />

              {/* Badge with team color */}
              <div
                className="absolute inset-2 md:inset-3 rounded-full shadow-lg flex items-center justify-center"
                style={{ backgroundColor: color, boxShadow: `0 8px 20px ${color}40` }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 300 }}
                >
                  <TeamIcon className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    )
  }

  // No assignments - show default orange badge with star
  return (
    <motion.div
      className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
    >
      <motion.div
        className="absolute -inset-2 rounded-full border-2 border-[#FF7F00]/40"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-[#FF7F00]/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-[#00BFFF]/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-3 md:inset-4 rounded-full bg-[#FF7F00] shadow-lg shadow-[#FF7F00]/40 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
        >
          <Star className="w-12 h-12 md:w-14 md:h-14 text-white drop-shadow-lg" />
        </motion.div>
      </div>
    </motion.div>
  )
}

/**
 * ApprovedState - Celebration + Member Data + Form Area
 * Clean design with solid colors from brand palette
 */
export function ApprovedState({ registration }: ApprovedStateProps) {
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

  const firstName = registration.name.split(' ')[0]

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
        {/* ----- TEAM BADGES ----- */}
        <TeamBadges assignments={registration.teamAssignments} />

        {/* ----- NAME REVEAL ----- */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealStage >= 1 ? 1 : 0 }}
        >
          {/* Pre-text */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: revealStage >= 1 ? 1 : 0, y: revealStage >= 1 ? 0 : 10 }}
          >
            <Zap className="w-4 h-4 text-[#FF7F00]" />
            <span className="text-[#FF7F00] font-display text-sm md:text-base tracking-[0.2em] uppercase">
              Bem-vindo ao Sky High
            </span>
            <Zap className="w-4 h-4 text-[#FF7F00]" />
          </motion.div>

          {/* Name - solid orange color */}
          <motion.h2
            className="relative font-display leading-none mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: revealStage >= 2 ? 1 : 0,
              scale: revealStage >= 2 ? 1 : 0.8,
            }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <span className="text-5xl md:text-7xl text-[#FF7F00]">
              {firstName}
            </span>
          </motion.h2>

          {/* Approved message */}
          <motion.p
            className="text-xl md:text-2xl text-white/90 font-display"
            initial={{ opacity: 0 }}
            animate={{ opacity: revealStage >= 3 ? 1 : 0 }}
          >
            Você foi <span className="text-[#00BFFF]">APROVADO(A)</span>!
          </motion.p>

          <motion.p
            className="text-white/40 mt-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: revealStage >= 3 ? 1 : 0 }}
          >
            SkyHigh AllStar 2026
          </motion.p>
        </motion.div>

        {/* ----- MEMBER DATA CARD ----- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealStage >= 4 ? 1 : 0 }}
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
          animate={{ opacity: revealStage >= 5 ? 1 : 0 }}
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

          <Link href="/">
            <GlowingButton variant="secondary">
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              Voltar ao Site
            </GlowingButton>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
