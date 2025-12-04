export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
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
      registrations: {
        Row: {
          aceite_termos: boolean
          admin_notes: string | null
          attendance_status: Database["public"]["Enums"]["attendance_status_type"]
          autorizacao_responsavel: boolean
          checked_in_at: string | null
          checked_in_by: string | null
          condicoes_medicas: string | null
          created_at: string
          data_nascimento: string
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
          nivel_habilidades: Database["public"]["Enums"]["skill_level_type"]
          nivel_interesse: Database["public"]["Enums"]["cheer_level_type"][]
          nome_completo: string
          outros_esportes: string | null
          participa_campeonatos: Database["public"]["Enums"]["yes_no_maybe_type"]
          payment_status: Database["public"]["Enums"]["payment_status_type"]
          periodo_preferencia:
            | Database["public"]["Enums"]["day_period_type"]
            | null
          posicao_interesse:
            | Database["public"]["Enums"]["cheer_position_type"][]
            | null
          pratica_cheerleading: Database["public"]["Enums"]["yes_no_type"]
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["registration_status_type"]
          telefone: string
          tempo_experiencia: Database["public"]["Enums"]["experience_time_type"]
          updated_at: string
        }
        Insert: {
          aceite_termos?: boolean
          admin_notes?: string | null
          attendance_status?: Database["public"]["Enums"]["attendance_status_type"]
          autorizacao_responsavel?: boolean
          checked_in_at?: string | null
          checked_in_by?: string | null
          condicoes_medicas?: string | null
          created_at?: string
          data_nascimento: string
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
          nivel_habilidades: Database["public"]["Enums"]["skill_level_type"]
          nivel_interesse?: Database["public"]["Enums"]["cheer_level_type"][]
          nome_completo: string
          outros_esportes?: string | null
          participa_campeonatos: Database["public"]["Enums"]["yes_no_maybe_type"]
          payment_status?: Database["public"]["Enums"]["payment_status_type"]
          periodo_preferencia?:
            | Database["public"]["Enums"]["day_period_type"]
            | null
          posicao_interesse?:
            | Database["public"]["Enums"]["cheer_position_type"][]
            | null
          pratica_cheerleading: Database["public"]["Enums"]["yes_no_type"]
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["registration_status_type"]
          telefone: string
          tempo_experiencia: Database["public"]["Enums"]["experience_time_type"]
          updated_at?: string
        }
        Update: {
          aceite_termos?: boolean
          admin_notes?: string | null
          attendance_status?: Database["public"]["Enums"]["attendance_status_type"]
          autorizacao_responsavel?: boolean
          checked_in_at?: string | null
          checked_in_by?: string | null
          condicoes_medicas?: string | null
          created_at?: string
          data_nascimento?: string
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
          nivel_habilidades?: Database["public"]["Enums"]["skill_level_type"]
          nivel_interesse?: Database["public"]["Enums"]["cheer_level_type"][]
          nome_completo?: string
          outros_esportes?: string | null
          participa_campeonatos?: Database["public"]["Enums"]["yes_no_maybe_type"]
          payment_status?: Database["public"]["Enums"]["payment_status_type"]
          periodo_preferencia?:
            | Database["public"]["Enums"]["day_period_type"]
            | null
          posicao_interesse?:
            | Database["public"]["Enums"]["cheer_position_type"][]
            | null
          pratica_cheerleading?: Database["public"]["Enums"]["yes_no_type"]
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["registration_status_type"]
          telefone?: string
          tempo_experiencia?: Database["public"]["Enums"]["experience_time_type"]
          updated_at?: string
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
          back_interest_count: number | null
          base_interest_count: number | null
          flyer_interest_count: number | null
          last_30_days: number | null
          last_7_days: number | null
          minors_count: number | null
          n2_interest_count: number | null
          n3_interest_count: number | null
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
          aceite_termos: boolean | null
          admin_notes: string | null
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
          nivel_habilidades:
            | Database["public"]["Enums"]["skill_level_type"]
            | null
          nivel_interesse:
            | Database["public"]["Enums"]["cheer_level_type"][]
            | null
          nome_completo: string | null
          nome_responsavel: string | null
          outros_esportes: string | null
          participa_campeonatos:
            | Database["public"]["Enums"]["yes_no_maybe_type"]
            | null
          payment_status:
            | Database["public"]["Enums"]["payment_status_type"]
            | null
          payment_proof_url: string | null
          periodo_preferencia:
            | Database["public"]["Enums"]["day_period_type"]
            | null
          posicao_interesse:
            | Database["public"]["Enums"]["cheer_position_type"][]
            | null
          pratica_cheerleading:
            | Database["public"]["Enums"]["yes_no_type"]
            | null
          reviewed_at: string | null
          status: Database["public"]["Enums"]["registration_status_type"] | null
          telefone: string | null
          tempo_experiencia:
            | Database["public"]["Enums"]["experience_time_type"]
            | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_age: { Args: { birthdate: string }; Returns: number }
      check_duplicate_email: { Args: { p_email: string }; Returns: boolean }
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
      submit_registration: {
        Args: {
          p_aceite_termos?: boolean
          p_autorizacao_responsavel?: boolean
          p_condicoes_medicas?: string
          p_contato_responsavel?: string
          p_data_nascimento: string
          p_dias_disponiveis?: Database["public"]["Enums"]["weekday_type"][]
          p_email: string
          p_email_responsavel?: string
          p_equipe_anterior?: string
          p_experiencia_ginastica?: Database["public"]["Enums"]["sports_experience_type"]
          p_genero: Database["public"]["Enums"]["gender_type"]
          p_idade: number
          p_medicacoes?: string
          p_nivel_habilidades?: Database["public"]["Enums"]["skill_level_type"]
          p_nivel_interesse?: Database["public"]["Enums"]["cheer_level_type"][]
          p_nome_completo: string
          p_nome_responsavel?: string
          p_outros_esportes?: string
          p_participa_campeonatos?: Database["public"]["Enums"]["yes_no_maybe_type"]
          p_periodo_preferencia?: Database["public"]["Enums"]["day_period_type"]
          p_posicao_interesse?: Database["public"]["Enums"]["cheer_position_type"][]
          p_pratica_cheerleading?: Database["public"]["Enums"]["yes_no_type"]
          p_telefone: string
          p_tempo_experiencia?: Database["public"]["Enums"]["experience_time_type"]
        }
        Returns: Json
      }
      update_attendance_status: {
        Args: {
          p_checked_by?: string
          p_registration_id: string
          p_status: Database["public"]["Enums"]["attendance_status_type"]
        }
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
      attendance_status_type: "not_checked" | "present" | "absent"
      cheer_level_type: "n2" | "n3"
      cheer_position_type: "base" | "flyer" | "back"
      day_period_type: "manha" | "tarde" | "noite"
      experience_time_type:
        | "menos-6-meses"
        | "6-12-meses"
        | "1-2-anos"
        | "2-anos-mais"
      gender_type: "feminino" | "masculino" | "outro"
      payment_status_type: "comprovante_pendente" | "pago"
      registration_status_type:
        | "pending"
        | "under_review"
        | "accepted"
        | "rejected"
        | "waitlisted"
      skill_level_type: "basico" | "intermediario" | "avancado"
      sports_experience_type: "ginastica" | "tumbling" | "danca" | "nenhuma"
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
      attendance_status_type: ["not_checked", "present", "absent"],
      cheer_level_type: ["n2", "n3"],
      cheer_position_type: ["base", "flyer", "back"],
      day_period_type: ["manha", "tarde", "noite"],
      experience_time_type: [
        "menos-6-meses",
        "6-12-meses",
        "1-2-anos",
        "2-anos-mais",
      ],
      gender_type: ["feminino", "masculino", "outro"],
      payment_status_type: ["comprovante_pendente", "pago"],
      registration_status_type: [
        "pending",
        "under_review",
        "accepted",
        "rejected",
        "waitlisted",
      ],
      skill_level_type: ["basico", "intermediario", "avancado"],
      sports_experience_type: ["ginastica", "tumbling", "danca", "nenhuma"],
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
