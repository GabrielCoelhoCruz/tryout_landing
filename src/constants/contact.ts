/**
 * Contact information constants
 * Centralized configuration for all contact-related data
 */

export const CONTACT = {
  whatsapp: {
    number: '5511913311920',
    formatted: '(11) 91331-1920',
    link: 'https://wa.me/5511913311920',
  },
  instagram: {
    handle: 'skyhigh.allstar',
    link: 'https://instagram.com/skyhigh.allstar',
  },
  location: {
    name: 'Ginasio SkyHigh All Star',
    venue: 'Centro Esportivo Tiete',
    address: 'Av. Santos Dumont, 843 - Luz',
    city: 'Sao Paulo - SP',
  },
} as const

/**
 * Generate WhatsApp link with pre-filled message
 */
export function createWhatsAppLink(message?: string): string {
  if (!message) return CONTACT.whatsapp.link
  return `${CONTACT.whatsapp.link}?text=${encodeURIComponent(message)}`
}
