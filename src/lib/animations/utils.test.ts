import { describe, it, expect } from 'vitest'
import { clamp, lerp, mapRange, randomInRange, splitTextIntoCharacters } from './utils'

describe('animation utils', () => {
  describe('clamp', () => {
    it('returns value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(0, 0, 10)).toBe(0)
      expect(clamp(10, 0, 10)).toBe(10)
    })

    it('returns min when value is below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0)
      expect(clamp(-100, 0, 10)).toBe(0)
    })

    it('returns max when value is above range', () => {
      expect(clamp(15, 0, 10)).toBe(10)
      expect(clamp(100, 0, 10)).toBe(10)
    })

    it('handles negative ranges', () => {
      expect(clamp(0, -10, -5)).toBe(-5)
      expect(clamp(-7, -10, -5)).toBe(-7)
      expect(clamp(-15, -10, -5)).toBe(-10)
    })
  })

  describe('lerp', () => {
    it('interpolates between start and end', () => {
      expect(lerp(0, 100, 0.5)).toBe(50)
      expect(lerp(0, 100, 0.25)).toBe(25)
      expect(lerp(0, 100, 0.75)).toBe(75)
    })

    it('returns start when t is 0', () => {
      expect(lerp(10, 20, 0)).toBe(10)
    })

    it('returns end when t is 1', () => {
      expect(lerp(10, 20, 1)).toBe(20)
    })

    it('handles negative values', () => {
      expect(lerp(-10, 10, 0.5)).toBe(0)
      expect(lerp(-100, -50, 0.5)).toBe(-75)
    })
  })

  describe('mapRange', () => {
    it('maps value from one range to another', () => {
      expect(mapRange(5, 0, 10, 0, 100)).toBe(50)
      expect(mapRange(2.5, 0, 10, 0, 100)).toBe(25)
      expect(mapRange(7.5, 0, 10, 0, 100)).toBe(75)
    })

    it('handles different range scales', () => {
      expect(mapRange(0.5, 0, 1, 0, 255)).toBe(127.5)
      expect(mapRange(50, 0, 100, -1, 1)).toBe(0)
    })

    it('returns min output when input is at min', () => {
      expect(mapRange(0, 0, 10, 100, 200)).toBe(100)
    })

    it('returns max output when input is at max', () => {
      expect(mapRange(10, 0, 10, 100, 200)).toBe(200)
    })
  })

  describe('randomInRange', () => {
    it('returns value within range', () => {
      for (let i = 0; i < 100; i++) {
        const value = randomInRange(0, 10)
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThanOrEqual(10)
      }
    })

    it('handles negative ranges', () => {
      for (let i = 0; i < 100; i++) {
        const value = randomInRange(-10, -5)
        expect(value).toBeGreaterThanOrEqual(-10)
        expect(value).toBeLessThanOrEqual(-5)
      }
    })

    it('handles ranges crossing zero', () => {
      for (let i = 0; i < 100; i++) {
        const value = randomInRange(-5, 5)
        expect(value).toBeGreaterThanOrEqual(-5)
        expect(value).toBeLessThanOrEqual(5)
      }
    })
  })

  describe('splitTextIntoCharacters', () => {
    it('splits text into individual characters', () => {
      const result = splitTextIntoCharacters('hello')
      expect(result).toEqual(['h', 'e', 'l', 'l', 'o'])
    })

    it('preserves spaces', () => {
      const result = splitTextIntoCharacters('hello world')
      expect(result).toEqual(['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'])
    })

    it('handles empty string', () => {
      const result = splitTextIntoCharacters('')
      expect(result).toEqual([])
    })

    it('handles special characters', () => {
      const result = splitTextIntoCharacters('a!@#')
      expect(result).toEqual(['a', '!', '@', '#'])
    })
  })
})
