'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface TestimonialCardProps {
  name: string
  role: string
  tenure: string
  text: string
  avatar?: string
  index?: number
}

export function TestimonialCard({
  name,
  role,
  tenure,
  text,
  avatar,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-secondary-2/10 to-primary/10 p-6 rounded-lg border-2 border-muted hover:border-secondary-2 hover:shadow-lg hover:shadow-secondary-2/10 transition-all duration-base"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatar ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary">
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary-2 flex items-center justify-center text-white font-display text-2xl ring-2 ring-primary">
              {name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h4 className="font-display text-xl text-ink">
            {name}
          </h4>
          <p className="text-sm text-primary font-semibold">
            {role}
          </p>
          <p className="text-xs text-ink-muted">
            {tenure}
          </p>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-ink-muted italic leading-relaxed">
        "{text}"
      </blockquote>
    </motion.div>
  )
}
