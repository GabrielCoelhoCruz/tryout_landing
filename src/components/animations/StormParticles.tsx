'use client'

import React, { useEffect, useRef } from 'react'
import { useReducedMotion, useMediaQuery, breakpoints } from '@/hooks'
import {
  getStormConfig,
  getParticleCount,
  StormType,
  ParticleShape,
} from '@/lib/animations/storm-configs'
import { randomInRange, clamp } from '@/lib/animations/utils'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  shape: ParticleShape
  life: number
  maxLife: number
}

interface StormParticlesProps {
  storm: Exclude<StormType, 'mixed'>
  intensity?: number
  className?: string
}

/**
 * Sistema de partículas por storm - SIMPLIFICADO
 * Renderiza partículas sutis sem interação com mouse
 */
export function StormParticles({
  storm,
  intensity = 1,
  className = '',
}: StormParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const prefersReduced = useReducedMotion()
  const isMobile = useMediaQuery(breakpoints.mobile)

  useEffect(() => {
    if (prefersReduced || !canvasRef.current) return

    const config = getStormConfig(storm)
    if ((config as any).description) return // Mixed storm

    const particleConfig = (config as any).particles
    const effectsConfig = (config as any).effects

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create a single particle
    const createParticle = (id: number, width: number, height: number): Particle => {
      const colors = particleConfig.colors
      const sizes = particleConfig.size
      let x = randomInRange(0, width)
      let y: number

      switch (particleConfig.direction) {
        case 'up':
          y = height + randomInRange(0, 100)
          break
        case 'down':
        case 'down-drift':
        case 'down-steep':
          y = -randomInRange(0, 100)
          break
        case 'erratic':
          y = randomInRange(0, height)
          break
        default:
          y = randomInRange(0, height)
      }

      const speed = randomInRange(particleConfig.speed.min, particleConfig.speed.max)
      const size = randomInRange(sizes.min, sizes.max)
      let vx = 0
      let vy = speed

      switch (particleConfig.direction) {
        case 'up':
          vy = -speed
          break
        case 'down-drift':
          vx = randomInRange(-0.5, 0.5)
          vy = speed * 0.5
          break
        case 'down-steep':
          vx = speed * 0.3 * (particleConfig.angle ? Math.tan(particleConfig.angle * Math.PI / 180) : 0)
          vy = speed
          break
        case 'erratic':
          vx = randomInRange(-speed * 0.3, speed * 0.3)
          vy = speed
          break
      }

      return {
        id,
        x,
        y,
        vx,
        vy,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: particleConfig.shape,
        life: 1,
        maxLife: 1,
      }
    }

    // Update particle position - SEM INTERAÇÃO COM MOUSE
    const updateParticle = (particle: Particle, width: number, height: number) => {
      // Drift sutil (se configurado)
      if (particleConfig.drift) {
        particle.vx += Math.sin(Date.now() * 0.001 * particleConfig.drift.frequency) * particleConfig.drift.amplitude * 0.005
      }

      // Movimento simples
      particle.x += particle.vx
      particle.y += particle.vy

      // Fade out no topo (para fire)
      if (effectsConfig.fadeOut?.enabled && effectsConfig.fadeOut.top && particle.y < height * 0.2) {
        particle.life = clamp(particle.y / (height * 0.2), 0, 1)
      }
    }

    // Draw helpers
    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fill()
    }

    // Draw lightning bolt - raio de relâmpago
    const drawBolt = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      const segments = 4 + Math.floor(Math.random() * 3)
      const segmentLength = size / segments
      const jitter = size * 0.12
      
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      // Main bolt
      ctx.beginPath()
      let currentX = x
      let currentY = y
      ctx.moveTo(currentX, currentY)
      
      for (let i = 0; i < segments; i++) {
        const offsetX = (Math.random() - 0.5) * jitter * 2
        currentX += offsetX
        currentY += segmentLength
        ctx.lineTo(currentX, currentY)
      }
      ctx.stroke()
      
      // Glow effect
      ctx.lineWidth = 4
      ctx.globalAlpha = 0.2
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    // Draw particle
    const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save()
      ctx.globalAlpha = particle.life * 0.7 // Mais sutil
      ctx.fillStyle = particle.color

      // Glow sutil
      if (effectsConfig.glow) {
        const glowRadius = effectsConfig.glow.radius * 0.5
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, glowRadius)
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, `${particle.color}00`)
        ctx.fillStyle = gradient
        ctx.fillRect(particle.x - glowRadius, particle.y - glowRadius, glowRadius * 2, glowRadius * 2)
        ctx.fillStyle = particle.color
      }

      switch (particle.shape) {
        case 'circle':
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          break
        case 'hexagon':
          drawHexagon(ctx, particle.x, particle.y, particle.size)
          break
        case 'irregular':
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          break
        case 'line':
          const length = (particleConfig.size.length?.min || 15) + Math.random() * ((particleConfig.size.length?.max || 25) - (particleConfig.size.length?.min || 15))
          ctx.strokeStyle = particle.color
          ctx.lineWidth = particleConfig.size.width || 1
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particle.x + particle.vx * 2, particle.y + length)
          ctx.stroke()
          break
        case 'spark':
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          break
        case 'bolt':
          drawBolt(ctx, particle.x, particle.y, particle.size, particle.color)
          break
      }

      ctx.restore()
    }

    const isParticleOutOfBounds = (particle: Particle, width: number, height: number): boolean => {
      const margin = 100
      return particle.x < -margin || particle.x > width + margin || particle.y < -margin || particle.y > height + margin
    }

    // Create initial particles
    const particleCount = getParticleCount(storm, isMobile) * intensity
    particlesRef.current = Array.from({ length: Math.floor(particleCount) }, (_, i) =>
      createParticle(i, canvas.width, canvas.height)
    )

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        updateParticle(particle, canvas.width, canvas.height)
        drawParticle(ctx, particle)

        if (isParticleOutOfBounds(particle, canvas.width, canvas.height) || particle.life <= 0) {
          particlesRef.current[index] = createParticle(index, canvas.width, canvas.height)
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [storm, intensity, isMobile, prefersReduced])

  if (prefersReduced) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  )
}

/**
 * Mixed Storm Particles - Renderiza múltiplos storms simultaneamente
 */
export function MixedStormParticles({
  intensity = 0.3,
  className = '',
}: {
  intensity?: number
  className?: string
}) {
  const storms: Exclude<StormType, 'mixed'>[] = ['hail', 'snow', 'fire', 'rain', 'thunder']

  return (
    <>
      {storms.map((storm) => (
        <StormParticles
          key={storm}
          storm={storm}
          intensity={intensity}
          className={className}
        />
      ))}
    </>
  )
}
