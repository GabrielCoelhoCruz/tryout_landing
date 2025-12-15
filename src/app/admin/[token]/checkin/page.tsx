'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Users,
  UserCheck,
  UserX,
  Clock,
  RefreshCw,
} from 'lucide-react'
import {
  getRegistrationsForCheckin,
  updateAttendance,
  updatePaymentStatus,
  getStats,
} from '@/actions/admin-actions'
import { CheckinCard } from '@/components/admin'
import type { Database } from '@/types/database'

type CheckinRegistration = {
  id: string
  nome_completo: string
  email: string
  telefone: string
  idade: number
  is_minor: boolean | null
  nivel_interesse: Database['public']['Enums']['cheer_level_type'][]
  posicao_interesse: Database['public']['Enums']['cheer_position_type'][] | null
  attendance_status: Database['public']['Enums']['attendance_status_type']
  payment_status: Database['public']['Enums']['payment_status_type']
  payment_proof_url?: string | null
  checked_in_at: string | null
}

type AttendanceFilter = 'all' | 'not_checked' | 'present' | 'absent'

export default function CheckinPage() {
  const [registrations, setRegistrations] = useState<CheckinRegistration[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [attendanceFilter, setAttendanceFilter] = useState<AttendanceFilter>('all')
  const [stats, setStats] = useState<{
    present: number
    absent: number
    notChecked: number
    total: number
    paid: number
    paymentPending: number
    flyers: number
    bases: number
    backs: number
    n2: number
    n3: number
    n4: number
  }>({ present: 0, absent: 0, notChecked: 0, total: 0, paid: 0, paymentPending: 0, flyers: 0, bases: 0, backs: 0, n2: 0, n3: 0, n4: 0 })

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Actions
  const { execute: fetchRegistrations, status: fetchStatus } = useAction(
    getRegistrationsForCheckin,
    {
      onSuccess: (data) => {
        if (data.data?.data) {
          setRegistrations(data.data.data as CheckinRegistration[])
        }
      },
      onError: () => {
        toast.error('Erro ao carregar inscrições')
      },
    }
  )

  const { execute: fetchStats } = useAction(getStats, {
    onSuccess: (data) => {
      if (data.data?.data) {
        const s = data.data.data
        setStats({
          present: s.present_count || 0,
          absent: s.absent_count || 0,
          notChecked: s.not_checked_count || 0,
          total: s.total_registrations || 0,
          paid: s.paid_count || 0,
          paymentPending: s.payment_pending_count || 0,
          flyers: s.flyer_interest_count || 0,
          bases: s.base_interest_count || 0,
          backs: s.back_interest_count || 0,
          n2: s.n2_interest_count || 0,
          n3: s.n3_interest_count || 0,
          n4: s.n4_interest_count || 0,
        })
      }
    },
  })

  const { execute: markAttendance } = useAction(updateAttendance, {
    onSuccess: () => {
      loadData()
    },
    onError: () => {
      toast.error('Erro ao atualizar presença')
    },
  })

  const { execute: updatePayment } = useAction(updatePaymentStatus, {
    onSuccess: () => {
      toast.success('Pagamento atualizado!')
      loadData()
    },
    onError: () => {
      toast.error('Erro ao atualizar pagamento')
    },
  })

  // Load data
  const loadData = useCallback(() => {
    fetchRegistrations({
      search: debouncedSearch || undefined,
      attendanceFilter,
    })
    fetchStats()
  }, [fetchRegistrations, fetchStats, debouncedSearch, attendanceFilter])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Handlers - return promises so CheckinCard can track loading state
  const handleMarkPresent = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      markAttendance({
        registrationId: id,
        status: 'present',
        checkedBy: 'Admin',
      })
      // Resolve after a short delay to allow the action to complete
      // The action's onSuccess will refresh the data
      setTimeout(() => {
        toast.success('Marcado como presente!')
        resolve()
      }, 500)
    })
  }

  const handleMarkAbsent = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      markAttendance({
        registrationId: id,
        status: 'absent',
        checkedBy: 'Admin',
      })
      setTimeout(() => {
        toast.success('Marcado como ausente')
        resolve()
      }, 500)
    })
  }

  const handleTogglePayment = async (id: string, currentStatus: string): Promise<void> => {
    return new Promise((resolve) => {
      const newStatus = currentStatus === 'pago' ? 'comprovante_pendente' : 'pago'
      updatePayment({
        registrationId: id,
        status: newStatus as Database['public']['Enums']['payment_status_type'],
      })
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }

  const handleRefresh = () => {
    loadData()
    toast.success('Lista atualizada')
  }

  const isLoading = fetchStatus === 'executing'

  const filterButtons: { value: AttendanceFilter; label: string; icon: React.ElementType }[] = [
    { value: 'all', label: 'Todos', icon: Users },
    { value: 'not_checked', label: 'Aguardando', icon: Clock },
    { value: 'present', label: 'Presentes', icon: UserCheck },
    { value: 'absent', label: 'Ausentes', icon: UserX },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display text-white">Check-in</h1>
          <p className="text-white/60 mt-1">
            Confirme a presença dos participantes no dia do tryout
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 hover:text-white transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Main stats row */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
          <div className="text-2xl font-display text-white">{stats.total}</div>
          <div className="text-white/50 text-xs">Total</div>
        </div>
        <div className="bg-green-500/10 rounded-xl p-3 border border-green-500/20 text-center">
          <div className="text-2xl font-display text-green-400">{stats.present}</div>
          <div className="text-green-400/70 text-xs">Presentes</div>
        </div>
        <div className="bg-red-500/10 rounded-xl p-3 border border-red-500/20 text-center">
          <div className="text-2xl font-display text-red-400">{stats.absent}</div>
          <div className="text-red-400/70 text-xs">Ausentes</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
          <div className="text-2xl font-display text-white/60">{stats.notChecked}</div>
          <div className="text-white/50 text-xs">Aguardando</div>
        </div>
      </div>

      {/* Secondary stats: Payment, Positions & Levels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Payment stats - Simplified */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/50 text-xs uppercase tracking-wider">Pagamento</span>
            <span className="text-white text-sm font-semibold">
              {stats.paid}/{stats.total}
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: stats.total > 0 ? `${(stats.paid / stats.total) * 100}%` : '0%',
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-400">{stats.paid} pagos</span>
            <span className="text-yellow-400">{stats.paymentPending} pendentes</span>
          </div>
        </div>

        {/* Position stats - Mini bar chart */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-white/50 text-xs uppercase tracking-wider mb-3">Posições</div>
          <div className="space-y-2">
            {[
              { label: 'Flyer', value: stats.flyers, color: 'bg-pink-500' },
              { label: 'Base', value: stats.bases, color: 'bg-emerald-500' },
              { label: 'Back', value: stats.backs, color: 'bg-purple-500' },
            ].map((item) => {
              const maxPosition = Math.max(stats.flyers, stats.bases, stats.backs, 1)
              return (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-white/60 text-xs w-10">{item.label}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${item.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / maxPosition) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="text-white text-xs font-semibold w-6 text-right">{item.value}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Level stats - Mini bar chart */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-white/50 text-xs uppercase tracking-wider mb-3">Níveis</div>
          <div className="space-y-2">
            {[
              { label: 'N2', value: stats.n2, color: 'bg-[#FF7F00]' },
              { label: 'N3', value: stats.n3, color: 'bg-[#00BFFF]' },
              { label: 'N4', value: stats.n4, color: 'bg-yellow-400' },
            ].map((item) => {
              const maxLevel = Math.max(stats.n2, stats.n3, stats.n4, 1)
              return (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-white/60 text-xs w-6">{item.label}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${item.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / maxLevel) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="text-white text-xs font-semibold w-6 text-right">{item.value}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-sm">Progresso do Check-in</span>
          <span className="text-white font-semibold">
            {stats.total > 0
              ? Math.round(((stats.present + stats.absent) / stats.total) * 100)
              : 0}
            %
          </span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full flex">
            <motion.div
              className="bg-green-500 h-full"
              initial={{ width: 0 }}
              animate={{
                width: stats.total > 0 ? `${(stats.present / stats.total) * 100}%` : '0%',
              }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="bg-red-500 h-full"
              initial={{ width: 0 }}
              animate={{
                width: stats.total > 0 ? `${(stats.absent / stats.total) * 100}%` : '0%',
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-lg placeholder:text-white/40 focus:border-[#FF7F00]/50 focus:ring-2 focus:ring-[#FF7F00]/20 transition-all"
            autoFocus
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filterButtons.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setAttendanceFilter(value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                attendanceFilter === value
                  ? 'bg-[#FF7F00] text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {value === 'present' && stats.present > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {stats.present}
                </span>
              )}
              {value === 'absent' && stats.absent > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {stats.absent}
                </span>
              )}
              {value === 'not_checked' && stats.notChecked > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {stats.notChecked}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Registration Cards */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="w-10 h-10 border-2 border-[#FF7F00] border-t-transparent rounded-full animate-spin mb-4" />
              <span className="text-white/60">Carregando...</span>
            </motion.div>
          ) : registrations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <Users className="w-16 h-16 text-white/20 mb-4" />
              <h3 className="text-xl font-display text-white/60 mb-2">
                Nenhum inscrito encontrado
              </h3>
              <p className="text-white/40 max-w-md">
                {searchQuery
                  ? 'Tente buscar com outros termos'
                  : 'Não há inscritos para exibir com os filtros selecionados'}
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {registrations.map((registration) => (
                <CheckinCard
                  key={registration.id}
                  registration={registration}
                  onMarkPresent={handleMarkPresent}
                  onMarkAbsent={handleMarkAbsent}
                  onTogglePayment={handleTogglePayment}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Results count */}
      {!isLoading && registrations.length > 0 && (
        <div className="text-white/40 text-sm text-center">
          {registrations.length} inscrito(s) encontrado(s)
        </div>
      )}
    </div>
  )
}
