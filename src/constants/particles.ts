/**
 * Deterministic particle positions to avoid hydration mismatch
 * Used for background animations throughout the app
 */
export const PARTICLE_POSITIONS = [
  { left: 5, top: 12 },
  { left: 15, top: 78 },
  { left: 25, top: 34 },
  { left: 35, top: 89 },
  { left: 45, top: 23 },
  { left: 55, top: 67 },
  { left: 65, top: 45 },
  { left: 75, top: 91 },
  { left: 85, top: 8 },
  { left: 95, top: 56 },
  { left: 10, top: 42 },
  { left: 20, top: 73 },
  { left: 30, top: 19 },
  { left: 40, top: 85 },
  { left: 50, top: 31 },
  { left: 60, top: 62 },
  { left: 70, top: 15 },
  { left: 80, top: 48 },
  { left: 90, top: 77 },
  { left: 3, top: 95 },
] as const

export type ParticlePosition = typeof PARTICLE_POSITIONS[number]
