'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StormParticles } from './StormParticles'
import type { StormType } from '@/context/StormWeatherContext'
import { Zap, Snowflake, Flame, CloudRain, CloudLightning, ChevronLeft, ChevronRight } from 'lucide-react'

// ============================================
// STORM DATA CONFIGURATION
// ============================================
interface StormData {
  id: Exclude<StormType, 'mixed'>
  name: string
  tagline: string
  description: string
  teamName: string
  teamLevel: string
  primaryColor: string
  secondaryColor: string
  icon: React.ElementType
  characteristics: string[]
  mood: string
}

const stormsData: StormData[] = [
  {
    id: 'fire',
    name: 'FIRESTORM',
    tagline: 'Paixão que Eleva',
    description: 'Intensidade, energia e determinação. Partículas ascendentes representam a força interior.',
    teamName: 'N2 Coed',
    teamLevel: 'Nível 2',
    primaryColor: '#FF7F00',
    secondaryColor: '#FFD700',
    icon: Flame,
    characteristics: ['Ascendente', 'Energia', 'Calor'],
    mood: 'Vitória • Paixão',
  },
  {
    id: 'rain',
    name: 'RAINSTORM',
    tagline: 'Fluidez em Movimento',
    description: 'Renovação, crescimento e fluidez. Cada gota representa a constância do treino.',
    teamName: 'N3 Coed',
    teamLevel: 'Nível 3',
    primaryColor: '#00BFFF',
    secondaryColor: '#1E90FF',
    icon: CloudRain,
    characteristics: ['Diagonal', 'Splash', 'Ritmo'],
    mood: 'Renovação • Flow',
  },
  {
    id: 'hail',
    name: 'HAILSTORM',
    tagline: 'Precisão Cristalina',
    description: 'Impacto, precisão e força. Cristais de gelo simbolizam técnica refinada.',
    teamName: 'N2 All Girl',
    teamLevel: 'Nível 2',
    primaryColor: '#E0F4FF',
    secondaryColor: '#B8E0F6',
    icon: Snowflake,
    characteristics: ['Cristalino', 'Impacto', 'Brilho'],
    mood: 'Precisão • Força',
  },
  {
    id: 'thunder',
    name: 'THUNDERSTORM',
    tagline: 'Energia Explosiva',
    description: 'Poder, eletricidade e explosão. Raios representam energia máxima.',
    teamName: 'N3 All Girl',
    teamLevel: 'Nível 3',
    primaryColor: '#2563EB',
    secondaryColor: '#FFD700',
    icon: CloudLightning,
    characteristics: ['Errático', 'Elétrico', 'Puro'],
    mood: 'Poder • Energia',
  },
  {
    id: 'snow',
    name: 'SNOWSTORM',
    tagline: 'Elegância Etérea',
    description: 'Graça, harmonia e beleza. Flocos que dançam representam sincronia perfeita.',
    teamName: 'Youth',
    teamLevel: 'Categoria Jovem',
    primaryColor: '#FFFFFF',
    secondaryColor: '#F0F8FF',
    icon: Snowflake,
    characteristics: ['Hexagonal', 'Suave', 'Elegante'],
    mood: 'Elegância • Graça',
  },
]

// ============================================
// MOBILE STORM TAB - Horizontal scrollable
// ============================================
interface MobileStormTabProps {
  storm: StormData
  isActive: boolean
  onClick: () => void
}

function MobileStormTab({ storm, isActive, onClick }: MobileStormTabProps) {
  const Icon = storm.icon

  return (
    <motion.button
      onClick={onClick}
      className={`flex-shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-2xl transition-all duration-300 ${
        isActive 
          ? 'bg-white/10' 
          : 'bg-white/[0.02]'
      }`}
      style={{
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: isActive ? `${storm.primaryColor}50` : 'transparent',
        minWidth: '80px',
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300`}
        style={{
          backgroundColor: isActive ? `${storm.primaryColor}20` : 'rgba(255,255,255,0.05)',
          boxShadow: isActive ? `0 0 20px ${storm.primaryColor}30` : 'none',
        }}
      >
        <Icon 
          className="w-5 h-5"
          style={{ color: isActive ? storm.primaryColor : 'rgba(255,255,255,0.4)' }}
        />
      </div>
      <span 
        className="text-[10px] font-bold tracking-wider uppercase"
        style={{ color: isActive ? storm.primaryColor : 'rgba(255,255,255,0.5)' }}
      >
        {storm.name.replace('STORM', '')}
      </span>
    </motion.button>
  )
}

// ============================================
// DESKTOP STORM CARD
// ============================================
interface StormCardProps {
  storm: StormData
  isActive: boolean
  onClick: () => void
  index: number
}

function StormCard({ storm, isActive, onClick, index }: StormCardProps) {
  const Icon = storm.icon

  return (
    <motion.button
      onClick={onClick}
      className={`relative w-full text-left p-5 rounded-2xl transition-all duration-500 overflow-hidden group ${
        isActive 
          ? 'bg-white/10 border-2' 
          : 'bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20'
      }`}
      style={{
        borderColor: isActive ? `${storm.primaryColor}60` : undefined,
      }}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ scale: isActive ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isActive && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
          style={{ backgroundColor: storm.primaryColor }}
          layoutId="activeIndicator"
        />
      )}

      <div className="flex items-center gap-3">
        <div 
          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isActive ? 'scale-110' : 'group-hover:scale-105'
          }`}
          style={{
            backgroundColor: isActive ? `${storm.primaryColor}20` : 'rgba(255,255,255,0.05)',
            boxShadow: isActive ? `0 0 30px ${storm.primaryColor}30` : 'none',
          }}
        >
          <Icon 
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: isActive ? storm.primaryColor : 'rgba(255,255,255,0.5)' }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 
            className="text-base font-black tracking-tight transition-colors duration-300"
            style={{ color: isActive ? storm.primaryColor : 'rgba(255,255,255,0.9)' }}
          >
            {storm.name}
          </h3>
          <p className="text-xs text-white/50 truncate">{storm.teamName} • {storm.teamLevel}</p>
        </div>

        <ChevronRight 
          className={`w-4 h-4 transition-all duration-300 ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
          }`}
          style={{ color: storm.primaryColor }}
        />
      </div>

      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at left, ${storm.primaryColor}10, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.button>
  )
}

// ============================================
// STORM PREVIEW - Mobile Optimized
// ============================================
interface StormPreviewProps {
  storm: StormData
  isMobile?: boolean
}

function StormPreview({ storm, isMobile = false }: StormPreviewProps) {
  const Icon = storm.icon

  return (
    <motion.div
      key={storm.id}
      className={`relative rounded-3xl overflow-hidden ${
        isMobile ? 'min-h-[320px]' : 'h-full min-h-[450px]'
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${storm.primaryColor}15, ${storm.secondaryColor}08, transparent)`,
        }}
      />

      {/* Storm Particles */}
      <div className="absolute inset-0">
        <StormParticles storm={storm.id} intensity={0.5} />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000c1f]/95 via-[#000c1f]/50 to-transparent" />

      {/* Content */}
      <div className={`relative h-full flex flex-col ${isMobile ? 'p-5' : 'p-8'}`}>
        {/* Top Row - Badge and Mood */}
        <div className="flex items-start justify-between mb-auto">
          <motion.div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: `${storm.primaryColor}15`,
              border: `1px solid ${storm.primaryColor}30`,
            }}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Icon className="w-3.5 h-3.5" style={{ color: storm.primaryColor }} />
            <span 
              className="text-xs font-bold tracking-wider"
              style={{ color: storm.primaryColor }}
            >
              {storm.teamName}
            </span>
          </motion.div>

          {!isMobile && (
            <motion.span
              className="text-[10px] font-medium tracking-widest uppercase text-white/40"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {storm.mood}
            </motion.span>
          )}
        </div>

        {/* Center Icon */}
        <div className="flex-1 flex items-center justify-center py-4">
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${storm.primaryColor}25, transparent 70%)`,
                filter: 'blur(15px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <div
              className={`relative ${isMobile ? 'w-20 h-20' : 'w-28 h-28'} rounded-full flex items-center justify-center`}
              style={{
                background: `linear-gradient(135deg, ${storm.primaryColor}20, ${storm.secondaryColor}10)`,
                border: `2px solid ${storm.primaryColor}40`,
                boxShadow: `0 0 40px ${storm.primaryColor}25`,
              }}
            >
              <Icon 
                className={isMobile ? 'w-10 h-10' : 'w-14 h-14'}
                style={{ 
                  color: storm.primaryColor,
                  filter: `drop-shadow(0 0 15px ${storm.primaryColor}50)`,
                }} 
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Content */}
        <div className="space-y-3">
          {/* Storm Name & Tagline */}
          <div>
            <motion.h2
              className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-black tracking-tighter`}
              style={{ 
                color: storm.primaryColor,
                textShadow: `0 0 30px ${storm.primaryColor}30`,
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {storm.name}
            </motion.h2>
            <motion.p
              className={`${isMobile ? 'text-base' : 'text-xl'} font-medium text-white/70`}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {storm.tagline}
            </motion.p>
          </div>

          {/* Description - Hidden on mobile for space */}
          {!isMobile && (
            <motion.p
              className="text-white/50 text-base max-w-md leading-relaxed"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {storm.description}
            </motion.p>
          )}

          {/* Characteristics */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            {storm.characteristics.map((char, idx) => (
              <span
                key={char}
                className={`inline-flex items-center gap-1.5 ${isMobile ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'} rounded-full`}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${storm.primaryColor}20`,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                <span 
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: storm.primaryColor }}
                />
                {char}
              </span>
            ))}
          </motion.div>

          {/* Mobile Mood */}
          {isMobile && (
            <motion.p
              className="text-[10px] font-medium tracking-widest uppercase text-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {storm.mood}
            </motion.p>
          )}
        </div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            className="h-full origin-left"
            style={{ backgroundColor: storm.primaryColor }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

// ============================================
// MAIN STORM SHOWCASE COMPONENT
// ============================================
export function StormShowcase() {
  const [activeStorm, setActiveStorm] = useState<string>('fire')
  const currentStorm = stormsData.find(s => s.id === activeStorm) || stormsData[0]
  const currentIndex = stormsData.findIndex(s => s.id === activeStorm)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const goToPrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : stormsData.length - 1
    setActiveStorm(stormsData[newIndex].id)
  }

  const goToNext = () => {
    const newIndex = currentIndex < stormsData.length - 1 ? currentIndex + 1 : 0
    setActiveStorm(stormsData[newIndex].id)
  }

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-[#000c1f] overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse at 70% 50%, ${currentStorm.primaryColor}15, transparent 60%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Zap className="w-3.5 h-3.5 text-[#FF7F00]" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-white/70">
              Storm Identity
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-6xl font-black tracking-tight text-white mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            CONHEÇA OS{' '}
            <span className="text-[#FF7F00]">
              STORMS
            </span>
          </motion.h2>

          <motion.p
            className="text-sm md:text-lg text-white/50 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Cada storm representa a identidade visual de nossos times.
          </motion.p>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Tabs - Horizontal Scroll */}
          <div className="relative mb-6">
            <div 
              ref={scrollContainerRef}
              className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {stormsData.map((storm) => (
                <MobileStormTab
                  key={storm.id}
                  storm={storm}
                  isActive={activeStorm === storm.id}
                  onClick={() => setActiveStorm(storm.id)}
                />
              ))}
            </div>
            
            {/* Gradient fade indicators */}
            <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-[#000c1f] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-[#000c1f] to-transparent pointer-events-none" />
          </div>

          {/* Mobile Preview with Navigation */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <StormPreview key={activeStorm} storm={currentStorm} isMobile />
            </AnimatePresence>

            {/* Mobile Navigation Arrows */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={goToPrev}
                className="p-2 -ml-2 rounded-full bg-black/30 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/50 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={goToNext}
                className="p-2 -mr-2 rounded-full bg-black/30 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/50 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {stormsData.map((storm, idx) => (
              <button
                key={storm.id}
                onClick={() => setActiveStorm(storm.id)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6' : ''
                }`}
                style={{
                  backgroundColor: idx === currentIndex ? storm.primaryColor : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Storm List */}
          <div className="space-y-2">
            {stormsData.map((storm, index) => (
              <StormCard
                key={storm.id}
                storm={storm}
                isActive={activeStorm === storm.id}
                onClick={() => setActiveStorm(storm.id)}
                index={index}
              />
            ))}
          </div>

          {/* Storm Preview */}
          <AnimatePresence mode="wait">
            <StormPreview key={activeStorm} storm={currentStorm} />
          </AnimatePresence>
        </div>

        {/* Bottom Hint - Hidden on mobile */}
        <motion.p
          className="hidden md:block text-center text-xs text-white/30 mt-8 lg:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          As partículas mudam dinamicamente ao navegar pelo site
        </motion.p>
      </div>
    </section>
  )
}

// ============================================
// COMPACT STORM SELECTOR - For inline use
// ============================================
export function CompactStormSelector({
  activeStorm,
  onStormChange,
}: {
  activeStorm: Exclude<StormType, 'mixed'>
  onStormChange: (storm: Exclude<StormType, 'mixed'>) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {stormsData.map((storm) => {
        const Icon = storm.icon
        const isActive = activeStorm === storm.id

        return (
          <motion.button
            key={storm.id}
            onClick={() => onStormChange(storm.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              isActive
                ? 'text-white shadow-lg'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
            }`}
            style={{
              backgroundColor: isActive ? `${storm.primaryColor}20` : undefined,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: isActive ? `${storm.primaryColor}50` : 'transparent',
              boxShadow: isActive ? `0 0 20px ${storm.primaryColor}30` : undefined,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon 
              className="w-4 h-4"
              style={{ color: isActive ? storm.primaryColor : undefined }}
            />
            <span style={{ color: isActive ? storm.primaryColor : undefined }}>
              {storm.name.replace('STORM', '')}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

export default StormShowcase
