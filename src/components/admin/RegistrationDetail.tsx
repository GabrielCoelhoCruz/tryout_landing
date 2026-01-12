'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  Activity,
  Clock,
  Users,
  Star,
  Trophy,
  CreditCard,
  Receipt,
  Upload,
  FileCheck,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  Camera,
  Hash,
  Save,
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { formatDateBR } from '@/lib/utils'
import type { Database } from '@/types/database'
import { toast } from 'sonner'

type RegistrationFull = Database['public']['Views']['registrations_full']['Row']

interface RegistrationDetailProps {
  registration: RegistrationFull | null
  isOpen: boolean
  onClose: () => void
  onUpdatePayment?: (id: string, status: string) => void
  onUploadProof?: (id: string, url: string) => void
  onUploadPhoto?: (id: string, url: string) => void
  onUpdateTryoutNumber?: (id: string, number: string) => void
}

const genderLabels = {
  feminino: 'Feminino',
  masculino: 'Masculino',
  outro: 'Outro',
}

const experienceLabels = {
  'nunca-pratiquei': 'Nunca pratiquei',
  'menos-6-meses': 'Menos de 6 meses',
  '6-12-meses': '6 a 12 meses',
  '1-2-anos': '1 a 2 anos',
  '2-anos-mais': 'Mais de 2 anos',
}

const skillLabels = {
  basico: 'Básico',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

const sportsLabels = {
  ginastica: 'Ginástica',
  tumbling: 'Tumbling',
  danca: 'Dança',
  nenhuma: 'Nenhuma',
}

const weekdayLabels = {
  segunda: 'Segunda',
  terca: 'Terça',
  quarta: 'Quarta',
  quinta: 'Quinta',
  sexta: 'Sexta',
  sabado: 'Sábado',
  domingo: 'Domingo',
}

const periodLabels = {
  manha: 'Manhã',
  tarde: 'Tarde',
  noite: 'Noite',
}

const yesNoLabels = {
  sim: 'Sim',
  nao: 'Não',
}

const yesNoMaybeLabels = {
  sim: 'Sim',
  nao: 'Não',
  talvez: 'Talvez',
}

const teamLevelLabels = {
  'coed-n2': 'Coed N2',
  'coed-n3': 'Coed N3',
  'coed-n4': 'Coed N4',
  'allgirl-n2-n3': 'All Girl N2/N3',
  'allboy-n2-n3': 'All Boy N2/N3',
}

export function RegistrationDetail({
  registration,
  isOpen,
  onClose,
  onUpdatePayment,
  onUploadProof,
  onUploadPhoto,
  onUpdateTryoutNumber,
}: RegistrationDetailProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [tryoutNumber, setTryoutNumber] = useState(registration?.tryout_number || '')
  const [isSavingNumber, setIsSavingNumber] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)

  if (!registration) return null

  const isPaid = registration.payment_status === 'pago'
  const hasProof = !!registration.payment_proof_url
  const hasPhoto = !!registration.athlete_photo_url

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !registration.id) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Tipo de arquivo não permitido', {
        description: 'Use JPG, PNG, WebP ou PDF',
      })
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Arquivo muito grande', {
        description: 'Tamanho máximo: 5MB',
      })
      return
    }

    setIsUploading(true)

    try {
      // Create Supabase client for upload
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${registration.id}-${Date.now()}.${fileExt}`

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('payment-proofs')
        .getPublicUrl(fileName)

      if (onUploadProof && urlData.publicUrl) {
        onUploadProof(registration.id, urlData.publicUrl)
        toast.success('Comprovante anexado com sucesso!', {
          description: 'Status atualizado para PAGO',
        })
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Erro ao fazer upload', {
        description: 'Tente novamente mais tarde',
      })
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !registration.id) return

    // Validate file type (images only)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Tipo de arquivo não permitido', {
        description: 'Use JPG, PNG ou WebP',
      })
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Arquivo muito grande', {
        description: 'Tamanho máximo: 5MB',
      })
      return
    }

    setIsUploadingPhoto(true)

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const fileExt = file.name.split('.').pop()
      const fileName = `${registration.id}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('athlete-photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) {
        throw uploadError
      }

      const { data: urlData } = supabase.storage
        .from('athlete-photos')
        .getPublicUrl(fileName)

      if (onUploadPhoto && urlData.publicUrl) {
        onUploadPhoto(registration.id, urlData.publicUrl)
        toast.success('Foto anexada com sucesso!')
      }
    } catch (error) {
      console.error('Photo upload error:', error)
      toast.error('Erro ao fazer upload da foto', {
        description: 'Tente novamente mais tarde',
      })
    } finally {
      setIsUploadingPhoto(false)
      if (photoInputRef.current) {
        photoInputRef.current.value = ''
      }
    }
  }

  const handleSaveTryoutNumber = async () => {
    if (!registration.id || !tryoutNumber.trim()) return

    setIsSavingNumber(true)
    try {
      if (onUpdateTryoutNumber) {
        onUpdateTryoutNumber(registration.id, tryoutNumber.trim())
        toast.success('Número do tryout salvo!')
      }
    } catch (error) {
      console.error('Error saving tryout number:', error)
      toast.error('Erro ao salvar número do tryout')
    } finally {
      setIsSavingNumber(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-[#0a0a1a] border-l border-white/10 z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/20">
                    {registration.athlete_photo_url ? (
                      <Image
                        src={registration.athlete_photo_url}
                        alt={registration.nome_completo || 'Atleta'}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#FF7F00] to-[#00BFFF] flex items-center justify-center text-white font-display text-2xl">
                        {registration.nome_completo?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-display text-white">
                      {registration.nome_completo}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      {registration.is_minor && (
                        <span className="px-3 py-0.5 bg-[#00BFFF]/20 text-[#00BFFF] text-xs rounded-full font-semibold">
                          Menor de idade
                        </span>
                      )}
                      {isPaid && (
                        <span className="px-3 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          PAGO
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white/60" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Tryout Info Section - Photo & Number */}
              <Section title="Informações do Tryout" icon={Hash}>
                <div className="space-y-4">
                  {/* Tryout Number */}
                  <div>
                    <label className="text-white/40 text-sm mb-2 block">Número Tryout</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tryoutNumber}
                        onChange={(e) => setTryoutNumber(e.target.value)}
                        placeholder="Ex: 001"
                        className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#FF7F00]/50 focus:ring-1 focus:ring-[#FF7F00]/20"
                        maxLength={10}
                      />
                      <button
                        onClick={handleSaveTryoutNumber}
                        disabled={isSavingNumber || !tryoutNumber.trim()}
                        className="px-4 py-2.5 bg-[#FF7F00]/20 hover:bg-[#FF7F00]/30 text-[#FF7F00] rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSavingNumber ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Salvar
                      </button>
                    </div>
                    {registration.tryout_number && (
                      <p className="text-white/40 text-xs mt-2">
                        Número atual: <span className="text-[#FF7F00] font-semibold">{registration.tryout_number}</span>
                      </p>
                    )}
                  </div>

                  {/* Athlete Photo */}
                  <div>
                    <label className="text-white/40 text-sm mb-2 block">Foto do Atleta</label>
                    <div className="flex gap-4">
                      {/* Photo Preview */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                        {hasPhoto ? (
                          <Image
                            src={registration.athlete_photo_url!}
                            alt={registration.nome_completo || 'Atleta'}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <Camera className="w-8 h-8 text-white/20" />
                        )}
                      </div>

                      {/* Upload Button */}
                      <div className="flex-1 flex flex-col justify-center">
                        <input
                          ref={photoInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handlePhotoSelect}
                          className="hidden"
                        />
                        <button
                          onClick={() => photoInputRef.current?.click()}
                          disabled={isUploadingPhoto}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00BFFF]/20 hover:bg-[#00BFFF]/30 text-[#00BFFF] rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isUploadingPhoto ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Camera className="w-4 h-4" />
                              {hasPhoto ? 'Trocar Foto' : 'Anexar Foto'}
                            </>
                          )}
                        </button>
                        <p className="text-white/40 text-xs mt-2">
                          JPG, PNG ou WebP (máx. 5MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Payment Status Section */}
              <Section title="Pagamento" icon={CreditCard}>
                <div className="space-y-4">
                  {/* Registration Value */}
                  {registration.valor_inscricao && (
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FF7F00]/10 to-[#00BFFF]/10 rounded-xl border border-[#FF7F00]/20">
                      <div>
                        <p className="text-white/60 text-sm">Valor da Inscrição</p>
                        <p className="text-2xl font-display text-white">
                          R$ {registration.valor_inscricao},00
                        </p>
                      </div>
                      {registration.atleta_skyhigh_2025 === 'sim' && (
                        <span className="px-3 py-1.5 bg-[#FF7F00]/20 text-[#FF7F00] text-xs rounded-full font-semibold">
                          Atleta SkyHigh 2025
                        </span>
                      )}
                    </div>
                  )}

                  {/* Current Status */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      {isPaid ? (
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <Receipt className="w-5 h-5 text-yellow-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium">
                          {isPaid ? 'Pagamento Confirmado' : 'Comprovante Pendente'}
                        </p>
                        <p className="text-white/50 text-sm">
                          {hasProof ? 'Comprovante anexado' : 'Nenhum comprovante'}
                        </p>
                      </div>
                    </div>
                    {isPaid && (
                      <span className="px-4 py-1.5 bg-green-500 text-white text-sm font-bold rounded-full">
                        PAGO
                      </span>
                    )}
                  </div>

                  {/* Proof preview/upload */}
                  {hasProof ? (
                    <div className="space-y-2">
                      <p className="text-white/60 text-sm">Comprovante anexado:</p>
                      <a
                        href={registration.payment_proof_url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-[#FF7F00]/20 flex items-center justify-center">
                          {registration.payment_proof_url?.includes('.pdf') ? (
                            <FileCheck className="w-6 h-6 text-[#FF7F00]" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-[#FF7F00]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">Ver Comprovante</p>
                          <p className="text-white/50 text-xs truncate max-w-xs">
                            {registration.payment_proof_url}
                          </p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                      </a>
                    </div>
                  ) : null}

                  {/* Upload button */}
                  <div className="space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FF7F00]/20 hover:bg-[#FF7F00]/30 text-[#FF7F00] rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          {hasProof ? 'Trocar Comprovante' : 'Anexar Comprovante'}
                        </>
                      )}
                    </button>
                    <p className="text-white/40 text-xs text-center">
                      Formatos aceitos: JPG, PNG, WebP, PDF (máx. 5MB)
                    </p>
                  </div>

                  {/* Manual status update */}
                  {onUpdatePayment && registration.id && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-white/40 text-sm mb-3">Atualizar status manualmente:</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onUpdatePayment(registration.id!, 'pago')}
                          disabled={isPaid}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            isPaid
                              ? 'bg-green-500/30 text-green-400 cursor-not-allowed'
                              : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Marcar como Pago
                        </button>
                        <button
                          onClick={() => onUpdatePayment(registration.id!, 'comprovante_pendente')}
                          disabled={!isPaid}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            !isPaid
                              ? 'bg-yellow-500/30 text-yellow-400 cursor-not-allowed'
                              : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                          }`}
                        >
                          <Receipt className="w-4 h-4" />
                          Marcar Pendente
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Section>

              {/* Personal Information */}
              <Section title="Dados Pessoais" icon={User}>
                <InfoGrid>
                  <InfoItem
                    label="Data de Nascimento"
                    value={formatDateBR(registration.data_nascimento)}
                  />
                  <InfoItem
                    label="Idade"
                    value={registration.idade ? `${registration.idade} anos` : '-'}
                  />
                  <InfoItem
                    label="Gênero"
                    value={registration.genero ? genderLabels[registration.genero] : '-'}
                  />
                </InfoGrid>
              </Section>

              {/* Contact Information */}
              <Section title="Contato" icon={Mail}>
                <InfoGrid>
                  <InfoItem label="E-mail" value={registration.email || '-'} />
                  <InfoItem label="Telefone" value={registration.telefone || '-'} />
                </InfoGrid>
              </Section>

              {/* Guardian Information (if minor) */}
              {registration.is_minor && (
                <Section title="Responsável" icon={Users}>
                  <InfoGrid>
                    <InfoItem
                      label="Nome do Responsável"
                      value={registration.nome_responsavel || '-'}
                    />
                    <InfoItem
                      label="Telefone"
                      value={registration.contato_responsavel || '-'}
                    />
                    <InfoItem
                      label="E-mail"
                      value={registration.email_responsavel || '-'}
                    />
                  </InfoGrid>
                </Section>
              )}

              {/* Experience */}
              <Section title="Experiência" icon={Trophy}>
                <InfoGrid>
                  <InfoItem
                    label="Pratica Cheerleading"
                    value={
                      registration.pratica_cheerleading
                        ? yesNoLabels[registration.pratica_cheerleading]
                        : '-'
                    }
                  />
                  <InfoItem
                    label="Tempo de Experiência"
                    value={
                      registration.tempo_experiencia
                        ? experienceLabels[registration.tempo_experiencia]
                        : '-'
                    }
                  />
                  <InfoItem
                    label="Equipe Anterior"
                    value={registration.equipe_anterior || 'Não informado'}
                  />
                  <InfoItem
                    label="Experiência em Ginástica"
                    value={
                      registration.experiencia_ginastica
                        ? sportsLabels[registration.experiencia_ginastica]
                        : 'Nenhuma'
                    }
                  />
                  <InfoItem
                    label="Atleta SkyHigh 2025"
                    value={
                      registration.atleta_skyhigh_2025
                        ? yesNoLabels[registration.atleta_skyhigh_2025]
                        : '-'
                    }
                  />
                </InfoGrid>
              </Section>

              {/* Interests */}
              <Section title="Interesses" icon={Star}>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/40 text-sm mb-2">Nível de Interesse</p>
                    <div className="flex flex-wrap gap-2">
                      {registration.nivel_interesse?.map((nivel) => (
                        <span
                          key={nivel}
                          className="px-3 py-1.5 bg-[#FF7F00]/20 text-[#FF7F00] text-sm rounded-lg font-semibold"
                        >
                          {teamLevelLabels[nivel] || nivel}
                        </span>
                      ))}
                    </div>
                  </div>
                  {registration.posicao_interesse && registration.posicao_interesse.length > 0 && (
                    <div>
                      <p className="text-white/40 text-sm mb-2">Posições de Interesse</p>
                      <div className="flex flex-wrap gap-2">
                        {registration.posicao_interesse.map((pos) => (
                          <span
                            key={pos}
                            className="px-3 py-1.5 bg-[#00BFFF]/20 text-[#00BFFF] text-sm rounded-lg font-semibold capitalize"
                          >
                            {pos}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Section>

              {/* Availability */}
              <Section title="Disponibilidade" icon={Calendar}>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/40 text-sm mb-2">Dias Disponíveis</p>
                    <div className="flex flex-wrap gap-2">
                      {registration.dias_disponiveis?.map((dia) => (
                        <span
                          key={dia}
                          className="px-3 py-1.5 bg-white/10 text-white/80 text-sm rounded-lg"
                        >
                          {weekdayLabels[dia]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <InfoGrid>
                    <InfoItem
                      label="Participa de Campeonatos"
                      value={
                        registration.participa_campeonatos
                          ? yesNoMaybeLabels[registration.participa_campeonatos]
                          : '-'
                      }
                    />
                    <InfoItem
                      label="Aceita Realocação"
                      value={
                        registration.aceita_realocacao
                          ? yesNoLabels[registration.aceita_realocacao]
                          : '-'
                      }
                    />
                    <InfoItem
                      label="Aceita Crossover"
                      value={
                        registration.aceita_crossover
                          ? yesNoLabels[registration.aceita_crossover]
                          : '-'
                      }
                    />
                  </InfoGrid>
                </div>
              </Section>

              {/* Health Information */}
              {(registration.condicoes_medicas || registration.medicacoes) && (
                <Section title="Informações de Saúde" icon={Heart}>
                  <div className="space-y-4">
                    {registration.condicoes_medicas && (
                      <div>
                        <p className="text-white/40 text-sm mb-2">Condições Médicas</p>
                        <p className="text-white/80 bg-white/5 rounded-lg p-3">
                          {registration.condicoes_medicas}
                        </p>
                      </div>
                    )}
                    {registration.medicacoes && (
                      <div>
                        <p className="text-white/40 text-sm mb-2">Medicações</p>
                        <p className="text-white/80 bg-white/5 rounded-lg p-3">
                          {registration.medicacoes}
                        </p>
                      </div>
                    )}
                  </div>
                </Section>
              )}

              {/* Other Sports */}
              {registration.outros_esportes && (
                <Section title="Outros Esportes" icon={Activity}>
                  <p className="text-white/80 bg-white/5 rounded-lg p-3">
                    {registration.outros_esportes}
                  </p>
                </Section>
              )}

              {/* Timestamps */}
              <Section title="Registro" icon={Clock}>
                <InfoGrid>
                  <InfoItem
                    label="Data de Inscrição"
                    value={
                      registration.created_at
                        ? new Date(registration.created_at).toLocaleString('pt-BR')
                        : '-'
                    }
                  />
                  <InfoItem
                    label="Última Atualização"
                    value={
                      registration.updated_at
                        ? new Date(registration.updated_at).toLocaleString('pt-BR')
                        : '-'
                    }
                  />
                </InfoGrid>
              </Section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Helper Components
function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-[#FF7F00]" />
        <h3 className="font-display text-lg text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-4">{children}</div>
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-white/40 text-sm">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  )
}
