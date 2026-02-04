import * as React from "react"
import { cn } from "@/lib/utils"

type InputVariant = 'default' | 'dark'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
}

const variantStyles: Record<InputVariant, string> = {
  default: [
    'h-10 rounded-md border-2 border-muted bg-bg-alt px-3 py-2 text-sm',
    'placeholder:text-ink-muted',
    'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20',
  ].join(' '),
  dark: [
    'h-auto rounded-xl border border-white/10 px-4 py-3 text-base',
    'bg-[rgba(10,27,77,0.8)] backdrop-blur-sm text-white',
    'placeholder:text-white/30',
    'hover:border-white/20',
    'focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none',
  ].join(' '),
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-base',
          variantStyles[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
export type { InputVariant }
