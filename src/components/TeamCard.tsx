'use client'

import { motion } from 'framer-motion'
import { Users, Trophy, Calendar } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'

interface TeamCardProps {
  name: string
  level: string
  category: string
  description: string
  requirements: string[]
  vacancies?: number
  image?: string
  index?: number
}

export function TeamCard({
  name,
  level,
  category,
  description,
  requirements,
  vacancies,
  image,
  index = 0,
}: TeamCardProps) {
  return (
    <motion.div
      className="bg-bg-alt rounded-lg border-2 border-muted overflow-hidden hover:border-royal-light hover:shadow-xl hover:shadow-royal/20 transition-all duration-base hover:-translate-y-2 hover:scale-[1.02] group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Image */}
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image}
            alt={`Time ${name}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-slow"
          />
          {vacancies && (
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              {vacancies} vagas
            </div>
          )}
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-sm text-ink-muted mb-2">
            <Trophy className="w-4 h-4" />
            <span>{level}</span>
            <span>•</span>
            <Users className="w-4 h-4" />
            <span>{category}</span>
          </div>
          <h3 className="text-3xl font-display text-primary">
            {name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-ink-muted leading-relaxed">
          {description}
        </p>

        {/* Requirements */}
        <div>
          <h4 className="text-sm font-semibold text-ink mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Requisitos
          </h4>
          <ul className="space-y-1">
            {requirements.map((req, idx) => (
              <li key={idx} className="text-sm text-ink-muted flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-white">
          Quero me inscrever
        </Button>
      </div>
    </motion.div>
  )
}
