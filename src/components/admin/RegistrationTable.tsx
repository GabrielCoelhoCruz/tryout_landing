'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  Eye,
  Search,
  User,
  Download,
  Calendar,
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
  nivel_interesse: Database['public']['Enums']['team_level_type'][]
  posicao_interesse: Database['public']['Enums']['cheer_position_type'][] | null
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
  pago: { label: 'Pago', dotColor: 'bg-green-500', bgColor: 'bg-green-500/10', textColor: 'text-green-400' },
  comprovante_pendente: { label: 'Pendente', dotColor: 'bg-yellow-500', bgColor: 'bg-yellow-500/10', textColor: 'text-yellow-400' },
}

const positionConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  flyer: { label: 'Flyer', color: 'text-pink-400', bgColor: 'bg-pink-500/10' },
  base: { label: 'Base', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
  back: { label: 'Back', color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
}

const levelOrder = ['coed-n2', 'coed-n3', 'allgirl-n2-n3', 'allboy-n2-n3']

const levelConfig: Record<string, { label: string; color: string; bgColor: string; borderColor: string }> = {
  'coed-n2': { label: 'Coed N2', color: 'text-[#FF7F00]', bgColor: 'bg-[#FF7F00]/10', borderColor: 'border-[#FF7F00]/30' },
  'coed-n3': { label: 'Coed N3', color: 'text-[#00BFFF]', bgColor: 'bg-[#00BFFF]/10', borderColor: 'border-[#00BFFF]/30' },
  'allgirl-n2-n3': { label: 'All Girl', color: 'text-pink-400', bgColor: 'bg-pink-400/10', borderColor: 'border-pink-400/30' },
  'allboy-n2-n3': { label: 'All Boy', color: 'text-purple-400', bgColor: 'bg-purple-400/10', borderColor: 'border-purple-400/30' },
}

const ITEMS_PER_PAGE = 10

export function RegistrationTable({
  registrations,
  onViewDetails,
  onSearch,
  isLoading = false,
}: RegistrationTableProps) {
  const [sortField, setSortField] = useState<keyof Registration>('created_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [searchQuery, setSearchQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)

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
    setCurrentPage(1)
    onSearch(value)
  }

  const handleLevelFilter = (level: string) => {
    setLevelFilter(level)
    setCurrentPage(1)
  }

  // Filter by level
  const filteredRegistrations = registrations.filter((reg) => {
    if (levelFilter === 'all') return true
    return reg.nivel_interesse.includes(levelFilter as Database['public']['Enums']['team_level_type'])
  })

  // Sort
  const sortedRegistrations = [...filteredRegistrations].sort((a, b) => {
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

  // Pagination
  const totalPages = Math.ceil(sortedRegistrations.length / ITEMS_PER_PAGE)
  const paginatedRegistrations = sortedRegistrations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const SortIcon = ({ field }: { field: keyof Registration }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-3.5 h-3.5" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5" />
    )
  }

  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'Idade', 'Níveis', 'Posições', 'Pagamento', 'Data']
    const rows = sortedRegistrations.map((reg) => [
      reg.nome_completo,
      reg.email,
      reg.idade,
      reg.nivel_interesse.join(', '),
      reg.posicao_interesse?.join(', ') || '-',
      reg.payment_status === 'pago' ? 'Pago' : 'Pendente',
      new Date(reg.created_at).toLocaleDateString('pt-BR'),
    ])

    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `inscritos_tryout_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-white/40" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 bg-white/5 border-none rounded-xl text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#FF7F00]/30 text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Level Filter */}
          <div className="relative">
            <select
              value={levelFilter}
              onChange={(e) => handleLevelFilter(e.target.value)}
              className="appearance-none bg-white/5 border-none text-white text-sm font-medium rounded-full py-2.5 pl-4 pr-10 cursor-pointer focus:ring-2 focus:ring-[#FF7F00]/30"
            >
              <option value="all">Todas Equipes</option>
              <option value="coed-n2">Coed N2</option>
              <option value="coed-n3">Coed N3</option>
              <option value="allgirl-n2-n3">All Girl</option>
              <option value="allboy-n2-n3">All Boy</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/50">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th
                  className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider cursor-pointer hover:text-white/80 transition-colors"
                  onClick={() => handleSort('nome_completo')}
                >
                  <div className="flex items-center gap-1.5">
                    Atleta
                    <SortIcon field="nome_completo" />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider hidden lg:table-cell">
                  Detalhes
                </th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider hidden md:table-cell">
                  Posição
                </th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-[#FF7F00] border-t-transparent rounded-full animate-spin" />
                        <span className="text-white/50 text-sm">Carregando...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <User className="w-12 h-12 text-white/20" />
                        <span className="text-white/50 text-sm">
                          Nenhuma inscrição encontrada
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedRegistrations.map((registration) => {
                    const payment = registration.payment_status
                      ? paymentConfig[registration.payment_status]
                      : paymentConfig.comprovante_pendente

                    return (
                      <motion.tr
                        key={registration.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group hover:bg-white/[0.03] transition-colors"
                      >
                        {/* Athlete */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7F00] to-[#00BFFF] flex items-center justify-center text-white font-display text-base shrink-0 border border-white/10">
                              {registration.nome_completo.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {registration.nome_completo}
                              </p>
                              <p className="text-xs text-white/40">
                                {registration.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Details */}
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <div className="flex flex-col gap-2">
                            {/* Níveis */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {[...registration.nivel_interesse]
                                .sort((a, b) => levelOrder.indexOf(a) - levelOrder.indexOf(b))
                                .map((nivel) => {
                                  const config = levelConfig[nivel] || { label: nivel, color: 'text-white', bgColor: 'bg-white/10', borderColor: 'border-white/20' }
                                  return (
                                    <span
                                      key={nivel}
                                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${config.color} ${config.bgColor} border ${config.borderColor}`}
                                    >
                                      {config.label}
                                    </span>
                                  )
                                })}
                            </div>
                            {/* Info linha */}
                            <div className="flex items-center gap-2 text-xs text-white/50">
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-white/30" />
                                {registration.idade} anos
                              </span>
                              {registration.is_minor && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#00BFFF]/10 text-[#00BFFF] text-[10px] font-semibold uppercase">
                                  Menor
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Position */}
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1.5">
                            {registration.posicao_interesse && registration.posicao_interesse.length > 0 ? (
                              registration.posicao_interesse.map((pos) => {
                                const config = positionConfig[pos]
                                if (!config) {
                                  return (
                                    <span key={pos} className="text-xs text-white/50">{pos}</span>
                                  )
                                }
                                return (
                                  <span
                                    key={pos}
                                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${config.color} ${config.bgColor}`}
                                  >
                                    {config.label}
                                  </span>
                                )
                              })
                            ) : (
                              <span className="text-xs text-white/30 italic">Não informado</span>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${payment.bgColor} ${payment.textColor}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${payment.dotColor}`} />
                            {payment.label}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => onViewDetails(registration.id)}
                            className="p-2 text-white/40 hover:text-[#FF7F00] transition-colors"
                          >
                            <Eye className="w-5 h-5" />
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

        {/* Footer with pagination */}
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
          <p className="text-xs text-white/40">
            Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} a{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, sortedRegistrations.length)} de{' '}
            {sortedRegistrations.length} inscritos
          </p>

          {totalPages > 1 && (
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg text-xs font-medium text-white/50 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-[#FF7F00] text-white'
                        : 'text-white/50 hover:bg-white/5'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg text-xs font-medium text-white/50 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Próximo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
