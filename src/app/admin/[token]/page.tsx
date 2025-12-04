'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  CreditCard,
  AlertCircle,
  Calendar,
  DollarSign,
} from 'lucide-react'
import {
  getRegistrations,
  getStats,
  getRegistrationById,
  updatePaymentStatus,
  uploadPaymentProof,
} from '@/actions/admin-actions'
import { StatsCard, RegistrationTable, RegistrationDetail } from '@/components/admin'
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
  payment_status: Database['public']['Enums']['payment_status_type']
  checked_in_at: string | null
  created_at: string
  updated_at: string
}

type RegistrationFull = Database['public']['Views']['registrations_full']['Row']

type Stats = Database['public']['Views']['registration_stats']['Row']

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationFull | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // Actions
  const { execute: fetchRegistrations, status: registrationsStatus } = useAction(getRegistrations, {
    onSuccess: (data) => {
      if (data.data?.data) {
        setRegistrations(data.data.data as Registration[])
      }
    },
    onError: () => {
      toast.error('Erro ao carregar inscrições')
    },
  })

  const { execute: fetchStats } = useAction(getStats, {
    onSuccess: (data) => {
      if (data.data?.data) {
        setStats(data.data.data as Stats)
      }
    },
  })

  const { execute: fetchRegistrationDetail } = useAction(getRegistrationById, {
    onSuccess: (data) => {
      if (data.data?.data) {
        setSelectedRegistration(data.data.data as RegistrationFull)
        setIsDetailOpen(true)
      }
    },
    onError: () => {
      toast.error('Erro ao carregar detalhes')
    },
  })

  const { execute: updatePayment } = useAction(updatePaymentStatus, {
    onSuccess: () => {
      toast.success('Pagamento atualizado com sucesso')
      loadData()
      // Refresh detail if open
      if (selectedId) {
        fetchRegistrationDetail({ id: selectedId })
      }
    },
    onError: () => {
      toast.error('Erro ao atualizar pagamento')
    },
  })

  const { execute: uploadProof } = useAction(uploadPaymentProof, {
    onSuccess: () => {
      toast.success('Comprovante salvo com sucesso!')
      loadData()
      // Refresh detail if open
      if (selectedId) {
        fetchRegistrationDetail({ id: selectedId })
      }
    },
    onError: () => {
      toast.error('Erro ao salvar comprovante')
    },
  })

  // Load data
  const loadData = useCallback(() => {
    fetchRegistrations({
      limit: 100,
      offset: 0,
      search: searchQuery || null,
    })
    fetchStats({})
  }, [fetchRegistrations, fetchStats, searchQuery])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Handlers
  const handleViewDetails = (id: string) => {
    setSelectedId(id)
    fetchRegistrationDetail({ id })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleUpdatePayment = (id: string, status: string) => {
    updatePayment({
      registrationId: id,
      status: status as Database['public']['Enums']['payment_status_type'],
    })
  }

  const handleUploadProof = (id: string, url: string) => {
    uploadProof({
      registrationId: id,
      proofUrl: url,
    })
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setSelectedRegistration(null)
    setSelectedId(null)
  }

  const isLoading = registrationsStatus === 'executing'

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display text-white">Dashboard</h1>
        <p className="text-white/60 mt-1">
          Visão geral das inscrições do Tryout 2026
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total de Inscritos"
          value={stats?.total_registrations || 0}
          icon={Users}
          color="#FF7F00"
          trend={
            stats?.last_7_days
              ? { value: stats.last_7_days, label: 'últimos 7 dias' }
              : undefined
          }
        />
        <StatsCard
          title="Pagamento Confirmado"
          value={stats?.paid_count || 0}
          icon={DollarSign}
          color="#22C55E"
        />
        <StatsCard
          title="Comprovante Pendente"
          value={stats?.payment_pending_count || 0}
          icon={AlertCircle}
          color="#EAB308"
        />
        <StatsCard
          title="Presentes no Tryout"
          value={stats?.present_count || 0}
          icon={UserCheck}
          color="#3B82F6"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-display text-white">
            {stats?.n2_interest_count || 0}
          </div>
          <div className="text-white/50 text-sm">Interesse N2</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-display text-white">
            {stats?.n3_interest_count || 0}
          </div>
          <div className="text-white/50 text-sm">Interesse N3</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-display text-white">
            {stats?.flyer_interest_count || 0}
          </div>
          <div className="text-white/50 text-sm">Flyers</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-display text-white">
            {stats?.base_interest_count || 0}
          </div>
          <div className="text-white/50 text-sm">Bases</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-display text-white">
            {stats?.minors_count || 0}
          </div>
          <div className="text-white/50 text-sm">Menores</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-display text-white">
            {stats?.adults_count || 0}
          </div>
          <div className="text-white/50 text-sm">Adultos</div>
        </div>
      </div>

      {/* Attendance Stats (for tryout day) */}
      <div className="bg-gradient-to-r from-[#FF7F00]/10 to-[#00BFFF]/10 rounded-2xl p-6 border border-[#FF7F00]/20">
        <h2 className="font-display text-xl text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#FF7F00]" />
          Status de Presença (Dia do Tryout)
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-display text-green-400">
              {stats?.present_count || 0}
            </div>
            <div className="text-white/50 text-sm">Presentes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display text-red-400">
              {stats?.absent_count || 0}
            </div>
            <div className="text-white/50 text-sm">Ausentes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display text-white/60">
              {stats?.not_checked_count || 0}
            </div>
            <div className="text-white/50 text-sm">Aguardando</div>
          </div>
        </div>
      </div>

      {/* Registrations Table */}
      <div>
        <h2 className="font-display text-xl text-white mb-4">
          Lista de Inscritos
        </h2>
        <RegistrationTable
          registrations={registrations}
          onViewDetails={handleViewDetails}
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </div>

      {/* Registration Detail Modal */}
      <RegistrationDetail
        registration={selectedRegistration}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        onUpdatePayment={handleUpdatePayment}
        onUploadProof={handleUploadProof}
      />
    </div>
  )
}
