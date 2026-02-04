'use client'

import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { GlowingButton } from '@/components/ui'

type ErrorStateProps = {
  message: string
  onRetry: () => void
}

/**
 * Displays error state with retry option
 */
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="relative w-full h-full bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
          <AlertCircle className="w-12 h-12 text-white" aria-hidden="true" />
        </div>
      </div>

      <h2 className="text-3xl font-display text-white mb-4">
        Ops! <span className="text-red-500">Erro</span>
      </h2>
      <p className="text-white/60 mb-8" role="alert">
        {message}
      </p>

      <GlowingButton onClick={onRetry}>
        <ArrowLeft className="w-5 h-5" aria-hidden="true" />
        Tentar Novamente
      </GlowingButton>
    </motion.div>
  )
}
