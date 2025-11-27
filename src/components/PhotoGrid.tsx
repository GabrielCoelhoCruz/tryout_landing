'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface Photo {
  src: string
  title: string
  alt: string
}

interface PhotoGridProps {
  photos: Photo[]
  columns?: number
}

export function PhotoGrid({ photos, columns = 3 }: PhotoGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-4`}>
      {photos.map((photo, index) => (
        <motion.div
          key={index}
          className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.05, ease: [0.19, 1, 0.22, 1] }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-slow group-hover:scale-110"
          />

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4 transition-opacity duration-base ${
              hoveredIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-white font-display text-lg">
              {photo.title}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
