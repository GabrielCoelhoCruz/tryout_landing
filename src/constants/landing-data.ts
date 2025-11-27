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
} from 'lucide-react'
import type { StormType } from '@/context/StormWeatherContext'

export const STATS = [
  { number: '15+', label: 'Campeonatos', icon: Trophy, color: '#FF7F00' },
  { number: '8', label: 'Anos de Equipe', icon: Calendar, color: '#00BFFF' },
  { number: '100+', label: 'Atletas Formados', icon: Users, color: '#FF8C69' },
  { number: '25+', label: 'Pódios', icon: Star, color: '#2563EB' },
] as const

export const BENEFITS = [
  {
    icon: Target,
    title: 'Treinamento de Elite',
    description:
      'Metodologia comprovada com técnicos certificados e acompanhamento individualizado para desenvolvimento técnico e pessoal.',
    color: '#FF7F00',
  },
  {
    icon: Zap,
    title: 'Performance de Alto Nível',
    description:
      'Programa focado em excelência técnica, condicionamento físico e preparação mental para competições nacionais e internacionais.',
    color: '#00BFFF',
  },
  {
    icon: Heart,
    title: 'Espírito de Equipe',
    description:
      'Ambiente de união, respeito e crescimento coletivo. Aqui você constrói amizades para toda a vida enquanto evolui no esporte.',
    color: '#FF7F00',
  },
  {
    icon: Trophy,
    title: 'Conquistas Reais',
    description:
      'Histórico comprovado de pódios em campeonatos estaduais, nacionais e internacionais. Faça parte de uma equipe vencedora.',
    color: '#00BFFF',
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
    name: 'N2 Coed',
    level: 'Nível 2',
    category: 'Coed',
    description:
      'Time misto de nível intermediário, ideal para atletas com experiência prévia que buscam evolução técnica.',
    requirements: [
      'Idade: 14-25 anos',
      'Experiência mínima: 1 ano em cheerleading',
      'Disponibilidade: 3x por semana',
      'Habilidades: Stunts básicos, tumbling iniciante',
    ],
    vacancies: 5,
    color: '#FF7F00',
    storm: 'fire',
  },
  {
    name: 'N3 Coed',
    level: 'Nível 3',
    category: 'Coed',
    description:
      'Time misto avançado com foco em rotinas complexas e competições de alto nível.',
    requirements: [
      'Idade: 15-25 anos',
      'Experiência mínima: 2 anos em cheerleading',
      'Disponibilidade: 4x por semana',
      'Habilidades: Stunts intermediários, tumbling avançado',
    ],
    vacancies: 3,
    color: '#00BFFF',
    storm: 'rain',
  },
  {
    name: 'N2 All Girl',
    level: 'Nível 2',
    category: 'All Girl',
    description:
      'Time feminino de nível intermediário, com foco em técnica, sincronia e performance.',
    requirements: [
      'Idade: 14-25 anos (feminino)',
      'Experiência mínima: 1 ano em cheerleading',
      'Disponibilidade: 3x por semana',
      'Habilidades: Stunts femininos, tumbling básico',
    ],
    vacancies: 6,
    color: '#FF7F00',
    storm: 'hail',
  },
  {
    name: 'N3 All Girl',
    level: 'Nível 3',
    category: 'All Girl',
    description:
      'Time feminino avançado, preparado para competir nas maiores competições do país.',
    requirements: [
      'Idade: 15-25 anos (feminino)',
      'Experiência mínima: 2 anos em cheerleading',
      'Disponibilidade: 4x por semana',
      'Habilidades: Stunts avançados, tumbling intermediário',
    ],
    vacancies: 4,
    color: '#00BFFF',
    storm: 'thunder',
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
      'Recomendamos experiência mínima de 6 meses em cheerleading ou ginástica artística. Para times N3, a exigência é de pelo menos 2 anos de experiência.',
  },
  {
    question: 'Tem custo para participar do tryout?',
    answer:
      'Sim, há uma taxa de inscrição de R$ 50,00 que será descontada da mensalidade caso você seja selecionado.',
  },
  {
    question: 'Quais são os valores da mensalidade?',
    answer:
      'Os valores variam de acordo com o nível e categoria do time, entre R$ 350,00 e R$ 550,00 mensais. Isso inclui treinos, uniforme de treino e acompanhamento profissional.',
  },
  {
    question: 'Qual a frequência de treinos?',
    answer:
      'Times N2 treinam 3 vezes por semana (2h por treino). Times N3 treinam 4 vezes por semana (2h30 por treino). Também há treinos extras pré-campeonatos.',
  },
  {
    question: 'Preciso ter disponibilidade para viajar?',
    answer:
      'Sim, a equipe compete em campeonatos regionais, estaduais e nacionais. É importante ter disponibilidade para viagens, especialmente nos finais de semana de competição.',
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
    value: '15 Jan - 15 Fev 2026',
    color: '#FF7F00',
  },
  {
    icon: Calendar,
    label: 'Data do Tryout',
    value: '22 de Fevereiro, 2026',
    color: '#00BFFF',
  },
  {
    icon: Users,
    label: 'Vagas Disponíveis',
    value: '18 vagas totais',
    color: '#FF8C69',
  },
  {
    icon: DollarSign,
    label: 'Taxa de Inscrição',
    value: 'R$ 50,00',
    color: '#2563EB',
  },
] as const
