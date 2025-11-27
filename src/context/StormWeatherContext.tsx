'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type StormType = 'hail' | 'snow' | 'fire' | 'rain' | 'thunder' | 'mixed'

interface StormWeatherContextType {
  currentStorm: StormType
  setStorm: (storm: StormType) => void
  intensity: number
  setIntensity: (intensity: number) => void
  isTransitioning: boolean
  setIsTransitioning: (transitioning: boolean) => void
}

const StormWeatherContext = createContext<StormWeatherContextType | undefined>(undefined)

interface StormWeatherProviderProps {
  children: ReactNode
  defaultStorm?: StormType
  defaultIntensity?: number
}

/**
 * Provider para o sistema global de weather/storm
 * Gerencia qual storm está ativo, sua intensidade e transições
 */
export function StormWeatherProvider({
  children,
  defaultStorm = 'mixed',
  defaultIntensity = 0.5,
}: StormWeatherProviderProps) {
  const [currentStorm, setCurrentStorm] = useState<StormType>(defaultStorm)
  const [intensity, setIntensity] = useState(defaultIntensity)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const setStorm = (storm: StormType) => {
    if (storm === currentStorm) return

    setIsTransitioning(true)
    setCurrentStorm(storm)

    // Reset transitioning após a animação
    setTimeout(() => {
      setIsTransitioning(false)
    }, 800)
  }

  return (
    <StormWeatherContext.Provider
      value={{
        currentStorm,
        setStorm,
        intensity,
        setIntensity,
        isTransitioning,
        setIsTransitioning,
      }}
    >
      {children}
    </StormWeatherContext.Provider>
  )
}

/**
 * Hook para acessar o contexto de storm weather
 * Deve ser usado dentro de um StormWeatherProvider
 */
export function useStormWeather() {
  const context = useContext(StormWeatherContext)

  if (context === undefined) {
    throw new Error('useStormWeather must be used within a StormWeatherProvider')
  }

  return context
}
