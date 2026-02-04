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

// Position labels for display
export const POSITION_LABELS: Record<CheerPositionType, string> = {
  base: 'Base',
  flyer: 'Flyer',
  back: 'Back',
}

type TeamConfig = {
  name: string
  level: string
  color: string
}

// Team configuration for display (after tryout assignment)
export const TEAM_CONFIG: Record<AthleteTeamType, TeamConfig> = {
  snowstorm: {
    name: 'Snowstorm',
    level: 'All Girl N2',
    color: '#00BFFF', // Cyan/ice blue
  },
  hailstorm: {
    name: 'Hailstorm',
    level: 'Coed N2',
    color: '#8B5CF6', // Purple
  },
  rainstorm: {
    name: 'Rainstorm',
    level: 'Coed N3',
    color: '#3B82F6', // Blue
  },
  unassigned: {
    name: 'A definir',
    level: 'Aguardando',
    color: '#6B7280', // Gray
  },
}
