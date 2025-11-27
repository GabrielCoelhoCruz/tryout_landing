'use client'

import { useEffect, useState } from 'react'

/**
 * Hook que detecta se o usuário prefere movimento reduzido
 * Respeita a preferência do sistema prefers-reduced-motion
 * Essencial para acessibilidade
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    // Verifica a preferência inicial
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)

    // Escuta mudanças na preferência
    const listener = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches)
    }

    mediaQuery.addEventListener('change', listener)

    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [])

  return prefersReduced
}
