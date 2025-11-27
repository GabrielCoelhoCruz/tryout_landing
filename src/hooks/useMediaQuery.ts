'use client'

import { useEffect, useState } from 'react'

/**
 * Hook que verifica media queries
 * Usado para comportamentos responsivos
 *
 * @param query - Media query string (ex: '(max-width: 768px)')
 * @returns boolean indicando se a query corresponde
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    // Set initial value
    setMatches(mediaQuery.matches)

    // Listener para mudanças
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    mediaQuery.addEventListener('change', listener)

    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

// Breakpoints comuns exportados para conveniência
export const breakpoints = {
  mobile: '(max-width: 768px)',
  tablet: '(min-width: 769px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)',
  touch: '(hover: none) and (pointer: coarse)',
}
