import { StormType } from '@/context/StormWeatherContext'

// Re-export StormType for convenience
export type { StormType }

export type ParticleShape = 'circle' | 'hexagon' | 'irregular' | 'line' | 'spark' | 'bolt'
export type MovementDirection = 'up' | 'down' | 'down-drift' | 'down-steep' | 'erratic'
export type MouseBehavior = 'repel' | 'attract-slow' | 'avoid' | 'split' | 'attract-magnetic' | 'none'

interface ParticleConfig {
  count: {
    desktop: number
    mobile: number
  }
  shape: ParticleShape
  colors: string[]
  size: {
    min: number
    max: number
    width?: number
    length?: { min: number; max: number }
  }
  speed: {
    min: number
    max: number
  }
  direction: MovementDirection
  bounce?: boolean
  drift?: {
    amplitude: number
    frequency: number
  }
  turbulence?: {
    enabled: boolean
    intensity: number
  }
  zigzag?: {
    enabled: boolean
    amplitude: number
  }
  blur?: number
  angle?: number
}

interface ParticleEffects {
  mouseBehavior: MouseBehavior
  repelRadius?: number
  attractRadius?: number
  avoidRadius?: number
  splitRadius?: number
  trail?: {
    enabled: boolean
    length: number
    fade: boolean
  }
  crystallize?: {
    duration: number
    onStop: boolean
  }
  accumulation?: {
    enabled: boolean
    bottom: boolean
  }
  glow?: {
    intensity: 'low' | 'medium' | 'high' | 'very-high'
    radius: number
    pulse: boolean
  }
  fadeOut?: {
    enabled: boolean
    top?: boolean
  }
  heatDistortion?: {
    enabled: boolean
    intensity: number
  }
  ripple?: {
    enabled: boolean
    onGround: boolean
    duration: number
  }
  splash?: {
    enabled: boolean
    particles: number
  }
  lightning?: {
    enabled: boolean
    frequency: number
    duration: number
    flash: boolean
  }
  electricArcs?: {
    enabled: boolean
    between: 'particles'
  }
}

interface StormConfig {
  particles: ParticleConfig
  effects: ParticleEffects
  theme: {
    name: string
    description: string
    mood: string
  }
}

type StormConfigs = {
  [K in Exclude<StormType, 'mixed'>]: StormConfig
} & {
  mixed: {
    description: string
    components: Exclude<StormType, 'mixed'>[]
  }
}

/**
 * Configurações MINIMALISTAS para cada tipo de storm
 * Poucas partículas, sem interação, apenas atmosfera sutil
 */
export const stormConfigs: StormConfigs = {
  // HailStorm - Poucos cristais caindo suavemente
  hail: {
    particles: {
      count: { desktop: 5, mobile: 3 },
      shape: 'circle',
      colors: ['#E0F4FF', '#FFFFFF'],
      size: { min: 3, max: 6 },
      speed: { min: 0.8, max: 1.5 },
      direction: 'down',
    },
    effects: {
      mouseBehavior: 'none',
      glow: {
        intensity: 'low',
        radius: 8,
        pulse: false,
      },
    },
    theme: {
      name: 'HailStorm',
      description: 'Cristais sutis',
      mood: 'Preciso, elegante',
    },
  },

  // SnowStorm - Poucos flocos flutuando
  snow: {
    particles: {
      count: { desktop: 6, mobile: 4 },
      shape: 'hexagon',
      colors: ['#FFFFFF', '#F0F8FF'],
      size: { min: 4, max: 8 },
      speed: { min: 0.3, max: 0.6 },
      direction: 'down-drift',
      drift: {
        amplitude: 15,
        frequency: 0.3,
      },
    },
    effects: {
      mouseBehavior: 'none',
      glow: {
        intensity: 'low',
        radius: 6,
        pulse: false,
      },
    },
    theme: {
      name: 'SnowStorm',
      description: 'Flocos sutis',
      mood: 'Elegante, sereno',
    },
  },

  // FireStorm - Poucas faíscas subindo
  fire: {
    particles: {
      count: { desktop: 5, mobile: 3 },
      shape: 'circle',
      colors: ['#FF7F00', '#FFD700'],
      size: { min: 3, max: 6 },
      speed: { min: 0.6, max: 1.2 },
      direction: 'up',
    },
    effects: {
      mouseBehavior: 'none',
      glow: {
        intensity: 'medium',
        radius: 10,
        pulse: false,
      },
      fadeOut: {
        enabled: true,
        top: true,
      },
    },
    theme: {
      name: 'FireStorm',
      description: 'Faíscas sutis',
      mood: 'Energia, paixão',
    },
  },

  // RainStorm - Poucas gotas caindo
  rain: {
    particles: {
      count: { desktop: 6, mobile: 4 },
      shape: 'line',
      colors: ['#00BFFF', '#1E90FF'],
      size: { width: 1, length: { min: 15, max: 25 }, min: 1, max: 2 },
      speed: { min: 2, max: 3.5 },
      direction: 'down-steep',
      angle: -10,
    },
    effects: {
      mouseBehavior: 'none',
    },
    theme: {
      name: 'RainStorm',
      description: 'Gotas sutis',
      mood: 'Fluidez, renovação',
    },
  },

  // ThunderStorm - Apenas poucos raios sutis
  thunder: {
    particles: {
      count: { desktop: 4, mobile: 2 },
      shape: 'bolt',
      colors: ['#2563EB', '#93C5FD', '#FFFFFF'],
      size: { min: 25, max: 45 },
      speed: { min: 0.3, max: 0.8 },
      direction: 'down',
    },
    effects: {
      mouseBehavior: 'none',
      glow: {
        intensity: 'medium',
        radius: 12,
        pulse: false,
      },
    },
    theme: {
      name: 'ThunderStorm',
      description: 'Raios sutis',
      mood: 'Energia, poder',
    },
  },

  // Mixed - Combinação (não usado mais)
  mixed: {
    description: 'Combinação de todos os storms em preview',
    components: ['hail', 'snow', 'fire', 'rain', 'thunder'],
  },
}

/**
 * Mapeia times para seus storms correspondentes
 */
export const teamStormMap = {
  hailstorm: 'hail' as const,
  snowstorm: 'snow' as const,
  firestorm: 'fire' as const,
  rainstorm: 'rain' as const,
  thunderstorm: 'thunder' as const,
}

/**
 * Mapeia seções da página para storms recomendados
 */
export const sectionStormMap = {
  hero: 'mixed' as const,
  about: 'snow' as const,
  benefits: 'snow' as const,
  teams: 'mixed' as const, // Muda baseado no tab ativo
  journey: 'rain' as const, // Progression: calmo → intenso
  testimonials: 'snow' as const,
  faq: 'rain' as const,
  cta: 'thunder' as const,
}

/**
 * Configurações de transição entre storms
 */
export const transitionConfig = {
  duration: 800, // ms
  exitVariant: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.4 },
  },
  enterVariant: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.4 },
  },
}

/**
 * Helper para obter config de um storm específico
 */
export function getStormConfig(storm: StormType): StormConfig | typeof stormConfigs.mixed {
  return stormConfigs[storm]
}

/**
 * Helper para obter contagem de partículas baseado no dispositivo
 */
export function getParticleCount(storm: Exclude<StormType, 'mixed'>, isMobile: boolean): number {
  const config = stormConfigs[storm].particles.count
  return isMobile ? config.mobile : config.desktop
}
