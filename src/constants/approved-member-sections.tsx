import { User } from 'lucide-react'
import type { ApprovedMemberSection } from '@/types/approved-member'

/**
 * Creates the form sections for the approved member form
 * Add new sections and fields as requirements are defined
 */
export function createApprovedMemberSections(): ApprovedMemberSection[] {
  return [
    {
      id: 'member-info',
      title: 'Informacoes Adicionais',
      subtitle: 'Complete seus dados para finalizar seu cadastro como membro',
      icon: <User className="w-6 h-6 text-white" />,
      fields: [
        // Placeholder fields - add real fields as requirements are defined
        //
        // Example uniform sizing fields:
        // {
        //   name: 'tamanho-camiseta',
        //   label: 'Tamanho da Camiseta',
        //   type: 'select',
        //   required: true,
        //   options: [
        //     { value: 'PP', label: 'PP' },
        //     { value: 'P', label: 'P' },
        //     { value: 'M', label: 'M' },
        //     { value: 'G', label: 'G' },
        //     { value: 'GG', label: 'GG' },
        //     { value: 'XG', label: 'XG' },
        //   ],
        // },
        // {
        //   name: 'tamanho-tenis',
        //   label: 'Numero do Tenis',
        //   type: 'number',
        //   required: true,
        //   placeholder: 'Ex: 38',
        // },
        //
        // Example emergency contact fields:
        // {
        //   name: 'contato-emergencia-nome',
        //   label: 'Nome do Contato de Emergencia',
        //   type: 'text',
        //   required: true,
        //   placeholder: 'Nome completo',
        // },
        // {
        //   name: 'contato-emergencia-telefone',
        //   label: 'Telefone de Emergencia',
        //   type: 'tel',
        //   required: true,
        //   placeholder: '(11) 99999-9999',
        // },
      ],
    },
  ]
}

/**
 * Section IDs for reference
 */
export const APPROVED_MEMBER_SECTION_IDS = {
  memberInfo: 'member-info',
}
