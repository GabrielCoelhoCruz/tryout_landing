export type Gender = 'feminino' | 'masculino' | 'outro'

export type YesNo = 'sim' | 'nao'

export type YesNoMaybe = 'sim' | 'nao' | 'talvez'

export type ExperienceTime =
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

export type CheerLevel = 'n2' | 'n3'

export type SkillLevel = 'basico' | 'intermediario' | 'avancado'

export type Weekday =
  | 'segunda'
  | 'terca'
  | 'quarta'
  | 'quinta'
  | 'sexta'
  | 'sabado'
  | 'domingo'

export type DayPeriod = 'manha' | 'tarde' | 'noite'

export type FormData = {
  // Personal data
  'nome-completo': string
  'data-nascimento': string
  'idade': number
  'genero': Gender
  'telefone': string
  'email': string
  'nome-responsavel'?: string
  'contato-responsavel'?: string
  'email-responsavel'?: string

  // Experience
  'pratica-cheerleading': YesNo
  'tempo-experiencia': ExperienceTime
  'equipe-anterior'?: string
  'experiencia-ginastica'?: SportsExperience
  'posicao-interesse'?: CheerPosition[]
  'nivel-interesse': CheerLevel[]
  'nivel-habilidades': SkillLevel

  // Availability
  'dias-disponiveis': Weekday[]
  'periodo-preferencia'?: DayPeriod
  'participa-campeonatos': YesNoMaybe
  'outros-esportes'?: string

  // Health
  'condicoes-medicas'?: string
  'medicacoes'?: string
  'autorizacao-responsavel': boolean
  'aceite-termos': boolean
}

export type FormErrors = Partial<Record<keyof FormData, string>>

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

export type SelectOption = {
  value: string
  label: string
}

export type FormField = {
  name: keyof FormData
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: SelectOption[]
}

export type FormSection = {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  fields: FormField[]
}
