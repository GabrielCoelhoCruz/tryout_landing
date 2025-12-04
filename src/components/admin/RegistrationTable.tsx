'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  Eye,
  Search,
  User,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertCircle,
} from 'lucide-react'
import type { Database } from '@/types/database'

type Registration = {
  id: string
  nome_completo: string
  email: string
  telefone: string
  idade: number
  is_minor: boolean | null
  data_nascimento: string
  genero: Database['public']['Enums']['gender_type']
  nivel_interesse: Database['public']['Enums']['cheer_level_type'][]
  posicao_interesse: Database['public']['Enums']['cheer_position_type'][] | null
  nivel_habilidades: Database['public']['Enums']['skill_level_type']
  tempo_experiencia: Database['public']['Enums']['experience_time_type']
  status: Database['public']['Enums']['registration_status_type']
  attendance_status: Database['public']['Enums']['attendance_status_type']
  payment_status?: Database['public']['Enums']['payment_status_type']
  payment_proof_url?: string | null
  checked_in_at: string | null
  created_at: string
  updated_at: string
}

interface RegistrationTableProps {
  registrations: Registration[]
  onViewDetails: (id: string) => void
  onSearch: (query: string) => void
  isLoading?: boolean
}

const paymentConfig = {
  pago: { label: 'PAGO', color: 'green', icon: CheckCircle2, isBold: true },
  comprovante_pendente: { label: 'Pendente', color: 'yellow', icon: AlertCircle, isBold: false },
}

export function RegistrationTable({
  registrations,
  onViewDetails,
  onSearch,
  isLoading = false,
}: RegistrationTableProps) {
  const [sortField, setSortField] = useState<keyof Registration>('created_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSort = (field: keyof Registration) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const sortedRegistrations = [...registrations].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (aValue === null || aValue === undefined) return 1
    if (bValue === null || bValue === undefined) return -1

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const SortIcon = ({ field }: { field: keyof Registration }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    )
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-[#FF7F00]/50 focus:ring-1 focus:ring-[#FF7F00]/20 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('nome_completo')}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nome
                    <SortIcon field="nome_completo" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider cursor-pointer hover:text-white transition-colors hidden md:table-cell"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                    <SortIcon field="email" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider cursor-pointer hover:text-white transition-colors hidden lg:table-cell"
                  onClick={() => handleSort('idade')}
                >
                  <div className="flex items-center gap-2">
                    Idade
                    <SortIcon field="idade" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider hidden lg:table-cell">
                  Nível
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Pagamento
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider cursor-pointer hover:text-white transition-colors hidden sm:table-cell"
                  onClick={() => handleSort('created_at')}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Data
                    <SortIcon field="created_at" />
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-[#FF7F00] border-t-transparent rounded-full animate-spin" />
                        <span className="text-white/60">Carregando...</span>
                      </div>
                    </td>
                  </tr>
                ) : sortedRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <User className="w-12 h-12 text-white/20" />
                        <span className="text-white/60">
                          Nenhuma inscrição encontrada
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sortedRegistrations.map((registration) => {
                    const payment = registration.payment_status 
                      ? paymentConfig[registration.payment_status]
                      : paymentConfig.comprovante_pendente
                    const PaymentIcon = payment.icon

                    return (
                      <motion.tr
                        key={registration.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7F00] to-[#00BFFF] flex items-center justify-center text-white font-display text-lg">
                              {registration.nome_completo.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-white">
                                {registration.nome_completo}
                              </div>
                              <div className="text-white/40 text-sm md:hidden">
                                {registration.email}
                              </div>
                              {registration.is_minor && (
                                <span className="inline-block mt-1 px-2 py-0.5 bg-[#00BFFF]/20 text-[#00BFFF] text-xs rounded-full">
                                  Menor
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white/70 hidden md:table-cell">
                          {registration.email}
                        </td>
                        <td className="px-6 py-4 text-white/70 hidden lg:table-cell">
                          {registration.idade} anos
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {registration.nivel_interesse.map((nivel) => (
                              <span
                                key={nivel}
                                className="px-2 py-0.5 bg-[#FF7F00]/20 text-[#FF7F00] text-xs rounded-full uppercase font-semibold"
                              >
                                {nivel}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {payment.isBold ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white shadow-lg shadow-green-500/30">
                              <PaymentIcon className="w-3.5 h-3.5" />
                              {payment.label}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400">
                              <PaymentIcon className="w-3.5 h-3.5" />
                              {payment.label}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-white/50 text-sm hidden sm:table-cell">
                          {new Date(registration.created_at).toLocaleDateString(
                            'pt-BR',
                            {
                              day: '2-digit',
                              month: 'short',
                            }
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => onViewDetails(registration.id)}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white transition-all text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">Ver</span>
                          </button>
                        </td>
                      </motion.tr>
                    )
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Results count */}
      <div className="text-white/40 text-sm text-center">
        {sortedRegistrations.length} inscrição(ões) encontrada(s)
      </div>
    </div>
  )
}
