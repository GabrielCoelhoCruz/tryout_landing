'use server'

import { actionClient } from '@/lib/safe-action'
import { createServerClient } from '@/lib/supabase'
import type { AttendanceStatusType, PaymentStatusType } from '@/lib/supabase'
import { z } from 'zod'

// Schema for updating attendance status
const updateAttendanceSchema = z.object({
  registrationId: z.string().uuid(),
  status: z.enum(['not_checked', 'present', 'absent']),
  checkedBy: z.string().optional(),
})

// Schema for updating payment status
const updatePaymentSchema = z.object({
  registrationId: z.string().uuid(),
  status: z.enum(['comprovante_pendente', 'pago']),
})

// Schema for pagination/filtering
const listRegistrationsSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
  status: z.enum(['pending', 'under_review', 'accepted', 'rejected', 'waitlisted']).optional().nullable(),
  attendanceStatus: z.enum(['not_checked', 'present', 'absent']).optional().nullable(),
  search: z.string().optional().nullable(),
})

// Get all registrations with optional filtering
export const getRegistrations = actionClient
  .metadata({ actionName: 'getRegistrations' })
  .schema(listRegistrationsSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient()
    
    const limit = parsedInput.limit || 100
    const offset = parsedInput.offset || 0
    
    let query = supabase
      .from('registrations')
      .select(`
        id,
        nome_completo,
        email,
        telefone,
        idade,
        is_minor,
        data_nascimento,
        genero,
        nivel_interesse,
        posicao_interesse,
        tempo_experiencia,
        status,
        attendance_status,
        payment_status,
        payment_proof_url,
        athlete_photo_url,
        checked_in_at,
        created_at,
        updated_at
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters only if provided and not null
    if (parsedInput.status) {
      query = query.eq('status', parsedInput.status)
    }
    
    if (parsedInput.attendanceStatus) {
      query = query.eq('attendance_status', parsedInput.attendanceStatus)
    }

    if (parsedInput.search && parsedInput.search.trim()) {
      query = query.or(`nome_completo.ilike.%${parsedInput.search}%,email.ilike.%${parsedInput.search}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching registrations:', error)
      throw new Error('Erro ao buscar inscrições.')
    }

    return {
      success: true,
      data: data || [],
      count: data?.length || 0,
    }
  })

// Get full registration details by ID
export const getRegistrationById = actionClient
  .metadata({ actionName: 'getRegistrationById' })
  .schema(z.object({ id: z.string().uuid() }))
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('registrations_full')
      .select('*')
      .eq('id', parsedInput.id)
      .single()

    if (error) {
      console.error('Error fetching registration:', error)
      throw new Error('Erro ao buscar detalhes da inscrição.')
    }

    return {
      success: true,
      data,
    }
  })

// Update attendance status (for check-in)
export const updateAttendance = actionClient
  .metadata({ actionName: 'updateAttendance' })
  .schema(updateAttendanceSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient()

    const { data, error } = await supabase.rpc('update_attendance_status', {
      p_registration_id: parsedInput.registrationId,
      p_status: parsedInput.status as AttendanceStatusType,
      p_checked_by: parsedInput.checkedBy,
    })

    if (error) {
      console.error('Error updating attendance:', error)
      throw new Error('Erro ao atualizar presença.')
    }

    return {
      success: true,
      data,
    }
  })

// Update payment status
export const updatePaymentStatus = actionClient
  .metadata({ actionName: 'updatePaymentStatus' })
  .schema(updatePaymentSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient()

    const { data, error } = await supabase.rpc('update_payment_status', {
      p_registration_id: parsedInput.registrationId,
      p_status: parsedInput.status as PaymentStatusType,
    })

    if (error) {
      console.error('Error updating payment status:', error)
      throw new Error('Erro ao atualizar status de pagamento.')
    }

    return {
      success: true,
      data,
    }
  })

// Get dashboard statistics
export const getStats = actionClient
  .metadata({ actionName: 'getStats' })
  .action(async () => {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('registration_stats')
      .select('*')
      .single()

    if (error) {
      console.error('Error fetching stats:', error)
      throw new Error('Erro ao buscar estatísticas.')
    }

    return {
      success: true,
      data,
    }
  })

// Get registrations for check-in (simplified view)
export const getRegistrationsForCheckin = actionClient
  .metadata({ actionName: 'getRegistrationsForCheckin' })
  .schema(z.object({
    search: z.string().optional(),
    attendanceFilter: z.enum(['all', 'not_checked', 'present', 'absent']).default('all'),
  }))
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient()

    let query = supabase
      .from('registrations')
      .select(`
        id,
        nome_completo,
        email,
        idade,
        is_minor,
        nivel_interesse,
        posicao_interesse,
        attendance_status,
        payment_status,
        payment_proof_url,
        checked_in_at
      `)
      .order('nome_completo', { ascending: true })

    // Apply attendance filter
    if (parsedInput.attendanceFilter !== 'all') {
      query = query.eq('attendance_status', parsedInput.attendanceFilter)
    }

    // Apply search
    if (parsedInput.search && parsedInput.search.trim()) {
      query = query.or(`nome_completo.ilike.%${parsedInput.search}%,email.ilike.%${parsedInput.search}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching registrations for checkin:', error)
      throw new Error('Erro ao buscar inscrições.')
    }

    return {
      success: true,
      data: data || [],
    }
  })

// Upload payment proof and update registration
export const uploadPaymentProof = actionClient
  .metadata({ actionName: 'uploadPaymentProof' })
  .schema(z.object({
    registrationId: z.string().uuid(),
    proofUrl: z.string().url(),
  }))
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('registrations')
      .update({ payment_proof_url: parsedInput.proofUrl })
      .eq('id', parsedInput.registrationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating payment proof:', error)
      throw new Error('Erro ao salvar comprovante de pagamento.')
    }

    return {
      success: true,
      data,
    }
  })

// Update athlete photo URL
export const updateAthletePhoto = actionClient
  .metadata({ actionName: 'updateAthletePhoto' })
  .schema(z.object({
    registrationId: z.string().uuid(),
    photoUrl: z.string().url(),
  }))
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('registrations')
      .update({ athlete_photo_url: parsedInput.photoUrl })
      .eq('id', parsedInput.registrationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating athlete photo:', error)
      throw new Error('Erro ao salvar foto do atleta.')
    }

    return {
      success: true,
      data,
    }
  })

// Update tryout number
export const updateTryoutNumber = actionClient
  .metadata({ actionName: 'updateTryoutNumber' })
  .schema(z.object({
    registrationId: z.string().uuid(),
    tryoutNumber: z.string().min(1).max(10),
  }))
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('registrations')
      .update({ tryout_number: parsedInput.tryoutNumber })
      .eq('id', parsedInput.registrationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating tryout number:', error)
      throw new Error('Erro ao salvar número do tryout.')
    }

    return {
      success: true,
      data,
    }
  })

