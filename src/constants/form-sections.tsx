import { User, Trophy, Calendar, Heart } from 'lucide-react'
import type { FormSection } from '@/types/form'

export function createFormSections(userIsMinor: boolean): FormSection[] {
  return [
    {
      id: 'dados-pessoais',
      title: 'Dados Pessoais',
      subtitle: 'Informações básicas do atleta',
      icon: <User className="w-6 h-6 text-white" />,
      fields: [
        {
          name: 'nome-completo',
          label: 'Nome Completo',
          type: 'text',
          required: true,
          placeholder: 'Seu nome completo',
        },
        {
          name: 'data-nascimento',
          label: 'Data de Nascimento',
          type: 'date',
          required: true,
        },
        {
          name: 'idade',
          label: 'Idade',
          type: 'number',
          required: true,
          placeholder: '18',
        },
        {
          name: 'genero',
          label: 'Gênero',
          type: 'select',
          required: true,
          options: [
            { value: 'feminino', label: 'Feminino' },
            { value: 'masculino', label: 'Masculino' },
            { value: 'outro', label: 'Outro' },
          ],
        },
        {
          name: 'telefone',
          label: 'Telefone/WhatsApp',
          type: 'tel',
          required: true,
          placeholder: '(11) 99999-9999',
        },
        {
          name: 'email',
          label: 'E-mail',
          type: 'email',
          required: true,
          placeholder: 'seu@email.com',
        },
        {
          name: 'nome-responsavel',
          label: `Nome do Responsável${userIsMinor ? '' : ' (se menor de idade)'}`,
          type: 'text',
          required: userIsMinor,
          placeholder: 'Nome completo do responsável',
        },
        {
          name: 'contato-responsavel',
          label: `Telefone do Responsável${userIsMinor ? '' : ' (se menor de idade)'}`,
          type: 'tel',
          required: userIsMinor,
          placeholder: '(11) 99999-9999',
        },
        {
          name: 'email-responsavel',
          label: `E-mail do Responsável${userIsMinor ? '' : ' (se menor de idade)'}`,
          type: 'email',
          required: userIsMinor,
          placeholder: 'responsavel@email.com',
        },
      ],
    },
    {
      id: 'experiencia',
      title: 'Experiência Esportiva',
      subtitle: 'Seu histórico e habilidades',
      icon: <Trophy className="w-6 h-6 text-white" />,
      fields: [
        {
          name: 'pratica-cheerleading',
          label: 'Já praticou cheerleading?',
          type: 'select',
          required: true,
          options: [
            { value: 'sim', label: 'Sim' },
            { value: 'nao', label: 'Não' },
          ],
        },
        {
          name: 'tempo-experiencia',
          label: 'Tempo de experiência em cheerleading',
          type: 'select',
          required: true,
          options: [
            { value: 'menos-6-meses', label: 'Menos de 6 meses' },
            { value: '6-12-meses', label: '6 a 12 meses' },
            { value: '1-2-anos', label: '1 a 2 anos' },
            { value: '2-anos-mais', label: 'Mais de 2 anos' },
          ],
        },
        {
          name: 'equipe-anterior',
          label: 'Equipe anterior (se aplicável)',
          type: 'text',
          placeholder: 'Nome da equipe',
        },
        {
          name: 'experiencia-ginastica',
          label: 'Tem experiência em ginástica/tumbling/dança?',
          type: 'select',
          options: [
            { value: 'ginastica', label: 'Ginástica Artística' },
            { value: 'tumbling', label: 'Tumbling' },
            { value: 'danca', label: 'Dança' },
            { value: 'nenhuma', label: 'Nenhuma' },
          ],
        },
        {
          name: 'posicao-interesse',
          label: 'Posição de interesse',
          type: 'checkbox-group',
          options: [
            { value: 'base', label: 'Base' },
            { value: 'flyer', label: 'Flyer' },
            { value: 'back', label: 'Back' },
          ],
        },
        {
          name: 'nivel-interesse',
          label: 'Nível de interesse',
          type: 'checkbox-group',
          required: true,
          options: [
            { value: 'n2', label: 'N2 (Nível 2)' },
            { value: 'n3', label: 'N3 (Nível 3)' },
            { value: 'n4', label: 'N4 (Nível 4)' },
          ],
        },
        {
          name: 'nivel-habilidades',
          label: 'Nível atual de habilidades',
          type: 'select',
          required: true,
          options: [
            { value: 'basico', label: 'Básico' },
            { value: 'intermediario', label: 'Intermediário' },
            { value: 'avancado', label: 'Avançado' },
          ],
        },
      ],
    },
    {
      id: 'disponibilidade',
      title: 'Disponibilidade',
      subtitle: 'Horários e logística',
      icon: <Calendar className="w-6 h-6 text-white" />,
      fields: [
        {
          name: 'dias-disponiveis',
          label: 'Dias disponíveis para treinar',
          type: 'checkbox-group',
          required: true,
          options: [
            { value: 'segunda', label: 'Segunda' },
            { value: 'terca', label: 'Terça' },
            { value: 'quarta', label: 'Quarta' },
            { value: 'quinta', label: 'Quinta' },
            { value: 'sexta', label: 'Sexta' },
            { value: 'sabado', label: 'Sábado' },
            { value: 'domingo', label: 'Domingo' },
          ],
        },
        {
          name: 'periodo-preferencia',
          label: 'Período de preferência',
          type: 'select',
          options: [
            { value: 'manha', label: 'Manhã' },
            { value: 'tarde', label: 'Tarde' },
            { value: 'noite', label: 'Noite' },
          ],
        },
        {
          name: 'participa-campeonatos',
          label: 'Pode participar de campeonatos fora da cidade/estado?',
          type: 'select',
          required: true,
          options: [
            { value: 'sim', label: 'Sim' },
            { value: 'nao', label: 'Não' },
            { value: 'talvez', label: 'Talvez, dependendo da data' },
          ],
        },
        {
          name: 'outros-esportes',
          label: 'Pratica outros esportes? Quais?',
          type: 'text',
          placeholder: 'Exemplo: Natação, Futebol...',
        },
      ],
    },
    {
      id: 'saude',
      title: 'Saúde e Autorização',
      subtitle: 'Informações importantes',
      icon: <Heart className="w-6 h-6 text-white" />,
      fields: [
        {
          name: 'condicoes-medicas',
          label: 'Condições médicas relevantes (alergias, lesões, etc.)',
          type: 'textarea',
          placeholder: 'Descreva qualquer condição que precisamos saber...',
        },
        {
          name: 'medicacoes',
          label: 'Uso de medicações contínuas',
          type: 'textarea',
          placeholder: 'Liste as medicações, se houver...',
        },
        {
          name: 'autorizacao-responsavel',
          label:
            'Confirmo que o responsável está ciente (para menores de 18 anos)',
          type: 'checkbox',
          required: true,
        },
        {
          name: 'aceite-termos',
          label: 'Li e aceito o termo de responsabilidade',
          type: 'checkbox',
          required: true,
        },
      ],
    },
  ]
}
