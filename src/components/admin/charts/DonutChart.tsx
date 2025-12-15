'use client'

import { motion } from 'framer-motion'

interface DonutChartData {
  label: string
  value: number
  color: string
}

interface DonutChartProps {
  title: string
  subtitle?: string
  data: DonutChartData[]
  centerLabel?: string
  className?: string
}

export function DonutChart({
  title,
  subtitle,
  data,
  centerLabel = 'Total',
  className = '',
}: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // Create conic gradient string
  let currentPercent = 0
  const gradientStops = data
    .map((item) => {
      const percent = total > 0 ? (item.value / total) * 100 : 0
      const start = currentPercent
      currentPercent += percent
      return `${item.color} ${start}% ${currentPercent}%`
    })
    .join(', ')

  return (
    <div
      className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col h-full ${className}`}
    >
      <h3 className="text-white text-lg font-display mb-1">{title}</h3>
      {subtitle && (
        <p className="text-white/50 text-sm mb-4">{subtitle}</p>
      )}

      <div className="flex items-center gap-6 mt-auto">
        {/* Donut */}
        <motion.div
          className="relative w-32 h-32 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: total > 0
              ? `conic-gradient(${gradientStops})`
              : 'conic-gradient(#333 0% 100%)',
          }}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex flex-col items-center justify-center shadow-inner">
            <span className="text-2xl font-display text-white">{total}</span>
            <span className="text-[10px] text-white/50">{centerLabel}</span>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-col gap-3 flex-1">
          {data.map((item, index) => {
            const percent = total > 0 ? Math.round((item.value / total) * 100) : 0
            return (
              <motion.div
                key={item.label}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-white">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white/60">
                    {percent}%
                  </span>
                  <span className="text-xs text-white/40">({item.value})</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
