import {
  Trophy,
  Calendar,
  Users,
  Star,
  Target,
  Zap,
  Heart,
  FileText,
  CheckCircle,
  Handshake,
  Dumbbell,
  Medal,
  ClipboardList,
  DollarSign,
  Clock,
} from 'lucide-react'
import type { StormType } from '@/context/StormWeatherContext'

export const STATS = [
  { number: '15+', label: 'Campeonatos', icon: Trophy, color: '#FF7F00' },
  { number: '6', label: 'Anos de Equipe', icon: Calendar, color: '#00BFFF' },
  { number: '100+', label: 'Atletas Formados', icon: Users, color: '#FF8C69' },
  { number: '10+', label: 'Conquistas', icon: Star, color: '#2563EB' },
] as const

export const BENEFITS = [
  {
    icon: Target,
    title: 'Metodologia',
    description:
      'Treinamento comprovado com técnicos certificados e acompanhamento personalizado para seu desenvolvimento.',
    color: '#FF7F00',
  },
  {
    icon: Zap,
    title: 'Performance',
    description:
      'Excelência técnica, condicionamento físico e preparação mental para competições nacionais e internacionais.',
    color: '#00BFFF',
  },
  {
    icon: Heart,
    title: 'Espírito de Equipe',
    description:
      'União, respeito e crescimento coletivo. Construa amizades para a vida enquanto evolui no esporte.',
    color: '#FF7F00',
  },
] as const

type Team = {
  name: string
  level: string
  category: string
  description: string
  requirements: readonly string[]
  vacancies: number
  color: string
  storm: StormType
}

export const TEAMS: readonly Team[] = [
  {
    name: 'COED N2',
    level: 'Nível 2',
    category: 'Coed',
    description:
      'Time misto, ideal para atletas iniciantes que buscam evolução técnica na base do cheerleading.',
    requirements: [
      'Idade mínima: 12 anos',
      'Habilidades: Skills de nível 2 + Jump, tumbling (se tiver)',
    ],
    vacancies: 0,
    color: '#E0F4FF',
    storm: 'hail',
  },
  {
    name: 'COED N3',
    level: 'Nível 3',
    category: 'Coed',
    description:
      'Time misto de nível intermediário, ideal para atletas com experiência prévia que buscam evolução técnica.',
    requirements: [
      'Idade mínima: 12 anos',
      'Habilidades: Skills de nível 3 + Jump, tumbling (se tiver)',
    ],
    vacancies: 0,
    color: '#2563EB',
    storm: 'thunder',
  },
  {
    name: 'COED N4',
    level: 'Nível 4',
    category: 'Coed',
    description:
      'Time misto de nível avançado, para atletas experientes que buscam desafios técnicos mais elevados.',
    requirements: [
      'Idade mínima: 12 anos',
      'Habilidades: Skills de nível 4 + Jump, tumbling (se tiver)',
    ],
    vacancies: 0,
    color: '#FF7F00',
    storm: 'fire',
  },
  {
    name: 'ALL GIRL N2/N3',
    level: 'Nível 2/3',
    category: 'All Girl',
    description:
      'Time feminino, com foco em técnica, sincronia e performance.',
    requirements: [
      'Idade mínima: 8 anos',
      'Habilidades: Skills de nível 2/3 + Jump, tumbling (se tiver)',
    ],
    vacancies: 0,
    color: '#FFFFFF',
    storm: 'snow',
  },
  {
    name: 'ALL BOY N2/N3',
    level: 'Nível 2/3',
    category: 'All Boy',
    description:
      'Time masculino, com foco em técnica, sincronia e performance.',
    requirements: [
      'Idade mínima: 8 anos',
      'Habilidades: Skills de nível 2/3 + Jump, tumbling (se tiver)',
    ],
    vacancies: 0,
    color: '#00BFFF',
    storm: 'rain',
  },
] as const

export const TESTIMONIALS = [
  {
    name: 'Maria Silva',
    role: 'Flyer - N2 All Girl',
    tenure: '2 anos na equipe',
    text: 'Entrar para esta equipe mudou minha vida. O nível de comprometimento e a qualidade do treinamento são incomparáveis. Conquistei meu primeiro pódio nacional aqui!',
    rating: 5,
  },
  {
    name: 'João Santos',
    role: 'Base - N3 Coed',
    tenure: '3 anos na equipe',
    text: 'A evolução técnica que tive aqui foi incrível. Além de melhorar no cheerleading, ganhei uma segunda família e aprendi valores que levo para toda a vida.',
    rating: 5,
  },
  {
    name: 'Ana Costa',
    role: 'Back - N3 All Girl',
    tenure: '1.5 ano na equipe',
    text: 'Nunca pensei que chegaria tão longe. Com o apoio dos técnicos e da equipe, conquistei habilidades que achava impossíveis!',
    rating: 5,
  },
] as const

export const JOURNEY_STEPS = [
  {
    number: '01',
    title: 'Inscrição',
    description: 'Preencha o formulário online',
    icon: FileText,
  },
  {
    number: '02',
    title: 'Tryout',
    description: 'Demonstre suas habilidades',
    icon: Target,
  },
  {
    number: '03',
    title: 'Resultado',
    description: 'Acompanhe a seleção',
    icon: CheckCircle,
  },
  {
    number: '04',
    title: 'Integração',
    description: 'Conheça a equipe',
    icon: Handshake,
  },
  {
    number: '05',
    title: 'Treinos',
    description: 'Prepare-se para competir',
    icon: Dumbbell,
  },
  {
    number: '06',
    title: 'Campeonatos',
    description: 'Represente a equipe',
    icon: Medal,
  },
] as const

export const FAQS = [
  {
    question: 'Preciso ter experiência prévia em cheerleading?',
    answer:
      'Não é necessário, pois em equipes de nível 2 ensinamos desde os fundamentos do esporte para quem nunca praticou. Recomendamos experiência prévia para níveis 3 ou acima.',
  },
  {
    question: 'Tem custo para participar do tryout?',
    answer:
      'Sim, há uma taxa de inscrição a partir de R$ 25,00, dependendo da modalidade e período de pagamento.',
  },
  {
    question: 'Quais são os valores da mensalidade?',
    answer:
      'O valor da mensalidade para participar de uma equipe é R$ 140,00, incluindo treinos de equipe, treinos extras, treinos de tumbling (acrobacias) e acompanhamento profissional. Para apenas aulas de tumbling, consulte valores de mensalidade ou aula avulsa.',
  },
  {
    question: 'Existe bolsa para mensalidade?',
    answer:
      'Sim, existe bolsa para treinar. O formulário de pedidos de bolsa será aberto após o início oficial da temporada.',
  },
  {
    question: 'Qual a frequência de treinos?',
    answer:
      'O treino oficial de cada equipe é todo domingo com 3h15 de duração (os horários serão divulgados em breve). Também há treinos extras aos sábados pré-campeonatos.',
  },
  {
    question: 'Quando começam os treinos após a seleção?',
    answer:
      'Os treinos começam na semana seguinte à divulgação dos resultados. Haverá uma semana de integração antes do início oficial da temporada competitiva.',
  },
] as const

export const TRYOUT_INFO = [
  {
    icon: ClipboardList,
    label: 'Inscrições abertas',
    value: '06 - 30 Jan, 2026',
    color: '#FF7F00',
  },
  {
    icon: Calendar,
    label: 'Data do Tryout',
    value: '31 Jan e 01 Fev, 2026',
    color: '#00BFFF',
  },
  {
    icon: Users,
    label: 'Vagas Limitadas',
    value: 'Garanta sua vaga',
    color: '#2563EB',
  },
] as const

export const TRYOUT_SCHEDULE = [
  {
    date: '31/01',
    day: 'Sábado',
    teams: [
      {
        name: 'All Girl',
        color: '#FF69B4',
        schedule: [
          { time: '9h30 - 10h', activity: 'Credenciamento' },
          { time: '10h - 13h', activity: 'Tryout' },
        ],
      },
      {
        name: 'Intervalo',
        color: '#6B7280',
        schedule: [
          { time: '13h - 14h', activity: 'Almoço' },
        ],
      },
      {
        name: 'All Boy',
        color: '#00BFFF',
        schedule: [
          { time: '14h - 14h30', activity: 'Credenciamento' },
          { time: '14h30 - 17h30', activity: 'Tryout' },
        ],
      },
    ],
  },
  {
    date: '01/02',
    day: 'Domingo',
    teams: [
      {
        name: 'COED N2',
        color: '#3B82F6',
        schedule: [
          { time: '9h30 - 10h', activity: 'Credenciamento' },
          { time: '10h - 12h', activity: 'Tryout' },
        ],
      },
      {
        name: 'Intervalo',
        color: '#6B7280',
        schedule: [
          { time: '12h - 13h', activity: 'Almoço' },
        ],
      },
      {
        name: 'COED N3',
        color: '#2563EB',
        schedule: [
          { time: '13h - 13h30', activity: 'Credenciamento' },
          { time: '13h30 - 15h30', activity: 'Tryout' },
        ],
      },
      {
        name: 'COED N4',
        color: '#FF7F00',
        schedule: [
          { time: '15h30 - 16h', activity: 'Credenciamento' },
          { time: '16h - 18h', activity: 'Tryout' },
        ],
      },
    ],
  },
] as const

export const PRICING_PLANS = [
  {
    id: 'single',
    name: 'Uma Equipe',
    description: 'Tryout para uma única equipe',
    icon: '1',
    color: '#FF7F00',
    prices: [
      { label: 'Atleta SkyHigh 2025', sublabel: 'Antecipado', price: '25' },
      { label: 'Não atleta SkyHigh', sublabel: 'Antecipado', price: '30' },
      { label: 'Na porta', sublabel: 'Todos', price: '35' },
    ],
  },
  {
    id: 'multiple',
    name: 'Mais Equipes',
    description: 'Tryout para múltiplas equipes',
    icon: '2+',
    color: '#00BFFF',
    prices: [
      { label: 'Atleta SkyHigh 2025', sublabel: 'Antecipado', price: '30' },
      { label: 'Não atleta SkyHigh', sublabel: 'Antecipado', price: '35' },
      { label: 'Na porta', sublabel: 'Todos', price: '40' },
    ],
  },
] as const