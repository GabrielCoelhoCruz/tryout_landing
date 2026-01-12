import { describe, it, expect } from 'vitest'
import { registrationSchema } from './registration-schema'

describe('registration-schema', () => {
  // Valid adult data (18+)
  const validAdultData = {
    'nome-completo': 'João Silva Santos',
    'data-nascimento': '2000-05-15',
    idade: 25,
    genero: 'masculino' as const,
    telefone: '(11) 99999-9999',
    email: 'joao@example.com',
    'pratica-cheerleading': 'sim' as const,
    'tempo-experiencia': '2-anos-mais' as const,
    'atleta-skyhigh-2025': 'nao' as const,
    'nivel-interesse': ['coed-n3'] as const,
    'dias-disponiveis': ['sabado', 'domingo'] as const,
    'participa-campeonatos': 'sim' as const,
    'aceita-realocacao': 'sim' as const,
    'aceita-crossover': 'nao' as const,
    'declaracao-medica': true,
    'autorizacao-responsavel': true,
    'aceite-termos': true,
  }

  // Valid minor data (under 18)
  const validMinorData = {
    ...validAdultData,
    'data-nascimento': '2010-05-15',
    idade: 15,
    'nome-responsavel': 'Maria Silva Santos',
    'contato-responsavel': '(11) 98888-8888',
    'email-responsavel': 'maria@example.com',
  }

  describe('adult registration', () => {
    it('validates complete adult data', () => {
      const result = registrationSchema.safeParse(validAdultData)
      expect(result.success).toBe(true)
    })

    it('validates adult with all optional fields', () => {
      const dataWithOptional = {
        ...validAdultData,
        'equipe-anterior': 'SkyHigh AllStar',
        'experiencia-ginastica': 'ginastica' as const,
        'posicao-interesse': ['base', 'back'] as const,
        'outros-esportes': 'Natação, Corrida',
        'condicoes-medicas': 'Nenhuma',
        medicacoes: 'Nenhuma',
        'comprovante-pagamento': 'https://example.com/proof.jpg',
        'valor-inscricao': 30,
      }
      const result = registrationSchema.safeParse(dataWithOptional)
      expect(result.success).toBe(true)
    })

    it('adult does not require guardian data', () => {
      const result = registrationSchema.safeParse(validAdultData)
      expect(result.success).toBe(true)
    })
  })

  describe('minor registration', () => {
    it('validates complete minor data with guardian', () => {
      const result = registrationSchema.safeParse(validMinorData)
      expect(result.success).toBe(true)
    })

    it('fails when minor has no guardian name', () => {
      const dataWithoutGuardian = {
        ...validMinorData,
        'nome-responsavel': undefined,
      }
      const result = registrationSchema.safeParse(dataWithoutGuardian)
      expect(result.success).toBe(false)
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors
        expect(errors['nome-responsavel']).toBeDefined()
      }
    })

    it('fails when minor has no guardian phone', () => {
      const dataWithoutPhone = {
        ...validMinorData,
        'contato-responsavel': undefined,
      }
      const result = registrationSchema.safeParse(dataWithoutPhone)
      expect(result.success).toBe(false)
    })

    it('fails when minor has no guardian email', () => {
      const dataWithoutEmail = {
        ...validMinorData,
        'email-responsavel': undefined,
      }
      const result = registrationSchema.safeParse(dataWithoutEmail)
      expect(result.success).toBe(false)
    })

    it('fails when minor guardian email is invalid', () => {
      const dataWithInvalidEmail = {
        ...validMinorData,
        'email-responsavel': 'invalid-email',
      }
      const result = registrationSchema.safeParse(dataWithInvalidEmail)
      expect(result.success).toBe(false)
    })
  })

  describe('personal data validation', () => {
    it('fails when name is too short', () => {
      const data = { ...validAdultData, 'nome-completo': 'Jo' }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('fails when name is too long', () => {
      const data = { ...validAdultData, 'nome-completo': 'A'.repeat(101) }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('fails when email is invalid', () => {
      const data = { ...validAdultData, email: 'invalid-email' }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('fails when phone is invalid', () => {
      const data = { ...validAdultData, telefone: '123' }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts various phone formats', () => {
      const formats = [
        '(11) 99999-9999',
        '11999999999',
        '(11) 9999-9999',
        '1199999999',
      ]
      for (const telefone of formats) {
        const data = { ...validAdultData, telefone }
        const result = registrationSchema.safeParse(data)
        expect(result.success).toBe(true)
      }
    })

    it('fails when age is below minimum', () => {
      const data = { ...validAdultData, idade: 4 }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('fails when age is above maximum', () => {
      const data = { ...validAdultData, idade: 100 }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('experience validation', () => {
    it('validates all gender options', () => {
      const genders = ['feminino', 'masculino', 'outro'] as const
      for (const genero of genders) {
        const data = { ...validAdultData, genero }
        const result = registrationSchema.safeParse(data)
        expect(result.success).toBe(true)
      }
    })

    it('validates all experience time options', () => {
      const times = [
        'nunca-pratiquei',
        'menos-6-meses',
        '6-12-meses',
        '1-2-anos',
        '2-anos-mais',
      ] as const
      for (const time of times) {
        const data = { ...validAdultData, 'tempo-experiencia': time }
        const result = registrationSchema.safeParse(data)
        expect(result.success).toBe(true)
      }
    })

    it('validates all position options', () => {
      const positions = ['base', 'flyer', 'back'] as const
      const data = { ...validAdultData, 'posicao-interesse': positions }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('validates all team level options', () => {
      const levels = [
        'coed-n2',
        'coed-n3',
        'coed-n4',
        'allgirl-n2-n3',
        'allboy-n2-n3',
      ] as const
      const data = { ...validAdultData, 'nivel-interesse': levels }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('fails when nivel-interesse is empty', () => {
      const data = { ...validAdultData, 'nivel-interesse': [] }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('availability validation', () => {
    it('validates all weekday options', () => {
      const days = [
        'segunda',
        'terca',
        'quarta',
        'quinta',
        'sexta',
        'sabado',
        'domingo',
      ] as const
      const data = { ...validAdultData, 'dias-disponiveis': days }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('fails when dias-disponiveis is empty', () => {
      const data = { ...validAdultData, 'dias-disponiveis': [] }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('validates all competition participation options', () => {
      const options = ['sim', 'nao', 'talvez'] as const
      for (const option of options) {
        const data = { ...validAdultData, 'participa-campeonatos': option }
        const result = registrationSchema.safeParse(data)
        expect(result.success).toBe(true)
      }
    })
  })

  describe('legal agreements validation', () => {
    it('fails when declaracao-medica is false', () => {
      const data = { ...validAdultData, 'declaracao-medica': false }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('fails when autorizacao-responsavel is false', () => {
      const data = { ...validAdultData, 'autorizacao-responsavel': false }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('fails when aceite-termos is false', () => {
      const data = { ...validAdultData, 'aceite-termos': false }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('payment validation', () => {
    it('accepts valor-inscricao within range', () => {
      const values = [25, 30, 35, 40]
      for (const valor of values) {
        const data = { ...validAdultData, 'valor-inscricao': valor }
        const result = registrationSchema.safeParse(data)
        expect(result.success).toBe(true)
      }
    })

    it('fails when valor-inscricao is below minimum', () => {
      const data = { ...validAdultData, 'valor-inscricao': 24 }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('fails when valor-inscricao is above maximum', () => {
      const data = { ...validAdultData, 'valor-inscricao': 41 }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts comprovante-pagamento as URL', () => {
      const data = {
        ...validAdultData,
        'comprovante-pagamento': 'https://storage.example.com/proof.jpg',
      }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('date validation', () => {
    it('accepts valid date format', () => {
      // Use dates that result in adults (18+) so no guardian is required
      const testCases = [
        { date: '2000-01-01', idade: 26 },
        { date: '1995-12-31', idade: 30 },
        { date: '2005-06-15', idade: 20 },
      ]
      for (const { date, idade } of testCases) {
        const data = { ...validAdultData, 'data-nascimento': date, idade }
        const result = registrationSchema.safeParse(data)
        expect(result.success).toBe(true)
      }
    })

    it('fails when date is empty', () => {
      const data = { ...validAdultData, 'data-nascimento': '' }
      const result = registrationSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})
