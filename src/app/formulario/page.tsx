'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  User,
  Trophy,
  Calendar,
  Heart,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Phone,
  Instagram,
  MapPin,
  Send,
  Clock,
  Star
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { MagneticButton } from '@/components/ui'

// ============================================
// ANIMATED BACKGROUND (matching landing page)
// ============================================
const PARTICLE_POSITIONS = [
  { left: 5, top: 12 },
  { left: 15, top: 78 },
  { left: 25, top: 34 },
  { left: 35, top: 89 },
  { left: 45, top: 23 },
  { left: 55, top: 67 },
  { left: 65, top: 45 },
  { left: 75, top: 91 },
  { left: 85, top: 8 },
  { left: 95, top: 56 },
  { left: 10, top: 42 },
  { left: 20, top: 73 },
  { left: 30, top: 19 },
  { left: 40, top: 85 },
]

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient base - Deep storm atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A2A] via-[#0F1A3D] to-[#0A1B4D]" />

      {/* Animated gradient orbs */}
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

      {/* Grid pattern */}
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

      {/* Floating particles */}
      {PARTICLE_POSITIONS.map((pos, i) => (
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

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// ============================================
// GLOWING BUTTON COMPONENT
// ============================================
function GlowingButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  type?: 'button' | 'submit'
  disabled?: boolean
}) {
  const baseStyles = "relative group px-8 py-4 font-bold text-lg rounded-full transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-gradient-to-r from-[#FF7F00] to-[#FF9933] text-white hover:shadow-[0_0_40px_rgba(255,127,0,0.5)]",
    secondary: "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/40",
    ghost: "bg-transparent text-white hover:bg-white/10"
  }

  return (
    <MagneticButton
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      attractRadius={100}
      strength={0.25}
    >
      <span className="relative z-10 flex items-center gap-2 justify-center">
        {children}
      </span>
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#FF9933] to-[#FF7F00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}
    </MagneticButton>
  )
}

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
            <Link href="/landing-improvedOpus" className="flex items-center gap-2 sm:gap-3 group">
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
                href="/landing-improvedOpus"
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
interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea' | 'select' | 'checkbox' | 'checkbox-group'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

interface FormSectionProps {
  title: string
  subtitle?: string
  icon: React.ReactNode
  fields: FormField[]
  formData: Record<string, any>
  errors: Record<string, string>
  onChange: (name: string, value: any) => void
  index: number
  isActive: boolean
}

function FormSection({ title, subtitle, icon, fields, formData, errors, onChange, index, isActive }: FormSectionProps) {
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
                  value={formData[field.name] || ''}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FF7F00] focus:ring-[#FF7F00]/20 transition-all rounded-xl ${
                    errors[field.name] ? 'border-red-500' : ''
                  }`}
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
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
                    checked={formData[field.name] || false}
                    onChange={(e) => onChange(field.name, e.target.checked)}
                  />
                  <label htmlFor={field.name} className="text-white/70 text-sm cursor-pointer flex-1">
                    {field.label}
                  </label>
                </div>
              ) : field.type === 'checkbox-group' ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {field.options?.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                        formData[field.name]?.[option.value]
                          ? 'bg-[#FF7F00]/10 border-[#FF7F00]/50 text-white'
                          : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData[field.name]?.[option.value] || false}
                        onChange={(e) => {
                          const currentValues = formData[field.name] || {}
                          onChange(field.name, {
                            ...currentValues,
                            [option.value]: e.target.checked,
                          })
                        }}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        formData[field.name]?.[option.value]
                          ? 'bg-[#FF7F00] border-[#FF7F00]'
                          : 'border-white/30'
                      }`}>
                        {formData[field.name]?.[option.value] && (
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
                  ))}
                </div>
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
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
          <Link href="/landing-improvedOpus">
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
// MAIN PAGE COMPONENT
// ============================================
export default function FormularioPage() {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const formSections = [
    {
      id: 'dados-pessoais',
      title: 'Dados Pessoais',
      subtitle: 'Informações básicas do atleta',
      icon: <User className="w-6 h-6 text-white" />,
      fields: [
        { name: 'nome-completo', label: 'Nome Completo', type: 'text' as const, required: true, placeholder: 'Seu nome completo' },
        { name: 'data-nascimento', label: 'Data de Nascimento', type: 'date' as const, required: true },
        { name: 'idade', label: 'Idade', type: 'number' as const, required: true, placeholder: '18' },
        { name: 'genero', label: 'Gênero', type: 'select' as const, required: true, options: [
          { value: 'feminino', label: 'Feminino' },
          { value: 'masculino', label: 'Masculino' },
          { value: 'outro', label: 'Outro' },
        ]},
        { name: 'telefone', label: 'Telefone/WhatsApp', type: 'tel' as const, required: true, placeholder: '(11) 99999-9999' },
        { name: 'email', label: 'E-mail', type: 'email' as const, required: true, placeholder: 'seu@email.com' },
        { name: 'nome-responsavel', label: 'Nome do Responsável (se menor de idade)', type: 'text' as const, placeholder: 'Nome do responsável' },
        { name: 'contato-responsavel', label: 'Contato do Responsável', type: 'tel' as const, placeholder: '(11) 99999-9999' },
      ],
    },
    {
      id: 'experiencia',
      title: 'Experiência Esportiva',
      subtitle: 'Seu histórico e habilidades',
      icon: <Trophy className="w-6 h-6 text-white" />,
      fields: [
        { name: 'pratica-cheerleading', label: 'Já praticou cheerleading?', type: 'select' as const, required: true, options: [
          { value: 'sim', label: 'Sim' },
          { value: 'nao', label: 'Não' },
        ]},
        { name: 'tempo-experiencia', label: 'Tempo de experiência em cheerleading', type: 'select' as const, required: true, options: [
          { value: 'menos-6-meses', label: 'Menos de 6 meses' },
          { value: '6-12-meses', label: '6 a 12 meses' },
          { value: '1-2-anos', label: '1 a 2 anos' },
          { value: '2-anos-mais', label: 'Mais de 2 anos' },
        ]},
        { name: 'equipe-anterior', label: 'Equipe anterior (se aplicável)', type: 'text' as const, placeholder: 'Nome da equipe' },
        { name: 'experiencia-ginastica', label: 'Tem experiência em ginástica/tumbling/dança?', type: 'select' as const, options: [
          { value: 'ginastica', label: 'Ginástica Artística' },
          { value: 'tumbling', label: 'Tumbling' },
          { value: 'danca', label: 'Dança' },
          { value: 'nenhuma', label: 'Nenhuma' },
        ]},
        { name: 'posicao-interesse', label: 'Posição de interesse', type: 'checkbox-group' as const, options: [
          { value: 'base', label: 'Base' },
          { value: 'flyer', label: 'Flyer' },
          { value: 'back', label: 'Back' },
        ]},
        { name: 'nivel-interesse', label: 'Nível de interesse', type: 'checkbox-group' as const, required: true, options: [
          { value: 'n2', label: 'N2 (Nível 2)' },
          { value: 'n3', label: 'N3 (Nível 3)' },
        ]},
        { name: 'nivel-habilidades', label: 'Nível atual de habilidades', type: 'select' as const, required: true, options: [
          { value: 'basico', label: 'Básico' },
          { value: 'intermediario', label: 'Intermediário' },
          { value: 'avancado', label: 'Avançado' },
        ]},
      ],
    },
    {
      id: 'disponibilidade',
      title: 'Disponibilidade',
      subtitle: 'Horários e logística',
      icon: <Calendar className="w-6 h-6 text-white" />,
      fields: [
        { name: 'dias-disponiveis', label: 'Dias disponíveis para treinar', type: 'checkbox-group' as const, required: true, options: [
          { value: 'segunda', label: 'Segunda' },
          { value: 'terca', label: 'Terça' },
          { value: 'quarta', label: 'Quarta' },
          { value: 'quinta', label: 'Quinta' },
          { value: 'sexta', label: 'Sexta' },
          { value: 'sabado', label: 'Sábado' },
          { value: 'domingo', label: 'Domingo' },
        ]},
        { name: 'periodo-preferencia', label: 'Período de preferência', type: 'select' as const, options: [
          { value: 'manha', label: 'Manhã' },
          { value: 'tarde', label: 'Tarde' },
          { value: 'noite', label: 'Noite' },
        ]},
        { name: 'participa-campeonatos', label: 'Pode participar de campeonatos fora da cidade/estado?', type: 'select' as const, required: true, options: [
          { value: 'sim', label: 'Sim' },
          { value: 'nao', label: 'Não' },
          { value: 'talvez', label: 'Talvez, dependendo da data' },
        ]},
        { name: 'outros-esportes', label: 'Pratica outros esportes? Quais?', type: 'text' as const, placeholder: 'Exemplo: Natação, Futebol...' },
      ],
    },
    {
      id: 'saude',
      title: 'Saúde e Autorização',
      subtitle: 'Informações importantes',
      icon: <Heart className="w-6 h-6 text-white" />,
      fields: [
        { name: 'condicoes-medicas', label: 'Condições médicas relevantes (alergias, lesões, etc.)', type: 'textarea' as const, placeholder: 'Descreva qualquer condição que precisamos saber...' },
        { name: 'medicacoes', label: 'Uso de medicações contínuas', type: 'textarea' as const, placeholder: 'Liste as medicações, se houver...' },
        { name: 'autorizacao-responsavel', label: 'Confirmo que o responsável está ciente (para menores de 18 anos)', type: 'checkbox' as const, required: true },
        { name: 'aceite-termos', label: 'Li e aceito o termo de responsabilidade', type: 'checkbox' as const, required: true },
      ],
    },
  ]

  // Update current section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = formSections.map((_, i) => document.getElementById(`section-${i}`))
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop
          const bottom = top + section.offsetHeight
          if (scrollPosition >= top && scrollPosition < bottom) {
            setCurrentSection(index)
          }
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [formSections.length])

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.required && !formData[field.name]) {
          newErrors[field.name] = 'Este campo é obrigatório'
        }
        if (field.type === 'email' && formData[field.name]) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(formData[field.name])) {
            newErrors[field.name] = 'Email inválido'
          }
        }
      })
    })
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Scroll to first error
      const firstErrorField = Object.keys(newErrors)[0]
      const element = document.querySelector(`[name="${firstErrorField}"]`)
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSuccess(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <>
        <AnimatedBackground />
        <FloatingHeader />
        <SuccessState />
      </>
    )
  }

  return (
    <>
      <AnimatedBackground />
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
