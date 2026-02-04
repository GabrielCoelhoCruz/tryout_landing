'use client'

import { motion } from 'framer-motion'
import { RotateCcw, CalendarCheck, Clock } from 'lucide-react'
import { GlowingButton, ContactLinks } from '@/components/ui'
import type { ApprovedRegistration } from '@/types/approved-member'

type ScheduledStateProps = {
  registration: ApprovedRegistration
  scheduledDate: string
  onRetry: () => void
}

/**
 * Displays scheduled tryout date and preparation info
 */
export function ScheduledState({ registration, scheduledDate, onRetry }: ScheduledStateProps) {
  const formattedDate = new Date(scheduledDate).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto text-center"
    >
      <div className="relative w-28 h-28 mx-auto mb-6">
        <div className="relative w-full h-full bg-[#00BFFF] rounded-full flex items-center justify-center shadow-lg shadow-[#00BFFF]/30">
          <CalendarCheck className="w-14 h-14 text-white" aria-hidden="true" />
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
        Tryout <span className="text-[#00BFFF]">Agendado!</span>
      </h2>
      <p className="text-white/60 mb-6">
        Seu tryout está marcado. Prepare-se para mostrar seu talento!
      </p>

      {/* Date card */}
      <div className="bg-[#0A1B4D] rounded-2xl p-6 border border-[#00BFFF]/30 mb-8">
        <p className="text-white/50 text-xs uppercase tracking-wider mb-2">
          Data do seu Tryout
        </p>
        <p className="text-2xl md:text-3xl font-display text-white capitalize">
          {formattedDate}
        </p>
      </div>

      {/* Member info */}
      <div className="bg-[#000c1f] rounded-xl p-4 border border-white/10 mb-6 text-left">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Nome</p>
            <p className="text-white font-medium">{registration.name}</p>
          </div>
          <div>
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1">E-mail</p>
            <p className="text-white font-medium text-sm">{registration.email}</p>
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-[#0A1B4D] rounded-2xl p-6 border border-white/10 mb-8 text-left">
        <h3 className="font-display text-lg text-[#FF7F00] mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" aria-hidden="true" />
          Prepare-se para o Tryout
        </h3>
        <ol className="space-y-3">
          <li className="flex items-center gap-3 text-white/70">
            <div className="w-6 h-6 rounded-full bg-[#FF7F00]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-[#FF7F00]">1</span>
            </div>
            <span className="text-sm">Chegue 30 minutos antes do horário marcado</span>
          </li>
          <li className="flex items-center gap-3 text-white/70">
            <div className="w-6 h-6 rounded-full bg-[#FF7F00]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-[#FF7F00]">2</span>
            </div>
            <span className="text-sm">Traga roupa confortável e tênis adequado</span>
          </li>
          <li className="flex items-center gap-3 text-white/70">
            <div className="w-6 h-6 rounded-full bg-[#FF7F00]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-[#FF7F00]">3</span>
            </div>
            <span className="text-sm">Traga documento com foto e garrafa de água</span>
          </li>
        </ol>
      </div>

      {/* Contact */}
      <p className="text-white/50 text-sm mb-4">Dúvidas? Entre em contato:</p>
      <div className="mb-8">
        <ContactLinks />
      </div>

      <GlowingButton variant="secondary" onClick={onRetry}>
        <RotateCcw className="w-5 h-5" aria-hidden="true" />
        Verificar Outro Email
      </GlowingButton>
    </motion.div>
  )
}
