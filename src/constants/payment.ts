// Payment configuration constants

export const PIX_CONFIG = {
  key: 'skyhigh.allstar@gmail.com',
  type: 'email' as const,
  label: 'Chave PIX (E-mail)',
} as const

// Tryout pricing based on athlete status and number of teams
export const TRYOUT_PRICING = {
  // Atleta SkyHigh 2025
  skyhigh: {
    single: 25,   // 1 nível de interesse
    multiple: 30, // 2+ níveis de interesse
  },
  // Não atleta SkyHigh
  nonSkyhigh: {
    single: 30,   // 1 nível de interesse
    multiple: 35, // 2+ níveis de interesse
  },
  // Na porta (para referência)
  atDoor: {
    single: 35,
    multiple: 40,
  },
  // Cheer Pom pricing
  cheerPom: {
    skyhigh: 0,    // Atleta SH 2025 → isento
    nonSkyhigh: 25, // Não atleta → R$25
  },
} as const

export function calculateTryoutPrice(
  isSkyhighAthlete: boolean,
  teamCount: number,
  selectedTeams?: string[]
): number {
  const teams = selectedTeams || []
  const hasCheerPom = teams.includes('cheer-pom')
  const otherTeamCount = hasCheerPom ? teamCount - 1 : teamCount

  let total = 0

  // Cheer Pom pricing
  if (hasCheerPom) {
    total += isSkyhighAthlete
      ? TRYOUT_PRICING.cheerPom.skyhigh
      : TRYOUT_PRICING.cheerPom.nonSkyhigh
  }

  // Regular teams pricing
  if (otherTeamCount > 0) {
    const category = isSkyhighAthlete ? 'skyhigh' : 'nonSkyhigh'
    const quantity = otherTeamCount > 1 ? 'multiple' : 'single'
    total += TRYOUT_PRICING[category][quantity]
  }

  return total
}

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
