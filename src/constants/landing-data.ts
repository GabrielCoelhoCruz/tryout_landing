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
  {
    name: 'CHEER POM',
    level: 'Pom',
    category: 'Cheer Pom',
    description:
      'O Cheer Pom é uma modalidade do cheerleading que combina dança, técnica e expressão artística com o uso dos pompons. As coreografias unem sincronia, energia e criatividade, transformando cada apresentação em um espetáculo visual cheio de brilho e emoção.\n\nAlém da performance, o Cheer Pom desenvolve coordenação, ritmo, postura, confiança e trabalho em equipe. É onde a música encontra o movimento e o espírito de equipe ganha forma.\n\nIsso é Cheer Pom: atitude, arte e energia em cada passo.',
    requirements: [
      'Idade mínima: a definir',
    ],
    vacancies: 0,
    color: '#FF69B4',
    storm: 'mixed',
  },
] as const

export const TESTIMONIALS = [
  {
    name: 'Beatriz Souza',
    tenure: 'Desde 2020 na equipe',
    image: '/photos/Beatriz.jpeg',
    text: 'O Sky me trouxe conhecimento, amizades e me abriu portas como atleta e coach, desde o primeiro empurrãozinho para fazer o try out pro Team Brazil até o reconhecimento para treinar um time, hoje eles são mais que uma equipe, são minha família.',
    rating: 5,
  },
  {
    name: 'Samuel Faglioni',
    tenure: 'Desde 2024 na equipe',
    image: '/photos/Samuel.jpg',
    text: 'Estar dentro do Sky foi de longe minha melhor experiência com cheer. Seja por ter evoluído muito como atleta quanto por ser um espaço onde fiz amizades incríveis!',
    rating: 5,
  },
  {
    name: 'Manu e Andre, pais da Catarina',
    tenure: 'Desde 2024 na equipe',
    image: '/photos/Catarina.jpg',
    text: 'A evolução da Catarina no Sky é visível em todos os sentidos. Ela ganhou força, técnica, disciplina e confiança, além de aprender sobre trabalho em equipe, respeito e empatia. Mais do que um time, o Sky se tornou uma família onde ela se sente acolhida e pertencente. Ver nossa filha feliz, confiante e evoluindo é a maior conquista que poderíamos ter.',
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
      'Mensalidade (fev a dez): R$ 200,00 (1 equipe) ou R$ 210,00 (crossover: 2 equipes). Incluso: treinos oficiais, treinos extras de equipe, treinos de tumbling (acrobacias), fotos de campeonatos e cheermix.\n\nMatrícula: R$ 150,00 (taxa única).',
  },
  {
    question: 'Existe bolsa para mensalidade?',
    answer:
      'Sim, existe bolsa para treinar. O formulário de pedidos de bolsa será aberto após o início oficial da temporada.',
  },
  {
    question: 'Qual a frequência de treinos?',
    answer:
      'O treino oficial de cada equipe é todo domingo com 3h15 de duração (os horários serão divulgados em breve). A partir de julho, também teremos treinos aos sábados para preparação dos campeonatos.',
  },
  {
    question: 'Quando começam os treinos após a seleção?',
    answer:
      'Os treinos começam na semana seguinte à divulgação dos resultados. Haverá uma semana de integração antes do início oficial da temporada competitiva.',
  },
] as const

export const TRYOUT_INFO = [
  {
    icon: Calendar,
    label: 'Cheer Pom',
    value: '21 Mar, 2026 — Data fixa',
    color: '#FF69B4',
  },
  {
    icon: ClipboardList,
    label: 'Demais Equipes',
    value: 'Tryouts agendados',
    color: '#FF7F00',
  },
  {
    icon: Users,
    label: 'Vagas Limitadas',
    value: 'Garanta sua vaga',
    color: '#2563EB',
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
  {
    id: 'cheerpom',
    name: 'Cheer Pom',
    description: 'Seletiva Cheer Pom — 21/03',
    icon: '🎀',
    color: '#FF69B4',
    prices: [
      { label: 'Atleta SkyHigh 2026', sublabel: '', price: 'Isento' },
      { label: 'Não atleta SkyHigh', sublabel: 'Antecipado', price: '25' },
    ],
  },
] as const