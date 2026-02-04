import { describe, it, expect } from 'vitest'
import { checkApprovalSchema, approvedMemberSchema } from './approved-member-schema'

describe('approved-member-schema', () => {
  describe('checkApprovalSchema', () => {
    it('validates correct email format', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.com',
        'user+tag@example.org',
        'name@subdomain.domain.co.uk',
      ]

      for (const email of validEmails) {
        const result = checkApprovalSchema.safeParse({ email })
        expect(result.success).toBe(true)
      }
    })

    it('rejects invalid email formats', () => {
      const invalidEmails = [
        'invalid',
        'invalid@',
        '@domain.com',
        'user@.com',
        'user@domain',
        '',
      ]

      for (const email of invalidEmails) {
        const result = checkApprovalSchema.safeParse({ email })
        expect(result.success).toBe(false)
      }
    })

    it('rejects empty email with correct message', () => {
      const result = checkApprovalSchema.safeParse({ email: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors
        expect(errors.email).toContain('E-mail é obrigatório')
      }
    })

    it('rejects invalid email format with correct message', () => {
      const result = checkApprovalSchema.safeParse({ email: 'invalid-email' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors
        expect(errors.email).toContain('Formato de e-mail inválido')
      }
    })

    it('rejects missing email field', () => {
      const result = checkApprovalSchema.safeParse({})
      expect(result.success).toBe(false)
    })

    it('trims whitespace is handled by consumer', () => {
      // Note: Schema doesn't trim, consumer should handle this
      const result = checkApprovalSchema.safeParse({ email: ' test@example.com ' })
      // This will fail validation since the email has spaces
      // The consumer (server action) handles trimming
      expect(result.success).toBe(false)
    })
  })

  describe('approvedMemberSchema', () => {
    it('validates correct registration ID (UUID)', () => {
      const validIds = [
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        '550e8400-e29b-41d4-a716-446655440000',
        '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      ]

      for (const registrationId of validIds) {
        const result = approvedMemberSchema.safeParse({ registrationId })
        expect(result.success).toBe(true)
      }
    })

    it('rejects invalid registration IDs', () => {
      const invalidIds = [
        'not-a-uuid',
        '123',
        '',
        'a0eebc99-9c0b-4ef8-bb6d', // incomplete UUID
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a1', // one char short
      ]

      for (const registrationId of invalidIds) {
        const result = approvedMemberSchema.safeParse({ registrationId })
        expect(result.success).toBe(false)
      }
    })

    it('rejects invalid UUID with correct message', () => {
      const result = approvedMemberSchema.safeParse({ registrationId: 'invalid' })
      expect(result.success).toBe(false)
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors
        expect(errors.registrationId).toContain('ID de registro inválido')
      }
    })

    it('rejects missing registration ID', () => {
      const result = approvedMemberSchema.safeParse({})
      expect(result.success).toBe(false)
    })

    it('allows additional fields for future expansion', () => {
      // Since fields are commented placeholders, only registrationId is validated
      const result = approvedMemberSchema.safeParse({
        registrationId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      })
      expect(result.success).toBe(true)
    })
  })

  describe('type inference', () => {
    it('CheckApprovalInput infers email field', () => {
      const data = checkApprovalSchema.parse({ email: 'test@example.com' })
      // Type should be { email: string }
      expect(data.email).toBe('test@example.com')
    })

    it('ApprovedMemberFormData infers registrationId field', () => {
      const data = approvedMemberSchema.parse({
        registrationId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      })
      // Type should have registrationId: string
      expect(data.registrationId).toBe('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')
    })
  })
})
