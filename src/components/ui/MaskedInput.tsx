'use client'

import * as React from 'react'
import { Input, type InputProps, type InputVariant } from './input'

type MaskType = 'cpf' | 'phone' | 'rg' | 'cep'

type MaskedInputProps = Omit<InputProps, 'onChange'> & {
  mask: MaskType
  variant?: InputVariant
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onValueChange?: (value: string, maskedValue: string) => void
}

/**
 * Mask patterns:
 * - cpf: 123.456.789-00
 * - phone: (11) 99999-9999
 * - rg: 12.345.678-9 (flexible)
 * - cep: 12345-678
 */
const maskPatterns: Record<MaskType, { pattern: string; maxLength: number }> = {
  cpf: { pattern: '###.###.###-##', maxLength: 14 },
  phone: { pattern: '(##) #####-####', maxLength: 15 },
  rg: { pattern: '##.###.###-#', maxLength: 12 },
  cep: { pattern: '#####-###', maxLength: 9 },
}

/**
 * Apply mask to a value
 */
function applyMask(value: string, maskType: MaskType): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '')
  const { pattern } = maskPatterns[maskType]

  let result = ''
  let digitIndex = 0

  for (let i = 0; i < pattern.length && digitIndex < digits.length; i++) {
    if (pattern[i] === '#') {
      result += digits[digitIndex]
      digitIndex++
    } else {
      result += pattern[i]
      // If current digit position matches a non-digit in pattern, skip
      if (digits[digitIndex] === pattern[i]) {
        digitIndex++
      }
    }
  }

  return result
}

/**
 * Remove mask from value (get only digits)
 */
function unmask(value: string): string {
  return value.replace(/\D/g, '')
}

/**
 * MaskedInput component - Input with automatic formatting
 * Works best with react-hook-form's Controller for proper value sync
 */
const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, onChange, onValueChange, value, defaultValue, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(() => {
      const initialValue = (value ?? defaultValue ?? '') as string
      return applyMask(initialValue, mask)
    })

    // Sync with external value changes (controlled mode via Controller)
    React.useEffect(() => {
      if (value !== undefined) {
        const masked = applyMask(String(value), mask)
        setInternalValue((prev) => (prev !== masked ? masked : prev))
      }
    }, [value, mask])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      const maskedValue = applyMask(inputValue, mask)
      const unmaskedValue = unmask(maskedValue)

      setInternalValue(maskedValue)

      // Create a synthetic event with the masked value
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: maskedValue,
        },
      } as React.ChangeEvent<HTMLInputElement>

      onChange?.(syntheticEvent)
      onValueChange?.(unmaskedValue, maskedValue)
    }

    const { maxLength } = maskPatterns[mask]

    return (
      <Input
        ref={ref}
        {...props}
        value={internalValue}
        onChange={handleChange}
        maxLength={maxLength}
        inputMode="numeric"
      />
    )
  }
)

MaskedInput.displayName = 'MaskedInput'

export { MaskedInput, applyMask, unmask }
export type { MaskType, MaskedInputProps }
