// Payment configuration constants

export const PIX_CONFIG = {
  key: 'skyhigh.allstar@gmail.com',
  type: 'email' as const,
  label: 'Chave PIX (E-mail)',
} as const

// File upload constraints
export const PAYMENT_PROOF_CONFIG = {
  maxSizeBytes: 5 * 1024 * 1024, // 5MB
  maxSizeMB: 5,
  acceptedFormats: '.png,.pdf,.jpeg,.jpg',
  acceptedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'],
  formatDescription: 'PNG, PDF, JPEG',
} as const

// Section identifiers
export const FORM_SECTION_IDS = {
  personalData: 'dados-pessoais',
  experience: 'experiencia',
  availability: 'disponibilidade',
  health: 'saude',
  payment: 'pagamento',
} as const
