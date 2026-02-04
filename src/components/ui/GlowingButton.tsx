'use client'

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
  const baseStyles = "relative group px-6 py-3 font-bold text-base rounded-full transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"

  const variants: Record<GlowingButtonVariant, string> = {
    primary: "bg-[#FF7F00] text-white hover:bg-[#FF9933] hover:shadow-[0_0_30px_rgba(255,127,0,0.4)]",
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
      {children}
    </MagneticButton>
  )
}
