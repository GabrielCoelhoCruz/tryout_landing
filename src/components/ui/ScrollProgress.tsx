'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks'

interface Section {
  id: string
  label: string
  color: string
}

const defaultSections: Section[] = [
  { id: 'hero', label: 'Início', color: '#FF7F00' },
  { id: 'sobre', label: 'Sobre', color: '#00BFFF' },
  { id: 'times', label: 'Times', color: '#9D00FF' },
  { id: 'jornada', label: 'Jornada', color: '#FF8C69' },
  { id: 'faq', label: 'FAQ', color: '#1E90FF' },
  { id: 'cta', label: 'Inscreva-se', color: '#FFD700' },
]

interface ScrollProgressProps {
  sections?: Section[]
  showTopBar?: boolean
  showSideDots?: boolean
}

/**
 * ScrollProgress - Indicador de progresso storm-themed
 * Barra horizontal no topo + dots verticais laterais
 * Design atlético e dinâmico com lightning effects
 */
export function ScrollProgress({
  sections = defaultSections,
  showTopBar = true,
  showSideDots = true,
}: ScrollProgressProps) {
  const [activeSection, setActiveSection] = useState(0)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll()

  // Spring animation para suavidade
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Track active section baseado no scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Lightning effect random appearance
  const [showLightning, setShowLightning] = useState(false)

  useEffect(() => {
    if (prefersReduced) return

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const velocity = Math.abs(latest - (scrollYProgress.getPrevious() ?? latest))
      if (velocity > 0.02) {
        // Scroll rápido
        setShowLightning(true)
        setTimeout(() => setShowLightning(false), 200)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, prefersReduced])

  const activeColor = sections[activeSection]?.color || '#FF7F00'

  return (
    <>
      {/* Top Progress Bar - Storm Energy */}
      {showTopBar && (
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
          <div className="relative h-1 bg-black/20 backdrop-blur-sm">
            {/* Main Progress Bar */}
            <motion.div
              className="absolute top-0 left-0 h-full origin-left"
              style={{
                scaleX,
                background: `linear-gradient(90deg, #FF7F00, #00BFFF, #9D00FF, #FFD700)`,
                backgroundSize: '200% 100%',
              }}
            />

            {/* Storm Glow Effect */}
            <motion.div
              className="absolute top-0 left-0 h-full origin-left blur-md"
              style={{
                scaleX,
                background: `linear-gradient(90deg, #FF7F0060, #00BFFF60, #9D00FF60, #FFD70060)`,
                backgroundSize: '200% 100%',
              }}
            />

            {/* Lightning Bolt Effect */}
            {showLightning && !prefersReduced && (
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: [0, 1, 0], x: '100%' }}
                transition={{ duration: 0.3, ease: 'linear' }}
                style={{
                  background:
                    'linear-gradient(90deg, transparent, #FFD700, transparent)',
                  filter: 'blur(2px)',
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Side Navigation Dots - Storm Indicators */}
      {showSideDots && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 px-3 py-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">
          {sections.map((section, index) => {
            const isActive = index === activeSection
            const isPast = index < activeSection

            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative flex items-center"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Ir para ${section.label}`}
                title={section.label}
              >
                {/* Dot */}
                <motion.div
                  className="relative w-3 h-3 rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: isActive || isPast ? section.color : 'rgba(255,255,255,0.3)',
                    backgroundColor: isActive || isPast ? section.color : 'transparent',
                  }}
                  animate={
                    isActive && !prefersReduced
                      ? {
                          scale: [1, 1.3, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Active Glow */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundColor: section.color,
                        filter: 'blur(8px)',
                      }}
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </motion.div>

                {/* Label - Appears on hover */}
                <motion.div
                  className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    borderColor: section.color,
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: section.color }}>
                    {section.label}
                  </span>

                  {/* Arrow */}
                  <div
                    className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px]"
                    style={{
                      borderLeftColor: section.color,
                    }}
                  />
                </motion.div>

                {/* Connection Line to Next Dot */}
                {index < sections.length - 1 && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-4 transition-colors duration-300"
                    style={{
                      backgroundColor: isPast
                        ? section.color
                        : 'rgba(255,255,255,0.1)',
                    }}
                  />
                )}
              </motion.button>
            )
          })}

          {/* Storm Energy Visual Indicator */}
          <motion.div
            className="absolute left-0 top-4 bottom-4 w-px rounded-full"
            style={{
              background: `linear-gradient(180deg, transparent, ${activeColor}, transparent)`,
            }}
            animate={{
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      )}

      {/* Mobile Progress Indicator - Bottom */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  index <= activeSection ? section.color : 'rgba(255,255,255,0.2)',
              }}
              whileTap={{ scale: 1.5 }}
              aria-label={`Ir para ${section.label}`}
            />
          ))}

          {/* Progress Percentage */}
          <div className="ml-2 text-xs font-bold tabular-nums" style={{ color: activeColor }}>
            {Math.round(scrollYProgress.get() * 100)}%
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * Minimal Scroll Progress - Apenas barra no topo
 */
export function MinimalScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF7F00] via-[#00BFFF] to-[#9D00FF] origin-left z-50"
      style={{ scaleX }}
    />
  )
}
