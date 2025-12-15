'use client'

import { motion } from 'framer-motion'

interface LineChartData {
  label: string
  value: number
}

interface LineChartProps {
  title: string
  subtitle?: string
  data: LineChartData[]
  color?: string
  className?: string
}

export function LineChart({
  title,
  subtitle,
  data,
  color = '#FF7F00',
  className = '',
}: LineChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1)
  const width = 300
  const height = 100
  const padding = 10

  // Generate path points
  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2)
    const y = height - padding - (item.value / max) * (height - padding * 2)
    return { x, y, value: item.value }
  })

  // Create smooth curve path
  const pathD = points.reduce((path, point, index) => {
    if (index === 0) {
      return `M${point.x} ${point.y}`
    }
    const prev = points[index - 1]
    const cpX = (prev.x + point.x) / 2
    return `${path} C ${cpX} ${prev.y}, ${cpX} ${point.y}, ${point.x} ${point.y}`
  }, '')

  // Area path (for gradient fill)
  const areaPath = `${pathD} V ${height} H ${points[0].x} Z`

  return (
    <div
      className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col h-full ${className}`}
    >
      <h3 className="text-white text-lg font-display mb-1">{title}</h3>
      {subtitle && (
        <p className="text-white/50 text-sm mb-4">{subtitle}</p>
      )}

      <div className="flex-1 flex items-center justify-center relative mt-auto">
        <motion.svg
          className="w-full h-32 overflow-visible"
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1={height * 0.25}
            x2={width}
            y2={height * 0.25}
            stroke="rgba(255,255,255,0.1)"
            strokeDasharray="4 4"
          />
          <line
            x1="0"
            y1={height * 0.5}
            x2={width}
            y2={height * 0.5}
            stroke="rgba(255,255,255,0.1)"
            strokeDasharray="4 4"
          />
          <line
            x1="0"
            y1={height * 0.75}
            x2={width}
            y2={height * 0.75}
            stroke="rgba(255,255,255,0.1)"
            strokeDasharray="4 4"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill={`url(#gradient-${title})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />

          {/* Line */}
          <motion.path
            d={pathD}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />

          {/* Data points */}
          {points.map((point, index) => (
            <motion.g key={index}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#1a1a1a"
                stroke={color}
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              />
              {/* Value tooltip on hover */}
              <motion.text
                x={point.x}
                y={point.y - 12}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {point.value}
              </motion.text>
            </motion.g>
          ))}
        </motion.svg>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-white/50 mt-2 font-medium">
        {data.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  )
}
