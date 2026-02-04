'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const SCROLL_THRESHOLD = 50

/**
 * Floating header with logo and back button
 * Becomes more opaque on scroll
 */
export function FloatingHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
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

            {/* Back Button */}
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
