'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-royal/10'
          : 'bg-dark/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 md:w-14 md:h-14">
              <Image
                src="/logo/logo-shield.jpg"
                alt="SkyHigh AllStar Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-display text-primary leading-none">
                SKYHIGH
              </h1>
              <p className="text-xs md:text-sm font-display text-royal-light leading-none">
                ALLSTAR
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('#sobre')}
              className="text-white/80 hover:text-royal-light transition-colors font-body"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('#times')}
              className="text-white/80 hover:text-royal-light transition-colors font-body"
            >
              Times
            </button>
            <button
              onClick={() => scrollToSection('#galeria')}
              className="text-white/80 hover:text-royal-light transition-colors font-body"
            >
              Galeria
            </button>
            <button
              onClick={() => scrollToSection('#faq')}
              className="text-white/80 hover:text-royal-light transition-colors font-body"
            >
              FAQ
            </button>
          </nav>

          {/* CTA Button */}
          <Button
            size="sm"
            className="bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/30"
            onClick={() => router.push('/formulario')}
          >
            Inscreva-se
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
