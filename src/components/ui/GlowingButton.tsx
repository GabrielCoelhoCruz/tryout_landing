'use client'

import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'

export type GlowingButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'

interface GlowingButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: GlowingButtonVariant
  type?: 'button' | 'submit'
  disabled?: boolean
}

/**
 * Glowing button with magnetic hover effect
 * Supports primary (gradient), secondary (dark bg glass), outline (light bg), and ghost variants
 */
export function GlowingButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false
}: GlowingButtonProps) {
  const baseStyles = "relative group px-8 py-4 font-bold text-lg rounded-full transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"

  const variants: Record<GlowingButtonVariant, string> = {
    primary: "bg-gradient-to-r from-[#FF7F00] to-[#FF9933] text-white hover:shadow-[0_0_40px_rgba(255,127,0,0.5)]",
    secondary: "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/40",
    outline: "bg-transparent border-2 border-gray-100 text-[#000c1f] hover:border-[#FF7F00] hover:text-[#FF7F00]",
    ghost: "bg-transparent text-white hover:bg-white/10"
  }

  return (
    <MagneticButton
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      attractRadius={100}
      strength={0.25}
      type={type}
      disabled={disabled}
    >
      <span className="relative z-10 flex items-center gap-2 justify-center">
        {children}
      </span>
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#FF9933] to-[#FF7F00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}
    </MagneticButton>
  )
}
