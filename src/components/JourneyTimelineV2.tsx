'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface TimelineStep {
  icon: LucideIcon
  title: string
  description: string
}

interface JourneyTimelineV2Props {
  steps: TimelineStep[]
}

export function JourneyTimelineV2({ steps }: JourneyTimelineV2Props) {
  return (
    <div className="relative text-white">
      {/* Desktop: Horizontal */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-white/20" />
          <motion.div
            className="absolute top-8 left-0 h-1 bg-gradient-to-r from-primary via-royal-light to-primary"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          />

          <div className="grid grid-cols-6 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                >
                  {/* Icon circle */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-royal-light flex items-center justify-center mb-4 shadow-lg shadow-primary/30 border-4 border-dark text-white">
                    <Icon className="w-7 h-7" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h4 className="font-display text-lg text-white mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-white/70">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical */}
      <div className="md:hidden space-y-8">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={index}
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.19, 1, 0.22, 1]
              }}
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-royal-light flex items-center justify-center shadow-lg shadow-primary/30 text-white">
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h4 className="font-display text-lg text-white mb-1">
                  {step.title}
                </h4>
                <p className="text-sm text-white/70">
                  {step.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

