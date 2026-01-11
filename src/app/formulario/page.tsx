'use client'

import { useRef, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Sparkles,
  Phone,
  Instagram,
  MapPin,
  Send,
  Clock,
  Star,
  User,
  Trophy,
  Calendar,
  Heart,
  Upload,
  FileText,
  X,
  CreditCard,
  Copy,
  Check,
  DollarSign,
} from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { AnimatedBackground, GlowingButton } from '@/components/ui'
import { useIntersectionTracker } from '@/hooks/useIntersectionTracker'
import { createFormSections } from '@/constants/form-sections'
import { PIX_CONFIG, PAYMENT_PROOF_CONFIG, FORM_SECTION_IDS, calculateTryoutPrice, TRYOUT_PRICING } from '@/constants/payment'
import { isMinor } from '@/lib/form-validation'
import { calculateAge, isValidAge } from '@/lib/utils'
import {
  registrationSchema,
  type RegistrationFormData,
} from '@/lib/schemas/registration-schema'
import { submitRegistration } from '@/actions/submit-registration'
import type { FormField } from '@/types/form'
import { logError } from '@/lib/error-logger'

// ============================================
// FLOATING HEADER COMPONENT
// ============================================
function FloatingHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="mx-2 sm:mx-4 mt-2 sm:mt-4">
        <div
          className={`max-w-7xl mx-auto backdrop-blur-xl rounded-2xl border border-white/10 px-4 sm:px-6 py-3 transition-all duration-300 ${
            isScrolled ? 'bg-[#000c1f]/95' : 'bg-[#000c1f]/80'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden ring-2 ring-[#FF7F00]/50 group-hover:ring-[#FF7F00] transition-all">
                <Image
                  src="/logo/SkyHigh_Logo novo.png"
                  alt="SkyHigh AllStar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden xs:block sm:block">
                <h1 className="text-lg sm:text-xl font-display text-[#FF7F00] leading-none tracking-wider">
                  SKYHIGH
                </h1>
                <p className="text-[10px] sm:text-xs font-display text-[#00BFFF] leading-none tracking-widest">
                  ALLSTAR
                </p>
              </div>
            </Link>

            {/* Back Button + CTA */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Voltar</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

import * as React from 'react'

// ============================================
// PROGRESS INDICATOR (Desktop - Lateral)
// ============================================
function ProgressIndicator({
  currentSection,
  totalSections,
  sectionTitles,
}: {
  currentSection: number
  totalSections: number
  sectionTitles: string[]
}) {
  const progress = ((currentSection + 1) / totalSections) * 100

  const icons = [User, Trophy, Calendar, Heart, CreditCard]

  return (
    <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 px-2.5 py-4 rounded-xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">
      <div className="relative flex flex-col items-center gap-4">
        {/* Storm Energy Visual Indicator - Background Line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-6 w-px rounded-full"
          style={{
            background: `linear-gradient(180deg, transparent, #FF7F00, transparent)`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Section dots */}
        {sectionTitles.map((title, index) => {
          const Icon = icons[index % icons.length]
          const isActive = index <= currentSection
          const isCurrent = index === currentSection

          return (
            <motion.div
              key={index}
              className="relative z-10 group"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer border-2 relative ${
                  isCurrent
                    ? 'bg-gradient-to-br from-[#FF7F00] to-[#FF9933] border-[#FF7F00] shadow-lg shadow-[#FF7F00]/30 z-20'
                    : isActive
                      ? 'bg-[#000c1f] border-[#FF7F00] z-10'
                      : 'bg-black/40 border-white/10 z-10'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {/* Active Glow for current step */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-[#FF7F00]"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ filter: 'blur(6px)', zIndex: -1 }}
                  />
                )}

                <Icon
                  className={`w-4 h-4 ${isCurrent ? 'text-white' : isActive ? 'text-[#FF7F00]' : 'text-white/30'}`}
                />
              </motion.div>

              {/* Tooltip */}
              <div className="absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="bg-black/90 backdrop-blur-md border border-[#FF7F00]/30 rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-xl">
                  <span className="text-xs font-semibold text-[#FF7F00]">
                    {title}
                  </span>
                  {/* Arrow */}
                  <div
                    className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px]"
                    style={{ borderRightColor: 'rgba(255, 127, 0, 0.3)' }}
                  />
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Percentage */}
        <motion.div
          className="mt-1 text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs font-bold text-[#FF7F00] tabular-nums">
            {Math.round(progress)}%
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ============================================
// MOBILE PROGRESS BAR (Fixed Bottom)
// ============================================
function MobileProgressBar({
  currentSection,
  totalSections,
  sectionTitles,
}: {
  currentSection: number
  totalSections: number
  sectionTitles: string[]
}) {
  const progress = ((currentSection + 1) / totalSections) * 100
  const icons = [User, Trophy, Calendar, Heart, CreditCard]

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-2 safe-area-inset-bottom">
      <div className="bg-[#000c1f]/95 backdrop-blur-xl rounded-2xl border border-white/10 p-3 sm:p-4 shadow-2xl shadow-black/30">
        {/* Section dots - horizontal stepper */}
        <div className="flex items-center justify-between mb-3">
          {sectionTitles.map((title, index) => {
            const Icon = icons[index % icons.length]
            const isActive = index <= currentSection
            const isCurrent = index === currentSection
            const isCompleted = index < currentSection

            return (
              <div key={index} className="flex items-center flex-1">
                {/* Step indicator */}
                <motion.div
                  className="relative flex flex-col items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05, type: 'spring' }}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gradient-to-br from-[#FF7F00] to-[#FF9933] shadow-lg shadow-[#FF7F00]/30'
                        : isCompleted
                          ? 'bg-[#FF7F00]/20 border-2 border-[#FF7F00]'
                          : 'bg-white/5 border border-white/20'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF7F00]" />
                    ) : (
                      <Icon
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${isCurrent ? 'text-white' : isActive ? 'text-white/70' : 'text-white/30'}`}
                      />
                    )}
                  </div>

                  {/* Step title - only show on larger mobile */}
                  <span
                    className={`hidden xs:block text-[8px] sm:text-[10px] mt-1 text-center max-w-[60px] sm:max-w-[80px] truncate ${
                      isCurrent
                        ? 'text-[#FF7F00] font-semibold'
                        : isActive
                          ? 'text-white/60'
                          : 'text-white/30'
                    }`}
                  >
                    {title}
                  </span>
                </motion.div>

                {/* Connector line */}
                {index < totalSections - 1 && (
                  <div className="flex-1 h-0.5 mx-1 sm:mx-2 rounded-full overflow-hidden bg-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#FF7F00] to-[#FF9933]"
                      initial={{ width: 0 }}
                      animate={{
                        width: isCompleted
                          ? '100%'
                          : isCurrent
                            ? '50%'
                            : '0%',
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Progress info row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs sm:text-sm">
              {sectionTitles[currentSection]}
            </span>
            <span className="text-white/30 text-[10px] sm:text-xs">
              ({currentSection + 1}/{totalSections})
            </span>
          </div>

          {/* Progress percentage with mini bar */}
          <div className="flex items-center gap-2">
            <div className="w-16 sm:w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF7F00] to-[#00BFFF] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <span className="text-sm sm:text-base font-bold text-[#FF7F00] min-w-[40px] text-right">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// PIX INFO COMPONENT
// ============================================
interface PixInfoBoxProps {
  calculatedPrice: number | null
  isSkyhighAthlete: boolean | null
  teamCount: number
}

function PixInfoBox({ calculatedPrice, isSkyhighAthlete, teamCount }: PixInfoBoxProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PIX_CONFIG.key)
      setCopied(true)
      toast.success('Chave PIX copiada!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      logError(error, { component: 'PixInfoBox', action: 'copyToClipboard' })
      toast.error('Erro ao copiar')
    }
  }

  const canDisplayPrice = calculatedPrice !== null && isSkyhighAthlete !== null && teamCount > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 space-y-4"
    >
      {/* Price calculation box */}
      <div
        className="bg-gradient-to-r from-[#FF7F00]/10 to-[#FF9933]/10 rounded-xl p-5 border border-[#FF7F00]/30"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7F00] to-[#FF9933] flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold text-lg mb-2">
              Valor do Tryout
            </h4>
            {canDisplayPrice ? (
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#FF7F00]">
                    R$ {calculatedPrice},00
                  </span>
                  <span className="text-white/50 text-sm">(pagamento antecipado)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    isSkyhighAthlete
                      ? 'bg-[#FF7F00]/20 text-[#FF7F00] border border-[#FF7F00]/30'
                      : 'bg-white/10 text-white/70 border border-white/20'
                  }`}>
                    {isSkyhighAthlete ? 'Atleta SkyHigh 2025' : 'Novo atleta'}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    teamCount > 1
                      ? 'bg-[#00BFFF]/20 text-[#00BFFF] border border-[#00BFFF]/30'
                      : 'bg-white/10 text-white/70 border border-white/20'
                  }`}>
                    {teamCount === 1 ? '1 equipe' : `${teamCount} equipes`}
                  </span>
                </div>
                <p className="text-white/40 text-xs">
                  Na porta: R$ {teamCount > 1 ? TRYOUT_PRICING.atDoor.multiple : TRYOUT_PRICING.atDoor.single},00
                </p>
              </div>
            ) : (
              <p className="text-white/50 text-sm">
                Preencha os campos &quot;Atleta SkyHigh 2025?&quot; e &quot;Nível de interesse&quot; para calcular o valor.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* PIX info box */}
      <div className="bg-gradient-to-r from-[#00BFFF]/10 to-[#FF7F00]/10 rounded-xl p-5 border border-[#00BFFF]/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00BFFF] to-[#00BFFF]/70 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold text-lg mb-2">
              Pagamento via PIX
            </h4>
            <p className="text-white/60 text-sm mb-4">
              Realize o pagamento antecipado via PIX e envie o comprovante abaixo.
            </p>
            <div className="bg-black/30 rounded-lg p-4 border border-white/10">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                {PIX_CONFIG.label}
              </p>
              <div className="flex items-center gap-3">
                <code className="text-[#00BFFF] font-mono text-sm flex-1 break-all">
                  {PIX_CONFIG.key}
                </code>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label={copied ? 'Chave PIX copiada' : 'Copiar chave PIX'}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    copied
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      Copiar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// FORM SECTION COMPONENT
// ============================================
interface FormSectionProps {
  title: string
  subtitle?: string
  icon: React.ReactNode
  fields: FormField[]
  control: ReturnType<typeof useForm<RegistrationFormData>>['control']
  errors: ReturnType<typeof useForm<RegistrationFormData>>['formState']['errors']
  index: number
  isActive: boolean
  showMinorNotice?: boolean
  sectionId?: string
  // Payment pricing props
  calculatedPrice?: number | null
  isSkyhighAthlete?: boolean | null
  teamCount?: number
}

function FormSection({
  title,
  subtitle,
  icon,
  fields,
  control,
  errors,
  index,
  isActive,
  showMinorNotice,
  sectionId,
  calculatedPrice,
  isSkyhighAthlete,
  teamCount,
}: FormSectionProps) {
  return (
    <motion.div
      id={`section-${index}`}
      className={`relative transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 hover:border-[#FF7F00]/30 transition-all duration-500 group">
        {/* Section header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF7F00] to-[#FF9933] flex items-center justify-center shadow-lg shadow-[#FF7F00]/20 group-hover:shadow-[#FF7F00]/40 transition-shadow">
            {icon}
          </div>
          <div className="flex-1">
            <motion.span
              className="inline-block text-xs font-bold text-[#00BFFF] uppercase tracking-wider mb-1"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Seção {index + 1}
            </motion.span>
            <h3 className="text-2xl md:text-3xl font-display text-white leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-white/50 text-sm mt-1">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Minor notice */}
        <AnimatePresence>
          {showMinorNotice && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#FF7F00]/20 to-[#00BFFF]/10 rounded-xl p-4 border border-[#FF7F00]/30 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF7F00]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-[#FF7F00]" />
                </div>
                <div>
                  <p className="text-[#FF7F00] font-semibold text-sm mb-1">
                    Atleta menor de 18 anos identificado
                  </p>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Como você tem menos de 18 anos, os dados do responsável
                    legal são obrigatórios para completar a inscrição.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PIX Info for payment section */}
        {sectionId === FORM_SECTION_IDS.payment && (
          <PixInfoBox
            calculatedPrice={calculatedPrice ?? null}
            isSkyhighAthlete={isSkyhighAthlete ?? null}
            teamCount={teamCount ?? 0}
          />
        )}

        {/* Fields grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {fields.map((field, fieldIndex) => {
            // Determine column span based on field type and content
            const getColSpan = () => {
              // Full width for textareas, checkbox-groups, and checkboxes with long descriptions
              if (
                field.type === 'textarea' || 
                field.type === 'checkbox-group' ||
                (field.type === 'checkbox' && field.description)
              ) {
                return 'md:col-span-2'
              }
              return ''
            }

            return (
            <motion.div
              key={String(field.name)}
              className={getColSpan()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + fieldIndex * 0.05 }}
            >
              <Controller
                name={field.name as keyof RegistrationFormData}
                control={control}
                render={({ field: controllerField }) => (
                  <div className="flex flex-col h-full">
                    {/* Label - fixed height area */}
                    <div className="flex-1 flex flex-col justify-end mb-2">
                      <Label
                        htmlFor={field.name}
                        className="block text-white/80 text-sm font-medium leading-tight"
                      >
                        {field.label}
                        {field.required && (
                          <span className="text-[#FF7F00] ml-1">*</span>
                        )}
                      </Label>
                    </div>

                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        value={(controllerField.value as string) || ''}
                        onChange={controllerField.onChange}
                        onBlur={controllerField.onBlur}
                        className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FF7F00] focus:ring-[#FF7F00]/20 transition-all rounded-xl ${
                          errors[field.name] ? 'border-red-500' : ''
                        }`}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        id={field.name}
                        value={(controllerField.value as string) || ''}
                        onChange={controllerField.onChange}
                        onBlur={controllerField.onBlur}
                        className={`h-12 w-full rounded-xl border ${
                          errors[field.name]
                            ? 'border-red-500'
                            : 'border-white/10'
                        } bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF7F00] focus:ring-2 focus:ring-[#FF7F00]/20 transition-all duration-300 appearance-none cursor-pointer`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.5)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                          backgroundSize: '16px',
                        }}
                      >
                        <option value="" className="bg-[#000c1f] text-white">
                          Selecione...
                        </option>
                        {field.options?.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="bg-[#000c1f] text-white"
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'checkbox' ? (
                      <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#FF7F00]/30 transition-colors w-full">
                        <div className="flex-shrink-0 mt-0.5">
                          <Checkbox
                            id={field.name}
                            name={field.name}
                            label=""
                            checked={Boolean(controllerField.value)}
                            onChange={(e) =>
                              controllerField.onChange(e.target.checked)
                            }
                          />
                        </div>
                        <label
                          htmlFor={field.name}
                          className="text-white/70 text-sm cursor-pointer leading-relaxed flex-1"
                        >
                          {field.description ? (
                            <span className="text-white/60">{field.description}</span>
                          ) : (
                            field.label
                          )}
                        </label>
                      </div>
                    ) : field.type === 'checkbox-group' ? (
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {field.options?.map((option) => {
                          const currentValues =
                            (controllerField.value as string[]) || []
                          const isChecked = currentValues.includes(option.value)

                          return (
                            <label
                              key={option.value}
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                                isChecked
                                  ? 'bg-[#FF7F00]/10 border-[#FF7F00]/50 text-white'
                                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  const newValues = e.target.checked
                                    ? [...currentValues, option.value]
                                    : currentValues.filter(
                                        (v) => v !== option.value
                                      )
                                  controllerField.onChange(newValues)
                                }}
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                  isChecked
                                    ? 'bg-[#FF7F00] border-[#FF7F00]'
                                    : 'border-white/30'
                                }`}
                              >
                                {isChecked && (
                                  <motion.svg
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </motion.svg>
                                )}
                              </div>
                              <span className="text-sm">{option.label}</span>
                            </label>
                          )
                        })}
                      </div>
                    ) : field.type === 'readonly' ? (
                      <div
                        role="status"
                        aria-live="polite"
                        aria-label={
                          controllerField.value !== undefined && controllerField.value !== null
                            ? `Idade: ${controllerField.value} anos`
                            : 'Idade será calculada automaticamente'
                        }
                        className={`bg-white/5 border border-white/20 rounded-xl h-12 flex items-center px-4 cursor-not-allowed opacity-70 ${
                          controllerField.value ? 'text-white/80' : 'text-white/40 italic'
                        }`}
                      >
                        {controllerField.value !== undefined && controllerField.value !== null
                          ? `${controllerField.value} anos`
                          : 'Calculado automaticamente'}
                      </div>
                    ) : field.type === 'file' ? (
                      <div className="space-y-2">
                        <div
                          className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FF7F00]/50 ${
                            controllerField.value
                              ? 'border-[#FF7F00]/50 bg-[#FF7F00]/5'
                              : 'border-white/20 bg-white/5 hover:border-[#FF7F00]/30 hover:bg-white/10'
                          }`}
                        >
                          <input
                            type="file"
                            id={field.name}
                            accept={field.accept}
                            aria-label={`Upload ${field.label}`}
                            aria-describedby={field.description ? `${field.name}-description` : undefined}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer focus:outline-none"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                // Validate file size
                                if (file.size > PAYMENT_PROOF_CONFIG.maxSizeBytes) {
                                  toast.error(`Arquivo muito grande. Máximo: ${PAYMENT_PROOF_CONFIG.maxSizeMB}MB`)
                                  e.target.value = ''
                                  return
                                }
                                // Validate file type
                                if (!PAYMENT_PROOF_CONFIG.acceptedMimeTypes.some(type => type === file.type)) {
                                  toast.error(`Formato inválido. Aceitos: ${PAYMENT_PROOF_CONFIG.formatDescription}`)
                                  e.target.value = ''
                                  return
                                }
                                // Convert to base64 for storage
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                  controllerField.onChange(reader.result as string)
                                }
                                reader.readAsDataURL(file)
                              }
                            }}
                          />
                          <div className="flex flex-col items-center justify-center text-center">
                            {controllerField.value ? (
                              <>
                                <div className="w-12 h-12 rounded-xl bg-[#FF7F00]/20 flex items-center justify-center mb-3">
                                  <FileText className="w-6 h-6 text-[#FF7F00]" aria-hidden="true" />
                                </div>
                                <p className="text-white font-medium text-sm mb-1">
                                  Arquivo selecionado
                                </p>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    controllerField.onChange('')
                                  }}
                                  aria-label="Remover arquivo selecionado"
                                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors mt-2 focus:outline-none focus:ring-2 focus:ring-red-400/50 rounded px-2 py-1"
                                >
                                  <X className="w-3 h-3" aria-hidden="true" />
                                  Remover arquivo
                                </button>
                              </>
                            ) : (
                              <>
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                                  <Upload className="w-6 h-6 text-white/50" aria-hidden="true" />
                                </div>
                                <p className="text-white/70 text-sm mb-1">
                                  Clique para selecionar um arquivo
                                </p>
                                <p className="text-white/40 text-xs">
                                  ou arraste e solte aqui
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        {field.description && (
                          <p id={`${field.name}-description`} className="text-white/40 text-xs">{field.description}</p>
                        )}
                      </div>
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={(controllerField.value as string | number) ?? ''}
                        onChange={(e) => {
                          // Convert to number for number fields
                          if (field.type === 'number') {
                            const numValue = e.target.value === '' ? undefined : Number(e.target.value)
                            controllerField.onChange(numValue)
                          } else {
                            controllerField.onChange(e.target.value)
                          }
                        }}
                        onBlur={controllerField.onBlur}
                        className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FF7F00] focus:ring-[#FF7F00]/20 transition-all rounded-xl h-12 ${
                          errors[field.name] ? 'border-red-500' : ''
                        }`}
                      />
                    )}

                    {errors[field.name] && (
                      <motion.p
                        className="text-red-400 text-xs mt-2 flex items-center gap-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <span className="w-1 h-1 rounded-full bg-red-400" />
                        {errors[field.name]?.message}
                      </motion.p>
                    )}
                  </div>
                )}
              />
            </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// SUCCESS STATE COMPONENT
// ============================================
function SuccessState() {
  const [showConfetti, setShowConfetti] = React.useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Confetti particles */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: [
                  '#FF7F00',
                  '#00BFFF',
                  '#FF9933',
                  '#2563EB',
                  '#FFD700',
                ][i % 5],
              }}
              initial={{
                y: -20,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                y: '100vh',
                rotate: Math.random() * 720 - 360,
                opacity: 0,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-xl mx-auto text-center">
        {/* Success icon */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF7F00] to-[#00BFFF] rounded-full blur-xl opacity-50" />
          <div className="relative w-full h-full bg-gradient-to-br from-[#FF7F00] to-[#FF9933] rounded-full flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <CheckCircle2 className="w-16 h-16 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Success message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
            Inscrição <span className="text-[#FF7F00]">Enviada!</span>
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Recebemos sua inscrição com sucesso. Em breve entraremos em contato
            com mais informações sobre o tryout.
          </p>
        </motion.div>

        {/* Info card */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="font-display text-xl text-[#FF7F00] mb-4 flex items-center justify-center gap-2">
            <Clock className="w-5 h-5" />
            Próximos Passos
          </h3>
          <div className="flex items-center gap-3 text-white/70">
            <div className="w-6 h-6 rounded-full bg-[#FF7F00]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-[#FF7F00]">1</span>
            </div>
            <span className="text-sm">Entraremos em contato via WhatsApp com os detalhes do tryout</span>
          </div>
        </motion.div>

        {/* Contact info */}
        <motion.div
          className="grid sm:grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <a
            href="https://wa.me/5511913311920"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#25D366]/50 hover:bg-[#25D366]/10 transition-all group"
          >
            <Phone className="w-5 h-5 text-[#25D366]" />
            <span className="text-white/70 group-hover:text-white transition-colors">
              (11) 91331-1920
            </span>
          </a>
          <a
            href="https://instagram.com/skyhigh.allstar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10 transition-all group"
          >
            <Instagram className="w-5 h-5 text-[#E1306C]" />
            <span className="text-white/70 group-hover:text-white transition-colors">
              @skyhigh.allstar
            </span>
          </a>
        </motion.div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Link href="/">
            <GlowingButton variant="secondary">
              <ArrowLeft className="w-5 h-5" />
              Voltar ao Site
            </GlowingButton>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ============================================
// FOOTER COMPONENT
// ============================================
function Footer() {
  return (
    <footer className="relative z-10 bg-[#000c1f] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden">
                <Image
                  src="/logo/SkyHigh_Logo novo.png"
                  alt="SkyHigh AllStar"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="56px"
                />
              </div>
              <div>
                <h3 className="text-2xl font-display text-[#FF7F00]">SKYHIGH</h3>
                <p className="text-sm font-display text-[#00BFFF]">ALLSTAR</p>
              </div>
            </div>
            <p className="text-white/60 max-w-sm leading-relaxed">
              Seu talento merece ir mais alto. Venha elevar o nível com a gente.
              Tradição, excelência e paixão pelo esporte.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-4">Contato</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/5511913311920"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-[#FF7F00] transition-colors"
              >
                <Phone className="w-4 h-4" />
                (11) 91331-1920
              </a>
              <a
                href="https://instagram.com/skyhigh.allstar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-[#FF7F00] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @skyhigh.allstar
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-display text-lg mb-4">Localização</h4>
            <div className="flex items-start gap-2 text-white/60">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <address className="not-italic">
                Ginásio SkyHigh All Star
                <br />
                Centro Esportivo Tietê
                <br />
                Av. Santos Dumont, 843 - Luz
                <br />
                São Paulo - SP
              </address>
            </div>
            <p className="text-white/40 text-sm mt-2 ml-6">
              🚇 Metrô Armênia (Linha 1 - Azul)
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} SkyHigh AllStar. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href="#" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function FormularioPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  // React Hook Form setup with Zod validation
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      'nome-completo': '',
      'data-nascimento': '',
      idade: undefined,
      genero: undefined,
      telefone: '',
      email: '',
      'nome-responsavel': '',
      'contato-responsavel': '',
      'email-responsavel': '',
      'pratica-cheerleading': undefined,
      'tempo-experiencia': undefined,
      'equipe-anterior': '',
      'experiencia-ginastica': undefined,
      'atleta-skyhigh-2025': undefined,
      'posicao-interesse': [],
      'nivel-interesse': [],
      'dias-disponiveis': [],
      'participa-campeonatos': undefined,
      'aceita-realocacao': undefined,
      'aceita-crossover': undefined,
      'outros-esportes': '',
      'comprovante-pagamento': '',
      'condicoes-medicas': '',
      medicacoes: '',
      'declaracao-medica': false,
      'autorizacao-responsavel': false,
      'aceite-termos': false,
    },
    mode: 'onBlur',
  })

  // Watch the birth date to determine if user is minor and calculate age
  const watchedData = watch()
  const birthDate = watchedData['data-nascimento']
  const userIsMinor = isMinor({ 'data-nascimento': birthDate })
  const formSections = useMemo(() => createFormSections(userIsMinor), [userIsMinor])
  const currentSection = useIntersectionTracker(formSections.length)

  // Calculate tryout price based on athlete status and number of teams
  const atletaSkyhigh2025 = watchedData['atleta-skyhigh-2025']
  const nivelInteresse = watchedData['nivel-interesse'] || []
  const isSkyhighAthlete = atletaSkyhigh2025 === 'sim' ? true : atletaSkyhigh2025 === 'nao' ? false : null
  const teamCount = nivelInteresse.length
  const calculatedPrice = useMemo(() => {
    if (isSkyhighAthlete === null || teamCount === 0) return null
    return calculateTryoutPrice(isSkyhighAthlete, teamCount)
  }, [isSkyhighAthlete, teamCount])

  // Calculate age automatically when birth date changes
  useEffect(() => {
    if (birthDate) {
      const age = calculateAge(birthDate)
      if (isValidAge(age)) {
        setValue('idade', age)
      }
    }
  }, [birthDate, setValue])

  // Next Safe Action hook
  const { execute, status, result } = useAction(submitRegistration)
  const isSubmitting = status === 'executing'
  const isSuccess = status === 'hasSucceeded'

  // Handle action result with toast notifications
  useEffect(() => {
    if (status === 'hasSucceeded') {
      toast.success('Inscrição enviada com sucesso!', {
        description: 'Em breve entraremos em contato.',
      })
    }
    if (status === 'hasErrored') {
      const errorMessage =
        result.serverError ||
        'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.'
      toast.error('Erro ao enviar inscrição', {
        description: errorMessage,
      })
    }
  }, [status, result])

  // Form submission handler
  const onSubmit = useCallback(
    (data: RegistrationFormData) => {
      // Add calculated price to the submission data
      const dataWithPrice = {
        ...data,
        'valor-inscricao': calculatedPrice ?? undefined,
      }
      execute(dataWithPrice)
    },
    [execute, calculatedPrice]
  )

  // Handle validation errors
  const onError = useCallback(() => {
    toast.error('Formulário incompleto', {
      description: 'Por favor, corrija os campos destacados em vermelho.',
    })

    // Scroll to first error
    const firstErrorKey = Object.keys(errors)[0]
    if (firstErrorKey) {
      const element = document.querySelector(`[name="${firstErrorKey}"]`)
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [errors])

  if (isSuccess) {
    return (
      <>
        <AnimatedBackground fixed />
        <FloatingHeader />
        <SuccessState />
        <Footer />
      </>
    )
  }

  return (
    <>
      <AnimatedBackground fixed />
      <FloatingHeader />

      {/* Progress indicators */}
      <ProgressIndicator
        currentSection={currentSection}
        totalSections={formSections.length}
        sectionTitles={formSections.map((s) => s.title)}
      />

      {/* Mobile progress bar - Fixed bottom */}
      <MobileProgressBar
        currentSection={currentSection}
        totalSections={formSections.length}
        sectionTitles={formSections.map((s) => s.title)}
      />

      <main
        ref={containerRef}
        className="relative z-10 min-h-screen pt-20 pb-32 lg:pb-16"
      >
        {/* Hero section */}
        <section className="py-8 md:py-12">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-[#FF7F00]" />
                Tryout 2026
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white leading-tight mb-4">
                Formulário de <span className="text-[#FF7F00]">Inscrição</span>
              </h1>

              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
                Preencha seus dados abaixo para participar do processo seletivo.
                Vagas limitadas!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form sections */}
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="max-w-4xl mx-auto px-4 md:px-8 lg:pl-24"
        >
          <div className="space-y-8">
            {formSections.map((section, index) => (
              <FormSection
                key={section.id}
                sectionId={section.id}
                title={section.title}
                subtitle={section.subtitle}
                icon={section.icon}
                fields={section.fields}
                control={control}
                errors={errors}
                index={index}
                isActive={index === currentSection}
                showMinorNotice={index === 0 && userIsMinor}
                {...(section.id === FORM_SECTION_IDS.payment && {
                  calculatedPrice,
                  isSkyhighAthlete,
                  teamCount,
                })}
              />
            ))}
          </div>

          {/* Submit button */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FF7F00] to-[#FF9933] text-white font-bold text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,127,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Inscrição
                    <Send className="w-5 h-5" />
                  </>
                )}
              </span>
              {!isSubmitting && (
                <motion.div className="absolute inset-0 bg-gradient-to-r from-[#FF9933] to-[#FF7F00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </button>

            <p className="text-white/40 text-sm mt-4">
              Ao enviar, você concorda com nossos termos de uso
            </p>
          </motion.div>
        </form>

        {/* Footer info */}
        <motion.div
          className="max-w-4xl mx-auto px-4 md:px-8 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-white/[0.05] to-transparent rounded-2xl p-6 border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7F00] to-[#00BFFF] flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    Dúvidas sobre o tryout?
                  </h4>
                  <p className="text-white/50 text-sm">
                    Entre em contato conosco
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://wa.me/5511913311920"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-[#25D366]/50 transition-all text-sm"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href="https://instagram.com/skyhigh.allstar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-[#E1306C]/50 transition-all text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  )
}
