# Landing Page Tryout Cheerleading 2026 - SkyHigh AllStar

Landing page completa e sistema de inscrição para o Tryout de Cheerleading 2026 da SkyHigh AllStar, desenvolvida com Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion e Supabase.

## 🚀 Tecnologias

### Core
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 3.4** - Estilização utilitária
- **shadcn/ui** - Componentes de UI acessíveis

### Animações & UI
- **Framer Motion 11** - Animações e transições avançadas
- **Lucide React** - Ícones consistentes
- **Sonner** - Toast notifications elegantes
- **tailwindcss-animate** - Utilitários de animação

### Backend & Dados
- **Supabase** - Banco de dados PostgreSQL, autenticação e storage
- **Next Safe Action** - Server Actions type-safe
- **Zod** - Validação de schemas
- **React Hook Form** - Gerenciamento de formulários

### Testes
- **Vitest** - Framework de testes
- **Testing Library** - Testes de componentes React
- **Happy DOM / JSDOM** - DOM para testes

## 📋 Estrutura do Projeto

```
tryout_landing/
├── src/
│   ├── actions/                    # Server Actions
│   │   ├── admin-actions.ts        # Ações administrativas
│   │   └── submit-registration.ts  # Submissão de inscrições
│   │
│   ├── app/
│   │   ├── layout.tsx              # Layout principal (fontes, metadata, Toaster)
│   │   ├── page.tsx                # Landing page
│   │   ├── globals.css             # Estilos globais e CSS variables
│   │   ├── formulario/
│   │   │   └── page.tsx            # Formulário de inscrição
│   │   └── admin/
│   │       └── [token]/
│   │           ├── layout.tsx      # Layout admin
│   │           ├── page.tsx        # Dashboard admin
│   │           └── checkin/
│   │               └── page.tsx    # Check-in no dia do tryout
│   │
│   ├── components/
│   │   ├── ui/                     # Componentes UI base (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── AnimatedBackground.tsx  # Background com partículas
│   │   │   ├── AnimatedCounter.tsx     # Contador animado
│   │   │   ├── GlowingButton.tsx       # Botão com efeito glow
│   │   │   ├── MagneticButton.tsx      # Botão com efeito magnético
│   │   │   ├── ScrollProgress.tsx      # Indicador de scroll
│   │   │   └── index.ts
│   │   │
│   │   ├── animations/             # Componentes de animação
│   │   │   ├── AnimatedText.tsx    # Textos animados (letter-reveal, etc)
│   │   │   ├── FlipCard.tsx        # Card com flip 3D
│   │   │   ├── TiltCard.tsx        # Card com efeito tilt
│   │   │   ├── StormParticles.tsx  # Partículas temáticas
│   │   │   ├── StormShowcase.tsx   # Showcase de tempestades
│   │   │   └── index.ts
│   │   │
│   │   ├── admin/                  # Componentes do painel admin
│   │   │   ├── CheckinCard.tsx     # Card de check-in
│   │   │   ├── RegistrationDetail.tsx  # Modal de detalhes
│   │   │   ├── RegistrationTable.tsx   # Tabela de inscrições
│   │   │   ├── StatsCard.tsx       # Card de estatísticas
│   │   │   └── index.ts
│   │   │
│   │   └── [outros componentes da landing]
│   │       ├── SectionHero.tsx / SectionHeroV2.tsx
│   │       ├── BenefitCard.tsx
│   │       ├── StatCard.tsx
│   │       ├── TeamCard.tsx
│   │       ├── JourneyTimeline.tsx / JourneyTimelineV2.tsx
│   │       ├── TestimonialCard.tsx
│   │       ├── PhotoGrid.tsx
│   │       ├── InfoBlock.tsx
│   │       ├── FaqAccordion.tsx
│   │       ├── CtaSection.tsx
│   │       ├── TryoutForm.tsx
│   │       └── Footer.tsx
│   │
│   ├── constants/                  # Dados estáticos
│   │   ├── landing-data.ts         # Conteúdo da landing (stats, teams, FAQs)
│   │   ├── form-sections.tsx       # Seções do formulário
│   │   ├── animation-config.ts     # Configurações de animação
│   │   └── particles.ts            # Configuração de partículas
│   │
│   ├── context/
│   │   └── StormWeatherContext.tsx # Context para efeitos de tempestade
│   │
│   ├── hooks/                      # Custom hooks
│   │   ├── useIntersectionTracker.ts  # Tracking de seções visíveis
│   │   ├── useMediaQuery.ts        # Media queries
│   │   ├── useMousePosition.ts     # Posição do mouse
│   │   ├── useReducedMotion.ts     # Preferência de movimento
│   │   ├── useScrollVelocity.ts    # Velocidade do scroll
│   │   ├── useStormWeather.ts      # Hook do context de tempestade
│   │   └── index.ts
│   │
│   ├── lib/
│   │   ├── animations/             # Utilitários de animação
│   │   │   ├── storm-configs.ts    # Configs de tempestade por time
│   │   │   ├── transitions.ts      # Transições Framer Motion
│   │   │   ├── variants.ts         # Variants de animação
│   │   │   ├── utils.ts            # Utilitários de animação
│   │   │   └── utils.test.ts       # Testes
│   │   │
│   │   ├── schemas/
│   │   │   └── registration-schema.ts  # Schema Zod do formulário
│   │   │
│   │   ├── supabase.ts             # Cliente Supabase
│   │   ├── safe-action.ts          # Config Next Safe Action
│   │   ├── form-validation.ts      # Validações de formulário
│   │   ├── form-validation.test.ts # Testes de validação
│   │   ├── error-logger.ts         # Logger de erros
│   │   └── utils.ts                # Utilitários gerais (cn, etc)
│   │
│   ├── styles/                     # Estilos adicionais
│   │
│   └── types/
│       ├── database.ts             # Tipos do Supabase (auto-gerado)
│       └── form.ts                 # Tipos do formulário
│
├── public/
│   ├── logo/
│   │   └── SkyHigh_Logo novo.png   # Logo principal
│   ├── images/
│   │   └── background-cosmic.jpg   # Background da hero
│   └── photos/
│       └── competition1.jpg        # Fotos da equipe
│
├── tailwind.config.ts              # Configuração Tailwind
├── vitest.config.ts                # Configuração Vitest
├── components.json                 # Configuração shadcn/ui
└── package.json
```

## 🎨 Sistema de Design

### Paleta de Cores (baseada no logo SkyHigh AllStar)

| Nome | Hex | Uso |
|------|-----|-----|
| Primary (Laranja) | `#FF7F00` | CTAs, destaques, botões principais |
| Primary Light | `#FF9933` | Gradientes, hover states |
| Secondary (Ciano) | `#00BFFF` | Detalhes, bordas, acentos |
| Royal Blue | `#1E3A8A` | Fundos secundários |
| Coral | `#FF8C69` | Detalhes de uniformes |
| Dark (Navy) | `#000c1f` | Fundos escuros |
| Background | `#FAFAFA` | Fundos claros |

### Tipografia

| Tipo | Fonte | Uso |
|------|-------|-----|
| Display | Bebas Neue | Títulos, headlines, números |
| Body | Work Sans | Textos, parágrafos, UI |

### Animações

Todas as animações usam Framer Motion com:
- **Easing**: `cubic-bezier(0.19, 1, 0.22, 1)` (ease-out-expo)
- **Durações**: 150ms (fast), 300ms (base), 500ms (slow), 800ms (slower)
- **Stagger delays**: 80ms entre elementos sequenciais

### Efeitos Especiais

- **Storm Effects**: Cada time tem um tema de tempestade único (hail, snow, rain, thunder)
- **Animated Background**: Partículas flutuantes com gradientes
- **Scroll Progress**: Indicador de progresso lateral/superior
- **Parallax**: Efeitos de parallax no hero

## 🛠️ Como Usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
ADMIN_TOKEN=token_para_acesso_admin
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### 4. Executar testes

```bash
npm test            # Executar testes
npm run test:ui     # Testes com interface
npm run test:coverage  # Cobertura de testes
```

### 5. Build para produção

```bash
npm run build
npm start
```

## 📄 Páginas

### Landing Page (`/`)

Página de marketing com 8 seções principais:

1. **Hero** - Chamada principal com animação de texto, stats e CTAs
2. **Benefícios** - Por que escolher a SkyHigh (3 cards)
3. **Times** - Seletor de times com tabs e cards detalhados
   - HAILSTORM COED 2 NT
   - SNOWSTORM ALL GIRL 2 NT
   - RAINSTORM COED 3 NT
   - THUNDERSTORM COED 3
   - LIGHTNINGSTORM COED 4
4. **Jornada** - Timeline do processo (6 passos)
5. **Depoimentos** - Histórias de atletas (3 cards)
6. **Informações do Tryout** - Data, local, investimento
7. **FAQ** - Perguntas frequentes (6 items)
8. **CTA Final** - Chamada para inscrição
9. **Footer** - Contatos e localização

### Formulário (`/formulario`)

Formulário completo de inscrição com 4 seções:

1. **Dados Pessoais**
   - Nome completo, data de nascimento, idade, gênero
   - Telefone, e-mail
   - Dados do responsável (obrigatório para menores de 18)

2. **Experiência**
   - Pratica cheerleading? Tempo de experiência
   - Equipe anterior, experiência em ginástica
   - Posição de interesse (base, flyer, back)
   - Nível de interesse (N2, N3, N4)
   - Nível de habilidades

3. **Disponibilidade**
   - Dias disponíveis para treino
   - Período de preferência
   - Participa de campeonatos?
   - Outros esportes

4. **Saúde e Termos**
   - Condições médicas, medicações
   - Autorização do responsável
   - Aceite dos termos

**Funcionalidades do Formulário:**
- Validação em tempo real com Zod
- Detecção automática de menores de idade
- Progress indicator lateral (desktop) e inferior (mobile)
- Animações de seção e campos
- Toast notifications de sucesso/erro
- Confetti na submissão bem-sucedida

### Admin Dashboard (`/admin/[token]`)

Painel administrativo protegido por token:

- **Estatísticas gerais**: Total de inscritos, pagos, pendentes, presentes
- **Estatísticas por nível**: N2, N3, N4
- **Estatísticas por posição**: Flyer, Base, Back
- **Estatísticas por idade**: Menores, Adultos
- **Tabela de inscrições** com busca e filtros
- **Modal de detalhes** da inscrição
- **Gerenciamento de pagamento**: Marcar como pago, upload de comprovante

### Check-in (`/admin/[token]/checkin`)

Página otimizada para o dia do tryout:

- **Busca rápida** por nome ou e-mail
- **Filtros de status**: Todos, Aguardando, Presentes, Ausentes
- **Cards de check-in** com botões de ação rápida
- **Barra de progresso** do check-in
- **Estatísticas em tempo real**: Presentes, ausentes, pagos, níveis, posições
- **Toggle de pagamento** direto no card

## 🎯 Características

- ✅ **Responsivo** - Mobile-first design com breakpoints otimizados
- ✅ **Acessível** - Navegação por teclado, ARIA labels, focus states
- ✅ **Animado** - Transições suaves e efeitos visuais com Framer Motion
- ✅ **Validação** - Validação de formulário em tempo real com Zod
- ✅ **Type-safe** - TypeScript em todo o projeto, incluindo server actions
- ✅ **Testado** - Testes unitários com Vitest
- ✅ **Performance** - Otimizado para web vitals
- ✅ **SEO** - Metadata configurado, Open Graph, Twitter Cards
- ✅ **PWA-ready** - Estrutura preparada para PWA

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Build para produção |
| `npm start` | Inicia o servidor de produção |
| `npm run lint` | Executa ESLint |
| `npm test` | Executa testes com Vitest |
| `npm run test:ui` | Testes com interface visual |
| `npm run test:coverage` | Relatório de cobertura |
| `npm run clean` | Limpa cache do Next.js |
| `npm run dev:clean` | Limpa cache e inicia dev |

## 📱 Responsividade

Breakpoints do Tailwind CSS:

| Breakpoint | Pixels | Dispositivo |
|------------|--------|-------------|
| `xs` | 475px | Mobile grande |
| `sm` | 640px | Tablet portrait |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop pequeno |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Desktop grande |

## 🗄️ Banco de Dados (Supabase)

### Tabelas

- **registrations** - Inscrições principais
- **guardians** - Dados de responsáveis (relacionado com registrations)

### Views

- **registrations_full** - View com todos os dados incluindo responsável
- **registration_stats** - Estatísticas agregadas

### Funções

- `submit_registration` - Criar nova inscrição
- `update_registration_status` - Atualizar status da inscrição
- `update_attendance_status` - Marcar presença/ausência
- `update_payment_status` - Atualizar status de pagamento
- `calculate_age` - Calcular idade a partir da data de nascimento
- `is_minor_by_date` - Verificar se é menor de idade
- `check_duplicate_email` - Verificar e-mail duplicado

### Enums

- `registration_status_type`: pending, under_review, accepted, rejected, waitlisted
- `attendance_status_type`: not_checked, present, absent
- `payment_status_type`: comprovante_pendente, pago
- `cheer_level_type`: n2, n3, n4
- `cheer_position_type`: base, flyer, back
- `gender_type`: feminino, masculino, outro
- E mais...

## 📝 Licença

Este projeto é privado e proprietário da SkyHigh AllStar.

## 🤝 Contato

- **WhatsApp**: [(11) 91331-1920](https://wa.me/5511913311920)
- **Instagram**: [@skyhigh.allstar](https://instagram.com/skyhigh.allstar)
- **Localização**: Centro Esportivo Tietê, Av. Santos Dumont, 843 - Luz, São Paulo - SP
- **Metrô**: Armênia (Linha 1 - Azul)
