import { Header } from '@/components/Header'
import { SectionHeroV2 } from '@/components/SectionHeroV2'
import { BenefitCard } from '@/components/BenefitCard'
import { StatCard } from '@/components/StatCard'
import { TeamCard } from '@/components/TeamCard'
import { JourneyTimelineV2 } from '@/components/JourneyTimelineV2'
import { TestimonialCard } from '@/components/TestimonialCard'
import { PhotoGrid } from '@/components/PhotoGrid'
import { InfoBlock } from '@/components/InfoBlock'
import { FaqAccordion } from '@/components/FaqAccordion'
import { CtaSection } from '@/components/CtaSection'
import { Footer } from '@/components/Footer'
import { Button, buttonVariants } from '@/components/ui/button' // If needed for extra CTAs
import { cn } from '@/lib/utils'

export default function HomeV2() {
  const benefits = [
    {
      icon: '🏆',
      title: 'Treinamento de Elite',
      description: 'Metodologia comprovada com técnicos certificados e acompanhamento individualizado para desenvolvimento técnico e pessoal.',
    },
    {
      icon: '💪',
      title: 'Performance de Alto Nível',
      description: 'Programa focado em excelência técnica, condicionamento físico e preparação mental para competições nacionais e internacionais.',
    },
    {
      icon: '🤝',
      title: 'Espírito de Equipe',
      description: 'Ambiente de união, respeito e crescimento coletivo. Aqui você constrói amizades para toda a vida enquanto evolui no esporte.',
    },
    {
      icon: '🎯',
      title: 'Conquistas Reais',
      description: 'Histórico comprovado de pódios em campeonatos estaduais, nacionais e internacionais. Faça parte de uma equipe vencedora.',
    },
  ]

  const stats = [
    {
      number: '15+',
      label: 'Campeonatos',
      description: 'Conquistas nacionais e internacionais',
      highlight: true,
    },
    {
      number: '8',
      label: 'Anos de Equipe',
      description: 'Tradição e excelência no cheerleading',
    },
    {
      number: '100+',
      label: 'Atletas Formados',
      description: 'Carreiras transformadas pelo esporte',
    },
    {
      number: '25+',
      label: 'Pódios',
      description: 'Em competições de alto nível',
      highlight: true,
    },
  ]

  const teams = [
    {
      name: 'N2 Coed',
      level: 'Nível 2',
      category: 'Coed',
      description: 'Time misto de nível intermediário, ideal para atletas com experiência prévia que buscam evolução técnica.',
      requirements: [
        'Idade: 14-25 anos',
        'Experiência mínima: 1 ano em cheerleading',
        'Disponibilidade: 3x por semana',
        'Habilidades: Stunts básicos, tumbling iniciante',
      ],
      vacancies: 5,
    },
    {
      name: 'N3 Coed',
      level: 'Nível 3',
      category: 'Coed',
      description: 'Time misto avançado com foco em rotinas complexas e competições de alto nível.',
      requirements: [
        'Idade: 15-25 anos',
        'Experiência mínima: 2 anos em cheerleading',
        'Disponibilidade: 4x por semana',
        'Habilidades: Stunts intermediários, tumbling avançado',
      ],
      vacancies: 3,
    },
    {
      name: 'N2 All Girl',
      level: 'Nível 2',
      category: 'All Girl',
      description: 'Time feminino de nível intermediário, com foco em técnica, sincronia e performance.',
      requirements: [
        'Idade: 14-25 anos (feminino)',
        'Experiência mínima: 1 ano em cheerleading',
        'Disponibilidade: 3x por semana',
        'Habilidades: Stunts femininos, tumbling básico',
      ],
      vacancies: 6,
    },
    {
      name: 'N3 All Girl',
      level: 'Nível 3',
      category: 'All Girl',
      description: 'Time feminino avançado, preparado para competir nas maiores competições do país.',
      requirements: [
        'Idade: 15-25 anos (feminino)',
        'Experiência mínima: 2 anos em cheerleading',
        'Disponibilidade: 4x por semana',
        'Habilidades: Stunts avançados, tumbling intermediário',
      ],
      vacancies: 4,
    },
  ]

  const journeySteps = [
    { icon: '📝', title: 'Inscrição', description: 'Preencha o formulário online' },
    { icon: '🎯', title: 'Tryout', description: 'Demonstre suas habilidades' },
    { icon: '✅', title: 'Resultado', description: 'Acompanhe a seleção' },
    { icon: '🤝', title: 'Integração', description: 'Conheça a equipe' },
    { icon: '💪', title: 'Treinos', description: 'Prepare-se para competir' },
    { icon: '🏆', title: 'Campeonatos', description: 'Represente a equipe' },
  ]

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Flyer - N2 All Girl',
      tenure: '2 anos na equipe',
      text: 'Entrar para esta equipe mudou minha vida. O nível de comprometimento e a qualidade do treinamento são incomparáveis. Conquistei meu primeiro pódio nacional aqui!',
    },
    {
      name: 'João Santos',
      role: 'Base - N3 Coed',
      tenure: '3 anos na equipe',
      text: 'A evolução técnica que tive aqui foi incrível. Além de melhorar no cheerleading, ganhei uma segunda família e aprendi valores que levo para toda a vida.',
    },
    {
      name: 'Ana Costa',
      role: 'Back - N3 All Girl',
      tenure: '1 ano e meio na equipe',
      text: 'Nunca pensei que chegaria tão longe. Com o apoio dos técnicos e da equipe, conquistei habilidades que achava impossíveis. Sou grata por fazer parte disso!',
    },
  ]

  const photos = [
    { src: '/photos/competition1.jpg', title: 'Campeonato Brasileiro 2024', alt: 'Equipe em competição - Pirâmide' },
    { src: '/logo/logo-shield.jpg', title: 'Logo Oficial', alt: 'Logo escudo SkyHigh AllStar' },
    { src: '/images/background-cosmic.jpg', title: 'Background Cósmico', alt: 'Background temático' },
  ]

  const tryoutInfo = [
    {
      icon: '📅',
      title: 'Data e Horário',
      content: '15 de Março, 2026 - 9h às 17h',
    },
    {
      icon: '📍',
      title: 'Local',
      content: 'Ginásio Principal - Rua Exemplo, 123, Centro',
    },
    {
      icon: '👥',
      title: 'Faixa Etária',
      content: '14 a 25 anos (varia por categoria)',
    },
    {
      icon: '📋',
      title: 'O que levar',
      content: 'Roupa esportiva, tênis, documento de identidade, água',
    },
    {
      icon: '⚡',
      title: 'Requisitos',
      content: 'Experiência mínima de 6 meses em cheerleading ou ginástica',
    },
    {
      icon: '💰',
      title: 'Investimento',
      content: 'Tryout gratuito. Mensalidade após aprovação.',
    },
  ]

  const faqs = [
    {
      question: 'Preciso ter experiência prévia em cheerleading?',
      answer: 'Recomendamos experiência mínima de 6 meses em cheerleading ou ginástica artística. Para times N3, a exigência é de pelo menos 2 anos de experiência.',
    },
    {
      question: 'Tem custo para participar do tryout?',
      answer: 'Não, o tryout é totalmente gratuito. Após a aprovação, há mensalidade para manutenção dos treinos, uniformes e participação em campeonatos.',
    },
    {
      question: 'Qual a frequência dos treinos?',
      answer: 'Times N2 treinam 3 vezes por semana (2h cada). Times N3 treinam 4 vezes por semana (2h30 cada). Os horários são definidos de acordo com a categoria.',
    },
    {
      question: 'Posso participar se pratico outro esporte?',
      answer: 'Sim, desde que consiga se comprometer com a frequência mínima de treinos. O cheerleading exige dedicação, mas muitos atletas conseguem conciliar com estudos e outras atividades.',
    },
    {
      question: 'Como funciona o processo de seleção?',
      answer: 'Durante o tryout, avaliamos habilidades técnicas (tumbling, stunts, jumps), condicionamento físico, atitude e trabalho em equipe. Os resultados são divulgados em até 7 dias após o tryout.',
    },
    {
      question: 'Menores de idade podem participar?',
      answer: 'Sim! Aceitamos atletas a partir de 14 anos. Menores de 18 anos precisam estar acompanhados de um responsável legal no dia do tryout e ter autorização assinada.',
    },
    {
      question: 'Nunca fiz cheerleading, posso participar?',
      answer: 'Para o tryout, recomendamos experiência prévia. Porém, oferecemos turmas iniciantes ao longo do ano. Entre em contato para saber sobre as próximas turmas de base.',
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg">
        {/* 1. New Hero V2 */}
        <SectionHeroV2
          title="SKYHIGH ALLSTAR TRYOUT 2026"
          subtitle="Faça parte da equipe que está elevando o nível do cheerleading. Inscrições abertas para times N2 e N3."
          ctaLabel="Quero fazer o Tryout"
          ctaLink="/formulario"
          image="/photos/competition1.jpg" // Using actual photo for side layout
          imageAlt="Atletas SkyHigh em competição"
        />

        {/* 2. Benefits with Darker bg for contrast */}
        <section id="sobre" className="py-24 bg-bg scroll-mt-20">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Nossa Filosofia</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-ink leading-tight">
                  Por que entrar na nossa equipe?
                </h2>
              </div>
              <p className="text-lg text-ink-muted max-w-md pb-2">
                Muito mais do que um time, somos uma família comprometida com a excelência.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Stats Section - Full width impact */}
        <section className="py-24 bg-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/logo/logo-shield.jpg')] bg-cover bg-center mix-blend-overlay" />
          <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
                  Resultados que Comprovam Nossa Excelência
                </h2>
                <p className="text-xl text-white/70 mb-8">
                  Nossa trajetória é marcada por dedicação e conquistas. Cada número representa o suor e a superação de nossos atletas.
                </p>
                <a 
                  href="#galeria"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    "border-white/20 text-white hover:bg-white/10"
                  )}
                >
                  Ver Galeria de Fotos
                </a>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Teams - Card Grid with better header */}
        <section id="times" className="py-24 bg-bg-alt scroll-mt-20">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-royal-light font-bold tracking-wider uppercase text-sm mb-2 block">Categorias</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary mb-6">
                Nossos Times 2026
              </h2>
              <p className="text-lg text-ink-muted">
                Temos vagas para diferentes níveis e categorias. Encontre o time ideal para você e venha fazer parte da nossa história.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {teams.map((team, index) => (
                <TeamCard key={index} {...team} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. Journey Timeline - Vertical flow */}
        <section className="py-24 bg-gradient-to-b from-royal-dark to-dark text-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
                Sua Jornada na Equipe
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Do tryout aos campeonatos, veja o caminho que você vai percorrer conosco.
              </p>
            </div>
            <JourneyTimelineV2 steps={journeySteps} />
          </div>
        </section>

        {/* 6. Testimonials & Gallery Wrapper */}
        <div className="bg-bg py-24">
            {/* Testimonials */}
            <section className="container mx-auto px-4 md:px-8 lg:px-16 mb-24">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">
                  Histórias de Sucesso
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} {...testimonial} index={index} />
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section id="galeria" className="container mx-auto px-4 md:px-8 lg:px-16 scroll-mt-20">
              <div className="flex items-center justify-between mb-12">
                 <h2 className="text-4xl md:text-5xl font-display text-primary">
                  Galeria
                </h2>
              </div>
              <PhotoGrid photos={photos} columns={3} />
            </section>
        </div>

        {/* 7. Info & FAQ */}
        <section id="faq" className="py-24 bg-bg-alt scroll-mt-20">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Info Column */}
              <div className="lg:col-span-5 space-y-12">
                <div>
                   <h2 className="text-4xl md:text-5xl font-display text-primary mb-6">
                    Informações do Tryout
                  </h2>
                  <p className="text-lg text-ink-muted">
                    Prepare-se para o dia da seleção. Aqui estão todos os detalhes importantes.
                  </p>
                </div>
                <InfoBlock items={tryoutInfo} />
              </div>

              {/* FAQ Column */}
              <div className="lg:col-span-7">
                 <h2 className="text-4xl md:text-5xl font-display text-primary mb-8">
                  Perguntas Frequentes
                </h2>
                <FaqAccordion items={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* 8. Final CTA */}
        <CtaSection
          title="Pronto para elevar o nível em 2026?"
          subtitle="As vagas são limitadas. Garanta sua inscrição agora e faça parte da nossa história de conquistas."
          ctaLabel="Preencher Formulário do Tryout"
          ctaLink="/formulario"
        />

        <Footer />
      </main>
    </>
  )
}

