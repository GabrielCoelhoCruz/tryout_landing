'use client'

import { useState, useRef } from 'react'
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
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'
import { toast } from 'sonner'

type RegistrationFull = Database['public']['Views']['registrations_full']['Row']

interface RegistrationDetailProps {
  registration: RegistrationFull | null
  isOpen: boolean
  onClose: () => void
  onUpdatePayment?: (id: string, status: string) => void
  onUploadProof?: (id: string, url: string) => void
}

const genderLabels = {
  feminino: 'Feminino',
  masculino: 'Masculino',
  outro: 'Outro',
}

const experienceLabels = {
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

export function RegistrationDetail({
  registration,
  isOpen,
  onClose,
  onUpdatePayment,
  onUploadProof,
}: RegistrationDetailProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!registration) return null

  const isPaid = registration.payment_status === 'pago'
  const hasProof = !!registration.payment_proof_url

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
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF7F00] to-[#00BFFF] flex items-center justify-center text-white font-display text-2xl">
                    {registration.nome_completo?.charAt(0).toUpperCase()}
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
              {/* Payment Status Section */}
              <Section title="Pagamento" icon={CreditCard}>
                <div className="space-y-4">
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
                    value={
                      registration.data_nascimento
                        ? new Date(registration.data_nascimento).toLocaleDateString('pt-BR')
                        : '-'
                    }
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
                    label="Nível de Habilidades"
                    value={
                      registration.nivel_habilidades
                        ? skillLabels[registration.nivel_habilidades]
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
                          className="px-3 py-1.5 bg-[#FF7F00]/20 text-[#FF7F00] text-sm rounded-lg font-semibold uppercase"
                        >
                          {nivel}
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
                      label="Período de Preferência"
                      value={
                        registration.periodo_preferencia
                          ? periodLabels[registration.periodo_preferencia]
                          : 'Não informado'
                      }
                    />
                    <InfoItem
                      label="Participa de Campeonatos"
                      value={
                        registration.participa_campeonatos
                          ? yesNoMaybeLabels[registration.participa_campeonatos]
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
