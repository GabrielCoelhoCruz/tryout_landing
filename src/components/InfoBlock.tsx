'use client'

import { motion } from 'framer-motion'
import {
  Calendar,
  MapPin,
  Users,
  ClipboardList,
  Zap,
  DollarSign,
  Clock,
  Info,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { ElementType } from 'react'

const iconMap: Record<string, ElementType> = {
  Calendar,
  MapPin,
  Users,
  ClipboardList,
  Zap,
  DollarSign,
  Clock,
  Info,
  CheckCircle,
  AlertCircle,
}

interface InfoItem {
  icon: string
  title: string
  content: string
}

interface InfoBlockProps {
  items: InfoItem[]
}

export function InfoBlock({ items }: InfoBlockProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] || Info
        return (
          <motion.div
            key={index}
            className="bg-bg-alt p-6 rounded-lg border-2 border-muted hover:border-secondary-2 hover:shadow-lg hover:shadow-secondary-2/10 transition-all duration-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-primary">
                <Icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-lg text-primary mb-2">
                  {item.title}
                </h4>
                <p className="text-ink-muted leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
