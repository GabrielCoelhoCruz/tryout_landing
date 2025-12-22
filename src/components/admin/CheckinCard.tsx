'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import type { Database } from '@/types/database'

type CheckinRegistration = {
  id: string
  nome_completo: string
  email: string
  idade: number
  is_minor: boolean | null
  nivel_interesse: Database['public']['Enums']['team_level_type'][]
  posicao_interesse: Database['public']['Enums']['cheer_position_type'][] | null
  attendance_status: Database['public']['Enums']['attendance_status_type']
  payment_status: Database['public']['Enums']['payment_status_type']
  payment_proof_url?: string | null
  checked_in_at: string | null
}

interface CheckinCardProps {
  registration: CheckinRegistration
  onMarkPresent: (id: string) => Promise<void>
  onMarkAbsent: (id: string) => Promise<void>
  onTogglePayment?: (id: string, currentStatus: string) => Promise<void>
  isUpdating?: boolean
}

export function CheckinCard({
  registration,
  onMarkPresent,
  onMarkAbsent,
  onTogglePayment,
  isUpdating = false,
}: CheckinCardProps) {
  const [localUpdating, setLocalUpdating] = useState<'present' | 'absent' | 'payment' | null>(null)

  const handleMarkPresent = async () => {
    setLocalUpdating('present')
    try {
      await onMarkPresent(registration.id)
    } finally {
      setLocalUpdating(null)
    }
  }

  const handleMarkAbsent = async () => {
    setLocalUpdating('absent')
    try {
      await onMarkAbsent(registration.id)
    } finally {
      setLocalUpdating(null)
    }
  }

  const handleTogglePayment = async () => {
    if (!onTogglePayment) return
    setLocalUpdating('payment')
    try {
      await onTogglePayment(registration.id, registration.payment_status)
    } finally {
      setLocalUpdating(null)
    }
  }

  const isPresent = registration.attendance_status === 'present'
  const isAbsent = registration.attendance_status === 'absent'
  const isNotChecked = registration.attendance_status === 'not_checked'
  const isPaid = registration.payment_status === 'pago'
  const hasProof = !!registration.payment_proof_url

  return (
    <motion.div
      className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-5 border transition-all duration-300 overflow-hidden ${
        isPresent
          ? 'border-green-500/50 bg-green-500/5'
          : isAbsent
            ? 'border-red-500/50 bg-red-500/5'
            : 'border-white/10 hover:border-white/20'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      {/* Status badges */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {/* Attendance badge */}
        {!isNotChecked && (
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
              isPresent
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {isPresent ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Presente
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5" />
                Ausente
              </>
            )}
          </div>
        )}
        
        {/* Payment badge */}
        {isPaid ? (
          <span className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 bg-green-500 text-white shadow-lg shadow-green-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            PAGO
          </span>
        ) : (
          <button
            onClick={handleTogglePayment}
            disabled={localUpdating !== null}
            className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
          >
            {localUpdating === 'payment' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5" />
            )}
            Pendente
          </button>
        )}
      </div>

      {/* Person info */}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF7F00] to-[#00BFFF] flex items-center justify-center text-white font-display text-xl flex-shrink-0">
          {registration.nome_completo.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg text-white truncate pr-24">
            {registration.nome_completo}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {registration.idade} anos
              {registration.is_minor && (
                <span className="ml-1 px-1.5 py-0.5 bg-[#00BFFF]/20 text-[#00BFFF] text-[10px] rounded font-semibold">
                  MENOR
                </span>
              )}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {registration.nivel_interesse.map((nivel) => (
              <span
                key={nivel}
                className="px-2 py-0.5 bg-[#FF7F00]/20 text-[#FF7F00] text-xs rounded font-semibold uppercase"
              >
                {nivel}
              </span>
            ))}
            {registration.posicao_interesse?.map((pos) => (
              <span
                key={pos}
                className="px-2 py-0.5 bg-white/10 text-white/70 text-xs rounded capitalize"
              >
                {pos}
              </span>
            ))}
          </div>

          {/* Check-in time */}
          {registration.checked_in_at && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-white/40">
              <Clock className="w-3.5 h-3.5" />
              Check-in:{' '}
              {new Date(registration.checked_in_at).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleMarkPresent}
          disabled={isUpdating || localUpdating !== null || isPresent}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
            isPresent
              ? 'bg-green-500/30 text-green-400 cursor-default'
              : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 disabled:opacity-50'
          }`}
        >
          {localUpdating === 'present' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <CheckCircle2 className="w-5 h-5" />
          )}
          Presente
        </button>
        <button
          onClick={handleMarkAbsent}
          disabled={isUpdating || localUpdating !== null || isAbsent}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
            isAbsent
              ? 'bg-red-500/30 text-red-400 cursor-default'
              : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 disabled:opacity-50'
          }`}
        >
          {localUpdating === 'absent' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          Ausente
        </button>
      </div>
    </motion.div>
  )
}
