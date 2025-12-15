'use client'

import { motion } from 'framer-motion'

interface BarChartData {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  title: string
  subtitle?: string
  data: BarChartData[]
  maxValue?: number
  className?: string
}

export function BarChart({
  title,
  subtitle,
  data,
  maxValue,
  className = '',
}: BarChartProps) {
  const max = maxValue || Math.max(...data.map((d) => d.value), 1)

  return (
    <div
      className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col h-full ${className}`}
    >
      <h3 className="text-white text-lg font-display mb-1">{title}</h3>
      {subtitle && (
        <p className="text-white/50 text-sm mb-6">{subtitle}</p>
      )}

      <div className="flex items-end justify-between gap-3 h-40 mt-auto px-2">
        {data.map((item, index) => {
          const heightPercent = (item.value / max) * 100
          const isHighest = item.value === Math.max(...data.map((d) => d.value))
          const barColor = item.color || '#FF7F00'

          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 w-full group"
            >
              <motion.div
                className="w-full rounded-t-lg relative transition-all cursor-pointer"
                style={{
                  backgroundColor: isHighest ? barColor : `${barColor}30`,
                  boxShadow: isHighest ? `0 4px 20px ${barColor}40` : 'none',
                }}
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute -top-7 w-full text-center text-sm font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {item.value}
                </motion.div>
              </motion.div>
              <span className="text-xs text-white/60 font-medium">
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
