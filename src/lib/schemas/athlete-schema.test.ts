import { describe, it, expect } from 'vitest'
import { athleteFormSchema, SHIRT_SIZE_OPTIONS } from './athlete-schema'

// Valid base data for tests
const validBaseData = {
  registrationId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  nomeCompleto: 'João da Silva',
  dataNascimento: '2000-01-15',
  rg: '12.345.678-9',
  cpf: '123.456.789-00',
  email: 'joao@example.com',
  instagram: '@joaosilva',
  telefone: '(11) 99999-9999',
  endereco: 'Rua das Flores, 123, Centro, São Paulo - SP',
  emergencyContactName: 'Maria da Silva',
  emergencyContactPhone: '(11) 98888-8888',
  hasHealthInsurance: false,
  hasChronicDisease: false,
  hasRestriction: false,
  shirtSize: 'm_adulto' as const,
  isMinor: false,
}

describe('athlete-schema', () => {
  describe('CPF validation', () => {
    it('accepts valid CPF with formatting', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        cpf: '123.456.789-00',
      })
      expect(result.success).toBe(true)
    })

    it('accepts valid CPF without formatting', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        cpf: '12345678900',
      })
      expect(result.success).toBe(true)
    })

    it('rejects CPF with wrong length', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        cpf: '123.456.789',
      })
      expect(result.success).toBe(false)
    })

    it('rejects CPF with invalid characters', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        cpf: '123.456.789-AB',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('phone validation', () => {
    it('accepts phone with full formatting', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        telefone: '(11) 99999-9999',
      })
      expect(result.success).toBe(true)
    })

    it('accepts phone without parentheses', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        telefone: '11 99999-9999',
      })
      expect(result.success).toBe(true)
    })

    it('accepts 8-digit phone (landline)', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        telefone: '(11) 9999-9999',
      })
      expect(result.success).toBe(true)
    })

    it('rejects phone with too few digits', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        telefone: '9999-9999',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('Instagram validation', () => {
    it('accepts username with @', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        instagram: '@username123',
      })
      expect(result.success).toBe(true)
    })

    it('accepts username without @', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        instagram: 'username123',
      })
      expect(result.success).toBe(true)
    })

    it('accepts username with dots and underscores', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        instagram: '@user.name_123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects empty instagram', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        instagram: '',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('conditional health validations', () => {
    it('requires healthInsuranceName when hasHealthInsurance is true', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        hasHealthInsurance: true,
        healthInsuranceName: '',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors
        expect(errors.healthInsuranceName).toBeDefined()
      }
    })

    it('accepts when healthInsuranceName is provided with hasHealthInsurance', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        hasHealthInsurance: true,
        healthInsuranceName: 'Unimed',
      })
      expect(result.success).toBe(true)
    })

    it('requires chronicDiseaseDetails when hasChronicDisease is true', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        hasChronicDisease: true,
        chronicDiseaseDetails: '',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors
        expect(errors.chronicDiseaseDetails).toBeDefined()
      }
    })

    it('requires restrictionDetails when hasRestriction is true', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        hasRestriction: true,
        restrictionDetails: '',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors
        expect(errors.restrictionDetails).toBeDefined()
      }
    })
  })

  describe('guardian validation for minors', () => {
    it('requires guardianName when isMinor is true', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        isMinor: true,
        guardianName: '',
        guardianPhone: '(11) 98888-8888',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors
        expect(errors.guardianName).toBeDefined()
      }
    })

    it('requires guardianPhone when isMinor is true', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        isMinor: true,
        guardianName: 'Maria da Silva',
        guardianPhone: '',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors
        expect(errors.guardianPhone).toBeDefined()
      }
    })

    it('accepts minor with complete guardian data', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        isMinor: true,
        guardianName: 'Maria da Silva',
        guardianPhone: '(11) 98888-8888',
      })
      expect(result.success).toBe(true)
    })

    it('does not require guardian data when isMinor is false', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        isMinor: false,
        guardianName: '',
        guardianPhone: '',
      })
      expect(result.success).toBe(true)
    })
  })

  describe('shirt size validation', () => {
    it('accepts all valid shirt sizes', () => {
      for (const option of SHIRT_SIZE_OPTIONS) {
        const result = athleteFormSchema.safeParse({
          ...validBaseData,
          shirtSize: option.value,
        })
        expect(result.success).toBe(true)
      }
    })

    it('rejects invalid shirt size', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        shirtSize: 'invalid_size',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('name validation', () => {
    it('rejects name shorter than 3 characters', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        nomeCompleto: 'AB',
      })
      expect(result.success).toBe(false)
    })

    it('rejects name longer than 100 characters', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        nomeCompleto: 'A'.repeat(101),
      })
      expect(result.success).toBe(false)
    })
  })

  describe('address validation', () => {
    it('rejects address shorter than 10 characters', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        endereco: 'Rua A, 1',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('registration ID validation', () => {
    it('accepts valid UUID', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        registrationId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid UUID', () => {
      const result = athleteFormSchema.safeParse({
        ...validBaseData,
        registrationId: 'not-a-uuid',
      })
      expect(result.success).toBe(false)
    })
  })
})
