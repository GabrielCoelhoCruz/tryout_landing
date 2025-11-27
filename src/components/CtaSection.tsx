'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

interface CtaSectionProps {
  title: string
  subtitle: string
  ctaLabel: string
  ctaLink: string
  variant?: 'primary' | 'secondary'
}

export function CtaSection({
  title,
  subtitle,
  ctaLabel,
  ctaLink,
  variant = 'primary',
}: CtaSectionProps) {
  const router = useRouter()

  const bgClass = variant === 'primary'
    ? 'bg-gradient-to-r from-primary via-royal-light to-royal-dark'
    : 'bg-gradient-to-r from-dark to-royal-dark'

  const handleCtaClick = () => {
    if (ctaLink.startsWith('/')) {
      router.push(ctaLink)
    } else {
      const element = document.querySelector(ctaLink)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={`${bgClass} py-16 md:py-20`}>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white leading-tight">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-balance">
            {subtitle}
          </p>
          <div className="pt-4">
            <Button
              size="xl"
              className="bg-white text-primary hover:bg-primary hover:text-white border-2 border-white shadow-lg shadow-black/20"
              onClick={handleCtaClick}
            >
              {ctaLabel}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
