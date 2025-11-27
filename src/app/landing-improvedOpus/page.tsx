'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ChevronDown,
  Star,
  Trophy,
  Users,
  Calendar,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Heart,
  Play,
  Instagram,
  Phone,
  MapPin,
  ChevronRight,
  Quote
} from 'lucide-react'

// Novos componentes de animação
import { AnimatedH1, AnimatedText, MixedStormParticles } from '@/components/animations'
import { MagneticButton, GlowingMagneticButton, ScrollProgress } from '@/components/ui'
import { StormWeatherProvider, useStormWeather } from '@/context/StormWeatherContext'
import type { StormType } from '@/context/StormWeatherContext'

// ============================================
// ANIMATED BACKGROUND COMPONENT
// ============================================

// Deterministic particle positions to avoid hydration mismatch
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
  { left: 50, top: 31 },
  { left: 60, top: 62 },
  { left: 70, top: 15 },
  { left: 80, top: 48 },
  { left: 90, top: 77 },
  { left: 3, top: 95 },
]

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient base - Deep storm atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A2A] via-[#1E3A8A] to-[#0A1B4D]" />

      {/* Animated gradient orbs - Storm energy cores */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-[#FF7F00]/20 via-transparent to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-[#00BFFF]/15 via-transparent to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern overlay - Electric field */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Storm Particles - Mixed weather system (preview de todos os storms) */}
      <MixedStormParticles intensity={0.25} className="opacity-60" />

      {/* Floating particles - using deterministic positions (mantido para camadas) */}
      {PARTICLE_POSITIONS.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + (i % 5) * 0.8,
            repeat: Infinity,
            delay: (i % 10) * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// GLOWING BUTTON COMPONENT (Enhanced with Magnetic Effect)
// ============================================
function GlowingButton({
  children,
  onClick,
  className = '',
  variant = 'primary'
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}) {
  const baseStyles = "relative group px-8 py-4 font-bold text-lg rounded-full transition-all duration-300 overflow-hidden"

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
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#FF9933] to-[#FF7F00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}
    </MagneticButton>
  )
}

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
      className={`${center ? 'text-center' : ''} mb-16`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      {badge && (
        <motion.span
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
            light 
              ? 'bg-white/10 text-white/90 backdrop-blur-sm border border-white/10' 
              : 'bg-gradient-to-r from-[#FF7F00]/10 to-[#FF9933]/10 text-[#FF7F00] border border-[#FF7F00]/20'
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
        light ? 'text-white' : 'text-[#0A0A2A]'
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
// ANIMATED COUNTER COMPONENT
// ============================================
function AnimatedCounter({ value, suffix = '' }: { value: string, suffix?: string }) {
  const [count, setCount] = useState(0)
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0
  const hasPlus = value.includes('+')
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = numericValue / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [numericValue])
  
  return (
    <span>
      {count}{hasPlus ? '+' : ''}{suffix}
    </span>
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

  // Storm weather context for dynamic background
  const { setStorm, setIntensity } = useStormWeather()
  
  // Data
  const stats = [
    { number: '15+', label: 'Campeonatos', icon: Trophy, color: '#FF7F00' },
    { number: '8', label: 'Anos de Equipe', icon: Calendar, color: '#00BFFF' },
    { number: '100+', label: 'Atletas Formados', icon: Users, color: '#FF8C69' },
    { number: '25+', label: 'Pódios', icon: Star, color: '#2563EB' },
  ]
  
  const benefits = [
    {
      icon: Target,
      title: 'Treinamento de Elite',
      description: 'Metodologia comprovada com técnicos certificados e acompanhamento individualizado para desenvolvimento técnico e pessoal.',
      gradient: 'from-[#FF7F00] to-[#FF9933]',
    },
    {
      icon: Zap,
      title: 'Performance de Alto Nível',
      description: 'Programa focado em excelência técnica, condicionamento físico e preparação mental para competições nacionais e internacionais.',
      gradient: 'from-[#00BFFF] to-[#33CCFF]',
    },
    {
      icon: Heart,
      title: 'Espírito de Equipe',
      description: 'Ambiente de união, respeito e crescimento coletivo. Aqui você constrói amizades para toda a vida enquanto evolui no esporte.',
      gradient: 'from-[#FF8C69] to-[#FFA07A]',
    },
    {
      icon: Trophy,
      title: 'Conquistas Reais',
      description: 'Histórico comprovado de pódios em campeonatos estaduais, nacionais e internacionais. Faça parte de uma equipe vencedora.',
      gradient: 'from-[#2563EB] to-[#3B82F6]',
    },
  ]

  const teams = useMemo(() => [
    {
      name: 'N2 Coed',
      level: 'Nível 2',
      category: 'Coed',
      description: 'Time misto de nível intermediário, ideal para atletas com experiência prévia que buscam evolução técnica.',
      requirements: ['Idade: 14-25 anos', 'Experiência mínima: 1 ano em cheerleading', 'Disponibilidade: 3x por semana', 'Habilidades: Stunts básicos, tumbling iniciante'],
      vacancies: 5,
      color: '#FF7F00',
      storm: 'fire' as StormType,
    },
    {
      name: 'N3 Coed',
      level: 'Nível 3',
      category: 'Coed',
      description: 'Time misto avançado com foco em rotinas complexas e competições de alto nível.',
      requirements: ['Idade: 15-25 anos', 'Experiência mínima: 2 anos em cheerleading', 'Disponibilidade: 4x por semana', 'Habilidades: Stunts intermediários, tumbling avançado'],
      vacancies: 3,
      color: '#00BFFF',
      storm: 'rain' as StormType,
    },
    {
      name: 'N2 All Girl',
      level: 'Nível 2',
      category: 'All Girl',
      description: 'Time feminino de nível intermediário, com foco em técnica, sincronia e performance.',
      requirements: ['Idade: 14-25 anos (feminino)', 'Experiência mínima: 1 ano em cheerleading', 'Disponibilidade: 3x por semana', 'Habilidades: Stunts femininos, tumbling básico'],
      vacancies: 6,
      color: '#FF8C69',
      storm: 'hail' as StormType,
    },
    {
      name: 'N3 All Girl',
      level: 'Nível 3',
      category: 'All Girl',
      description: 'Time feminino avançado, preparado para competir nas maiores competições do país.',
      requirements: ['Idade: 15-25 anos (feminino)', 'Experiência mínima: 2 anos em cheerleading', 'Disponibilidade: 4x por semana', 'Habilidades: Stunts avançados, tumbling intermediário'],
      vacancies: 4,
      color: '#2563EB',
      storm: 'thunder' as StormType,
    },
  ], [])

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Flyer - N2 All Girl',
      tenure: '2 anos na equipe',
      text: 'Entrar para esta equipe mudou minha vida. O nível de comprometimento e a qualidade do treinamento são incomparáveis. Conquistei meu primeiro pódio nacional aqui!',
      rating: 5,
    },
    {
      name: 'João Santos',
      role: 'Base - N3 Coed',
      tenure: '3 anos na equipe',
      text: 'A evolução técnica que tive aqui foi incrível. Além de melhorar no cheerleading, ganhei uma segunda família e aprendi valores que levo para toda a vida.',
      rating: 5,
    },
    {
      name: 'Ana Costa',
      role: 'Back - N3 All Girl',
      tenure: '1.5 ano na equipe',
      text: 'Nunca pensei que chegaria tão longe. Com o apoio dos técnicos e da equipe, conquistei habilidades que achava impossíveis!',
      rating: 5,
    },
  ]
  
  const journeySteps = [
    { number: '01', title: 'Inscrição', description: 'Preencha o formulário online', icon: '📝' },
    { number: '02', title: 'Tryout', description: 'Demonstre suas habilidades', icon: '🎯' },
    { number: '03', title: 'Resultado', description: 'Acompanhe a seleção', icon: '✅' },
    { number: '04', title: 'Integração', description: 'Conheça a equipe', icon: '🤝' },
    { number: '05', title: 'Treinos', description: 'Prepare-se para competir', icon: '💪' },
    { number: '06', title: 'Campeonatos', description: 'Represente a equipe', icon: '🏆' },
  ]
  
  const faqs = [
    {
      question: 'Preciso ter experiência prévia em cheerleading?',
      answer: 'Recomendamos experiência mínima de 6 meses em cheerleading ou ginástica artística. Para times N3, a exigência é de pelo menos 2 anos de experiência.',
    },
    {
      question: 'Tem custo para participar do tryout?',
      answer: 'Sim, o investimento para participar do tryout é de R$ 50,00. Após a aprovação, há mensalidade para manutenção dos treinos, uniformes e participação em campeonatos.',
    },
    {
      question: 'Qual a frequência dos treinos?',
      answer: 'Times N2 treinam 3 vezes por semana (2h cada). Times N3 treinam 4 vezes por semana (2h30 cada).',
    },
    {
      question: 'Como funciona o processo de seleção?',
      answer: 'Durante o tryout, avaliamos habilidades técnicas (tumbling, stunts, jumps), condicionamento físico, atitude e trabalho em equipe.',
    },
    {
      question: 'Menores de idade podem participar?',
      answer: 'Sim! Aceitamos atletas a partir de 14 anos. Menores de 18 anos precisam de autorização dos responsáveis.',
    },
  ]
  
  const tryoutInfo = {
    date: '15 de Março, 2026',
    time: '9h às 17h',
    location: 'Ginásio SkyHigh All Star - Centro Esportivo Tietê',
    address: 'Av. Santos Dumont, 843 - Luz, São Paulo/SP',
    metro: 'Próximo à estação Armênia (Linha 1 - Azul)',
    parking: 'Estacionamento no local',
    price: 'R$ 50,00',
  }

  // Effect: Update storm when active team changes
  useEffect(() => {
    const selectedTeam = teams[activeTeam]
    if (selectedTeam?.storm) {
      setStorm(selectedTeam.storm)
      setIntensity(0.8) // Increase intensity for dramatic effect
    }
  }, [activeTeam, setStorm, setIntensity, teams])

  return (
    <main className="min-h-screen bg-[#FAFAFA] overflow-hidden">
      {/* ============================================ */}
      {/* HEADER - Floating Glass Navigation */}
      {/* ============================================ */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="mx-4 mt-4">
          <div className="max-w-7xl mx-auto bg-[#0A0A2A]/80 backdrop-blur-xl rounded-2xl border border-white/10 px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-2 ring-[#FF7F00]/50 group-hover:ring-[#FF7F00] transition-all">
                  <Image
                    src="/logo/logo-shield.jpg"
                    alt="SkyHigh AllStar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-display text-[#FF7F00] leading-none tracking-wider">
                    SKYHIGH
                  </h1>
                  <p className="text-xs font-display text-[#00BFFF] leading-none tracking-widest">
                    ALLSTAR
                  </p>
                </div>
              </Link>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {['Sobre', 'Times', 'Jornada', 'FAQ'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      const section = document.getElementById(item.toLowerCase())
                      section?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="px-4 py-2 text-white/70 hover:text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-all"
                  >
                    {item}
                  </button>
                ))}
              </nav>
              
              {/* CTA */}
              <GlowingButton
                variant="primary"
                className="!px-6 !py-2.5 !text-sm"
                onClick={() => router.push('/formulario')}
              >
                Inscreva-se
                <ArrowRight className="w-4 h-4" />
              </GlowingButton>
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* ============================================ */}
      {/* HERO - Immersive Full-Screen Experience */}
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
                variant="gradient-shift"
                className="block"
                gradientColors={['#FF7F00', '#FF9933', '#00BFFF']}
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
              Faça parte da equipe que está{' '}
              <span className="text-[#FF7F00] font-semibold">elevando o nível</span>{' '}
              do cheerleading brasileiro.
            </motion.p>
            
            {/* CTA Buttons */}
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
            {stats.map((stat, index) => (
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
      {/* BENEFITS - Why Join Section */}
      {/* ============================================ */}
      <section id="sobre" className="relative z-10 py-24 md:py-32 bg-[#FAFAFA] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader
            badge="Por que escolher a SkyHigh"
            title="FAÇA PARTE DE ALGO MAIOR"
            subtitle="Muito mais do que um time, somos uma família comprometida com a excelência e com o seu desenvolvimento pessoal."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative bg-white rounded-3xl p-8 h-full border border-gray-100 hover:border-transparent hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden group-hover:-translate-y-2">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="relative text-xl font-display text-[#0A0A2A] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="relative text-[#4A4A4A] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ============================================ */}
      {/* TEAMS - Interactive Team Showcase */}
      {/* ============================================ */}
      <section id="times" className="relative z-10 py-24 md:py-32 bg-[#0A0A2A] scroll-mt-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#FF7F00]/10 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[#00BFFF]/10 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <SectionHeader
            badge="Times 2026"
            title="ENCONTRE SEU TIME"
            subtitle="Temos vagas para diferentes níveis e categorias. Escolha o que mais combina com você."
            light
          />
          
          {/* Team selector tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {teams.map((team, index) => (
              <motion.button
                key={team.name}
                onClick={() => setActiveTeam(index)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTeam === index
                    ? 'bg-gradient-to-r from-[#FF7F00] to-[#FF9933] text-white shadow-lg shadow-[#FF7F00]/30'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
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
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Team info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span 
                        className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={{ backgroundColor: `${teams[activeTeam].color}20`, color: teams[activeTeam].color }}
                      >
                        {teams[activeTeam].level}
                      </span>
                      <span className="text-white/50 text-sm flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {teams[activeTeam].category}
                      </span>
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl font-display text-white mb-4">
                      {teams[activeTeam].name}
                    </h3>
                    
                    <p className="text-white/70 text-lg leading-relaxed mb-6">
                      {teams[activeTeam].description}
                    </p>
                    
                    {/* Requirements */}
                    <div className="space-y-2 mb-8">
                      {teams[activeTeam].requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-white/60">
                          <ChevronRight className="w-4 h-4" style={{ color: teams[activeTeam].color }} />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                    
                    <GlowingButton
                      variant="primary"
                      onClick={() => router.push('/formulario')}
                    >
                      Inscrever-se para {teams[activeTeam].name}
                      <ArrowRight className="w-5 h-5" />
                    </GlowingButton>
                  </div>
                  
                  {/* Vacancies indicator */}
                  <div className="md:w-48 flex md:flex-col items-center justify-center gap-4 p-6 bg-white/5 rounded-2xl">
                    <div 
                      className="text-6xl md:text-7xl font-display"
                      style={{ color: teams[activeTeam].color }}
                    >
                      {teams[activeTeam].vacancies}
                    </div>
                    <div className="text-white/60 text-center">
                      <div className="font-semibold text-white">vagas</div>
                      <div className="text-sm">disponíveis</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      
      {/* ============================================ */}
      {/* JOURNEY - Visual Timeline */}
      {/* ============================================ */}
      <section id="jornada" className="relative z-10 py-24 md:py-32 bg-gradient-to-b from-[#FAFAFA] to-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader
            badge="Sua Jornada"
            title="DO TRYOUT AO PÓDIO"
            subtitle="Veja o caminho que você vai percorrer conosco, do primeiro passo às grandes conquistas."
          />
          
          {/* Desktop timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Progress line */}
              <div className="absolute top-24 left-0 right-0 h-1 bg-gray-200 rounded-full" />
              <motion.div
                className="absolute top-24 left-0 h-1 bg-gradient-to-r from-[#FF7F00] via-[#00BFFF] to-[#2563EB] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              />
              
              <div className="grid grid-cols-6 gap-4">
                {journeySteps.map((step, index) => (
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
                    
                    {/* Icon circle */}
                    <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#FF7F00] to-[#00BFFF] flex items-center justify-center text-4xl mb-6 shadow-xl shadow-[#FF7F00]/20">
                      {step.icon}
                    </div>
                    
                    {/* Content */}
                    <h4 className="font-display text-lg text-[#0A0A2A] mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-[#4A4A4A]">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile timeline */}
          <div className="md:hidden space-y-4">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="flex gap-4 items-start bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF7F00] to-[#00BFFF] flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-[#FF7F00] mb-1">PASSO {step.number}</div>
                  <h4 className="font-display text-lg text-[#0A0A2A]">{step.title}</h4>
                  <p className="text-sm text-[#4A4A4A]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ============================================ */}
      {/* TESTIMONIALS - Social Proof */}
      {/* ============================================ */}
      <section className="relative z-10 py-24 md:py-32 bg-[#0A0A2A] overflow-hidden">
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
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
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
                  
                  {/* Author */}
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
      {/* TRYOUT INFO - Key Details */}
      {/* ============================================ */}
      <section className="relative z-10 py-24 md:py-32 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Info cards */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeader
                badge="Informações"
                title="DETALHES DO TRYOUT"
                subtitle="Tudo que você precisa saber para participar."
                center={false}
              />
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Calendar, label: 'Data', value: tryoutInfo.date },
                  { icon: Zap, label: 'Horário', value: tryoutInfo.time },
                  { icon: MapPin, label: 'Local', value: tryoutInfo.location },
                  { icon: Target, label: 'Endereço', value: tryoutInfo.address },
                  { icon: Users, label: 'Metrô', value: tryoutInfo.metro },
                  { icon: Star, label: 'Investimento', value: tryoutInfo.price },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#FF7F00]/30 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <item.icon className="w-6 h-6 text-[#FF7F00] mb-3" />
                    <div className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <div className="font-display text-lg text-[#0A0A2A]">
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-[#FF7F00]/10 to-[#00BFFF]/10 rounded-2xl p-6 border border-[#FF7F00]/20">
                <h4 className="font-display text-lg text-[#0A0A2A] mb-3">O que levar</h4>
                <ul className="space-y-2 text-[#4A4A4A]">
                  {['Roupa esportiva confortável', 'Tênis apropriado', 'Documento de identidade', 'Água e lanche leve', 'Comprovante de pagamento (R$ 50)'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#FF7F00]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            {/* Visual element */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Decorative circles */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF7F00]/20 to-[#00BFFF]/20 rounded-full blur-3xl" />
                <div className="relative bg-gradient-to-br from-[#0A0A2A] to-[#1E3A8A] rounded-3xl p-8 h-full flex flex-col items-center justify-center text-center">
                  <div className="text-8xl mb-4">🏆</div>
                  <h3 className="text-3xl font-display text-white mb-2">TRYOUT 2026</h3>
                  <p className="text-white/70 mb-2">Investimento: <span className="text-[#FF7F00] font-bold">R$ 50,00</span></p>
                  <p className="text-white/50 text-sm mb-6">Estacionamento no local</p>
                  <div className="flex items-center gap-2 text-[#FF7F00]">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold">Vagas limitadas</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* ============================================ */}
      {/* FAQ - Accordion Section */}
      {/* ============================================ */}
      <section id="faq" className="relative z-10 py-24 md:py-32 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <SectionHeader
            badge="Dúvidas"
            title="PERGUNTAS FREQUENTES"
            subtitle="Tire suas dúvidas sobre o tryout e a equipe."
          />
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
                      : 'bg-[#FAFAFA] hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={`font-display text-lg ${
                      activeFaq === index ? 'text-[#FF7F00]' : 'text-[#0A0A2A]'
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
      {/* FINAL CTA - Conversion Section */}
      {/* ============================================ */}
      <section id="cta" className="relative z-10 py-24 md:py-32 bg-gradient-to-br from-[#FF7F00] via-[#FF9933] to-[#00BFFF] overflow-hidden">
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
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#FF7F00] font-bold text-lg rounded-full hover:bg-[#0A0A2A] hover:text-white transition-all duration-300 shadow-2xl shadow-black/20"
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
      <footer className="relative z-10 bg-[#0A0A2A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden">
                  <Image
                    src="/logo/logo-shield.jpg"
                    alt="SkyHigh AllStar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-display text-[#FF7F00]">SKYHIGH</h3>
                  <p className="text-sm font-display text-[#00BFFF]">ALLSTAR</p>
                </div>
              </div>
              <p className="text-white/60 max-w-sm leading-relaxed">
                Faça parte da equipe que está elevando o nível do cheerleading brasileiro. 
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

      {/* Storm-Themed Scroll Progress Indicator */}
      <ScrollProgress
        sections={[
          { id: 'hero', label: 'Início', color: '#FF7F00' },
          { id: 'sobre', label: 'Sobre', color: '#00BFFF' },
          { id: 'times', label: 'Times', color: '#9D00FF' },
          { id: 'jornada', label: 'Jornada', color: '#FF8C69' },
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
// MAIN PAGE COMPONENT (wraps with provider)
// ============================================
export default function LandingImprovedOpus() {
  return (
    <StormWeatherProvider defaultStorm="mixed" defaultIntensity={0.6}>
      <LandingContent />
    </StormWeatherProvider>
  )
}

