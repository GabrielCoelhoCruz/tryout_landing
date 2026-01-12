import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================
// DATE UTILITIES
// ============================================

/**
 * Parse a date string (YYYY-MM-DD) into a local Date object
 * Avoids timezone issues with new Date(string) which parses as UTC
 * @param dateString - Date string in format YYYY-MM-DD
 * @returns Local Date object
 */
export function parseDateString(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/**
 * Format a date string (YYYY-MM-DD) to Brazilian format (DD/MM/YYYY)
 * Handles timezone correctly by parsing as local date
 * @param dateString - Date string in format YYYY-MM-DD
 * @returns Formatted date string (e.g., "19/10/2000")
 */
export function formatDateBR(dateString: string | null | undefined): string {
  if (!dateString) return '-'
  const date = parseDateString(dateString)
  return date.toLocaleDateString('pt-BR')
}

// ============================================
// AGE UTILITIES
// ============================================

export const MIN_VALID_AGE = 0
export const MAX_VALID_AGE = 120

/**
 * Calculate age from birth date string
 * @param birthDate - Date string in format YYYY-MM-DD
 * @returns Age in years
 */
export function calculateAge(birthDate: string): number {
  const today = new Date()
  const birth = parseDateString(birthDate)

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

// ============================================
// FILE UTILITIES
// ============================================

/**
 * Format file size in bytes to human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.25 MB")
 */
export function formatFileSize(bytes: number): string {
  const mb = bytes / 1024 / 1024
  return `${mb.toFixed(2)} MB`
}
