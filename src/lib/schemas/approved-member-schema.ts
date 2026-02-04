import { z } from 'zod'

/**
 * Schema for email verification on the approved page
 */
export const checkApprovalSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Formato de e-mail inválido'),
})

export type CheckApprovalInput = z.infer<typeof checkApprovalSchema>

/**
 * Schema for submitting additional member data
 * Used for registration ID validation
 */
export const approvedMemberSchema = z.object({
  registrationId: z.string().uuid('ID de registro inválido'),
})

export type ApprovedMemberFormData = z.infer<typeof approvedMemberSchema>
