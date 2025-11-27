import { describe, it, expect } from 'vitest'
import { isMinor, validateEmail, validatePhone, validateForm } from './form-validation'
import type { FormData, FormField } from '@/types/form'

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

  describe('validateForm', () => {
    const mockFields: FormField[] = [
      { name: 'nome-completo', label: 'Nome', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'telefone', label: 'Telefone', type: 'tel', required: true },
      { name: 'nivel-interesse', label: 'Nível', type: 'checkbox-group', required: true },
    ]

    it('returns empty errors for valid form data', () => {
      const formData: Partial<FormData> = {
        'nome-completo': 'João Silva',
        email: 'joao@example.com',
        telefone: '(11) 99999-9999',
        'nivel-interesse': ['n2'],
      }
      const errors = validateForm(formData, mockFields)
      expect(Object.keys(errors)).toHaveLength(0)
    })

    it('returns errors for missing required fields', () => {
      const formData: Partial<FormData> = {}
      const errors = validateForm(formData, mockFields)
      expect(errors['nome-completo']).toBe('Este campo é obrigatório')
      expect(errors.email).toBe('Este campo é obrigatório')
      expect(errors.telefone).toBe('Este campo é obrigatório')
    })

    it('validates email format', () => {
      const formData: Partial<FormData> = {
        'nome-completo': 'João Silva',
        email: 'invalid-email',
        telefone: '(11) 99999-9999',
        'nivel-interesse': ['n2'],
      }
      const errors = validateForm(formData, mockFields)
      expect(errors.email).toBe('E-mail inválido')
    })

    it('validates phone format', () => {
      const formData: Partial<FormData> = {
        'nome-completo': 'João Silva',
        email: 'joao@example.com',
        telefone: 'invalid',
        'nivel-interesse': ['n2'],
      }
      const errors = validateForm(formData, mockFields)
      expect(errors.telefone).toBe('Telefone inválido')
    })

    it('validates checkbox-group has at least one selection', () => {
      const formData: Partial<FormData> = {
        'nome-completo': 'João Silva',
        email: 'joao@example.com',
        telefone: '(11) 99999-9999',
        'nivel-interesse': [],
      }
      const errors = validateForm(formData, mockFields)
      expect(errors['nivel-interesse']).toBe('Selecione pelo menos uma opção')
    })
  })
})
