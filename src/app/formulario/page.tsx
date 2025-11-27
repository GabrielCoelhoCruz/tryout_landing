'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Phone,
  Instagram,
  MapPin,
  Send,
  Clock,
  Star,
  User,
  Trophy,
  Calendar,
  Heart
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { AnimatedBackground, GlowingButton } from '@/components/ui'
import { useIntersectionTracker } from '@/hooks/useIntersectionTracker'
import { createFormSections } from '@/constants/form-sections'
import { isMinor, validateForm } from '@/lib/form-validation'
import { logger } from '@/lib/error-logger'
import type { FormData, FormErrors, FormField } from '@/types/form'

// ============================================
// FLOATING HEADER COMPONENT
// ============================================
function FloatingHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  
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
        <div className={`max-w-7xl mx-auto backdrop-blur-xl rounded-2xl border border-white/10 px-4 sm:px-6 py-3 transition-all duration-300 ${
          isScrolled ? 'bg-[#0A0A2A]/95' : 'bg-[#0A0A2A]/80'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden ring-2 ring-[#FF7F00]/50 group-hover:ring-[#FF7F00] transition-all">
                <Image
                  src="/logo/logo-shield.jpg"
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

// ============================================
// PROGRESS INDICATOR
// ============================================
function ProgressIndicator({ currentSection, totalSections, sectionTitles }: {
  currentSection: number
  totalSections: number
  sectionTitles: string[]
}) {
  const progress = ((currentSection + 1) / totalSections) * 100
  
  const icons = [User, Trophy, Calendar, Heart]
  
  return (
    <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
      <div className="relative flex flex-col items-center gap-2">
        {/* Progress bar background */}
        <div className="absolute left-1/2 -translate-x-1/2 top-5 bottom-5 w-0.5 bg-white/10" />
        
        {/* Animated progress bar */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-5 w-0.5 bg-gradient-to-b from-[#FF7F00] to-[#00BFFF]"
          style={{ originY: 0 }}
          initial={{ height: 0 }}
          animate={{ height: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'bg-gradient-to-br from-[#FF7F00] to-[#FF9933] shadow-lg shadow-[#FF7F00]/30'
                    : isActive
                    ? 'bg-white/20 border border-[#FF7F00]/50'
                    : 'bg-white/5 border border-white/10'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/40'}`} />
              </motion.div>
              
              {/* Tooltip */}
              <div className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-[#0A0A2A] border border-white/10 rounded-lg px-3 py-2 whitespace-nowrap">
                  <span className="text-xs font-semibold text-white">{title}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
        
        {/* Percentage */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-2xl font-display text-[#FF7F00]">{Math.round(progress)}%</div>
          <div className="text-xs text-white/40">concluído</div>
        </motion.div>
      </div>
    </div>
  )
}

// ============================================
// MOBILE PROGRESS BAR
// ============================================
function MobileProgressBar({ currentSection, totalSections }: {
  currentSection: number
  totalSections: number
}) {
  const progress = ((currentSection + 1) / totalSections) * 100
  
  return (
    <div className="lg:hidden sticky top-20 z-30 px-4 pb-4">
      <div className="bg-[#0A0A2A]/90 backdrop-blur-xl rounded-xl border border-white/10 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/60">Progresso</span>
          <span className="text-xs font-semibold text-[#FF7F00]">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF7F00] to-[#00BFFF] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-white/40">Seção {currentSection + 1} de {totalSections}</span>
        </div>
      </div>
    </div>
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
  formData: Partial<FormData>
  errors: FormErrors
  onChange: (name: keyof FormData, value: unknown) => void
  index: number
  isActive: boolean
  showMinorNotice?: boolean
}

function FormSection({ title, subtitle, icon, fields, formData, errors, onChange, index, isActive, showMinorNotice }: FormSectionProps) {
  return (
    <motion.div
      id={`section-${index}`}
      className={`relative transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
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
                    Como você tem menos de 18 anos, os dados do responsável legal são obrigatórios para completar a inscrição.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fields grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {fields.map((field, fieldIndex) => (
            <motion.div
              key={field.name}
              className={field.type === 'textarea' || field.type === 'checkbox-group' ? 'md:col-span-2' : ''}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + fieldIndex * 0.05 }}
            >
              <Label htmlFor={field.name} className="mb-2 block text-white/80 text-sm font-medium">
                {field.label}
                {field.required && <span className="text-[#FF7F00] ml-1">*</span>}
              </Label>

              {field.type === 'textarea' ? (
                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={(formData[field.name] as string) || ''}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FF7F00] focus:ring-[#FF7F00]/20 transition-all rounded-xl ${
                    errors[field.name] ? 'border-red-500' : ''
                  }`}
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={(formData[field.name] as string) || ''}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  className={`flex h-12 w-full rounded-xl border ${
                    errors[field.name] ? 'border-red-500' : 'border-white/10'
                  } bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF7F00] focus:ring-2 focus:ring-[#FF7F00]/20 transition-all duration-300 appearance-none cursor-pointer`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.5)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px'
                  }}
                >
                  <option value="" className="bg-[#0A0A2A] text-white">Selecione...</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#0A0A2A] text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'checkbox' ? (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-[#FF7F00]/30 transition-colors">
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    label=""
                    checked={Boolean(formData[field.name])}
                    onChange={(e) => onChange(field.name, e.target.checked)}
                  />
                  <label htmlFor={field.name} className="text-white/70 text-sm cursor-pointer flex-1">
                    {field.label}
                  </label>
                </div>
              ) : field.type === 'checkbox-group' ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {field.options?.map((option) => {
                    const currentValues = (formData[field.name] as string[]) || []
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
                              : currentValues.filter(v => v !== option.value)
                            onChange(field.name, newValues)
                          }}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-[#FF7F00] border-[#FF7F00]'
                            : 'border-white/30'
                        }`}>
                          {isChecked && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </motion.svg>
                          )}
                        </div>
                        <span className="text-sm">{option.label}</span>
                      </label>
                    )
                  })}
                </div>
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={(formData[field.name] as string | number) || ''}
                  onChange={(e) => onChange(field.name, e.target.value)}
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
                  {errors[field.name]}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// SUCCESS STATE COMPONENT
// ============================================
function SuccessState() {
  const [showConfetti, setShowConfetti] = useState(true)
  
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
                backgroundColor: ['#FF7F00', '#00BFFF', '#FF9933', '#9D00FF', '#FFD700'][i % 5],
              }}
              initial={{ 
                y: -20, 
                rotate: 0,
                opacity: 1 
              }}
              animate={{ 
                y: '100vh', 
                rotate: Math.random() * 720 - 360,
                opacity: 0 
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: "easeOut"
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
          transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF7F00] to-[#00BFFF] rounded-full blur-xl opacity-50" />
          <div className="relative w-full h-full bg-gradient-to-br from-[#FF7F00] to-[#FF9933] rounded-full flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
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
            Recebemos sua inscrição com sucesso. Em breve entraremos em contato com mais informações sobre o tryout.
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
          <div className="space-y-3 text-left">
            {[
              'Você receberá um email de confirmação em breve',
              'Nossa equipe analisará sua inscrição',
              'Entraremos em contato via WhatsApp com os detalhes do tryout',
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 text-white/70">
                <div className="w-6 h-6 rounded-full bg-[#FF7F00]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[#FF7F00]">{i + 1}</span>
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
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
            <span className="text-white/70 group-hover:text-white transition-colors">(11) 91331-1920</span>
          </a>
          <a
            href="https://instagram.com/skyhigh.allstar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10 transition-all group"
          >
            <Instagram className="w-5 h-5 text-[#E1306C]" />
            <span className="text-white/70 group-hover:text-white transition-colors">@skyhigh.allstar</span>
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

export default function FormularioPage() {
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const userIsMinor = isMinor(formData)
  const formSections = useMemo(() => createFormSections(userIsMinor), [userIsMinor])

  const currentSection = useIntersectionTracker(formSections.length)

  const handleChange = (name: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const allFields = useMemo(
    () => formSections.flatMap((section) => section.fields),
    [formSections]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm(formData, allFields)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      const firstErrorField = Object.keys(validationErrors)[0]
      const element = document.querySelector(`[name="${firstErrorField}"]`)
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })

      logger.warn('Form validation failed', {
        component: 'FormularioPage',
        action: 'handleSubmit',
        metadata: { errorCount: Object.keys(validationErrors).length },
      })

      return
    }

    setIsSubmitting(true)
    setSubmissionError(null)

    try {
      // TODO: Replace with actual API call
      await new Promise<void>((resolve) => setTimeout(resolve, 2000))

      logger.info('Form submitted successfully', {
        component: 'FormularioPage',
        action: 'handleSubmit',
      })

      setIsSuccess(true)
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.'

      setSubmissionError(errorMessage)

      logger.error('Form submission failed', error as Error, {
        component: 'FormularioPage',
        action: 'handleSubmit',
      })

      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <>
        <AnimatedBackground fixed />
        <FloatingHeader />
        <SuccessState />
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
        sectionTitles={formSections.map(s => s.title)}
      />
      
      <main ref={containerRef} className="relative z-10 min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-[#FF7F00]" />
                Tryout 2026
              </motion.span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white leading-tight mb-4">
                Formulário de{' '}
                <span className="bg-gradient-to-r from-[#FF7F00] to-[#00BFFF] bg-clip-text text-transparent">
                  Inscrição
                </span>
          </h1>
              
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
                Preencha seus dados abaixo para participar do processo seletivo. Vagas limitadas!
          </p>
            </motion.div>
        </div>
      </section>

        {/* Mobile progress bar */}
        <MobileProgressBar
          currentSection={currentSection}
          totalSections={formSections.length}
        />

        {/* Error Message Banner */}
        <AnimatePresence>
          {submissionError && (
            <motion.div
              className="max-w-4xl mx-auto px-4 md:px-8 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-red-500/10 border-2 border-red-500/50 rounded-2xl p-6 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-red-400 font-bold text-lg mb-1">Erro ao enviar formulário</h3>
                  <p className="text-white/70">{submissionError}</p>
                  <button
                    type="button"
                    onClick={() => setSubmissionError(null)}
                    className="mt-3 text-red-400 hover:text-red-300 text-sm font-semibold underline"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form sections */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 md:px-8 lg:pl-24">
          <div className="space-y-8">
            {formSections.map((section, index) => (
              <FormSection
                key={section.id}
                title={section.title}
                subtitle={section.subtitle}
                icon={section.icon}
                fields={section.fields}
                formData={formData}
                errors={errors}
                onChange={handleChange}
                index={index}
                isActive={index === currentSection}
                showMinorNotice={index === 0 && userIsMinor}
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
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF9933] to-[#FF7F00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
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
                  <h4 className="text-white font-semibold">Dúvidas sobre o tryout?</h4>
                  <p className="text-white/50 text-sm">Entre em contato conosco</p>
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
    </>
  )
}
