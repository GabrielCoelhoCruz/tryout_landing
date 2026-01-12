import { describe, it, expect } from 'vitest'
import { isMinor, validateEmail, validatePhone } from './form-validation'
import type { FormData } from '@/types/form'

describe('form-validation', () => {
  describe('isMinor', () => {
    it('returns true for users under 18', () => {
      const today = new Date()
      const birthDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate())
      const formData: Partial<FormData> = {
        'data-nascimento': birthDate.toISOString().split('T')[0],
      }
      expect(isMinor(formData)).toBe(true)
    })

    it('returns false for users 18 or older', () => {
      const today = new Date()
      const birthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
      const formData: Partial<FormData> = {
        'data-nascimento': birthDate.toISOString().split('T')[0],
      }
      expect(isMinor(formData)).toBe(false)
    })

    it('returns false when no birth date provided', () => {
      const formData: Partial<FormData> = {}
      expect(isMinor(formData)).toBe(false)
    })

    it('handles edge case of birthday today', () => {
      const today = new Date()
      const birthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
      const formData: Partial<FormData> = {
        'data-nascimento': birthDate.toISOString().split('T')[0],
      }
      expect(isMinor(formData)).toBe(false)
    })
  })

  describe('validateEmail', () => {
    it('accepts valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true)
      expect(validateEmail('valid@domain.com')).toBe(true)
    })

    it('rejects invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('missing@domain')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('user@')).toBe(false)
    })
  })

  describe('validatePhone', () => {
    it('accepts valid Brazilian phone formats', () => {
      expect(validatePhone('(11) 99999-9999')).toBe(true)
      expect(validatePhone('11999999999')).toBe(true)
      expect(validatePhone('(11) 9999-9999')).toBe(true)
    })

    it('rejects invalid phone formats', () => {
      expect(validatePhone('123')).toBe(false)
      expect(validatePhone('abc')).toBe(false)
      expect(validatePhone('')).toBe(false)
    })
  })

  // Note: validateForm was replaced by Zod schema validation
  // See registration-schema.test.ts for comprehensive form validation tests
})
