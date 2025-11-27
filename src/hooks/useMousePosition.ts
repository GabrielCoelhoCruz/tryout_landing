'use client'

import { useEffect, useState } from 'react'

interface MousePosition {
  x: number
  y: number
}

/**
 * Hook que rastreia a posição do mouse na tela
 * Usado para efeitos magnéticos e interações baseadas em cursor
 */
export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Throttle para 60fps (16ms)
    let rafId: number
    const throttledUpdate = (e: MouseEvent) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        updateMousePosition(e)
        rafId = 0
      })
    }

    window.addEventListener('mousemove', throttledUpdate)

    return () => {
      window.removeEventListener('mousemove', throttledUpdate)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return mousePosition
}
