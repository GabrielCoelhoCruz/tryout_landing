import { User, Trophy, Calendar, Heart, CreditCard } from 'lucide-react'
import type { FormSection } from '@/types/form'
import { FORM_SECTION_IDS, PAYMENT_PROOF_CONFIG } from './payment'

export function createFormSections(userIsMinor: boolean): FormSection[] {
  return [
    {
      id: FORM_SECTION_IDS.personalData,
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
          type: 'readonly',
          required: true,
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
        ...(userIsMinor
          ? [
              {
                name: 'nome-responsavel' as const,
                label: 'Nome do Responsável',
                type: 'text' as const,
                required: true,
                placeholder: 'Nome completo do responsável',
              },
              {
                name: 'contato-responsavel' as const,
                label: 'Telefone do Responsável',
                type: 'tel' as const,
                required: true,
                placeholder: '(11) 99999-9999',
              },
              {
                name: 'email-responsavel' as const,
                label: 'E-mail do Responsável',
                type: 'email' as const,
                required: true,
                placeholder: 'responsavel@email.com',
              },
            ]
          : []),
      ],
    },
    {
      id: FORM_SECTION_IDS.experience,
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
            { value: 'nunca-pratiquei', label: 'Nunca pratiquei' },
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
            { value: 'coed-n2', label: 'Coed N2' },
            { value: 'coed-n3', label: 'Coed N3' },
            { value: 'coed-n4', label: 'Coed N4' },
            { value: 'allgirl-n2-n3', label: 'All Girl N2/N3' },
            { value: 'allboy-n2-n3', label: 'All Boy N2/N3' },
          ],
        },
      ],
    },
    {
      id: FORM_SECTION_IDS.availability,
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
          name: 'aceita-realocacao',
          label:
            'Está de acordo em ser realocado(a) para outra equipe do SkyHigh caso seja necessário para sua evolução no esporte?',
          type: 'select',
          required: true,
          options: [
            { value: 'sim', label: 'Sim' },
            { value: 'nao', label: 'Não' },
          ],
        },
        {
          name: 'aceita-crossover',
          label: 'Aceito/gostaria de ser crossover (estar em 2 equipes)',
          type: 'select',
          required: true,
          options: [
            { value: 'sim', label: 'Sim' },
            { value: 'nao', label: 'Não' },
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
      id: FORM_SECTION_IDS.health,
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
          name: 'declaracao-medica',
          label: 'Eu declaro para os devidos efeitos e sob minha inteira responsabilidade',
          type: 'checkbox',
          required: true,
          description: 'Não possuir qualquer contraindicação médica para a prática das atividades físicas a desenvolver com frequência na modalidade CHEERLEADING no CLUBE SKYHIGH ALL STAR, onde serei inteiramente responsável pela minha integridade física no que diz respeito à minha aptidão física para a prática desta modalidade, isentando os professores, instrutores e proprietários deste evento de toda e qualquer responsabilidade por acidentes que possam vir a ocorrer. Por fim, declaro estar ciente que é de minha inteira responsabilidade minha aptidão física atual e futura!',
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
    {
      id: FORM_SECTION_IDS.payment,
      title: 'Pagamento',
      subtitle: 'Comprovante de pagamento antecipado (opcional)',
      icon: <CreditCard className="w-6 h-6 text-white" />,
      fields: [
        {
          name: 'comprovante-pagamento',
          label: 'Comprovante de pagamento',
          type: 'file',
          accept: PAYMENT_PROOF_CONFIG.acceptedFormats,
          description: `Formatos aceitos: ${PAYMENT_PROOF_CONFIG.formatDescription} (máx. ${PAYMENT_PROOF_CONFIG.maxSizeMB}MB)`,
        },
      ],
    },
  ]
}
