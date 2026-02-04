import { describe, it, expect } from 'vitest'
import { applyMask, unmask } from './MaskedInput'

describe('MaskedInput utilities', () => {
  describe('applyMask', () => {
    describe('CPF mask', () => {
      it('formats complete CPF correctly', () => {
        expect(applyMask('12345678900', 'cpf')).toBe('123.456.789-00')
      })

      it('formats partial CPF correctly', () => {
        expect(applyMask('123456', 'cpf')).toBe('123.456')
      })

      it('handles CPF with existing formatting', () => {
        expect(applyMask('123.456.789-00', 'cpf')).toBe('123.456.789-00')
      })

      it('strips non-numeric characters', () => {
        expect(applyMask('123abc456def789-00', 'cpf')).toBe('123.456.789-00')
      })

      it('handles empty string', () => {
        expect(applyMask('', 'cpf')).toBe('')
      })
    })

    describe('phone mask', () => {
      it('formats complete phone correctly', () => {
        expect(applyMask('11999999999', 'phone')).toBe('(11) 99999-9999')
      })

      it('formats partial phone correctly', () => {
        expect(applyMask('119999', 'phone')).toBe('(11) 9999')
      })

      it('handles phone with existing formatting', () => {
        expect(applyMask('(11) 99999-9999', 'phone')).toBe('(11) 99999-9999')
      })

      it('handles 8-digit phone (landline)', () => {
        expect(applyMask('1199999999', 'phone')).toBe('(11) 99999-999')
      })
    })

    describe('RG mask', () => {
      it('formats complete RG correctly', () => {
        expect(applyMask('123456789', 'rg')).toBe('12.345.678-9')
      })

      it('formats partial RG correctly', () => {
        expect(applyMask('12345', 'rg')).toBe('12.345')
      })
    })

    describe('CEP mask', () => {
      it('formats complete CEP correctly', () => {
        expect(applyMask('12345678', 'cep')).toBe('12345-678')
      })

      it('formats partial CEP correctly', () => {
        expect(applyMask('12345', 'cep')).toBe('12345')
      })
    })
  })

  describe('unmask', () => {
    it('removes CPF formatting', () => {
      expect(unmask('123.456.789-00')).toBe('12345678900')
    })

    it('removes phone formatting', () => {
      expect(unmask('(11) 99999-9999')).toBe('11999999999')
    })

    it('removes RG formatting', () => {
      expect(unmask('12.345.678-9')).toBe('123456789')
    })

    it('removes CEP formatting', () => {
      expect(unmask('12345-678')).toBe('12345678')
    })

    it('handles string without formatting', () => {
      expect(unmask('12345678900')).toBe('12345678900')
    })

    it('handles empty string', () => {
      expect(unmask('')).toBe('')
    })

    it('removes all non-digit characters', () => {
      expect(unmask('abc123def456')).toBe('123456')
    })
  })
})
