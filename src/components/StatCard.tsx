'use client'

import { motion } from 'framer-motion'

interface StatCardProps {
  number: string
  label: string
  description?: string
  highlight?: boolean
  index?: number
}

export function StatCard({
  number,
  label,
  description,
  highlight = false,
  index = 0
}: StatCardProps) {
  return (
    <motion.div
      className={`p-8 bg-bg-alt rounded-lg border-2 ${
        highlight ? 'border-primary bg-primary/5' : 'border-muted'
      } text-center hover:shadow-lg hover:shadow-primary/10 transition-all duration-base hover:-translate-y-1`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className={`text-5xl md:text-6xl font-display mb-2 ${
        highlight ? 'text-primary' : 'text-royal-light'
      }`}>
        {number}
      </div>
      <div className="text-lg md:text-xl font-display mb-1 text-ink">
        {label}
      </div>
      {description && (
        <p className="text-sm text-ink-muted mt-2">
          {description}
        </p>
      )}
    </motion.div>
  )
}
