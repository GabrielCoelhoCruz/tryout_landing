export const SCROLL_THRESHOLD = 50

export const VELOCITY_THRESHOLD = 0.02

export const PARTICLE_SPAWN_BOUNDS = {
  min: 0,
  max: 100,
} as const

export const MAGNETIC_BUTTON_CONFIG = {
  attractRadius: 100,
  strength: 0.25,
} as const

export const SCROLL_PARALLAX_RANGE = {
  start: 0,
  end: 1,
} as const

export const FADE_SCALE_RANGE = {
  opacity: [0, 0.5, 0.7] as const,
  scale: [0, 1] as const,
} as const

export const INTERSECTION_OBSERVER_CONFIG = {
  threshold: 0.5,
  rootMargin: '-50% 0px',
} as const

// Section spacing standardization - Increased for better separation
export const SECTION_SPACING = 'py-32 md:py-40 lg:py-48' as const
export const SECTION_SPACING_SM = 'py-20 md:py-24 lg:py-32' as const
