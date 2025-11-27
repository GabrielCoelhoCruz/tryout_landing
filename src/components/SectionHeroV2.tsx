'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface SectionHeroV2Props {
  title: string
  subtitle: string
  ctaLabel: string
  ctaLink: string
  image?: string
  imageAlt?: string
}

export function SectionHeroV2({
  title,
  subtitle,
  ctaLabel,
  ctaLink,
  image,
  imageAlt = 'Equipe em formação',
}: SectionHeroV2Props) {
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
    <section className="relative min-h-[95vh] flex items-center bg-dark overflow-hidden pt-20 lg:pt-0">
      {/* Background Gradient Shapes */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-royal/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10 h-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full">
          
          {/* Content Column */}
          <motion.div 
            className="flex flex-col justify-center space-y-8 py-10 lg:py-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="space-y-2">
              <motion.span 
                className="inline-block px-4 py-1.5 rounded-full bg-royal-light/20 text-royal-light text-sm font-bold tracking-wider uppercase border border-royal-light/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Temporada 2026
              </motion.span>
              <motion.h1 
                className="text-6xl md:text-7xl lg:text-8xl font-display text-white leading-[0.9] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {title.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "text-primary block" : "block"}>
                    {word}{' '}
                  </span>
                ))}
              </motion.h1>
            </div>

            <motion.p 
              className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {subtitle}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="xl"
                className="bg-primary hover:bg-primary-dark text-white font-bold text-lg px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all transform hover:-translate-y-1"
                onClick={handleCtaClick}
              >
                {ctaLabel}
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-white/20 text-white hover:bg-white/10 font-bold text-lg px-8 py-6 transition-all"
                onClick={() => {
                  document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Saiba Mais
              </Button>
            </motion.div>

            {/* Stats Preview */}
            <motion.div 
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div>
                <span className="block text-3xl font-display text-white">15+</span>
                <span className="text-sm text-white/60">Campeonatos</span>
              </div>
              <div>
                <span className="block text-3xl font-display text-white">100+</span>
                <span className="text-sm text-white/60">Atletas</span>
              </div>
              <div>
                <span className="block text-3xl font-display text-white">25+</span>
                <span className="text-sm text-white/60">Pódios</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div 
            className="relative h-[600px] lg:h-[800px] hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            {image && (
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-royal/20 border border-white/10">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-60" />
              </div>
            )}
            
            {/* Floating Badge */}
            <motion.div 
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-lg shadow-xl max-w-[200px] hidden lg:block"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-bold text-dark">Inscrições Abertas</span>
              </div>
              <p className="text-xs text-ink-muted">Garanta sua vaga para o Tryout 2026 agora mesmo.</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

