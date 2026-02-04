'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import { GlowingButton } from '@/components/ui'

type PendingStateProps = {
  message: string
}

/**
 * Displays pending/under review status for registrations
 */
export function PendingState({ message }: PendingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="relative w-full h-full bg-[#00BFFF] rounded-full flex items-center justify-center shadow-lg shadow-[#00BFFF]/30">
          <Clock className="w-12 h-12 text-white" aria-hidden="true" />
        </div>
      </div>

      <h2 className="text-3xl font-display text-white mb-4">
        Aguardando <span className="text-[#00BFFF]">Aprovação</span>
      </h2>
      <p className="text-white/60 mb-8">{message}</p>

      <div className="bg-[#0A1B4D] rounded-2xl p-6 border border-white/10 mb-8">
        <p className="text-white/70 text-sm">
          Sua inscrição está sendo avaliada pela nossa equipe. Em breve você receberá uma
          atualização sobre o resultado do tryout.
        </p>
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
