'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertCircle, ArrowLeft, CalendarDays, MessageCircle } from 'lucide-react'
import { GlowingButton, ContactLinks } from '@/components/ui'
import { createWhatsAppLink } from '@/constants/contact'
import type { ApprovedRegistration } from '@/types/approved-member'

type AbsentStateProps = {
  registration: ApprovedRegistration
  message: string
}

/**
 * Displays absent status for users who missed the tryout
 * Provides option to schedule a new tryout via WhatsApp
 */
export function AbsentState({ registration, message }: AbsentStateProps) {
  const whatsappMessage = `Olá! Sou ${registration.name} e não pude comparecer ao tryout. Gostaria de agendar uma nova data para fazer meu tryout. Meu e-mail de inscrição: ${registration.email}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto text-center"
    >
      <div className="relative w-28 h-28 mx-auto mb-6">
        <div className="relative w-full h-full bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
          <CalendarDays className="w-14 h-14 text-white" aria-hidden="true" />
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
        Faça seu <span className="text-[#FF7F00]">Tryout Agendado!</span>
      </h2>
      <p className="text-white/60 mb-6">{message}</p>

      {/* Info card */}
      <div className="bg-[#0A1B4D] rounded-2xl p-6 border border-amber-500/30 mb-8 text-left">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-amber-500" aria-hidden="true" />
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">
              Você não compareceu ao tryout
            </h4>
            <p className="text-white/60 text-sm">
              Não se preocupe! Você ainda pode participar do processo seletivo. Entre em
              contato conosco para agendar uma nova data para seu tryout.
            </p>
          </div>
        </div>
      </div>

      {/* Member info */}
      <div className="bg-[#000c1f] rounded-xl p-4 border border-white/10 mb-6 text-left">
        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
          Inscrito como
        </p>
        <p className="text-white font-medium">{registration.name}</p>
        <p className="text-white/60 text-sm">{registration.email}</p>
      </div>

      {/* CTA Button - WhatsApp */}
      <a
        href={createWhatsAppLink(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white font-bold text-lg rounded-full transition-all duration-300 hover:bg-[#128C7E] mb-4"
      >
        <MessageCircle className="w-6 h-6" aria-hidden="true" />
        Agendar Tryout via WhatsApp
      </a>

      <p className="text-white/40 text-sm mb-8">
        Nossa equipe irá confirmar a data e horário disponíveis
      </p>

      {/* Contact alternatives */}
      <div className="mb-8">
        <ContactLinks />
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
