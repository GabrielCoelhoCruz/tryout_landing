'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'

type FormCardProps = {
  icon: LucideIcon
  title: string
  subtitle?: string
  children: ReactNode
  variant?: 'default' | 'celebration' | 'action'
  delay?: number
}

/**
 * Unified card component for forms and content sections
 * Clean design with solid colors from the brand palette
 */
export function FormCard({
  icon: Icon,
  title,
  subtitle,
  children,
  variant = 'default',
  delay = 0,
}: FormCardProps) {
  const variantStyles = {
    default: {
      border: 'border-white/10',
      accent: '#FF7F00',
      iconBg: 'bg-[#FF7F00]',
    },
    celebration: {
      border: 'border-[#FF7F00]/30',
      accent: '#FF7F00',
      iconBg: 'bg-[#FF7F00]',
    },
    action: {
      border: 'border-[#00BFFF]/30',
      accent: '#00BFFF',
      iconBg: 'bg-[#00BFFF]',
    },
  }

  const styles = variantStyles[variant]

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Main card */}
      <div className={`relative rounded-2xl overflow-hidden ${styles.border} border bg-[#0A1B4D]`}>
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ backgroundColor: styles.accent }}
        />

        {/* Content */}
        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center shadow-lg`}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl md:text-2xl font-display text-white">
                {title}
              </h3>
              {subtitle && (
                <p className="text-white/40 text-sm">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="relative">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
