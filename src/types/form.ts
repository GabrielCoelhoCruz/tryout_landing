// Re-export Zod-inferred type as the primary FormData type
// This ensures type safety between client validation and server action
export type { RegistrationFormData as FormData } from '@/lib/schemas/registration-schema'

// Legacy type exports for backward compatibility
export type Gender = 'feminino' | 'masculino' | 'outro'

export type YesNo = 'sim' | 'nao'

export type YesNoMaybe = 'sim' | 'nao' | 'talvez'

export type ExperienceTime =
  | 'nunca-pratiquei'
  | 'menos-6-meses'
  | '6-12-meses'
  | '1-2-anos'
  | '2-anos-mais'

export type SportsExperience =
  | 'ginastica'
  | 'tumbling'
  | 'danca'
  | 'nenhuma'

export type CheerPosition = 'base' | 'flyer' | 'back'

export type TeamLevel = 'coed-n2' | 'coed-n3' | 'allgirl-n2-n3' | 'allboy-n2-n3'

export type Weekday =
  | 'segunda'
  | 'terca'
  | 'quarta'
  | 'quinta'
  | 'sexta'
  | 'sabado'
  | 'domingo'

// FormErrors now uses Zod-inferred keys
export type FormErrors = Partial<Record<string, string>>

export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'select'
  | 'checkbox'
  | 'checkbox-group'
  | 'textarea'
  | 'file'
  | 'readonly'

export type SelectOption = {
  value: string
  label: string
}

// Explicit list of form field names for type safety
export type FormFieldName =
  | 'nome-completo'
  | 'data-nascimento'
  | 'idade'
  | 'genero'
  | 'telefone'
  | 'email'
  | 'nome-responsavel'
  | 'contato-responsavel'
  | 'email-responsavel'
  | 'pratica-cheerleading'
  | 'tempo-experiencia'
  | 'equipe-anterior'
  | 'experiencia-ginastica'
  | 'posicao-interesse'
  | 'nivel-interesse'
  | 'dias-disponiveis'
  | 'participa-campeonatos'
  | 'aceita-realocacao'
  | 'aceita-crossover'
  | 'outros-esportes'
  | 'comprovante-pagamento'
  | 'condicoes-medicas'
  | 'medicacoes'
  | 'declaracao-medica'
  | 'autorizacao-responsavel'
  | 'aceite-termos'

export type FormField = {
  name: FormFieldName
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: SelectOption[]
  accept?: string
  description?: string
}

export type FormSection = {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  fields: FormField[]
}
