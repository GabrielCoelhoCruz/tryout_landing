import { describe, it, expect } from 'vitest'
import {
  parseDateString,
  formatDateBR,
  calculateAge,
  isValidAge,
  formatFileSize,
  MIN_VALID_AGE,
  MAX_VALID_AGE,
} from './utils'

describe('utils', () => {
  describe('parseDateString', () => {
    it('parses date string correctly regardless of timezone', () => {
      const date = parseDateString('2000-10-19')
      expect(date.getDate()).toBe(19)
      expect(date.getMonth()).toBe(9) // 0-indexed
      expect(date.getFullYear()).toBe(2000)
    })

    it('parses first day of month correctly', () => {
      const date = parseDateString('2024-01-01')
      expect(date.getDate()).toBe(1)
      expect(date.getMonth()).toBe(0)
      expect(date.getFullYear()).toBe(2024)
    })

    it('parses last day of month correctly', () => {
      const date = parseDateString('2024-12-31')
      expect(date.getDate()).toBe(31)
      expect(date.getMonth()).toBe(11)
      expect(date.getFullYear()).toBe(2024)
    })

    it('handles leap year date', () => {
      const date = parseDateString('2024-02-29')
      expect(date.getDate()).toBe(29)
      expect(date.getMonth()).toBe(1)
      expect(date.getFullYear()).toBe(2024)
    })
  })

  describe('formatDateBR', () => {
    it('formats date to Brazilian format', () => {
      expect(formatDateBR('2000-10-19')).toBe('19/10/2000')
    })

    it('formats single digit day and month correctly', () => {
      expect(formatDateBR('2024-01-05')).toBe('05/01/2024')
    })

    it('returns "-" for null value', () => {
      expect(formatDateBR(null)).toBe('-')
    })

    it('returns "-" for undefined value', () => {
      expect(formatDateBR(undefined)).toBe('-')
    })

    it('returns "-" for empty string', () => {
      expect(formatDateBR('')).toBe('-')
    })
  })

  describe('calculateAge', () => {
    it('calculates age correctly for past birthday this year', () => {
      const today = new Date()
      const birthYear = today.getFullYear() - 25
      const birthMonth = today.getMonth() - 1 // Last month
      const birthDate = `${birthYear}-${String(birthMonth + 1).padStart(2, '0')}-15`
      expect(calculateAge(birthDate)).toBe(25)
    })

    it('calculates age correctly for future birthday this year', () => {
      const today = new Date()
      const birthYear = today.getFullYear() - 25
      const birthMonth = today.getMonth() + 2 // Two months from now
      if (birthMonth <= 12) {
        const birthDate = `${birthYear}-${String(birthMonth + 1).padStart(2, '0')}-15`
        expect(calculateAge(birthDate)).toBe(24) // Not yet 25
      }
    })

    it('calculates age correctly on birthday', () => {
      const today = new Date()
      const birthYear = today.getFullYear() - 30
      const birthMonth = String(today.getMonth() + 1).padStart(2, '0')
      const birthDay = String(today.getDate()).padStart(2, '0')
      const birthDate = `${birthYear}-${birthMonth}-${birthDay}`
      expect(calculateAge(birthDate)).toBe(30)
    })

    it('calculates age correctly for child', () => {
      const today = new Date()
      const birthYear = today.getFullYear() - 5
      const birthDate = `${birthYear}-06-15`
      const expectedAge = today.getMonth() >= 5 ? 5 : 4 // June is month 5 (0-indexed)
      expect(calculateAge(birthDate)).toBe(expectedAge)
    })
  })

  describe('isValidAge', () => {
    it('returns true for valid ages', () => {
      expect(isValidAge(0)).toBe(true)
      expect(isValidAge(18)).toBe(true)
      expect(isValidAge(50)).toBe(true)
      expect(isValidAge(120)).toBe(true)
    })

    it('returns false for negative ages', () => {
      expect(isValidAge(-1)).toBe(false)
      expect(isValidAge(-10)).toBe(false)
    })

    it('returns false for ages above maximum', () => {
      expect(isValidAge(121)).toBe(false)
      expect(isValidAge(200)).toBe(false)
    })

    it('uses correct min/max constants', () => {
      expect(MIN_VALID_AGE).toBe(0)
      expect(MAX_VALID_AGE).toBe(120)
    })
  })

  describe('formatFileSize', () => {
    it('formats bytes to MB correctly', () => {
      expect(formatFileSize(1048576)).toBe('1.00 MB') // 1 MB
      expect(formatFileSize(2097152)).toBe('2.00 MB') // 2 MB
    })

    it('formats fractional MB correctly', () => {
      expect(formatFileSize(1572864)).toBe('1.50 MB') // 1.5 MB
      expect(formatFileSize(524288)).toBe('0.50 MB') // 0.5 MB
    })

    it('formats small files correctly', () => {
      expect(formatFileSize(1024)).toBe('0.00 MB') // 1 KB
      expect(formatFileSize(102400)).toBe('0.10 MB') // 100 KB
    })

    it('formats large files correctly', () => {
      expect(formatFileSize(10485760)).toBe('10.00 MB') // 10 MB
      expect(formatFileSize(104857600)).toBe('100.00 MB') // 100 MB
    })
  })
})
