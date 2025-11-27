'use client'

import React, { useEffect, useRef } from 'react'
import { useMousePosition, useReducedMotion, useMediaQuery, breakpoints } from '@/hooks'
import {
  stormConfigs,
  getStormConfig,
  getParticleCount,
  StormType,
  ParticleShape,
} from '@/lib/animations/storm-configs'
import { randomInRange, distance, clamp } from '@/lib/animations/utils'

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
 * Sistema de partículas por storm
 * Renderiza e anima partículas baseado no tipo de storm
 */
export function StormParticles({
  storm,
  intensity = 1,
  className = '',
}: StormParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const { x: mouseX, y: mouseY } = useMousePosition()
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
          vx = randomInRange(-1, 1)
          vy = speed * 0.5
          break
        case 'down-steep':
          vx = speed * 0.3 * (particleConfig.angle ? Math.tan(particleConfig.angle * Math.PI / 180) : 0)
          vy = speed
          break
        case 'erratic':
          vx = randomInRange(-speed, speed)
          vy = randomInRange(-speed, speed)
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

    // Update particle position and physics
    const updateParticle = (particle: Particle, width: number, height: number) => {
      const dist = distance(mouseX, mouseY, particle.x, particle.y)

      switch (effectsConfig.mouseBehavior) {
        case 'repel':
          if (dist < (effectsConfig.repelRadius || 120)) {
            const angle = Math.atan2(particle.y - mouseY, particle.x - mouseX)
            const force = (1 - dist / (effectsConfig.repelRadius || 120)) * 2
            particle.vx += Math.cos(angle) * force
            particle.vy += Math.sin(angle) * force
          }
          break
        case 'attract-slow':
        case 'attract-magnetic':
          if (dist < (effectsConfig.attractRadius || 150)) {
            const angle = Math.atan2(mouseY - particle.y, mouseX - particle.x)
            const force = (1 - dist / (effectsConfig.attractRadius || 150)) * 0.5
            particle.vx += Math.cos(angle) * force
            particle.vy += Math.sin(angle) * force
          }
          break
        case 'avoid':
          if (dist < (effectsConfig.avoidRadius || 100)) {
            const angle = Math.atan2(particle.y - mouseY, particle.x - mouseX)
            const force = (1 - dist / (effectsConfig.avoidRadius || 100)) * 3
            particle.vx += Math.cos(angle) * force
            particle.vy += Math.sin(angle) * force
          }
          break
        case 'split':
          if (dist < (effectsConfig.splitRadius || 80)) {
            const angle = Math.atan2(particle.y - mouseY, particle.x - mouseX) + Math.PI / 2
            particle.vx += Math.cos(angle) * 0.5
          }
          break
      }

      if (particleConfig.turbulence?.enabled) {
        particle.vx += (Math.random() - 0.5) * particleConfig.turbulence.intensity
        particle.vy += (Math.random() - 0.5) * particleConfig.turbulence.intensity
      }

      if (particleConfig.drift) {
        particle.vx += Math.sin(Date.now() * 0.001 * particleConfig.drift.frequency) * particleConfig.drift.amplitude * 0.01
      }

      if (particleConfig.zigzag?.enabled) {
        particle.vx += Math.sin(particle.y * 0.02) * particleConfig.zigzag.amplitude * 0.02
      }

      particle.x += particle.vx
      particle.y += particle.vy
      particle.vx *= 0.98
      particle.vy *= 0.98

      if (particleConfig.bounce && particle.y >= height - particle.size) {
        particle.vy *= -0.7
        particle.y = height - particle.size
      }

      if (effectsConfig.fadeOut?.enabled && effectsConfig.fadeOut.top && particle.y < height * 0.2) {
        particle.life = clamp(particle.y / (height * 0.2), 0, 1)
      }

      if (effectsConfig.accumulation?.enabled && effectsConfig.accumulation.bottom && particle.y > height * 0.9) {
        particle.life = clamp(1 - (particle.y - height * 0.9) / (height * 0.1), 0, 1)
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

    const drawIrregular = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath()
      const points = 5 + Math.floor(Math.random() * 3)
      for (let i = 0; i < points; i++) {
        const angle = (Math.PI * 2 / points) * i + Math.random() * 0.5
        const radius = size * (0.7 + Math.random() * 0.6)
        const px = x + radius * Math.cos(angle)
        const py = y + radius * Math.sin(angle)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fill()
    }

    const drawSpark = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const spikes = 4
      for (let i = 0; i < spikes; i++) {
        const angle = (Math.PI * 2 / spikes) * i + Date.now() * 0.001
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + size * 2 * Math.cos(angle), y + size * 2 * Math.sin(angle))
        ctx.stroke()
      }
    }

    // Draw particle
    const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save()
      ctx.globalAlpha = particle.life
      ctx.fillStyle = particle.color

      if (effectsConfig.glow) {
        const glowRadius = effectsConfig.glow.radius
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, glowRadius)
        const glowAlpha = effectsConfig.glow.pulse ? 0.3 + Math.sin(Date.now() * 0.003) * 0.2 : 0.3
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, `${particle.color}00`)
        ctx.fillStyle = gradient
        ctx.fillRect(particle.x - glowRadius, particle.y - glowRadius, glowRadius * 2, glowRadius * 2)
        ctx.fillStyle = particle.color
      }

      if (particleConfig.blur) {
        ctx.filter = `blur(${particleConfig.blur}px)`
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
          drawIrregular(ctx, particle.x, particle.y, particle.size)
          break
        case 'line':
          const length = (particleConfig.size.length?.min || 15) + Math.random() * ((particleConfig.size.length?.max || 25) - (particleConfig.size.length?.min || 15))
          ctx.strokeStyle = particle.color
          ctx.lineWidth = particleConfig.size.width || 1
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particle.x + (particle.vx / Math.abs(particle.vx || 1)) * 2, particle.y + length)
          ctx.stroke()
          break
        case 'spark':
          drawSpark(ctx, particle.x, particle.y, particle.size)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storm, intensity, isMobile, prefersReduced, mouseX, mouseY])

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
