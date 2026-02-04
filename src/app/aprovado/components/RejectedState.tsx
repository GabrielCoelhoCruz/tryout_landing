'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { GlowingButton, ContactLinks } from '@/components/ui'

type RejectedStateProps = {
  message: string
}

/**
 * Displays rejection status with contact options
 */
export function RejectedState({ message }: RejectedStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="relative w-full h-full bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
          <AlertCircle className="w-12 h-12 text-white" aria-hidden="true" />
        </div>
      </div>

      <h2 className="text-3xl font-display text-white mb-4">{message}</h2>
      <p className="text-white/60 mb-8">
        Agradecemos seu interesse no Sky High All Star. Entre em contato conosco para mais
        informações.
      </p>

      <div className="mb-8">
        <ContactLinks showLabels={false} />
      </div>

      <Link href="/">
        <GlowingButton variant="secondary">
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          Voltar ao Site
        </GlowingButton>
      </Link>
    </motion.div>
  )
}
