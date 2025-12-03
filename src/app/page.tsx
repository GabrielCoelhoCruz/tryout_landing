'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ChevronDown,
  ArrowRight,
  Sparkles,
  Play,
  Instagram, // Note: Deprecated icon but still functional
  Phone,
  MapPin,
  ChevronRight,
  Quote,
  Users,
  Star,
  CheckCircle,
} from 'lucide-react'

import { AnimatedH1 } from '@/components/animations'
import { AnimatedBackground, AnimatedCounter, GlowingButton, ScrollProgress } from '@/components/ui'
import { StormWeatherProvider, useStormWeather } from '@/context/StormWeatherContext'
import {
  STATS,
  BENEFITS,
  TEAMS,
  TESTIMONIALS,
  JOURNEY_STEPS,
  FAQS,
  TRYOUT_INFO,
} from '@/constants/landing-data'
import { SCROLL_THRESHOLD, SECTION_SPACING } from '@/constants/animation-config'

// ============================================
// SECTION HEADER COMPONENT
// ============================================
function SectionHeader({ 
  badge, 
  title, 
  subtitle, 
  light = false,
  center = true 
}: { 
  badge?: string
  title: string
  subtitle?: string
  light?: boolean
  center?: boolean
}) {
  return (
    <motion.div
      className={`${center ? 'text-center' : ''} mb-20`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      {badge && (
        <motion.span
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 ${
            light 
              ? 'bg-white/10 text-white/90 backdrop-blur-sm border border-white/10' 
              : 'bg-[#FF7F00]/10 text-[#FF7F00] border border-[#FF7F00]/20'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Sparkles className="w-4 h-4" />
          {badge}
        </motion.span>
      )}
      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-display tracking-tight mb-4 ${
        light ? 'text-white' : 'text-[#000c1f]'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl max-w-3xl ${center ? 'mx-auto' : ''} ${
          light ? 'text-white/70' : 'text-[#4A4A4A]'
        }`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

// ============================================
// MOBILE HEADER COMPONENT
// ============================================

const NAV_ITEMS = [
  { label: 'Sobre', id: 'sobre' },
  { label: 'Times', id: 'times' },
  { label: 'Jornada', id: 'jornada' },
  { label: 'Depoimentos', id: 'depoimentos' },
  { label: 'Tryout Info', id: 'tryout-info' },
  { label: 'FAQ', id: 'faq' },
]

function MobileHeader({ router }: { router: ReturnType<typeof useRouter> }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }
  
  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="mx-2 sm:mx-4 mt-2 sm:mt-4">
          <div className={`max-w-7xl mx-auto backdrop-blur-xl rounded-2xl border border-white/10 px-4 sm:px-6 py-3 transition-all duration-300 ${
            isScrolled ? 'bg-[#000c1f]/95' : 'bg-[#000c1f]/80'
          }`}>
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden ring-2 ring-[#FF7F00]/50 group-hover:ring-[#FF7F00] transition-all">
                  <Image
                    src="/logo/SkyHigh_Logo novo.png"
                    alt="SkyHigh AllStar"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 40px, 48px"
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
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="px-3 xl:px-4 py-2 text-white/70 hover:text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-all"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              
              {/* Right Side */}
              <div className="flex items-center gap-2 sm:gap-3">
                <GlowingButton
                  variant="primary"
                  className="!px-3 sm:!px-6 !py-2 sm:!py-2.5 !text-xs sm:!text-sm"
                  onClick={() => router.push('/formulario')}
                >
                  <span className="hidden sm:inline">Inscreva-se</span>
                  <span className="sm:hidden">Inscrição</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </GlowingButton>
                
                {/* Hamburger Menu Button */}
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  whileTap={{ scale: 0.95 }}
                  aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                >
                  <div className="relative w-5 h-4 flex flex-col justify-between">
                    <motion.span
                      className="absolute w-5 h-0.5 bg-white rounded-full"
                      animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="absolute w-5 h-0.5 bg-white rounded-full top-1/2 -translate-y-1/2"
                      animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="absolute w-5 h-0.5 bg-white rounded-full bottom-0"
                      animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel - WITH GRADIENT (RESTORED) */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-gradient-to-b from-[#000c1f] to-[#001a33] lg:hidden shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-[#FF7F00]/50">
                    <Image
                      src="/logo/SkyHigh_Logo novo.png"
                      alt="SkyHigh AllStar"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-display text-[#FF7F00] leading-none">SKYHIGH</h2>
                    <p className="text-[10px] font-display text-[#00BFFF] tracking-widest">ALLSTAR</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  whileTap={{ scale: 0.95 }}
                  aria-label="Fechar menu"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              {/* Navigation Links */}
              <nav className="px-4 py-6">
                <ul className="space-y-2">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all group"
                      >
                        {/* Badge with gradient (RESTORED) */}
                        <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#FF7F00]/20 to-[#00BFFF]/20 text-[#FF7F00] group-hover:from-[#FF7F00]/30 group-hover:to-[#00BFFF]/30 transition-colors">
                          <span className="text-sm font-bold">{String(index + 1).padStart(2, '0')}</span>
                        </span>
                        <span className="text-lg font-medium">{item.label}</span>
                        <ChevronRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              {/* CTA Section */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-[#000c1f]/80 backdrop-blur-sm">
                <motion.button
                  onClick={() => {
                    router.push('/formulario')
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#FF7F00] to-[#FF9933] text-white font-bold text-lg rounded-xl hover:shadow-[0_0_30px_rgba(255,127,0,0.4)] transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Inscreva-se no Tryout
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ============================================
// LANDING CONTENT COMPONENT (uses storm context)
// ============================================
function LandingContent() {
  const router = useRouter()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 0.5, 0])

  const [activeTeam, setActiveTeam] = useState(0)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const { setStorm, setIntensity } = useStormWeather()

  useEffect(() => {
    const selectedTeam = TEAMS[activeTeam]
    if (selectedTeam?.storm) {
      setStorm(selectedTeam.storm)
      setIntensity(0.8)
    }
  }, [activeTeam, setStorm, setIntensity])

  return (
    <main className="min-h-screen bg-[#FAFAFA] overflow-hidden">
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <MobileHeader router={router} />
      
      {/* ============================================ */}
      {/* HERO - WITH GRADIENT BACKGROUND (RESTORED) */}
      {/* ============================================ */}
      <section id="hero" ref={heroRef} className="relative min-h-[105vh] flex items-center justify-center overflow-hidden">
        <AnimatedBackground />

        {/* Main content */}
        <motion.div
          className="relative z-0 text-center px-4 pt-28 pb-16 pointer-events-auto"
          style={{
            y: heroY,
            opacity: heroOpacity,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7F00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7F00]" />
              </span>
              Inscrições Abertas para 2026
            </motion.div>
            
            {/* Main headline com AnimatedText */}
            <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display leading-[0.9] tracking-tight mb-6">
              <AnimatedH1
                variant="letter-reveal"
                className="block text-white"
                delay={0.3}
              >
                TRYOUT
              </AnimatedH1>
              <AnimatedH1
                variant="letter-reveal"
                className="block text-[#FF7F00]"
                delay={0.4}
              >
                2026
              </AnimatedH1>
            </div>
            
            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Seu talento merece ir mais alto.{' '}
              <span className="text-[#FF7F00] font-semibold">Venha elevar o nível com a gente.</span>
            </motion.p>
            
            {/* CTA Buttons - WITH GRADIENTS (RESTORED) */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <GlowingButton
                variant="primary"
                onClick={() => router.push('/formulario')}
              >
                Quero fazer o Tryout
                <ArrowRight className="w-5 h-5" />
              </GlowingButton>
              <GlowingButton
                variant="secondary"
                onClick={() => {
                  const section = document.getElementById('sobre')
                  section?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Play className="w-5 h-5" />
                Conhecer a equipe
              </GlowingButton>
            </motion.div>
          </motion.div>
          
          {/* Stats row */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-display mb-1" style={{ color: stat.color }}>
                    <AnimatedCounter value={stat.number} />
                  </div>
                  <div className="text-white/60 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/40"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>
      
      {/* ============================================ */}
      {/* BENEFITS - Clean White Section */}
      {/* ============================================ */}
      {/* Smooth transition from hero to benefits */}
      <div className="h-16 md:h-20 lg:h-24 bg-gradient-to-b from-[#000c1f] via-[#1a1a4a] to-white" />

      <section id="sobre" className={`relative z-10 ${SECTION_SPACING} bg-white scroll-mt-20`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader
            badge="Por que escolher a SkyHigh"
            title="FAÇA PARTE DE ALGO MAIOR"
            subtitle="Muito mais do que um time, somos uma família comprometida com a excelência e com o seu desenvolvimento pessoal."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="group relative w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative bg-[#FAFAFA] rounded-2xl p-8 h-full border border-gray-100 hover:border-[#FF7F00]/30 hover:shadow-xl hover:shadow-[#FF7F00]/5 transition-all duration-500 overflow-hidden group-hover:-translate-y-1">
                  {/* Icon - Solid background */}
                  <div 
                    className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: benefit.color }}
                  >
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="relative text-xl font-display text-[#000c1f] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="relative text-[#4A4A4A] leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ============================================ */}
      {/* TEAMS - Dark Section with Smooth Transition */}
      {/* ============================================ */}
      {/* Smooth transition from white to dark */}
      <div className="h-16 md:h-20 lg:h-24 bg-gradient-to-b from-white via-gray-100 to-[#000c1f]" />

      <section id="times" className={`relative z-10 ${SECTION_SPACING} bg-[#000c1f] scroll-mt-20 overflow-hidden`}>
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7F00]/5 rounded-full blur-[150px]" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <SectionHeader
            badge="Times 2026"
            title="ENCONTRE SEU TIME"
            subtitle="Temos vagas para diferentes níveis e categorias. Escolha o que mais combina com você."
            light
          />
          
          {/* Team selector tabs - Clean solid */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {TEAMS.map((team, index) => (
              <motion.button
                key={team.name}
                onClick={() => setActiveTeam(index)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTeam === index
                    ? 'bg-[#FF7F00] text-white shadow-lg shadow-[#FF7F00]/20'
                    : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white border border-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {team.name}
              </motion.button>
            ))}
          </div>
          
          {/* Active team card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTeam}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
                {/* Team info */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border"
                      style={{
                        borderColor: `${TEAMS[activeTeam].color}40`,
                        color: TEAMS[activeTeam].color,
                        backgroundColor: `${TEAMS[activeTeam].color}10`
                      }}
                    >
                      {TEAMS[activeTeam].level}
                    </span>
                    <span className="text-white/50 text-sm flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {TEAMS[activeTeam].category}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-display text-white mb-4">
                    {TEAMS[activeTeam].name}
                  </h3>

                  <p className="text-white/60 text-lg leading-relaxed mb-6">
                    {TEAMS[activeTeam].description}
                  </p>

                  {/* Requirements */}
                  <div className="space-y-2 mb-8">
                    {TEAMS[activeTeam].requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-white/50">
                        <ChevronRight className="w-4 h-4" style={{ color: TEAMS[activeTeam].color }} />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>

                  <GlowingButton
                    variant="primary"
                    onClick={() => router.push('/formulario')}
                  >
                    Inscrever-se para {TEAMS[activeTeam].name}
                    <ArrowRight className="w-5 h-5" />
                  </GlowingButton>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      
      {/* ============================================ */}
      {/* JOURNEY - Clean Light Section with Transition */}
      {/* ============================================ */}
      {/* Smooth transition from dark to light */}
      <div className="h-16 md:h-20 lg:h-24 bg-gradient-to-b from-[#000c1f] via-gray-800 to-[#FAFAFA]" />

      <section id="jornada" className={`relative z-10 ${SECTION_SPACING} bg-[#FAFAFA] scroll-mt-20`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader
            badge="Sua Jornada"
            title="DO TRYOUT AO PÓDIO"
            subtitle="Veja o caminho que você vai percorrer conosco, do primeiro passo às grandes conquistas."
          />
          
          {/* Desktop timeline - Clean */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Progress line - Solid color */}
              <div className="absolute top-24 left-0 right-0 h-1 bg-gray-200 rounded-full" />
              <motion.div
                className="absolute top-24 left-0 h-1 bg-[#FF7F00] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              />
              
              <div className="grid grid-cols-6 gap-4">
                {JOURNEY_STEPS.map((step, index) => {
                  const Icon = step.icon
                  const isOdd = index % 2 === 0
                  return (
                    <motion.div
                      key={step.number}
                      className="flex flex-col items-center text-center"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                    >
                      {/* Step number */}
                      <div className="text-sm font-bold text-[#FF7F00] mb-3">
                        {step.number}
                      </div>
                      
                      {/* Icon circle - Solid colors */}
                      <div 
                        className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg text-white"
                        style={{ backgroundColor: isOdd ? '#FF7F00' : '#00BFFF' }}
                      >
                        <Icon className="w-9 h-9" strokeWidth={2} />
                      </div>
                      
                      {/* Content */}
                      <h4 className="font-display text-lg text-[#000c1f] mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-[#4A4A4A]">
                        {step.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Mobile timeline - Clean */}
          <div className="md:hidden space-y-4">
            {JOURNEY_STEPS.map((step, index) => {
              const Icon = step.icon
              const isOdd = index % 2 === 0
              return (
                <motion.div
                  key={step.number}
                  className="flex gap-4 items-start bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div 
                    className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: isOdd ? '#FF7F00' : '#00BFFF' }}
                  >
                    <Icon className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[#FF7F00] mb-1">PASSO {step.number}</div>
                    <h4 className="font-display text-lg text-[#000c1f]">{step.title}</h4>
                    <p className="text-sm text-[#4A4A4A]">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* ============================================ */}
      {/* TESTIMONIALS - Dark Section with Transition */}
      {/* ============================================ */}
      {/* Smooth transition from light to dark */}
      <div className="h-16 md:h-20 lg:h-24 bg-gradient-to-b from-[#FAFAFA] via-gray-200 to-[#000c1f]" />

      <section id="depoimentos" className={`relative z-10 ${SECTION_SPACING} bg-[#000c1f] overflow-hidden scroll-mt-20`}>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#FF7F00]/10 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <SectionHeader
            badge="Depoimentos"
            title="HISTÓRIAS DE SUCESSO"
            subtitle="Veja o que nossos atletas têm a dizer sobre a experiência na equipe."
            light
          />
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#FF7F00]/30 transition-all duration-300 h-full">
                  {/* Quote icon */}
                  <Quote className="w-10 h-10 text-[#FF7F00]/30 mb-4" />
                  
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF7F00] text-[#FF7F00]" />
                    ))}
                  </div>
                  
                  {/* Quote text */}
                  <p className="text-white/80 leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  
                  {/* Author - WITH GRADIENT AVATAR (RESTORED) */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7F00] to-[#00BFFF] flex items-center justify-center text-white font-display text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-[#FF7F00]">{testimonial.role}</div>
                      <div className="text-xs text-white/50">{testimonial.tenure}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ============================================ */}
      {/* TRYOUT INFO - Clean White Section with Transition */}
      {/* ============================================ */}
      {/* Smooth transition from dark to light */}
      <div className="h-16 md:h-20 lg:h-24 bg-gradient-to-b from-[#000c1f] via-gray-800 to-white" />

      <section id="tryout-info" className={`relative z-10 ${SECTION_SPACING} bg-white scroll-mt-20`}>
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <SectionHeader
            badge="Informações"
            title="DETALHES DO TRYOUT"
            subtitle="Tudo que você precisa saber para participar."
          />
          
          {/* Info cards - Clean */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {TRYOUT_INFO.map((item, index) => (
              <motion.div
                key={item.label}
                className="bg-[#FAFAFA] rounded-2xl p-5 border border-gray-100 hover:border-[#FF7F00]/30 hover:shadow-lg transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FF7F00]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#FF7F00]" />
                  </div>
                </div>
                <div className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                <div className="font-display text-lg text-[#000c1f]">
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* What to bring and visual element */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="font-display text-lg text-[#000c1f] mb-4 text-center">O que levar</h4>
              <ul className="space-y-3 text-[#4A4A4A]">
                {['Roupa esportiva confortável', 'Tênis apropriado', 'Documento de identidade', 'Água e lanche leve', 'Comprovante de pagamento (R$ 50)'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF7F00]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-[#FF7F00]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              className="bg-[#000c1f] rounded-2xl p-6 flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-display text-white mb-2">TRYOUT 2026</h3>
              <p className="text-white/60 mb-1">Investimento: <span className="text-[#FF7F00] font-bold">R$ 50,00</span></p>
              <p className="text-white/40 text-sm mb-4">Estacionamento no local</p>
              <div className="flex items-center gap-2 text-[#FF7F00]">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Vagas ilimitadas</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* ============================================ */}
      {/* FAQ - Clean Light Section */}
      {/* ============================================ */}
      <section id="faq" className={`relative z-10 ${SECTION_SPACING} !pt-22 md:!pt-24 lg:!pt-28 !pb-24 md:!pb-28 lg:!pb-40 bg-[#FAFAFA] scroll-mt-20`}>
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <SectionHeader
            badge="Dúvidas"
            title="PERGUNTAS FREQUENTES"
            subtitle="Tire suas dúvidas sobre o tryout e a equipe."
          />
          
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    activeFaq === index
                      ? 'bg-gradient-to-r from-[#FF7F00]/10 to-[#00BFFF]/10 border-2 border-[#FF7F00]/30'
                      : 'bg-white hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={`font-display text-lg ${
                      activeFaq === index ? 'text-[#FF7F00]' : 'text-[#000c1f]'
                    }`}>
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: activeFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 ${
                        activeFaq === index ? 'text-[#FF7F00]' : 'text-[#4A4A4A]'
                      }`} />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-[#4A4A4A] leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ============================================ */}
      {/* FINAL CTA - Gradient Section */}
      {/* ============================================ */}
      <section id="cta" className="relative z-10 py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#FF7F00] via-[#FF9933] to-[#00BFFF] overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white leading-tight mb-6">
              PRONTO PARA ELEVAR
              <br />
              O NÍVEL EM 2026?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10">
              As vagas são limitadas. Garanta sua inscrição agora e faça parte da nossa história de conquistas.
            </p>
            
            <motion.button
              onClick={() => router.push('/formulario')}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#FF7F00] font-bold text-lg rounded-full hover:bg-[#000c1f] hover:text-white transition-all duration-300 shadow-2xl shadow-black/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Preencher Formulário do Tryout
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
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
                <a href="https://wa.me/5511913311920" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-[#FF7F00] transition-colors">
                  <Phone className="w-4 h-4" />
                  (11) 91331-1920
                </a>
                <a href="https://instagram.com/skyhigh.allstar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-[#FF7F00] transition-colors">
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
                  Ginásio SkyHigh All Star<br />
                  Centro Esportivo Tietê<br />
                  Av. Santos Dumont, 843 - Luz<br />
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
              © {new Date().getFullYear()} SkyHigh AllStar. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link>
              <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Progress Indicator */}
      <ScrollProgress
        sections={[
          { id: 'hero', label: 'Início', color: '#FF7F00' },
          { id: 'sobre', label: 'Sobre', color: '#00BFFF' },
          { id: 'times', label: 'Times', color: '#9D00FF' },
          { id: 'jornada', label: 'Jornada', color: '#FF8C69' },
          { id: 'depoimentos', label: 'Depoimentos', color: '#FF7F00' },
          { id: 'tryout-info', label: 'Tryout', color: '#00BFFF' },
          { id: 'faq', label: 'FAQ', color: '#1E90FF' },
          { id: 'cta', label: 'Inscreva-se', color: '#FFD700' },
        ]}
        showTopBar={true}
        showSideDots={true}
      />
    </main>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function Home() {
  return (
    <StormWeatherProvider defaultStorm="mixed" defaultIntensity={0.6}>
      <LandingContent />
    </StormWeatherProvider>
  )
}
