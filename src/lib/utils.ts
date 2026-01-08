import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Age calculation constants
export const MIN_VALID_AGE = 0
export const MAX_VALID_AGE = 120

/**
 * Calculate age from birth date string
 * @param birthDate - Date string in format YYYY-MM-DD
 * @returns Age in years
 */
export function calculateAge(birthDate: string): number {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

/**
 * Check if calculated age is within valid range
 */
export function isValidAge(age: number): boolean {
  return age >= MIN_VALID_AGE && age <= MAX_VALID_AGE
}
