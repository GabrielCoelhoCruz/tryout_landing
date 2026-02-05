/**
 * Animation and display constants for the approved page
 */

import type { Database } from '@/types/database'

type AthleteTeamType = Database['public']['Enums']['athlete_team_type']
type CheerPositionType = Database['public']['Enums']['cheer_position_type']

// Confetti animation
export const CONFETTI_PARTICLE_COUNT = 50
export const CONFETTI_DURATION_MS = 5000
export const CONFETTI_COLORS = [
  '#FF7F00', // Orange (primary)
  '#00BFFF', // Blue (secondary)
  '#FF9933', // Light orange
  '#2563EB', // Dark blue
  '#FFD700', // Gold
]

// Position labels for display (base types)
const BASE_POSITION_LABELS: Record<CheerPositionType, string> = {
  base: 'Base',
  flyer: 'Flyer',
  back: 'Back',
}

// Special position labels
const SPECIAL_POSITION_LABELS: Record<string, string> = {
  'flyer reserva': 'Flyer Reserva',
  'base frontal': 'Base Frontal',
}

/**
 * Get display label for a position, handling compound and special positions
 */
export function getPositionLabel(position: string): string {
  const normalizedPosition = position.toLowerCase().trim()

  // Check if it's a special position
  if (SPECIAL_POSITION_LABELS[normalizedPosition]) {
    return SPECIAL_POSITION_LABELS[normalizedPosition]
  }

  // Check if it's a compound position (e.g., 'flyer/base', 'base/flyer')
  if (position.includes('/')) {
    const parts = position.split('/')
    const labels = parts
      .map((part) => BASE_POSITION_LABELS[part.trim() as CheerPositionType])
      .filter(Boolean)
    return labels.join(' / ') || position
  }

  // Simple position
  return BASE_POSITION_LABELS[position as CheerPositionType] || position
}

// Export for backwards compatibility (deprecated, use getPositionLabel instead)
export const POSITION_LABELS = BASE_POSITION_LABELS

type TeamConfig = {
  name: string
  level: string
  color: string
}

// Team configuration for display (after tryout assignment)
export const TEAM_CONFIG: Record<AthleteTeamType, TeamConfig> = {
  snowstorm: {
    name: 'Snowstorm',
    level: 'ALLGIRL N2 NT',
    color: '#00BFFF', // Cyan/ice blue
  },
  hailstorm: {
    name: 'Hailstorm',
    level: 'COED N2 NT',
    color: '#8B5CF6', // Purple
  },
  rainstorm: {
    name: 'Rainstorm',
    level: 'COED N3 NT',
    color: '#3B82F6', // Blue
  },
  unassigned: {
    name: 'A definir',
    level: 'Aguardando',
    color: '#6B7280', // Gray
  },
}
