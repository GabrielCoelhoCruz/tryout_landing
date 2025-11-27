import { Header } from '@/components/Header'
import { SectionHero } from '@/components/SectionHero'
import { BenefitCard } from '@/components/BenefitCard'
import { StatCard } from '@/components/StatCard'
import { TeamCard } from '@/components/TeamCard'
import { JourneyTimeline } from '@/components/JourneyTimeline'
import { TestimonialCard } from '@/components/TestimonialCard'
import { PhotoGrid } from '@/components/PhotoGrid'
import { InfoBlock } from '@/components/InfoBlock'
import { FaqAccordion } from '@/components/FaqAccordion'
import { CtaSection } from '@/components/CtaSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  const benefits = [
    {
      icon: 'Trophy',
      title: 'Treinamento de Elite',
      description: 'Metodologia comprovada com técnicos certificados e acompanhamento individualizado para desenvolvimento técnico e pessoal.',
    },
    {
      icon: 'Dumbbell',
      title: 'Performance de Alto Nível',
      description: 'Programa focado em excelência técnica, condicionamento físico e preparação mental para competições nacionais e internacionais.',
    },
    {
      icon: 'Handshake',
      title: 'Espírito de Equipe',
      description: 'Ambiente de união, respeito e crescimento coletivo. Aqui você constrói amizades para toda a vida enquanto evolui no esporte.',
    },
    {
      icon: 'Target',
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
    { icon: 'FileText', title: 'Inscrição', description: 'Preencha o formulário online' },
    { icon: 'Target', title: 'Tryout', description: 'Demonstre suas habilidades' },
    { icon: 'CheckCircle', title: 'Resultado', description: 'Acompanhe a seleção' },
    { icon: 'Handshake', title: 'Integração', description: 'Conheça a equipe' },
    { icon: 'Dumbbell', title: 'Treinos', description: 'Prepare-se para competir' },
    { icon: 'Medal', title: 'Campeonatos', description: 'Represente a equipe' },
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
      icon: 'Calendar',
      title: 'Data e Horário',
      content: '15 de Março, 2026 - 9h às 17h',
    },
    {
      icon: 'MapPin',
      title: 'Local',
      content: 'Ginásio Principal - Rua Exemplo, 123, Centro',
    },
    {
      icon: 'Users',
      title: 'Faixa Etária',
      content: '14 a 25 anos (varia por categoria)',
    },
    {
      icon: 'ClipboardList',
      title: 'O que levar',
      content: 'Roupa esportiva, tênis, documento de identidade, água',
    },
    {
      icon: 'Zap',
      title: 'Requisitos',
      content: 'Experiência mínima de 6 meses em cheerleading ou ginástica',
    },
    {
      icon: 'DollarSign',
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
        {/* 1. Hero */}
        <SectionHero
        title="TRYOUT 2026"
        subtitle="Faça parte da equipe que está elevando o nível do cheerleading. Inscrições abertas para times N2 e N3 (Coed, All Girl, All Boy)."
        ctaLabel="Quero fazer o Tryout"
        ctaLink="/formulario"
        image="/images/background-cosmic.jpg"
        imageAlt="Background cósmico SkyHigh AllStar"
      />

      {/* 2. Benefits */}
      <section id="sobre" className="py-16 md:py-20 bg-bg scroll-mt-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">
              Por que entrar na nossa equipe?
            </h2>
            <p className="text-lg text-ink-muted max-w-2xl mx-auto">
              Muito mais do que um time, somos uma família comprometida com a excelência.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Stats */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-royal/5 to-royal-light/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">
              Nossos Números Falam
            </h2>
            <p className="text-lg text-ink-muted max-w-2xl mx-auto">
              Resultados que comprovam nossa dedicação e excelência no cheerleading.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Teams */}
      <section id="times" className="py-16 md:py-20 bg-bg scroll-mt-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">
              Nossos Times 2026
            </h2>
            <p className="text-lg text-ink-muted max-w-2xl mx-auto">
              Temos vagas para diferentes níveis e categorias. Encontre o time ideal para você.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {teams.map((team, index) => (
              <TeamCard key={index} {...team} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Journey Timeline */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-dark via-royal-darker to-royal-dark">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">
              Sua Jornada na Equipe
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Do tryout aos campeonatos, veja o caminho que você vai percorrer conosco.
            </p>
          </div>
          <JourneyTimeline steps={journeySteps} />
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-16 md:py-20 bg-bg">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">
              Histórias de Sucesso
            </h2>
            <p className="text-lg text-ink-muted max-w-2xl mx-auto">
              Veja o que nossos atletas têm a dizer sobre a experiência na equipe.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Photo Gallery */}
      <section id="galeria" className="py-16 md:py-20 bg-gradient-to-br from-royal/5 via-primary/5 to-coral/5 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">
              Galeria
            </h2>
            <p className="text-lg text-ink-muted max-w-2xl mx-auto">
              Momentos de treino, competições e conquistas da nossa equipe.
            </p>
          </div>
          <PhotoGrid photos={photos} columns={3} />
        </div>
      </section>

      {/* 8. Tryout Info */}
      <section className="py-16 md:py-20 bg-bg">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">
              Informações do Tryout
            </h2>
            <p className="text-lg text-ink-muted max-w-2xl mx-auto">
              Tudo o que você precisa saber para participar.
            </p>
          </div>
          <InfoBlock items={tryoutInfo} />
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="py-16 md:py-20 bg-bg-alt scroll-mt-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-ink-muted max-w-2xl mx-auto">
              Tire suas dúvidas sobre o tryout e a equipe.
            </p>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* 10. Final CTA */}
      <CtaSection
        title="Pronto para elevar o nível em 2026?"
        subtitle="As vagas são limitadas. Garanta sua inscrição agora e faça parte da nossa história de conquistas."
        ctaLabel="Preencher Formulário do Tryout"
        ctaLink="/formulario"
      />

        {/* 11. Footer */}
        <Footer />
      </main>
    </>
  )
}
