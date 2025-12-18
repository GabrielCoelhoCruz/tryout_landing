import { z } from 'zod'

// Enum schemas matching database types
export const genderSchema = z.enum(['feminino', 'masculino', 'outro'], {
  message: 'Selecione um gênero válido',
})
export const yesNoSchema = z.enum(['sim', 'nao'], {
  message: 'Selecione uma opção válida',
})
export const yesNoMaybeSchema = z.enum(['sim', 'nao', 'talvez'], {
  message: 'Selecione uma opção válida',
})
export const experienceTimeSchema = z.enum(
  ['nunca-pratiquei', 'menos-6-meses', '6-12-meses', '1-2-anos', '2-anos-mais'],
  { message: 'Selecione um tempo de experiência válido' }
)
export const sportsExperienceSchema = z.enum(
  ['ginastica', 'tumbling', 'danca', 'nenhuma'],
  { message: 'Selecione uma experiência válida' }
)
export const cheerPositionSchema = z.enum(['base', 'flyer', 'back'], {
  message: 'Selecione uma posição válida',
})
export const teamLevelSchema = z.enum(
  ['coed-n2', 'coed-n3', 'allgirl-n2-n3', 'allboy-n2-n3'],
  { message: 'Selecione um nível válido' }
)
export const weekdaySchema = z.enum(
  ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'],
  { message: 'Selecione um dia válido' }
)

// Phone validation regex (Brazilian format)
const phoneRegex = /^\(?[0-9]{2}\)?\s?[0-9]{4,5}-?[0-9]{4}$/

// Helper to calculate age from birth date
function calculateAge(birthDate: string): number {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

// Base schema without refinements
const baseRegistrationSchema = z.object({
  // Personal data
  'nome-completo': z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome muito longo'),
  'data-nascimento': z.string().min(1, 'Data de nascimento é obrigatória'),
  idade: z
    .number()
    .min(5, 'Idade mínima é 5 anos')
    .max(99, 'Idade máxima é 99 anos'),
  genero: genderSchema,
  telefone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .regex(phoneRegex, 'Telefone inválido. Use o formato (11) 99999-9999'),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),

  // Guardian data (optional, required for minors)
  'nome-responsavel': z.string().optional(),
  'contato-responsavel': z.string().optional(),
  'email-responsavel': z.string().optional(),

  // Experience
  'pratica-cheerleading': yesNoSchema,
  'tempo-experiencia': experienceTimeSchema,
  'equipe-anterior': z.string().optional(),
  'experiencia-ginastica': sportsExperienceSchema.optional(),
  'posicao-interesse': z.array(cheerPositionSchema).optional(),
  'nivel-interesse': z
    .array(teamLevelSchema)
    .min(1, 'Selecione pelo menos um nível de interesse'),

  // Availability
  'dias-disponiveis': z
    .array(weekdaySchema)
    .min(1, 'Selecione pelo menos um dia disponível'),
  'participa-campeonatos': yesNoMaybeSchema,
  'aceita-realocacao': yesNoSchema,
  'aceita-crossover': yesNoSchema,
  'outros-esportes': z.string().optional(),

  // Payment proof (optional)
  'comprovante-pagamento': z.string().optional(),

  // Health
  'condicoes-medicas': z.string().optional(),
  medicacoes: z.string().optional(),
  'declaracao-medica': z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar a declaração de responsabilidade médica',
  }),
  'autorizacao-responsavel': z.boolean().refine((val) => val === true, {
    message: 'Você deve confirmar a autorização do responsável',
  }),
  'aceite-termos': z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar os termos de responsabilidade',
  }),
})

// Full schema with refinements for conditional validation
export const registrationSchema = baseRegistrationSchema.superRefine(
  (data, ctx) => {
    const age = calculateAge(data['data-nascimento'])
    const isMinorUser = age < 18

    if (isMinorUser) {
      // Guardian name validation
      if (!data['nome-responsavel'] || data['nome-responsavel'].length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Nome do responsável é obrigatório para menores de 18 anos',
          path: ['nome-responsavel'],
        })
      }

      // Guardian phone validation
      if (!data['contato-responsavel']) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Telefone do responsável é obrigatório para menores de 18 anos',
          path: ['contato-responsavel'],
        })
      } else if (!phoneRegex.test(data['contato-responsavel'].replace(/\s/g, ''))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Telefone do responsável inválido',
          path: ['contato-responsavel'],
        })
      }

      // Guardian email validation
      if (!data['email-responsavel']) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'E-mail do responsável é obrigatório para menores de 18 anos',
          path: ['email-responsavel'],
        })
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data['email-responsavel'])) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'E-mail do responsável inválido',
          path: ['email-responsavel'],
        })
      }
    }
  }
)

// Type inference from schema
export type RegistrationFormData = z.infer<typeof registrationSchema>

// Schema for server-side validation (same as client)
export const serverRegistrationSchema = registrationSchema

