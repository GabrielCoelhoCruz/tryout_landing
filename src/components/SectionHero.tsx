'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface SectionHeroProps {
  title: string
  subtitle: string
  ctaLabel: string
  ctaLink: string
  image?: string
  imageAlt?: string
}

export function SectionHero({
  title,
  subtitle,
  ctaLabel,
  ctaLink,
  image,
  imageAlt = 'Equipe em formação',
}: SectionHeroProps) {
  const router = useRouter()

  const handleCtaClick = () => {
    if (ctaLink.startsWith('/')) {
      router.push(ctaLink)
    } else {
      const element = document.querySelector(ctaLink)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-royal via-royal-dark to-dark overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal/80 via-secondary-1/60 to-dark/90 z-10" />

      {/* Background image */}
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="text-white space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.19, 1, 0.22, 1] }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-wide leading-tight">
                {title}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.19, 1, 0.22, 1] }}
            >
              <p className="text-lg md:text-xl lg:text-2xl font-body max-w-2xl text-balance">
                {subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.19, 1, 0.22, 1] }}
            >
              <Button
                size="xl"
                className="mt-4 bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                onClick={handleCtaClick}
              >
                {ctaLabel}
              </Button>
            </motion.div>
          </motion.div>

          {/* Image placeholder or additional content */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Empty space for visual balance when using background image */}
          </motion.div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent z-20" />
    </section>
  )
}
