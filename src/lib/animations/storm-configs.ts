import { StormType } from '@/context/StormWeatherContext'

// Re-export StormType for convenience
export type { StormType }

export type ParticleShape = 'circle' | 'hexagon' | 'irregular' | 'line' | 'spark'
export type MovementDirection = 'up' | 'down' | 'down-drift' | 'down-steep' | 'erratic'
export type MouseBehavior = 'repel' | 'attract-slow' | 'avoid' | 'split' | 'attract-magnetic'

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
 * Configurações completas para cada tipo de storm
 * Define partículas, comportamentos e efeitos visuais
 */
export const stormConfigs: StormConfigs = {
  // HailStorm - Gelo: Rápido, cristalino, impactante
  hail: {
    particles: {
      count: { desktop: 20, mobile: 10 },
      shape: 'circle',
      colors: ['#E0F4FF', '#B8E0F6', '#FFFFFF'],
      size: { min: 3, max: 8 },
      speed: { min: 2, max: 5 },
      direction: 'down',
      bounce: true,
    },
    effects: {
      mouseBehavior: 'repel',
      repelRadius: 120,
      trail: {
        enabled: true,
        length: 15,
        fade: true,
      },
      crystallize: {
        duration: 300,
        onStop: true,
      },
      glow: {
        intensity: 'low',
        radius: 10,
        pulse: false,
      },
    },
    theme: {
      name: 'HailStorm',
      description: 'Gelo caindo com impacto e cristalização',
      mood: 'Preciso, impactante, cristalino',
    },
  },

  // SnowStorm - Neve: Suave, elegante, hipnótico
  snow: {
    particles: {
      count: { desktop: 25, mobile: 12 },
      shape: 'hexagon',
      colors: ['#FFFFFF', '#F0F8FF'],
      size: { min: 4, max: 10 },
      speed: { min: 0.3, max: 1.2 },
      direction: 'down-drift',
      drift: {
        amplitude: 30,
        frequency: 0.5,
      },
      blur: 1,
    },
    effects: {
      mouseBehavior: 'attract-slow',
      attractRadius: 150,
      accumulation: {
        enabled: true,
        bottom: true,
      },
      glow: {
        intensity: 'low',
        radius: 8,
        pulse: false,
      },
    },
    theme: {
      name: 'SnowStorm',
      description: 'Neve flutuante suave com drift lateral',
      mood: 'Elegante, profissional, calmante',
    },
  },

  // FireStorm - Fogo: Intenso, energético, ascendente
  fire: {
    particles: {
      count: { desktop: 18, mobile: 9 },
      shape: 'irregular',
      colors: ['#FF7F00', '#FF4500', '#FFD700'],
      size: { min: 5, max: 12 },
      speed: { min: 1.5, max: 4 },
      direction: 'up',
      turbulence: {
        enabled: true,
        intensity: 0.7,
      },
    },
    effects: {
      mouseBehavior: 'avoid',
      avoidRadius: 100,
      glow: {
        intensity: 'high',
        radius: 20,
        pulse: true,
      },
      fadeOut: {
        enabled: true,
        top: true,
      },
      heatDistortion: {
        enabled: true,
        intensity: 0.3,
      },
    },
    theme: {
      name: 'FireStorm',
      description: 'Fogo subindo com turbulência e calor',
      mood: 'Paixão, energia, vitória',
    },
  },

  // RainStorm - Chuva: Rápido, fluido, refrescante
  rain: {
    particles: {
      count: { desktop: 30, mobile: 15 },
      shape: 'line',
      colors: ['#00BFFF', '#1E90FF', '#4682B4'],
      size: { width: 1, length: { min: 15, max: 25 }, min: 1, max: 2 },
      speed: { min: 8, max: 15 },
      direction: 'down-steep',
      angle: -15,
    },
    effects: {
      mouseBehavior: 'split',
      splitRadius: 80,
      ripple: {
        enabled: true,
        onGround: true,
        duration: 600,
      },
      splash: {
        enabled: true,
        particles: 5,
      },
    },
    theme: {
      name: 'RainStorm',
      description: 'Chuva rápida com ripples e splashes',
      mood: 'Crescimento, renovação, fluidez',
    },
  },

  // ThunderStorm - Trovão: Errático, elétrico, poderoso
  thunder: {
    particles: {
      count: { desktop: 15, mobile: 8 },
      shape: 'spark',
      colors: ['#9D00FF', '#FFD700', '#FFFFFF'],
      size: { min: 2, max: 6 },
      speed: { min: 3, max: 8 },
      direction: 'erratic',
      zigzag: {
        enabled: true,
        amplitude: 50,
      },
    },
    effects: {
      mouseBehavior: 'attract-magnetic',
      attractRadius: 200,
      glow: {
        intensity: 'very-high',
        radius: 25,
        pulse: true,
      },
      lightning: {
        enabled: true,
        frequency: 0.02,
        duration: 100,
        flash: true,
      },
      electricArcs: {
        enabled: true,
        between: 'particles',
      },
    },
    theme: {
      name: 'ThunderStorm',
      description: 'Sparks elétricos com relâmpagos e arcos',
      mood: 'Energia máxima, poder, urgência',
    },
  },

  // Mixed - Combinação de todos os storms (preview mode)
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
