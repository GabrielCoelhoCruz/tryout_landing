/**
 * Form validation utility functions
 * 
 * Main validation is now handled by Zod schema in @/lib/schemas/registration-schema.ts
 * These utilities are kept for backward compatibility and helper functions.
 */

import type { FormData } from '@/types/form'

/**
 * Calculate age from birth date and determine if user is a minor
 * @param formData - Partial form data containing birth date
 * @returns true if user is under 18 years old
 */
export function isMinor(formData: Partial<FormData>): boolean {
  const birthDate = formData['data-nascimento']
  if (!birthDate) {
    return false
  }

  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age < 18
}

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns true if email format is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate Brazilian phone number format
 * @param phone - Phone string to validate
 * @returns true if phone format is valid
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\(?[0-9]{2}\)?\s?[0-9]{4,5}-?[0-9]{4}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}
