'use server'

import { actionClient } from '@/lib/safe-action'
import { registrationSchema } from '@/lib/schemas/registration-schema'
import { createServerClient } from '@/lib/supabase'
import type {
  CheerPositionType,
  ExperienceTimeType,
  GenderType,
  SportsExperienceType,
  TeamLevelType,
  WeekdayType,
  YesNoMaybeType,
  YesNoType,
} from '@/lib/supabase'

export const submitRegistration = actionClient
  .metadata({ actionName: 'submitRegistration' })
  .schema(registrationSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient()

    // Check for duplicate email first
    const { data: isDuplicate } = await supabase.rpc('check_duplicate_email', {
      p_email: parsedInput.email,
    })

    if (isDuplicate) {
      throw new Error('duplicate: Este e-mail já está cadastrado.')
    }

    // Call the submit_registration RPC function
    const { data, error } = await supabase.rpc('submit_registration', {
      p_nome_completo: parsedInput['nome-completo'],
      p_data_nascimento: parsedInput['data-nascimento'],
      p_idade: parsedInput.idade,
      p_genero: parsedInput.genero as GenderType,
      p_telefone: parsedInput.telefone,
      p_email: parsedInput.email,
      p_nome_responsavel: parsedInput['nome-responsavel'] || undefined,
      p_contato_responsavel: parsedInput['contato-responsavel'] || undefined,
      p_email_responsavel: parsedInput['email-responsavel'] || undefined,
      p_pratica_cheerleading:
        parsedInput['pratica-cheerleading'] as YesNoType,
      p_tempo_experiencia:
        parsedInput['tempo-experiencia'] as ExperienceTimeType,
      p_equipe_anterior: parsedInput['equipe-anterior'] || undefined,
      p_experiencia_ginastica:
        (parsedInput['experiencia-ginastica'] as SportsExperienceType) ||
        undefined,
      p_posicao_interesse:
        (parsedInput['posicao-interesse'] as CheerPositionType[]) || undefined,
      p_nivel_interesse: parsedInput['nivel-interesse'] as TeamLevelType[],
      p_dias_disponiveis: parsedInput['dias-disponiveis'] as WeekdayType[],
      p_participa_campeonatos:
        parsedInput['participa-campeonatos'] as YesNoMaybeType,
      p_aceita_realocacao: parsedInput['aceita-realocacao'] as YesNoType,
      p_aceita_crossover: parsedInput['aceita-crossover'] as YesNoType,
      p_outros_esportes: parsedInput['outros-esportes'] || undefined,
      p_condicoes_medicas: parsedInput['condicoes-medicas'] || undefined,
      p_medicacoes: parsedInput.medicacoes || undefined,
      p_autorizacao_responsavel: parsedInput['autorizacao-responsavel'],
      p_aceite_termos: parsedInput['aceite-termos'],
      p_declaracao_medica: parsedInput['declaracao-medica'],
      p_comprovante_pagamento: parsedInput['comprovante-pagamento'] || undefined,
    })

    if (error) {
      console.error('Supabase error:', error)

      // Handle specific error codes
      if (error.code === '23505') {
        throw new Error('duplicate: Este e-mail já está cadastrado.')
      }

      throw new Error(
        error.message || 'Erro ao salvar inscrição. Por favor, tente novamente.'
      )
    }

    // Return success response
    return {
      success: true,
      message: 'Inscrição realizada com sucesso!',
      data,
    }
  })
