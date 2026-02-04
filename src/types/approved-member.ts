import type { Database } from './database'

type TeamLevelType = Database['public']['Enums']['team_level_type']
type CheerPositionType = Database['public']['Enums']['cheer_position_type']
type AthleteTeamType = Database['public']['Enums']['athlete_team_type']
type RegistrationStatusType = Database['public']['Enums']['registration_status_type']
type AttendanceStatusType = Database['public']['Enums']['attendance_status_type']

/**
 * Team assignment after tryout approval
 * Athletes can be assigned to up to 2 teams
 * Position can be a single role or compound (e.g., 'flyer/base')
 */
export type TeamAssignment = {
  team: AthleteTeamType
  position: string // Supports compound positions like 'flyer/base', 'base/back'
}

/**
 * Registration data returned from approval check
 */
export type ApprovedRegistration = {
  id: string
  name: string
  email: string
  phone: string
  birthDate: string
  isMinor: boolean
  teamLevels: TeamLevelType[]
  positions: CheerPositionType[] | null
  status: RegistrationStatusType
  attendanceStatus: AttendanceStatusType
  scheduledTryoutDate: string | null

  // Team/position assignments after tryout approval (max 2 teams)
  teamAssignments: TeamAssignment[]

  // Health data from tryout registration (for pre-fill)
  medicalConditions: string | null
  medications: string | null

  // Guardian data for minors (for pre-fill)
  guardian?: {
    name: string
    phone: string
  }

  // Whether athlete registration form has been completed
  athleteRegistrationCompleted: boolean
}

/**
 * Page state machine for the approved member page
 */
export type ApprovedPageState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'approved'; registration: ApprovedRegistration }
  | { status: 'tryout_pending'; registration: ApprovedRegistration }
  | { status: 'pending'; message: string }
  | { status: 'under_review'; message: string }
  | { status: 'rejected'; message: string }
  | { status: 'waitlisted'; message: string }
  | { status: 'absent'; registration: ApprovedRegistration; message: string }
  | { status: 'scheduled'; registration: ApprovedRegistration; scheduledDate: string }
  | { status: 'not-found' }
  | { status: 'error'; message: string }

/**
 * Result from the check approval status action
 */
export type CheckApprovalResult =
  | {
      found: true
      status: RegistrationStatusType
      attendanceStatus: AttendanceStatusType
      scheduledTryoutDate: string | null
      registration?: ApprovedRegistration
    }
  | {
      found: false
    }

/**
 * Form field configuration for approved member form
 * Extends base form patterns with additional options
 */
export type ApprovedMemberField = {
  name: string
  label: string
  type: 'text' | 'select' | 'file' | 'number' | 'email' | 'tel'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  accept?: string
  description?: string
}

/**
 * Form section configuration for approved member form
 */
export type ApprovedMemberSection = {
  id: string
  title: string
  subtitle?: string
  icon: React.ReactNode
  fields: ApprovedMemberField[]
}
