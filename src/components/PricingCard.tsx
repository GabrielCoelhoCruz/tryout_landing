'use client'

import { motion } from 'framer-motion'

interface PricingPrice {
  label: string
  sublabel: string
  price: string
}

interface PricingCardProps {
  name: string
  description: string
  icon: string
  color: string
  prices: readonly PricingPrice[]
  delay?: number
}

export function PricingCard({
  name,
  description,
  icon,
  color,
  prices,
  delay = 0,
}: PricingCardProps) {
  return (
    <motion.div
      className="relative bg-[#FAFAFA] rounded-2xl border border-gray-100 p-8 hover:border-gray-200 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-xl"
          style={{ backgroundColor: `${color}10` }}
        >
          <span className="text-xl font-bold" style={{ color }}>
            {icon}
          </span>
        </div>
        <div>
          <h4 className="font-display text-xl text-[#000c1f]">{name}</h4>
          <p className="text-[#4A4A4A] text-xs">{description}</p>
        </div>
      </div>

      {/* Prices */}
      <div className="space-y-1">
        {prices.map((item, idx) => {
          const isLast = idx === prices.length - 1

          return (
            <div
              key={item.label}
              className={`flex items-center justify-between py-4 ${
                !isLast ? 'border-b border-gray-50' : ''
              }`}
            >
              <div>
                <p className="text-[#000c1f] text-sm font-medium">{item.label}</p>
                <p className="text-[#4A4A4A] text-xs opacity-60">{item.sublabel}</p>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-[#4A4A4A] text-xs">R$</span>
                <span
                  className="font-display text-2xl"
                  style={{ color: isLast ? '#4A4A4A' : color }}
                >
                  {item.price}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
