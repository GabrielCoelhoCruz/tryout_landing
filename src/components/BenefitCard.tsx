'use client'

import { motion } from 'framer-motion'

interface BenefitCardProps {
  icon: string
  title: string
  description: string
  index?: number
}

export function BenefitCard({ icon, title, description, index = 0 }: BenefitCardProps) {
  return (
    <motion.div
      className="p-6 bg-bg-alt rounded-lg border-2 border-transparent hover:border-royal-light hover:shadow-lg hover:shadow-royal/20 transition-all duration-base hover:-translate-y-1 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-base">
        {icon}
      </div>
      <h3 className="text-2xl font-display mb-2 text-primary">
        {title}
      </h3>
      <p className="text-ink-muted leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
