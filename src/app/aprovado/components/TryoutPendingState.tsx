'use client'

import { motion } from 'framer-motion'
import { RotateCcw, Clock, MessageCircle } from 'lucide-react'
import { GlowingButton } from '@/components/ui'
import { createWhatsAppLink } from '@/constants/contact'

const TRYOUT_MESSAGE = 'Olá! Gostaria de agendar um tryout no Sky High All Star. Podem me ajudar?'

type TryoutPendingStateProps = {
  name: string
  onRetry: () => void
}

/**
 * Displays tryout pending state for users who haven't been assigned a team yet
 * Shows WhatsApp button to schedule a tryout
 */
export function TryoutPendingState({ name, onRetry }: TryoutPendingStateProps) {
  const whatsappLink = createWhatsAppLink(TRYOUT_MESSAGE)
  const firstName = name.split(' ')[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center"
    >
      {/* Badge */}
      <motion.div
        className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
      >
        {/* Pulsing ring */}
        <motion.div
          className="absolute -inset-2 rounded-full border-2 border-[#FF7F00]/40"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-[#FF7F00]/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Badge */}
        <div className="absolute inset-3 rounded-full bg-[#FF7F00] shadow-lg shadow-[#FF7F00]/40 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
          >
            <Clock className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-[#FF7F00] font-display text-sm tracking-[0.2em] uppercase mb-2">
          Olá, {firstName}
        </p>
        <h2 className="text-3xl md:text-4xl font-display text-white mb-3">
          Tryout <span className="text-[#FF7F00]">Pendente</span>
        </h2>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <p className="text-white/60 mb-2">
          Encontramos seu cadastro, mas você ainda não participou de um tryout.
        </p>
        <p className="text-white/60">
          Entre em contato para agendar sua avaliação e fazer parte do time!
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col gap-4 items-center"
      >
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <GlowingButton className="w-full">
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Agendar Tryout pelo WhatsApp
          </GlowingButton>
        </a>
        <GlowingButton variant="secondary" onClick={onRetry}>
          <RotateCcw className="w-5 h-5" aria-hidden="true" />
          Verificar Outro Email
        </GlowingButton>
      </motion.div>
    </motion.div>
  )
}
