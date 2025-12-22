'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import {
  Users,
  UserCheck,
  AlertCircle,
  Calendar,
  DollarSign,
  TrendingUp,
} from 'lucide-react'
import {
  getRegistrations,
  getStats,
  getRegistrationById,
  updatePaymentStatus,
  uploadPaymentProof,
  updateAthletePhoto,
  updateTryoutNumber,
} from '@/actions/admin-actions'
import { StatsCard, RegistrationTable, RegistrationDetail } from '@/components/admin'
import { BarChart, DonutChart, LineChart } from '@/components/admin/charts'
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
  payment_status: Database['public']['Enums']['payment_status_type']
  athlete_photo_url?: string | null
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

  const { execute: uploadPhoto } = useAction(updateAthletePhoto, {
    onSuccess: () => {
      toast.success('Foto do atleta salva com sucesso!')
      loadData()
      if (selectedId) {
        fetchRegistrationDetail({ id: selectedId })
      }
    },
    onError: () => {
      toast.error('Erro ao salvar foto do atleta')
    },
  })

  const { execute: saveTryoutNumber } = useAction(updateTryoutNumber, {
    onSuccess: () => {
      toast.success('Número do tryout salvo!')
      loadData()
      if (selectedId) {
        fetchRegistrationDetail({ id: selectedId })
      }
    },
    onError: () => {
      toast.error('Erro ao salvar número do tryout')
    },
  })

  // Load data
  const loadData = useCallback(() => {
    fetchRegistrations({
      limit: 100,
      offset: 0,
      search: searchQuery || null,
    })
    fetchStats()
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

  const handleUploadPhoto = (id: string, url: string) => {
    uploadPhoto({
      registrationId: id,
      photoUrl: url,
    })
  }

  const handleUpdateTryoutNumber = (id: string, number: string) => {
    saveTryoutNumber({
      registrationId: id,
      tryoutNumber: number,
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
          progress={
            stats?.total_registrations
              ? {
                  current: stats?.paid_count || 0,
                  total: stats.total_registrations,
                  label: `${Math.round(((stats?.paid_count || 0) / stats.total_registrations) * 100)}% do total`,
                }
              : undefined
          }
        />
        <StatsCard
          title="Comprovante Pendente"
          value={stats?.payment_pending_count || 0}
          icon={AlertCircle}
          color="#EAB308"
          subtitle="Aguardando confirmação"
        />
        <StatsCard
          title="Check-in Status"
          value={`${stats?.present_count || 0}/${stats?.total_registrations || 0}`}
          icon={UserCheck}
          color="#3B82F6"
          progress={
            stats?.total_registrations
              ? {
                  current: stats?.present_count || 0,
                  total: stats.total_registrations,
                }
              : undefined
          }
        />
      </div>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart: Interesse por Equipe */}
        <BarChart
          title="Interesse por Equipe"
          subtitle="Distribuição de atletas por equipe"
          data={[
            { label: 'Coed N2', value: stats?.coed_n2_interest_count || 0, color: '#FF7F00' },
            { label: 'Coed N3', value: stats?.coed_n3_interest_count || 0, color: '#00BFFF' },
            { label: 'Coed N4', value: stats?.coed_n4_interest_count || 0, color: '#10B981' },
            { label: 'All Girl', value: stats?.allgirl_interest_count || 0, color: '#EC4899' },
            { label: 'All Boy', value: stats?.allboy_interest_count || 0, color: '#A855F7' },
          ]}
        />

        {/* Donut Chart: Interesse por Posição */}
        <DonutChart
          title="Interesse por Posição"
          subtitle="Distribuição por função"
          centerLabel="Total"
          data={[
            { label: 'Flyer', value: stats?.flyer_interest_count || 0, color: '#EC4899' },
            { label: 'Base', value: stats?.base_interest_count || 0, color: '#10B981' },
            { label: 'Back', value: stats?.back_interest_count || 0, color: '#A855F7' },
          ]}
        />

        {/* Line Chart: Distribuição por Idade */}
        <LineChart
          title="Distribuição por Idade"
          subtitle="Menores vs Adultos"
          color="#00BFFF"
          data={[
            { label: 'Menores', value: stats?.minors_count || 0 },
            { label: 'Adultos', value: stats?.adults_count || 0 },
          ]}
        />
      </section>

      {/* Attendance Stats (for tryout day) */}
      <div className="bg-gradient-to-r from-[#FF7F00]/10 to-[#00BFFF]/10 rounded-2xl p-6 border border-[#FF7F00]/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#FF7F00]" />
            Status de Presença (Dia do Tryout)
          </h2>
          <div className="text-sm text-white/60">
            {stats?.present_count || 0}/{stats?.total_registrations || 0} check-ins
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FF7F00] to-[#00BFFF] transition-all duration-500"
              style={{
                width: `${stats?.total_registrations ? ((stats?.present_count || 0) / stats.total_registrations) * 100 : 0}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/40">
            <span>0%</span>
            <span>
              {stats?.total_registrations
                ? Math.round(((stats?.present_count || 0) / stats.total_registrations) * 100)
                : 0}% concluído
            </span>
            <span>100%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">Presentes</span>
              <UserCheck className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-3xl font-display text-green-400">
              {stats?.present_count || 0}
            </div>
          </div>
          <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">Ausentes</span>
              <AlertCircle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-3xl font-display text-red-400">
              {stats?.absent_count || 0}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Aguardando</span>
              <Calendar className="w-4 h-4 text-white/40" />
            </div>
            <div className="text-3xl font-display text-white/60">
              {stats?.not_checked_count || 0}
            </div>
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
        onUploadPhoto={handleUploadPhoto}
        onUpdateTryoutNumber={handleUpdateTryoutNumber}
      />
    </div>
  )
}
