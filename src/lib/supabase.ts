import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client-side Supabase client (browser)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for API routes/Server Actions)
export function createServerClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Type exports for convenience
export type { Database }
export type Registration = Database['public']['Tables']['registrations']['Row']
export type RegistrationInsert = Database['public']['Tables']['registrations']['Insert']
export type Guardian = Database['public']['Tables']['guardians']['Row']
export type GuardianInsert = Database['public']['Tables']['guardians']['Insert']
export type RegistrationFull = Database['public']['Views']['registrations_full']['Row']
export type RegistrationStats = Database['public']['Views']['registration_stats']['Row']

// Enum types
export type GenderType = Database['public']['Enums']['gender_type']
export type YesNoType = Database['public']['Enums']['yes_no_type']
export type YesNoMaybeType = Database['public']['Enums']['yes_no_maybe_type']
export type ExperienceTimeType = Database['public']['Enums']['experience_time_type']
export type SportsExperienceType = Database['public']['Enums']['sports_experience_type']
export type CheerPositionType = Database['public']['Enums']['cheer_position_type']
export type CheerLevelType = Database['public']['Enums']['cheer_level_type']
export type SkillLevelType = Database['public']['Enums']['skill_level_type']
export type WeekdayType = Database['public']['Enums']['weekday_type']
export type DayPeriodType = Database['public']['Enums']['day_period_type']
export type RegistrationStatusType = Database['public']['Enums']['registration_status_type']
export type AttendanceStatusType = Database['public']['Enums']['attendance_status_type']
export type PaymentStatusType = Database['public']['Enums']['payment_status_type']

