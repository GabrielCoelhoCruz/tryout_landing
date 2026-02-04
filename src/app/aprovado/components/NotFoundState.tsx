'use client'

import { motion } from 'framer-motion'
import { RotateCcw, Calendar, MessageCircle } from 'lucide-react'
import { GlowingButton } from '@/components/ui'
import { createWhatsAppLink } from '@/constants/contact'

const TRYOUT_MESSAGE = 'Olá! Gostaria de agendar um tryout no Sky High All Star. Podem me ajudar?'

type NotFoundStateProps = {
  onRetry: () => void
}

/**
 * Displays not found state when email is not in the system
 * Offers option to schedule a tryout via WhatsApp
 */
export function NotFoundState({ onRetry }: NotFoundStateProps) {
  const whatsappLink = createWhatsAppLink(TRYOUT_MESSAGE)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="relative w-full h-full bg-[#FF7F00] rounded-full flex items-center justify-center shadow-lg shadow-[#FF7F00]/30">
          <Calendar className="w-12 h-12 text-white" aria-hidden="true" />
        </div>
      </div>

      <h2 className="text-3xl font-display text-white mb-4">
        Agende seu <span className="text-[#FF7F00]">Tryout</span>
      </h2>
      <p className="text-white/60 mb-4">
        Não encontramos nenhuma inscrição com este e-mail.
      </p>
      <p className="text-white/60 mb-8">
        Entre em contato conosco para agendar seu tryout e fazer parte do Sky High All Star!
      </p>

      <div className="flex flex-col gap-4 items-center">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <GlowingButton className="w-full">
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Agendar pelo WhatsApp
          </GlowingButton>
        </a>
        <GlowingButton variant="secondary" onClick={onRetry}>
          <RotateCcw className="w-5 h-5" aria-hidden="true" />
          Verificar Outro Email
        </GlowingButton>
      </div>
    </motion.div>
  )
}
