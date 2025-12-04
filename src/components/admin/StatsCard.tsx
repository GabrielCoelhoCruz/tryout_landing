'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  color?: string
  trend?: {
    value: number
    label: string
  }
  className?: string
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  color = '#FF7F00',
  trend,
  className = '',
}: StatsCardProps) {
  return (
    <motion.div
      className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      {/* Background glow effect */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>

        {/* Value */}
        <div className="text-4xl font-display text-white mb-1">
          {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
        </div>

        {/* Title */}
        <div className="text-white/60 text-sm font-medium">{title}</div>

        {/* Trend indicator */}
        {trend && (
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                trend.value >= 0
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {trend.value >= 0 ? '+' : ''}
              {trend.value}
            </span>
            <span className="text-white/40 text-xs">{trend.label}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

