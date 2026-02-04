'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Mail, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GlowingButton } from '@/components/ui'
import {
  checkApprovalSchema,
  type CheckApprovalInput,
} from '@/lib/schemas/approved-member-schema'

type EmailVerificationFormProps = {
  onSubmit: (data: CheckApprovalInput) => void
  isLoading: boolean
}

/**
 * Email verification form with clean, solid color design
 */
export function EmailVerificationForm({
  onSubmit,
  isLoading,
}: EmailVerificationFormProps) {
  const [isFocused, setIsFocused] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckApprovalInput>({
    resolver: zodResolver(checkApprovalSchema),
  })

  return (
    <div className="relative max-w-md mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Main card */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0A1B4D]">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF7F00]" />

          {/* Content */}
          <div className="relative p-8 md:p-10">
            {/* Icon badge */}
            <motion.div
              className="relative w-20 h-20 mx-auto mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
            >
              {/* Outer pulsing ring */}
              <motion.div
                className="absolute -inset-3 rounded-2xl border-2 border-[#FF7F00]/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Icon container */}
              <div className="relative w-full h-full rounded-2xl bg-[#FF7F00] flex items-center justify-center shadow-lg shadow-[#FF7F00]/30">
                <Search className="w-9 h-9 text-white" aria-hidden="true" />
              </div>
            </motion.div>

            {/* Title section */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display text-white mb-3 tracking-tight">
                Verificar <span className="text-[#FF7F00]">Status</span>
              </h2>
              <p className="text-white/50 text-sm md:text-base max-w-xs mx-auto">
                Digite o e-mail usado na inscrição do tryout
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div>
                <Label
                  htmlFor="email"
                  className="text-white/70 text-sm font-medium mb-2.5 block flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#FF7F00]/70" />
                  E-mail da inscrição
                  <span className="text-[#FF7F00]">*</span>
                </Label>

                {/* Input with focus effect */}
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...register('email')}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
                      w-full px-4 py-3.5 h-auto
                      bg-[#000c1f]
                      border-2 transition-colors duration-200
                      ${isFocused ? 'border-[#FF7F00]' : 'border-white/10'}
                      text-white text-base
                      placeholder:text-white/30
                      focus:outline-none focus:ring-0
                      rounded-xl
                      ${errors.email ? 'border-red-500' : ''}
                    `}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>

                {/* Error message */}
                {errors.email && (
                  <motion.p
                    id="email-error"
                    className="text-red-400 text-sm mt-2.5 flex items-center gap-2"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Submit button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GlowingButton
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      Verificando...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" aria-hidden="true" />
                      Verificar Resultado
                    </>
                  )}
                </GlowingButton>
              </motion.div>
            </motion.form>

            {/* Bottom decoration */}
            <motion.div
              className="mt-8 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="h-[1px] w-12 bg-[#FF7F00]/30" />
              <p className="text-white/30 text-xs">
                Resultado instantâneo
              </p>
              <div className="h-[1px] w-12 bg-[#00BFFF]/30" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
