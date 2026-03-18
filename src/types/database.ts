export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      athlete_discounts: {
        Row: {
          athlete_id: string
          created_at: string | null
          discount_id: string
          id: string
          notes: string | null
          valid_from: string
          valid_until: string | null
        }
        Insert: {
          athlete_id: string
          created_at?: string | null
          discount_id: string
          id?: string
          notes?: string | null
          valid_from?: string
          valid_until?: string | null
        }
        Update: {
          athlete_id?: string
          created_at?: string | null
          discount_id?: string
          id?: string
          notes?: string | null
          valid_from?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_discounts_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_discounts_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "vw_athlete_financial_summary"
            referencedColumns: ["athlete_id"]
          },
          {
            foreignKeyName: "athlete_discounts_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "vw_athlete_status_combined"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_discounts_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "vw_birthdays_current_month"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_discounts_discount_id_fkey"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_guardians: {
        Row: {
          athlete_id: string
          contato_responsavel: string
          cpf_responsavel: string | null
          created_at: string
          email_responsavel: string | null
          id: string
          nome_responsavel: string
          rg_responsavel: string | null
          updated_at: string
        }
        Insert: {
          athlete_id: string
          contato_responsavel: string
          cpf_responsavel?: string | null
          created_at?: string
          email_responsavel?: string | null
          id?: string
          nome_responsavel: string
          rg_responsavel?: string | null
          updated_at?: string
        }
        Update: {
          athlete_id?: string
          contato_responsavel?: string
          cpf_responsavel?: string | null
          created_at?: string
          email_responsavel?: string | null
          id?: string
          nome_responsavel?: string
          rg_responsavel?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "athlete_guardians_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: true
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_guardians_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: true
            referencedRelation: "vw_athlete_financial_summary"
            referencedColumns: ["athlete_id"]
          },
          {
            foreignKeyName: "athlete_guardians_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: true
            referencedRelation: "vw_athlete_status_combined"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_guardians_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: true
            referencedRelation: "vw_birthdays_current_month"
            referencedColumns: ["id"]
          },
        ]
      }
      athletes: {
        Row: {
          admin_notes: string | null
          chronic_disease_details: string | null
          cpf: string
          created_at: string
          data_nascimento: string
          date_of_birth: string | null
          document_url: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          endereco: string
          enrollment_type: Database["public"]["Enums"]["enrollment_type"]
          has_chronic_disease: boolean | null
          has_health_insurance: boolean | null
          has_restriction: boolean | null
          health_insurance_name: string | null
          id: string
          instagram: string
          is_minor: boolean
          is_student_discount: boolean | null
          matricula_amount: number | null
          matricula_paid: boolean
          matricula_paid_at: string | null
          mensalidade_amount: number | null
          nome_completo: string
          payment_proof_url: string | null
          photo_url: string | null
          registration_id: string | null
          restriction_details: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          rg: string
          role: Database["public"]["Enums"]["staff_role"] | null
          season: number
          shirt_size: Database["public"]["Enums"]["shirt_size_type"] | null
          status: Database["public"]["Enums"]["athlete_status_type"]
          team: Database["public"]["Enums"]["athlete_team_type"]
          team_assignments: Json | null
          telefone: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          chronic_disease_details?: string | null
          cpf: string
          created_at?: string
          data_nascimento: string
          date_of_birth?: string | null
          document_url?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          endereco: string
          enrollment_type?: Database["public"]["Enums"]["enrollment_type"]
          has_chronic_disease?: boolean | null
          has_health_insurance?: boolean | null
          has_restriction?: boolean | null
          health_insurance_name?: string | null
          id?: string
          instagram: string
          is_minor?: boolean
          is_student_discount?: boolean | null
          matricula_amount?: number | null
          matricula_paid?: boolean
          matricula_paid_at?: string | null
          mensalidade_amount?: number | null
          nome_completo: string
          payment_proof_url?: string | null
          photo_url?: string | null
          registration_id?: string | null
          restriction_details?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          rg: string
          role?: Database["public"]["Enums"]["staff_role"] | null
          season?: number
          shirt_size?: Database["public"]["Enums"]["shirt_size_type"] | null
          status?: Database["public"]["Enums"]["athlete_status_type"]
          team?: Database["public"]["Enums"]["athlete_team_type"]
          team_assignments?: Json | null
          telefone: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          chronic_disease_details?: string | null
          cpf?: string
          created_at?: string
          data_nascimento?: string
          date_of_birth?: string | null
          document_url?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          endereco?: string
          enrollment_type?: Database["public"]["Enums"]["enrollment_type"]
          has_chronic_disease?: boolean | null
          has_health_insurance?: boolean | null
          has_restriction?: boolean | null
          health_insurance_name?: string | null
          id?: string
          instagram?: string
          is_minor?: boolean
          is_student_discount?: boolean | null
          matricula_amount?: number | null
          matricula_paid?: boolean
          matricula_paid_at?: string | null
          mensalidade_amount?: number | null
          nome_completo?: string
          payment_proof_url?: string | null
          photo_url?: string | null
          registration_id?: string | null
          restriction_details?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          rg?: string
          role?: Database["public"]["Enums"]["staff_role"] | null
          season?: number
          shirt_size?: Database["public"]["Enums"]["shirt_size_type"] | null
          status?: Database["public"]["Enums"]["athlete_status_type"]
          team?: Database["public"]["Enums"]["athlete_team_type"]
          team_assignments?: Json | null
          telefone?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "athletes_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athletes_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations_full"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          athlete_id: string
          checked_at: string | null
          checked_by: string | null
          id: string
          notes: string | null
          photo_url: string | null
          session_id: string
          status: Database["public"]["Enums"]["attendance_status"] | null
        }
        Insert: {
          athlete_id: string
          checked_at?: string | null
          checked_by?: string | null
          id?: string
          notes?: string | null
          photo_url?: string | null
          session_id: string
          status?: Database["public"]["Enums"]["attendance_status"] | null
        }
        Update: {
          athlete_id?: string
          checked_at?: string | null
          checked_by?: string | null
          id?: string
          notes?: string | null
          photo_url?: string | null
          session_id?: string
          status?: Database["public"]["Enums"]["attendance_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "vw_athlete_financial_summary"
            referencedColumns: ["athlete_id"]
          },
          {
            foreignKeyName: "attendance_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "vw_athlete_status_combined"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "vw_birthdays_current_month"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "training_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      charges: {
        Row: {
          amount_paid: number | null
          athlete_id: string
          category: Database["public"]["Enums"]["charge_category"]
          created_at: string | null
          description: string
          discount_amount: number | null
          due_date: string
          final_amount: number | null
          id: string
          late_fee_amount: number | null
          notes: string | null
          original_amount: number
          paid_at: string | null
          payment_plan_id: string | null
          reference_month: string
          status: Database["public"]["Enums"]["charge_status"] | null
          updated_at: string | null
        }
        Insert: {
          amount_paid?: number | null
          athlete_id: string
          category: Database["public"]["Enums"]["charge_category"]
          created_at?: string | null
          description: string
          discount_amount?: number | null
          due_date: string
          final_amount?: number | null
          id?: string
          late_fee_amount?: number | null
          notes?: string | null
          original_amount?: number
          paid_at?: string | null
          payment_plan_id?: string | null
          reference_month: string
          status?: Database["public"]["Enums"]["charge_status"] | null
          updated_at?: string | null
        }
        Update: {
          amount_paid?: number | null
          athlete_id?: string
          category?: Database["public"]["Enums"]["charge_category"]
          created_at?: string | null
          description?: string
          discount_amount?: number | null
          due_date?: string
          final_amount?: number | null
          id?: string
          late_fee_amount?: number | null
          notes?: string | null
          original_amount?: number
          paid_at?: string | null
          payment_plan_id?: string | null
          reference_month?: string
          status?: Database["public"]["Enums"]["charge_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "charges_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charges_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "vw_athlete_financial_summary"
            referencedColumns: ["athlete_id"]
          },
          {
            foreignKeyName: "charges_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "vw_athlete_status_combined"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charges_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "vw_birthdays_current_month"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charges_payment_plan_id_fkey"
            columns: ["payment_plan_id"]
            isOneToOne: false
            referencedRelation: "payment_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      coaches: {
        Row: {
          created_at: string
          email: string
          id: string
          nome_completo: string
          registration_id: string | null
          role: Database["public"]["Enums"]["coach_role_type"]
          status: Database["public"]["Enums"]["coach_status_type"]
          team: Database["public"]["Enums"]["athlete_team_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          nome_completo: string
          registration_id?: string | null
          role?: Database["public"]["Enums"]["coach_role_type"]
          status?: Database["public"]["Enums"]["coach_status_type"]
          team: Database["public"]["Enums"]["athlete_team_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nome_completo?: string
          registration_id?: string | null
          role?: Database["public"]["Enums"]["coach_role_type"]
          status?: Database["public"]["Enums"]["coach_status_type"]
          team?: Database["public"]["Enums"]["athlete_team_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "coaches_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coaches_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations_full"
            referencedColumns: ["id"]
          },
        ]
      }
      discounts: {
        Row: {
          created_at: string | null
          fixed_amount: number | null
          id: string
          is_active: boolean | null
          name: string
          percentage: number | null
          type: string
        }
        Insert: {
          created_at?: string | null
          fixed_amount?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          percentage?: number | null
          type: string
        }
        Update: {
          created_at?: string | null
          fixed_amount?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          percentage?: number | null
          type?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          created_by: string | null
          date: string
          description: string | null
          id: string
          is_recurring: boolean | null
          location: string | null
          recurrence_rule: string | null
          teams: string[] | null
          time_end: string | null
          time_start: string | null
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          date: string
          description?: string | null
          id?: string
          is_recurring?: boolean | null
          location?: string | null
          recurrence_rule?: string | null
          teams?: string[] | null
          time_end?: string | null
          time_start?: string | null
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          date?: string
          description?: string | null
          id?: string
          is_recurring?: boolean | null
          location?: string | null
          recurrence_rule?: string | null
          teams?: string[] | null
          time_end?: string | null
          time_start?: string | null
          title?: string
          type?: Database["public"]["Enums"]["event_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at: string | null
          description: string
          expense_date: string
          id: string
          notes: string | null
          receipt_url: string | null
          team: Database["public"]["Enums"]["athlete_team_type"] | null
          updated_at: string | null
          vendor: string | null
        }
        Insert: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at?: string | null
          description: string
          expense_date: string
          id?: string
          notes?: string | null
          receipt_url?: string | null
          team?: Database["public"]["Enums"]["athlete_team_type"] | null
          updated_at?: string | null
          vendor?: string | null
        }
        Update: {
          amount?: number
          category?: Database["public"]["Enums"]["expense_category"]
          created_at?: string | null
          description?: string
          expense_date?: string
          id?: string
          notes?: string | null
          receipt_url?: string | null
          team?: Database["public"]["Enums"]["athlete_team_type"] | null
          updated_at?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      guardians: {
        Row: {
          contato_responsavel: string
          created_at: string
          email_responsavel: string
          id: string
          nome_responsavel: string
          registration_id: string
          updated_at: string
        }
        Insert: {
          contato_responsavel: string
          created_at?: string
          email_responsavel: string
          id?: string
          nome_responsavel: string
          registration_id: string
          updated_at?: string
        }
        Update: {
          contato_responsavel?: string
          created_at?: string
          email_responsavel?: string
          id?: string
          nome_responsavel?: string
          registration_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guardians_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: true
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guardians_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: true
            referencedRelation: "registrations_full"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          category: Database["public"]["Enums"]["material_category"]
          created_at: string | null
          created_by: string | null
          description: string | null
          file_type: string
          file_url: string
          id: string
          sort_order: number | null
          subcategory: string | null
          teams: string[] | null
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["material_category"]
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          file_type?: string
          file_url: string
          id?: string
          sort_order?: number | null
          subcategory?: string | null
          teams?: string[] | null
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["material_category"]
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          file_type?: string
          file_url?: string
          id?: string
          sort_order?: number | null
          subcategory?: string | null
          teams?: string[] | null
          title?: string
        }
        Relationships: []
      }
      payment_plans: {
        Row: {
          amount: number
          applies_to_enrollment:
            | Database["public"]["Enums"]["enrollment_type"][]
            | null
          applies_to_teams:
            | Database["public"]["Enums"]["athlete_team_type"][]
            | null
          category: Database["public"]["Enums"]["charge_category"]
          created_at: string | null
          due_day: number | null
          id: string
          is_active: boolean | null
          is_recurring: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          applies_to_enrollment?:
            | Database["public"]["Enums"]["enrollment_type"][]
            | null
          applies_to_teams?:
            | Database["public"]["Enums"]["athlete_team_type"][]
            | null
          category: Database["public"]["Enums"]["charge_category"]
          created_at?: string | null
          due_day?: number | null
          id?: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          applies_to_enrollment?:
            | Database["public"]["Enums"]["enrollment_type"][]
            | null
          applies_to_teams?:
            | Database["public"]["Enums"]["athlete_team_type"][]
            | null
          category?: Database["public"]["Enums"]["charge_category"]
          created_at?: string | null
          due_day?: number | null
          id?: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          athlete_id: string
          charge_id: string
          created_at: string | null
          id: string
          notes: string | null
          payment_date: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          proof_url: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          athlete_id: string
          charge_id: string
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          proof_url?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          athlete_id?: string
          charge_id?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          proof_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "vw_athlete_financial_summary"
            referencedColumns: ["athlete_id"]
          },
          {
            foreignKeyName: "payments_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "vw_athlete_status_combined"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "vw_birthdays_current_month"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_charge_id_fkey"
            columns: ["charge_id"]
            isOneToOne: false
            referencedRelation: "charges"
            referencedColumns: ["id"]
          },
        ]
      }
      registrations: {
        Row: {
          aceita_crossover: Database["public"]["Enums"]["yes_no_type"]
          aceita_realocacao: Database["public"]["Enums"]["yes_no_type"]
          aceite_termos: boolean
          admin_notes: string | null
          athlete_photo_url: string | null
          atleta_skyhigh_2025: Database["public"]["Enums"]["yes_no_type"] | null
          attendance_status: Database["public"]["Enums"]["attendance_status_type"]
          autorizacao_responsavel: boolean
          checked_in_at: string | null
          checked_in_by: string | null
          condicoes_medicas: string | null
          created_at: string
          data_nascimento: string
          declaracao_medica: boolean
          dias_disponiveis: Database["public"]["Enums"]["weekday_type"][]
          email: string
          equipe_anterior: string | null
          experiencia_ginastica:
            | Database["public"]["Enums"]["sports_experience_type"]
            | null
          genero: Database["public"]["Enums"]["gender_type"]
          id: string
          idade: number
          is_minor: boolean | null
          medicacoes: string | null
          nivel_interesse: Database["public"]["Enums"]["team_level_type"][]
          nome_completo: string
          outros_esportes: string | null
          participa_campeonatos: Database["public"]["Enums"]["yes_no_maybe_type"]
          payment_proof_url: string | null
          payment_status: Database["public"]["Enums"]["payment_status_type"]
          posicao_interesse:
            | Database["public"]["Enums"]["cheer_position_type"][]
            | null
          pratica_cheerleading: Database["public"]["Enums"]["yes_no_type"]
          reviewed_at: string | null
          reviewed_by: string | null
          scheduled_tryout_date: string | null
          status: Database["public"]["Enums"]["registration_status_type"]
          team_assignments: Json | null
          telefone: string
          tempo_experiencia: Database["public"]["Enums"]["experience_time_type"]
          tryout_number: string | null
          updated_at: string
          valor_inscricao: number | null
        }
        Insert: {
          aceita_crossover?: Database["public"]["Enums"]["yes_no_type"]
          aceita_realocacao?: Database["public"]["Enums"]["yes_no_type"]
          aceite_termos?: boolean
          admin_notes?: string | null
          athlete_photo_url?: string | null
          atleta_skyhigh_2025?:
            | Database["public"]["Enums"]["yes_no_type"]
            | null
          attendance_status?: Database["public"]["Enums"]["attendance_status_type"]
          autorizacao_responsavel?: boolean
          checked_in_at?: string | null
          checked_in_by?: string | null
          condicoes_medicas?: string | null
          created_at?: string
          data_nascimento: string
          declaracao_medica?: boolean
          dias_disponiveis?: Database["public"]["Enums"]["weekday_type"][]
          email: string
          equipe_anterior?: string | null
          experiencia_ginastica?:
            | Database["public"]["Enums"]["sports_experience_type"]
            | null
          genero: Database["public"]["Enums"]["gender_type"]
          id?: string
          idade: number
          is_minor?: boolean | null
          medicacoes?: string | null
          nivel_interesse?: Database["public"]["Enums"]["team_level_type"][]
          nome_completo: string
          outros_esportes?: string | null
          participa_campeonatos: Database["public"]["Enums"]["yes_no_maybe_type"]
          payment_proof_url?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status_type"]
          posicao_interesse?:
            | Database["public"]["Enums"]["cheer_position_type"][]
            | null
          pratica_cheerleading: Database["public"]["Enums"]["yes_no_type"]
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheduled_tryout_date?: string | null
          status?: Database["public"]["Enums"]["registration_status_type"]
          team_assignments?: Json | null
          telefone: string
          tempo_experiencia: Database["public"]["Enums"]["experience_time_type"]
          tryout_number?: string | null
          updated_at?: string
          valor_inscricao?: number | null
        }
        Update: {
          aceita_crossover?: Database["public"]["Enums"]["yes_no_type"]
          aceita_realocacao?: Database["public"]["Enums"]["yes_no_type"]
          aceite_termos?: boolean
          admin_notes?: string | null
          athlete_photo_url?: string | null
          atleta_skyhigh_2025?:
            | Database["public"]["Enums"]["yes_no_type"]
            | null
          attendance_status?: Database["public"]["Enums"]["attendance_status_type"]
          autorizacao_responsavel?: boolean
          checked_in_at?: string | null
          checked_in_by?: string | null
          condicoes_medicas?: string | null
          created_at?: string
          data_nascimento?: string
          declaracao_medica?: boolean
          dias_disponiveis?: Database["public"]["Enums"]["weekday_type"][]
          email?: string
          equipe_anterior?: string | null
          experiencia_ginastica?:
            | Database["public"]["Enums"]["sports_experience_type"]
            | null
          genero?: Database["public"]["Enums"]["gender_type"]
          id?: string
          idade?: number
          is_minor?: boolean | null
          medicacoes?: string | null
          nivel_interesse?: Database["public"]["Enums"]["team_level_type"][]
          nome_completo?: string
          outros_esportes?: string | null
          participa_campeonatos?: Database["public"]["Enums"]["yes_no_maybe_type"]
          payment_proof_url?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status_type"]
          posicao_interesse?:
            | Database["public"]["Enums"]["cheer_position_type"][]
            | null
          pratica_cheerleading?: Database["public"]["Enums"]["yes_no_type"]
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheduled_tryout_date?: string | null
          status?: Database["public"]["Enums"]["registration_status_type"]
          team_assignments?: Json | null
          telefone?: string
          tempo_experiencia?: Database["public"]["Enums"]["experience_time_type"]
          tryout_number?: string | null
          updated_at?: string
          valor_inscricao?: number | null
        }
        Relationships: []
      }
      training_sessions: {
        Row: {
          created_at: string | null
          date: string
          end_time: string | null
          id: string
          notes: string | null
          start_time: string | null
          team: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          end_time?: string | null
          id?: string
          notes?: string | null
          start_time?: string | null
          team: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          end_time?: string | null
          id?: string
          notes?: string | null
          start_time?: string | null
          team?: string
          type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      registration_stats: {
        Row: {
          absent_count: number | null
          accepted_count: number | null
          adults_count: number | null
          allboy_interest_count: number | null
          allgirl_interest_count: number | null
          back_interest_count: number | null
          base_interest_count: number | null
          cheerpom_interest_count: number | null
          coed_n2_interest_count: number | null
          coed_n3_interest_count: number | null
          coed_n4_interest_count: number | null
          flyer_interest_count: number | null
          last_30_days: number | null
          last_7_days: number | null
          minors_count: number | null
          not_checked_count: number | null
          paid_count: number | null
          payment_pending_count: number | null
          pending_count: number | null
          present_count: number | null
          rejected_count: number | null
          total_registrations: number | null
          under_review_count: number | null
          waitlisted_count: number | null
        }
        Relationships: []
      }
      registrations_full: {
        Row: {
          aceita_crossover: Database["public"]["Enums"]["yes_no_type"] | null
          aceita_realocacao: Database["public"]["Enums"]["yes_no_type"] | null
          aceite_termos: boolean | null
          admin_notes: string | null
          athlete_photo_url: string | null
          atleta_skyhigh_2025: Database["public"]["Enums"]["yes_no_type"] | null
          attendance_status:
            | Database["public"]["Enums"]["attendance_status_type"]
            | null
          autorizacao_responsavel: boolean | null
          checked_in_at: string | null
          checked_in_by: string | null
          condicoes_medicas: string | null
          contato_responsavel: string | null
          created_at: string | null
          data_nascimento: string | null
          declaracao_medica: boolean | null
          dias_disponiveis: Database["public"]["Enums"]["weekday_type"][] | null
          email: string | null
          email_responsavel: string | null
          equipe_anterior: string | null
          experiencia_ginastica:
            | Database["public"]["Enums"]["sports_experience_type"]
            | null
          genero: Database["public"]["Enums"]["gender_type"] | null
          id: string | null
          idade: number | null
          is_minor: boolean | null
          medicacoes: string | null
          nivel_interesse:
            | Database["public"]["Enums"]["team_level_type"][]
            | null
          nome_completo: string | null
          nome_responsavel: string | null
          outros_esportes: string | null
          participa_campeonatos:
            | Database["public"]["Enums"]["yes_no_maybe_type"]
            | null
          payment_proof_url: string | null
          payment_status:
            | Database["public"]["Enums"]["payment_status_type"]
            | null
          posicao_interesse:
            | Database["public"]["Enums"]["cheer_position_type"][]
            | null
          pratica_cheerleading:
            | Database["public"]["Enums"]["yes_no_type"]
            | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["registration_status_type"] | null
          telefone: string | null
          tempo_experiencia:
            | Database["public"]["Enums"]["experience_time_type"]
            | null
          tryout_number: string | null
          updated_at: string | null
          valor_inscricao: number | null
        }
        Relationships: []
      }
      vw_athlete_financial_summary: {
        Row: {
          athlete_id: string | null
          charges_count: number | null
          nome_completo: string | null
          overdue_count: number | null
          paid_count: number | null
          pending_count: number | null
          team: Database["public"]["Enums"]["athlete_team_type"] | null
          total_charged: number | null
          total_overdue: number | null
          total_paid: number | null
          total_pending: number | null
        }
        Relationships: []
      }
      vw_athlete_status_combined: {
        Row: {
          athlete_status:
            | Database["public"]["Enums"]["athlete_status_type"]
            | null
          combined_status: string | null
          id: string | null
          nome_completo: string | null
          overdue_count: number | null
          team: Database["public"]["Enums"]["athlete_team_type"] | null
          total_overdue: number | null
          total_pending: number | null
        }
        Relationships: []
      }
      vw_birthdays_current_month: {
        Row: {
          birth_day: number | null
          date_of_birth: string | null
          id: string | null
          is_today: boolean | null
          nome_completo: string | null
          team: Database["public"]["Enums"]["athlete_team_type"] | null
        }
        Insert: {
          birth_day?: never
          date_of_birth?: string | null
          id?: string | null
          is_today?: never
          nome_completo?: string | null
          team?: Database["public"]["Enums"]["athlete_team_type"] | null
        }
        Update: {
          birth_day?: never
          date_of_birth?: string | null
          id?: string | null
          is_today?: never
          nome_completo?: string | null
          team?: Database["public"]["Enums"]["athlete_team_type"] | null
        }
        Relationships: []
      }
      vw_monthly_overview: {
        Row: {
          month: string | null
          net_result: number | null
          payments_count: number | null
          total_expenses: number | null
          total_revenue: number | null
        }
        Relationships: []
      }
      vw_team_summary: {
        Row: {
          athlete_count: number | null
          team: Database["public"]["Enums"]["athlete_team_type"] | null
          total_charged: number | null
          total_expenses: number | null
          total_pending: number | null
          total_received: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_age: { Args: { birthdate: string }; Returns: number }
      check_duplicate_email: { Args: { p_email: string }; Returns: boolean }
      create_athlete_with_guardian: {
        Args: {
          p_chronic_disease_details?: string
          p_cpf: string
          p_data_nascimento: string
          p_email: string
          p_emergency_contact_name: string
          p_emergency_contact_phone: string
          p_endereco: string
          p_guardian_cpf?: string
          p_guardian_email?: string
          p_guardian_name?: string
          p_guardian_phone?: string
          p_guardian_rg?: string
          p_has_chronic_disease: boolean
          p_has_health_insurance: boolean
          p_has_restriction: boolean
          p_health_insurance_name?: string
          p_instagram: string
          p_is_minor: boolean
          p_nome_completo: string
          p_registration_id: string
          p_restriction_details?: string
          p_rg: string
          p_season?: number
          p_shirt_size: Database["public"]["Enums"]["shirt_size_type"]
          p_telefone: string
        }
        Returns: Json
      }
      delete_charge_cascade: {
        Args: { p_charge_id: string }
        Returns: undefined
      }
      generate_monthly_charges: {
        Args: { p_payment_plan_id?: string; p_reference_month: string }
        Returns: Json
      }
      generate_weekly_sessions: {
        Args: {
          p_end: string
          p_start: string
          p_team: string
          p_weekdays: number[]
        }
        Returns: undefined
      }
      get_athlete_attendance: {
        Args: { p_athlete_id: string; p_month: number; p_year: number }
        Returns: {
          attended: number
          rate: number
          total: number
        }[]
      }
      get_dashboard_kpis: { Args: never; Returns: Json }
      get_my_teams: { Args: never; Returns: string[] }
      get_registrations_by_status: {
        Args: {
          p_limit?: number
          p_offset?: number
          p_status?: Database["public"]["Enums"]["registration_status_type"]
        }
        Returns: {
          created_at: string
          email: string
          id: string
          idade: number
          is_minor: boolean
          nivel_interesse: Database["public"]["Enums"]["cheer_level_type"][]
          nome_completo: string
          posicao_interesse: Database["public"]["Enums"]["cheer_position_type"][]
          status: Database["public"]["Enums"]["registration_status_type"]
          telefone: string
        }[]
      }
      is_minor_by_date: { Args: { birthdate: string }; Returns: boolean }
      process_payment: {
        Args: {
          p_amount: number
          p_athlete_id: string
          p_charge_id: string
          p_notes?: string
          p_payment_date: string
          p_payment_method: Database["public"]["Enums"]["payment_method"]
        }
        Returns: Json
      }
      reverse_payment: { Args: { p_payment_id: string }; Returns: Json }
      submit_registration: {
            Args: {
              p_aceita_crossover?: Database["public"]["Enums"]["yes_no_type"]
              p_aceita_realocacao?: Database["public"]["Enums"]["yes_no_type"]
              p_aceite_termos?: boolean
              p_atleta_skyhigh_2025?: Database["public"]["Enums"]["yes_no_type"]
              p_autorizacao_responsavel?: boolean
              p_comprovante_pagamento?: string
              p_condicoes_medicas?: string
              p_contato_responsavel?: string
              p_data_nascimento: string
              p_declaracao_medica?: boolean
              p_dias_disponiveis?: Database["public"]["Enums"]["weekday_type"][]
              p_email: string
              p_email_responsavel?: string
              p_equipe_anterior?: string
              p_experiencia_ginastica?: Database["public"]["Enums"]["sports_experience_type"]
              p_genero: Database["public"]["Enums"]["gender_type"]
              p_idade: number
              p_medicacoes?: string
              p_nivel_interesse?: Database["public"]["Enums"]["team_level_type"][]
              p_nome_completo: string
              p_nome_responsavel?: string
              p_outros_esportes?: string
              p_participa_campeonatos?: Database["public"]["Enums"]["yes_no_maybe_type"]
              p_posicao_interesse?: Database["public"]["Enums"]["cheer_position_type"][]
              p_pratica_cheerleading?: Database["public"]["Enums"]["yes_no_type"]
              p_telefone: string
              p_tempo_experiencia?: Database["public"]["Enums"]["experience_time_type"]
              p_valor_inscricao?: number
            }
            Returns: string
          }
      update_attendance_status: {
        Args: {
          p_checked_by?: string
          p_registration_id: string
          p_status: Database["public"]["Enums"]["attendance_status_type"]
        }
        Returns: Json
      }
      update_overdue_charges: { Args: never; Returns: Json }
      update_payment_proof: {
        Args: { p_proof_url: string; p_registration_id: string }
        Returns: Json
      }
      update_payment_status: {
        Args: {
          p_registration_id: string
          p_status: Database["public"]["Enums"]["payment_status_type"]
        }
        Returns: Json
      }
      update_registration_status: {
        Args: {
          p_admin_notes?: string
          p_new_status: Database["public"]["Enums"]["registration_status_type"]
          p_registration_id: string
        }
        Returns: Json
      }
    }
    Enums: {
      athlete_status_type:
        | "active"
        | "inactive"
        | "pending"
        | "suspended"
        | "afastado"
      athlete_team_type:
        | "snowstorm"
        | "hailstorm"
        | "rainstorm"
        | "unassigned"
        | "cheerpom"
      attendance_status: "presente" | "ausente" | "justificado"
      attendance_status_type: "not_checked" | "present" | "absent"
      charge_category:
        | "mensalidade"
        | "matricula"
        | "uniforme"
        | "competicao"
        | "evento"
        | "material"
        | "seguro"
        | "taxa_extra"
        | "outro"
      charge_status:
        | "pendente"
        | "pago"
        | "atrasado"
        | "parcial"
        | "cancelado"
        | "isento"
      cheer_level_type: "n2" | "n3" | "n4"
      cheer_position_type: "base" | "flyer" | "back"
      coach_role_type: "head_coach" | "assistant_coach" | "athlete_coach"
      coach_status_type: "active" | "inactive"
      day_period_type: "manha" | "tarde" | "noite"
      enrollment_type:
        | "team_cheer"
        | "individual_only"
        | "tumbling_only"
        | "team_and_tumbling"
        | "team_and_cross"
      event_type: "treino" | "campeonato" | "evento_interno" | "data_importante"
      expense_category:
        | "aluguel"
        | "equipamento"
        | "viagem"
        | "hospedagem"
        | "competicao"
        | "uniforme"
        | "marketing"
        | "administrativo"
        | "seguro"
        | "coaching"
        | "manutencao"
        | "outro"
      experience_time_type:
        | "nunca-pratiquei"
        | "menos-6-meses"
        | "6-12-meses"
        | "1-2-anos"
        | "2-anos-mais"
      gender_type: "feminino" | "masculino" | "outro"
      material_category: "posicao" | "preventivo" | "flexibilidade"
      payment_frequency_type: "monthly" | "single"
      payment_method:
        | "pix"
        | "transferencia"
        | "dinheiro"
        | "cartao_credito"
        | "cartao_debito"
        | "boleto"
        | "outro"
      payment_status_type: "comprovante_pendente" | "pago"
      registration_status_type:
        | "pending"
        | "under_review"
        | "accepted"
        | "rejected"
        | "waitlisted"
      shirt_size_type:
        | "p_adulto"
        | "m_adulto"
        | "g_adulto"
        | "gg_adulto"
        | "xgg_adulto"
        | "p_babylook"
        | "m_babylook"
        | "g_babylook"
      skill_level_type: "basico" | "intermediario" | "avancado"
      sports_experience_type: "ginastica" | "tumbling" | "danca" | "nenhuma"
      staff_role: "atleta" | "coach" | "auxiliar" | "staff"
      team_level_type:
        | "coed-n2"
        | "coed-n3"
        | "allgirl-n2-n3"
        | "allboy-n2-n3"
        | "coed-n4"
        | "cheer-pom"
      weekday_type:
        | "segunda"
        | "terca"
        | "quarta"
        | "quinta"
        | "sexta"
        | "sabado"
        | "domingo"
      yes_no_maybe_type: "sim" | "nao" | "talvez"
      yes_no_type: "sim" | "nao"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      athlete_status_type: [
        "active",
        "inactive",
        "pending",
        "suspended",
        "afastado",
      ],
      athlete_team_type: [
        "snowstorm",
        "hailstorm",
        "rainstorm",
        "unassigned",
        "cheerpom",
      ],
      attendance_status: ["presente", "ausente", "justificado"],
      attendance_status_type: ["not_checked", "present", "absent"],
      charge_category: [
        "mensalidade",
        "matricula",
        "uniforme",
        "competicao",
        "evento",
        "material",
        "seguro",
        "taxa_extra",
        "outro",
      ],
      charge_status: [
        "pendente",
        "pago",
        "atrasado",
        "parcial",
        "cancelado",
        "isento",
      ],
      cheer_level_type: ["n2", "n3", "n4"],
      cheer_position_type: ["base", "flyer", "back"],
      coach_role_type: ["head_coach", "assistant_coach", "athlete_coach"],
      coach_status_type: ["active", "inactive"],
      day_period_type: ["manha", "tarde", "noite"],
      enrollment_type: [
        "team_cheer",
        "individual_only",
        "tumbling_only",
        "team_and_tumbling",
        "team_and_cross",
      ],
      event_type: ["treino", "campeonato", "evento_interno", "data_importante"],
      expense_category: [
        "aluguel",
        "equipamento",
        "viagem",
        "hospedagem",
        "competicao",
        "uniforme",
        "marketing",
        "administrativo",
        "seguro",
        "coaching",
        "manutencao",
        "outro",
      ],
      experience_time_type: [
        "nunca-pratiquei",
        "menos-6-meses",
        "6-12-meses",
        "1-2-anos",
        "2-anos-mais",
      ],
      gender_type: ["feminino", "masculino", "outro"],
      material_category: ["posicao", "preventivo", "flexibilidade"],
      payment_frequency_type: ["monthly", "single"],
      payment_method: [
        "pix",
        "transferencia",
        "dinheiro",
        "cartao_credito",
        "cartao_debito",
        "boleto",
        "outro",
      ],
      payment_status_type: ["comprovante_pendente", "pago"],
      registration_status_type: [
        "pending",
        "under_review",
        "accepted",
        "rejected",
        "waitlisted",
      ],
      shirt_size_type: [
        "p_adulto",
        "m_adulto",
        "g_adulto",
        "gg_adulto",
        "xgg_adulto",
        "p_babylook",
        "m_babylook",
        "g_babylook",
      ],
      skill_level_type: ["basico", "intermediario", "avancado"],
      sports_experience_type: ["ginastica", "tumbling", "danca", "nenhuma"],
      staff_role: ["atleta", "coach", "auxiliar", "staff"],
      team_level_type: [
        "coed-n2",
        "coed-n3",
        "allgirl-n2-n3",
        "allboy-n2-n3",
        "coed-n4",
        "cheer-pom",
      ],
      weekday_type: [
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado",
        "domingo",
      ],
      yes_no_maybe_type: ["sim", "nao", "talvez"],
      yes_no_type: ["sim", "nao"],
    },
  },
} as const
