'use server'

import { actionClient } from '@/lib/safe-action'
import { createServerClient } from '@/lib/supabase'
import { checkApprovalSchema } from '@/lib/schemas/approved-member-schema'
import { athleteFormSchema } from '@/lib/schemas/athlete-schema'
import { logError } from '@/lib/error-logger'
import type {
  ApprovedRegistration,
  CheckApprovalResult,
  TeamAssignment,
} from '@/types/approved-member'
import type { Database } from '@/types/database'

type AthleteTeamType = Database['public']['Enums']['athlete_team_type']
type CheerPositionType = Database['public']['Enums']['cheer_position_type']

/**
 * Parse and validate team_assignments JSONB from database
 * Returns empty array if invalid or null
 * Supports compound positions like 'flyer/base', 'base/flyer', etc.
 */
function parseTeamAssignments(jsonValue: unknown): TeamAssignment[] {
  if (!jsonValue || !Array.isArray(jsonValue)) {
    return []
  }

  const validTeams: AthleteTeamType[] = ['snowstorm', 'hailstorm', 'rainstorm']
  const validPositions: CheerPositionType[] = ['base', 'flyer', 'back']

  return jsonValue
    .filter((item): item is { team: AthleteTeamType; position: string } => {
      if (
        typeof item !== 'object' ||
        item === null ||
        !('team' in item) ||
        !('position' in item)
      ) {
        return false
      }

      // Validate team
      if (!validTeams.includes(item.team as AthleteTeamType)) {
        return false
      }

      // Validate position - support compound positions (e.g., 'flyer/base', 'base/flyer')
      const position = item.position as string
      const positionParts = position.split('/')
      const allPartsValid = positionParts.every((part) =>
        validPositions.includes(part.trim() as CheerPositionType)
      )

      return allPartsValid
    })
    .slice(0, 2) // Enforce max 2 assignments
}

/**
 * Check if an email has an approved registration
 * Returns the registration status, attendance status, and data if found
 * Includes health data, assigned team/position, and guardian info for pre-fill
 */
export const checkApprovalStatus = actionClient
  .metadata({ actionName: 'checkApprovalStatus' })
  .schema(checkApprovalSchema)
  .action(async ({ parsedInput }): Promise<CheckApprovalResult> => {
    const supabase = createServerClient()

    // Query for the registration by email with expanded fields
    const { data, error } = await supabase
      .from('registrations')
      .select(
        `
        id,
        nome_completo,
        email,
        telefone,
        data_nascimento,
        is_minor,
        status,
        attendance_status,
        scheduled_tryout_date,
        nivel_interesse,
        posicao_interesse,
        condicoes_medicas,
        medicacoes,
        team_assignments
      `
      )
      .eq('email', parsedInput.email.toLowerCase().trim())
      .single()

    if (error || !data) {
      // Log error if it's not just "not found"
      if (error && error.code !== 'PGRST116') {
        logError(error, {
          action: 'checkApprovalStatus',
          metadata: { email: parsedInput.email },
        })
      }
      return { found: false }
    }

    // Check if athlete registration already completed
    const { data: existingAthlete } = await supabase
      .from('athletes')
      .select('id')
      .eq('registration_id', data.id)
      .single()

    const athleteRegistrationCompleted = !!existingAthlete

    // Fetch guardian data if minor
    let guardianData: { name: string; phone: string } | undefined
    if (data.is_minor) {
      const { data: guardian } = await supabase
        .from('guardians')
        .select('nome_responsavel, contato_responsavel')
        .eq('registration_id', data.id)
        .single()

      if (guardian) {
        guardianData = {
          name: guardian.nome_responsavel,
          phone: guardian.contato_responsavel,
        }
      }
    }

    // Parse team assignments from JSONB
    const teamAssignments = parseTeamAssignments(data.team_assignments)

    // Build the registration object with expanded data
    const registration: ApprovedRegistration = {
      id: data.id,
      name: data.nome_completo,
      email: data.email,
      phone: data.telefone,
      birthDate: data.data_nascimento,
      isMinor: data.is_minor ?? false,
      teamLevels: data.nivel_interesse,
      positions: data.posicao_interesse,
      status: data.status,
      attendanceStatus: data.attendance_status,
      scheduledTryoutDate: data.scheduled_tryout_date,
      // Team/position assignments (supports up to 2 teams)
      teamAssignments,
      medicalConditions: data.condicoes_medicas,
      medications: data.medicacoes,
      guardian: guardianData,
      // Whether athlete form was already submitted
      athleteRegistrationCompleted,
    }

    // Return registration data for approved users or those who need to schedule
    const shouldIncludeRegistration =
      data.status === 'accepted' ||
      data.attendance_status === 'absent' ||
      data.scheduled_tryout_date !== null

    return {
      found: true,
      status: data.status,
      attendanceStatus: data.attendance_status,
      scheduledTryoutDate: data.scheduled_tryout_date,
      registration: shouldIncludeRegistration ? registration : undefined,
    }
  })

/**
 * Result type from create_athlete_with_guardian RPC function
 */
type CreateAthleteResult = {
  success: boolean
  athlete_id: string
  guardian_id: string | null
}

/**
 * Submit athlete registration data for an approved member
 * Uses atomic RPC function to create athlete and guardian in a single transaction
 */
export const submitAthleteRegistration = actionClient
  .metadata({ actionName: 'submitAthleteRegistration' })
  .schema(athleteFormSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient()

    // Normalize Instagram handle
    const instagram = parsedInput.instagram.startsWith('@')
      ? parsedInput.instagram
      : `@${parsedInput.instagram}`

    // Call RPC function for atomic athlete + guardian creation
    const { data, error } = await supabase.rpc('create_athlete_with_guardian', {
      // Required parameters
      p_registration_id: parsedInput.registrationId,
      p_nome_completo: parsedInput.nomeCompleto,
      p_data_nascimento: parsedInput.dataNascimento,
      p_rg: parsedInput.rg,
      p_cpf: parsedInput.cpf,
      p_email: parsedInput.email,
      p_instagram: instagram,
      p_telefone: parsedInput.telefone,
      p_endereco: parsedInput.endereco,
      p_emergency_contact_name: parsedInput.emergencyContactName,
      p_emergency_contact_phone: parsedInput.emergencyContactPhone,
      p_has_health_insurance: parsedInput.hasHealthInsurance,
      p_has_chronic_disease: parsedInput.hasChronicDisease,
      p_has_restriction: parsedInput.hasRestriction,
      p_shirt_size: parsedInput.shirtSize,
      p_is_minor: parsedInput.isMinor,
      // Optional parameters (use undefined for Supabase RPC type compatibility)
      p_health_insurance_name: parsedInput.healthInsuranceName || undefined,
      p_chronic_disease_details: parsedInput.chronicDiseaseDetails || undefined,
      p_restriction_details: parsedInput.restrictionDetails || undefined,
      p_season: 2026,
      p_guardian_name: parsedInput.guardianName || undefined,
      p_guardian_phone: parsedInput.guardianPhone || undefined,
    })

    if (error) {
      logError(error, {
        action: 'submitAthleteRegistration',
        metadata: { registrationId: parsedInput.registrationId },
      })

      // Map database errors to user-friendly messages
      if (error.message.includes('not found or not approved')) {
        throw new Error('Registro não encontrado ou não aprovado.')
      }
      if (error.message.includes('already exists')) {
        throw new Error('Cadastro de atleta já realizado para este registro.')
      }

      throw new Error('Erro ao criar cadastro de atleta. Por favor, tente novamente.')
    }

    const result = data as CreateAthleteResult

    return { success: true, athleteId: result.athlete_id }
  })
