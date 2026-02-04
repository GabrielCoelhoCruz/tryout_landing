import { z } from 'zod'
import type { Database } from '@/types/database'

// CPF validation regex (with or without formatting)
const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/

// Instagram validation regex
const instagramRegex = /^@?[a-zA-Z0-9._]+$/

// Phone validation regex (Brazilian format)
const phoneRegex = /^\(?[0-9]{2}\)?[\s]?[0-9]{4,5}[-]?[0-9]{4}$/

// Shirt size type from database - single source of truth
type ShirtSizeType = Database['public']['Enums']['shirt_size_type']

// Shirt size values matching database enum exactly
const SHIRT_SIZES = [
  'p_adulto',
  'm_adulto',
  'g_adulto',
  'gg_adulto',
  'xgg_adulto',
  'p_babylook',
  'm_babylook',
  'g_babylook',
] as const satisfies readonly ShirtSizeType[]

// Shirt size options for UI display
export const SHIRT_SIZE_OPTIONS: readonly { value: ShirtSizeType; label: string }[] = [
  { value: 'p_adulto', label: 'P adulto' },
  { value: 'm_adulto', label: 'M adulto' },
  { value: 'g_adulto', label: 'G adulto' },
  { value: 'gg_adulto', label: 'GG adulto' },
  { value: 'xgg_adulto', label: 'XGG adulto' },
  { value: 'p_babylook', label: 'P baby look' },
  { value: 'm_babylook', label: 'M baby look' },
  { value: 'g_babylook', label: 'G baby look' },
]

/**
 * Schema for athlete registration form
 */
export const athleteFormSchema = z.object({
  // Registration reference
  registrationId: z.string().uuid('ID de registro inválido'),

  // ===== DADOS PESSOAIS =====
  nomeCompleto: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome muito longo'),

  dataNascimento: z.string().min(1, 'Data de nascimento é obrigatória'),

  rg: z
    .string()
    .min(5, 'RG deve ter pelo menos 5 caracteres')
    .max(20, 'RG muito longo'),

  cpf: z
    .string()
    .min(11, 'CPF deve ter 11 dígitos')
    .regex(cpfRegex, 'Formato de CPF inválido (ex: 123.456.789-00)'),

  email: z.string().email('Formato de e-mail inválido'),

  instagram: z
    .string()
    .min(1, 'Instagram é obrigatório')
    .regex(instagramRegex, 'Formato de Instagram inválido (ex: @usuario)'),

  telefone: z
    .string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .regex(phoneRegex, 'Formato de telefone inválido (ex: (11) 99999-9999)'),

  // ===== ENDEREÇO E CONTATO DE EMERGÊNCIA =====
  endereco: z
    .string()
    .min(10, 'Endereço deve ser completo (rua, número, bairro, cidade e estado)')
    .max(200, 'Endereço muito longo'),

  emergencyContactName: z
    .string()
    .min(3, 'Nome do contato de emergência deve ter pelo menos 3 caracteres')
    .max(100, 'Nome muito longo'),

  emergencyContactPhone: z
    .string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .regex(phoneRegex, 'Formato de telefone inválido (ex: (11) 99999-9999)'),

  // ===== SAÚDE =====
  hasHealthInsurance: z.boolean(),
  healthInsuranceName: z.string().optional(),

  hasChronicDisease: z.boolean(),
  chronicDiseaseDetails: z.string().optional(),

  hasRestriction: z.boolean(),
  restrictionDetails: z.string().optional(),

  // ===== MENORES DE IDADE =====
  isMinor: z.boolean(),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),

  // ===== CAMISETA =====
  shirtSize: z.enum(SHIRT_SIZES, {
    message: 'Selecione um tamanho de camiseta',
  }),
})
  // Validações condicionais
  .refine(
    (data) => {
      // Se tem convênio, deve informar qual
      if (data.hasHealthInsurance && !data.healthInsuranceName?.trim()) {
        return false
      }
      return true
    },
    {
      message: 'Informe o nome do convênio médico',
      path: ['healthInsuranceName'],
    }
  )
  .refine(
    (data) => {
      // Se tem doença crônica, deve informar qual
      if (data.hasChronicDisease && !data.chronicDiseaseDetails?.trim()) {
        return false
      }
      return true
    },
    {
      message: 'Informe os detalhes da doença crônica',
      path: ['chronicDiseaseDetails'],
    }
  )
  .refine(
    (data) => {
      // Se tem restrição, deve informar qual
      if (data.hasRestriction && !data.restrictionDetails?.trim()) {
        return false
      }
      return true
    },
    {
      message: 'Informe os detalhes da restrição',
      path: ['restrictionDetails'],
    }
  )
  .refine(
    (data) => {
      // Se é menor de idade, deve informar nome do responsável
      if (data.isMinor && !data.guardianName?.trim()) {
        return false
      }
      return true
    },
    {
      message: 'Nome do responsável é obrigatório para menores de idade',
      path: ['guardianName'],
    }
  )
  .refine(
    (data) => {
      // Se é menor de idade, deve informar telefone do responsável
      if (data.isMinor && !data.guardianPhone?.trim()) {
        return false
      }
      return true
    },
    {
      message: 'Telefone do responsável é obrigatório para menores de idade',
      path: ['guardianPhone'],
    }
  )

export type AthleteFormData = z.infer<typeof athleteFormSchema>
