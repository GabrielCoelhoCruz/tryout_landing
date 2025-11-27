'use client'

import { Header } from '@/components/Header'
import { TryoutForm } from '@/components/TryoutForm'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function FormularioPage() {
  const formSections = [
    {
      id: 'dados-pessoais',
      title: '1. Dados Pessoais do Atleta',
      fields: [
        { name: 'nome-completo', label: 'Nome Completo', type: 'text' as const, required: true, placeholder: 'Seu nome completo' },
        { name: 'data-nascimento', label: 'Data de Nascimento', type: 'date' as const, required: true },
        { name: 'idade', label: 'Idade', type: 'number' as const, required: true, placeholder: '18' },
        { name: 'genero', label: 'Gênero', type: 'select' as const, required: true, options: [
          { value: 'feminino', label: 'Feminino' },
          { value: 'masculino', label: 'Masculino' },
          { value: 'outro', label: 'Outro' },
        ]},
        { name: 'telefone', label: 'Telefone/WhatsApp', type: 'tel' as const, required: true, placeholder: '(11) 99999-9999' },
        { name: 'email', label: 'E-mail', type: 'email' as const, required: true, placeholder: 'seu@email.com' },
        { name: 'nome-responsavel', label: 'Nome do Responsável (se menor de idade)', type: 'text' as const, placeholder: 'Nome do responsável' },
        { name: 'contato-responsavel', label: 'Contato do Responsável', type: 'tel' as const, placeholder: '(11) 99999-9999' },
      ],
    },
    {
      id: 'experiencia',
      title: '2. Experiência e Perfil Esportivo',
      fields: [
        { name: 'pratica-cheerleading', label: 'Já praticou cheerleading?', type: 'select' as const, required: true, options: [
          { value: 'sim', label: 'Sim' },
          { value: 'nao', label: 'Não' },
        ]},
        { name: 'tempo-experiencia', label: 'Tempo de experiência em cheerleading', type: 'select' as const, required: true, options: [
          { value: 'menos-6-meses', label: 'Menos de 6 meses' },
          { value: '6-12-meses', label: '6 a 12 meses' },
          { value: '1-2-anos', label: '1 a 2 anos' },
          { value: '2-anos-mais', label: 'Mais de 2 anos' },
        ]},
        { name: 'equipe-anterior', label: 'Equipe anterior (se aplicável)', type: 'text' as const, placeholder: 'Nome da equipe' },
        { name: 'experiencia-ginastica', label: 'Tem experiência em ginástica/tumbling/dança?', type: 'select' as const, options: [
          { value: 'ginastica', label: 'Ginástica Artística' },
          { value: 'tumbling', label: 'Tumbling' },
          { value: 'danca', label: 'Dança' },
          { value: 'nenhuma', label: 'Nenhuma' },
        ]},
        { name: 'posicao-interesse', label: 'Posição de interesse', type: 'checkbox-group' as const, options: [
          { value: 'base', label: 'Base' },
          { value: 'flyer', label: 'Flyer' },
          { value: 'back', label: 'Back' },
        ]},
        { name: 'nivel-interesse', label: 'Nível de interesse', type: 'checkbox-group' as const, required: true, options: [
          { value: 'n2', label: 'N2 (Nível 2)' },
          { value: 'n3', label: 'N3 (Nível 3)' },
        ]},
        { name: 'nivel-habilidades', label: 'Nível atual de habilidades', type: 'select' as const, required: true, options: [
          { value: 'basico', label: 'Básico' },
          { value: 'intermediario', label: 'Intermediário' },
          { value: 'avancado', label: 'Avançado' },
        ]},
      ],
    },
    {
      id: 'disponibilidade',
      title: '3. Disponibilidade e Logística',
      fields: [
        { name: 'dias-disponiveis', label: 'Dias disponíveis para treinar', type: 'checkbox-group' as const, required: true, options: [
          { value: 'segunda', label: 'Segunda-feira' },
          { value: 'terca', label: 'Terça-feira' },
          { value: 'quarta', label: 'Quarta-feira' },
          { value: 'quinta', label: 'Quinta-feira' },
          { value: 'sexta', label: 'Sexta-feira' },
          { value: 'sabado', label: 'Sábado' },
          { value: 'domingo', label: 'Domingo' },
        ]},
        { name: 'periodo-preferencia', label: 'Período de preferência', type: 'select' as const, options: [
          { value: 'manha', label: 'Manhã' },
          { value: 'tarde', label: 'Tarde' },
          { value: 'noite', label: 'Noite' },
        ]},
        { name: 'participa-campeonatos', label: 'Pode participar de campeonatos fora da cidade/estado?', type: 'select' as const, required: true, options: [
          { value: 'sim', label: 'Sim' },
          { value: 'nao', label: 'Não' },
          { value: 'talvez', label: 'Talvez, dependendo da data' },
        ]},
        { name: 'outros-esportes', label: 'Pratica outros esportes? Quais?', type: 'text' as const, placeholder: 'Exemplo: Natação, Futebol...' },
      ],
    },
    {
      id: 'saude',
      title: '4. Saúde e Autorização',
      fields: [
        { name: 'condicoes-medicas', label: 'Condições médicas relevantes (alergias, lesões, etc.)', type: 'textarea' as const, placeholder: 'Descreva qualquer condição que precisamos saber...' },
        { name: 'medicacoes', label: 'Uso de medicações contínuas', type: 'textarea' as const, placeholder: 'Liste as medicações, se houver...' },
        { name: 'autorizacao-responsavel', label: 'Confirmo que o responsável está ciente (para menores de 18 anos)', type: 'checkbox' as const, required: true },
        { name: 'aceite-termos', label: 'Li e aceito o termo de responsabilidade', type: 'checkbox' as const, required: true },
      ],
    },
  ]

  const handleSubmit = async (data: Record<string, any>) => {
    // Simulando envio de formulário
    console.log('Form data:', data)
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Em produção, você enviaria para uma API
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg pt-20">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary via-royal-light to-royal-dark py-8">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a página inicial
          </Link>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-2">
            Formulário de Inscrição
          </h1>
          <p className="text-white/90 text-lg">
            Tryout Cheerleading 2026
          </p>
        </div>
      </section>

      {/* Info banner */}
      <section className="bg-secondary-2/10 py-6 border-b-2 border-secondary-2">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <p className="text-center text-ink-muted">
            Preencha todos os campos obrigatórios. Seus dados serão usados apenas para organização do tryout e contato da equipe.
          </p>
        </div>
      </section>

      {/* Form */}
      <section id="formulario" className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
          <TryoutForm sections={formSections} onSubmit={handleSubmit} />
        </div>
      </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}
