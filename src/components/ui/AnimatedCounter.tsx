'use client'

import { useState, useEffect } from 'react'

interface AnimatedCounterProps {
  /** Value to count to (e.g., "100+", "25", "1.5k") */
  value: string
  /** Suffix to append after the number */
  suffix?: string
  /** Duration of animation in milliseconds */
  duration?: number
  /** Number of steps for the animation */
  steps?: number
}

/**
 * Animated counter that counts up from 0 to a target value
 * Supports numbers with + suffix and custom suffixes
 */
export function AnimatedCounter({
  value,
  suffix = '',
  duration = 2000,
  steps = 60
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0
  const hasPlus = value.includes('+')

  useEffect(() => {
    const increment = numericValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [numericValue, duration, steps])

  return (
    <span>
      {count}{hasPlus ? '+' : ''}{suffix}
    </span>
  )
}
