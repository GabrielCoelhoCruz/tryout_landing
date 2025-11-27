'use client'

import { motion } from 'framer-motion'
import {
  FileText,
  Target,
  CheckCircle,
  Handshake,
  Dumbbell,
  Medal,
  Trophy,
  Star,
  Users,
  Calendar,
} from 'lucide-react'
import { ElementType } from 'react'

const iconMap: Record<string, ElementType> = {
  FileText,
  Target,
  CheckCircle,
  Handshake,
  Dumbbell,
  Medal,
  Trophy,
  Star,
  Users,
  Calendar,
}

interface TimelineStep {
  icon: string
  title: string
  description: string
}

interface JourneyTimelineProps {
  steps: TimelineStep[]
}

export function JourneyTimeline({ steps }: JourneyTimelineProps) {
  return (
    <div className="relative">
      {/* Desktop: Horizontal */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-muted" />
          <motion.div
            className="absolute top-8 left-0 h-1 bg-gradient-to-r from-primary via-royal-light to-primary"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          />

          <div className="grid grid-cols-6 gap-4">
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon] || Star
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
                  <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-royal-light flex items-center justify-center mb-4 shadow-lg shadow-primary/30 text-white">
                    <Icon className="w-7 h-7" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h4 className="font-display text-lg text-ink mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-ink-muted">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical */}
      <div className="md:hidden space-y-6">
        {steps.map((step, index) => {
          const Icon = iconMap[step.icon] || Star
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
              <div className="flex-1">
                <h4 className="font-display text-lg text-ink mb-1">
                  {step.title}
                </h4>
                <p className="text-sm text-ink-muted">
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
