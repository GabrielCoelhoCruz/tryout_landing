# 📁 Estrutura Completa do Projeto

```
tryout_landing/
│
├── 📄 package.json                    # Dependências e scripts
├── 📄 tsconfig.json                   # Configuração TypeScript
├── 📄 next.config.ts                  # Configuração Next.js
├── 📄 tailwind.config.ts              # Configuração Tailwind CSS
├── 📄 postcss.config.mjs              # Configuração PostCSS
├── 📄 components.json                 # Configuração shadcn/ui
├── 📄 .eslintrc.json                  # Configuração ESLint
├── 📄 .gitignore                      # Arquivos ignorados pelo Git
│
├── 📄 README.md                       # Documentação principal
├── 📄 PROXIMOS_PASSOS.md              # Próximos passos e customização
├── 📄 ESTRUTURA_PROJETO.md            # Este arquivo
│
├── 📂 .claude/
│   ├── 📂 skills/
│   │   └── 📄 SKILL.cheer-tryout-landing-2026.md  # Skill do Claude Code
│   └── 📄 settings.local.json         # Configurações locais do Claude
│
├── 📂 src/
│   │
│   ├── 📂 app/                        # App Router do Next.js
│   │   ├── 📄 layout.tsx              # Layout raiz da aplicação
│   │   ├── 📄 page.tsx                # Página inicial (landing)
│   │   ├── 📄 globals.css             # Estilos globais e design tokens
│   │   │
│   │   └── 📂 formulario/             # Rota /formulario
│   │       └── 📄 page.tsx            # Página do formulário de inscrição
│   │
│   ├── 📂 components/                 # Componentes React
│   │   │
│   │   ├── 📂 ui/                     # Componentes UI base (shadcn)
│   │   │   ├── 📄 button.tsx          # Botões estilizados
│   │   │   ├── 📄 input.tsx           # Campos de input
│   │   │   ├── 📄 label.tsx           # Labels de formulário
│   │   │   ├── 📄 textarea.tsx        # Textarea
│   │   │   └── 📄 checkbox.tsx        # Checkboxes
│   │   │
│   │   ├── 📄 SectionHero.tsx         # Hero principal com CTA
│   │   ├── 📄 BenefitCard.tsx         # Card de benefícios da equipe
│   │   ├── 📄 StatCard.tsx            # Card de estatísticas
│   │   ├── 📄 TeamCard.tsx            # Card de times (N2/N3)
│   │   ├── 📄 JourneyTimeline.tsx     # Timeline da jornada do atleta
│   │   ├── 📄 TestimonialCard.tsx     # Card de depoimentos
│   │   ├── 📄 PhotoGrid.tsx           # Galeria de fotos
│   │   ├── 📄 InfoBlock.tsx           # Bloco de informações do tryout
│   │   ├── 📄 FaqAccordion.tsx        # Acordeão de FAQs
│   │   ├── 📄 CtaSection.tsx          # Seção de call-to-action
│   │   ├── 📄 TryoutForm.tsx          # Formulário completo de inscrição
│   │   └── 📄 Footer.tsx              # Rodapé com contatos
│   │
│   └── 📂 lib/
│       └── 📄 utils.ts                # Utilitários (cn function)
│
├── 📂 public/                         # Arquivos estáticos
│   └── 📂 photos/                     # Fotos da equipe
│       └── 📄 README.md               # Instruções sobre fotos
│
└── 📂 node_modules/                   # Dependências (não versionar)

```

## 📋 Detalhamento dos Componentes

### Componentes de UI Base (`src/components/ui/`)

Componentes reutilizáveis seguindo o padrão shadcn/ui:

- **Button** - Variantes: default, secondary, outline, ghost, link
- **Input** - Campo de texto com validação visual
- **Label** - Labels acessíveis para formulários
- **Textarea** - Campo de texto multilinha
- **Checkbox** - Checkbox customizado com ícone

### Componentes Customizados (`src/components/`)

#### 1. **SectionHero**
Hero principal da landing com:
- Título grande (display font)
- Subtítulo descritivo
- Botão CTA principal
- Suporte para imagem de fundo
- Animações de entrada orquestradas

#### 2. **BenefitCard**
Card para exibir benefícios da equipe:
- Ícone emoji grande
- Título destacado
- Descrição curta
- Hover com escala e borda

#### 3. **StatCard**
Card para estatísticas da equipe:
- Número grande (4xl-5xl)
- Label descritiva
- Opção de highlight
- Animação de entrada

#### 4. **TeamCard**
Card para cada time (N2/N3, Coed, All Girl, All Boy):
- Imagem do time
- Badge de vagas limitadas
- Lista de requisitos
- Botão de inscrição
- Hover com escala e elevação

#### 5. **JourneyTimeline**
Timeline horizontal/vertical da jornada:
- 6 etapas do processo
- Linha conectora animada
- Ícones e descrições
- Responsivo (horizontal no desktop, vertical no mobile)

#### 6. **TestimonialCard**
Card de depoimento de atletas:
- Avatar circular (foto ou inicial)
- Nome, posição, tempo de equipe
- Texto do depoimento
- Fundo com gradiente suave

#### 7. **PhotoGrid**
Galeria de fotos responsiva:
- Grid 2-3 colunas
- Hover com título overlay
- Transição suave de escala
- Proporções padronizadas

#### 8. **InfoBlock**
Bloco de informações do tryout:
- Grid responsivo
- Ícone + título + conteúdo
- Hover com mudança de borda
- Informações práticas (data, local, requisitos)

#### 9. **FaqAccordion**
Acordeão de perguntas frequentes:
- Abrir/fechar individual
- Animação de altura com Framer Motion
- Ícone de seta rotativa
- Acessível (ARIA)

#### 10. **CtaSection**
Seção de call-to-action:
- Fundo em gradiente
- Texto forte + subtítulo
- Botão grande contrastante
- Variantes: primary/secondary

#### 11. **TryoutForm**
Formulário completo de inscrição:
- 4 seções organizadas
- Validação em tempo real
- Estados: loading, success, error
- Campos obrigatórios marcados
- Tela de confirmação após envio

#### 12. **Footer**
Rodapé com informações:
- Branding da equipe
- Contatos (email, telefone, Instagram)
- Localização do ginásio
- Copyright

## 🎨 Sistema de Design

### Tokens CSS (globals.css)

```css
/* Cores */
--color-primary: #8B4C9F           /* Roxo vibrante */
--color-primary-dark: #6B3A7F      /* Roxo escuro */
--color-primary-light: #B87BCF     /* Roxo claro */
--color-secondary-1: #1A1F3A       /* Azul escuro */
--color-secondary-2: #00D4FF       /* Ciano vibrante */

/* Tipografia */
--font-display: 'Bebas Neue'       /* Títulos */
--font-body: 'Work Sans'           /* Textos */

/* Espaçamento */
--space-xs: 0.5rem
--space-sm: 1rem
--space-md: 2rem
--space-lg: 3rem
--space-xl: 4rem
--space-2xl: 6rem

/* Animação */
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1)
--duration-fast: 150ms
--duration-base: 300ms
--duration-slow: 500ms
```

## 📱 Páginas

### Página Principal (`/`)

11 seções principais:

1. Hero - Chamada principal
2. Benefícios - 4 cards
3. Estatísticas - 4 números
4. Times - 4-6 cards de times
5. Jornada - 6 etapas
6. Depoimentos - 3 cards
7. Galeria - 6 fotos
8. Informações - 6 blocos
9. FAQ - 7 perguntas
10. CTA Final
11. Rodapé

### Página Formulário (`/formulario`)

4 seções do formulário:

1. Dados Pessoais (8 campos)
2. Experiência Esportiva (7 campos)
3. Disponibilidade (4 campos)
4. Saúde e Autorização (4 campos)

## 🔧 Tecnologias

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **shadcn/ui** - Component library

## 📦 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento (localhost:3000)
npm run build    # Build para produção
npm start        # Servidor de produção
npm run lint     # Executar ESLint
```

## 🎯 Próximos Passos

1. Adicionar fotos reais em `public/photos/`
2. Personalizar conteúdo em `src/app/page.tsx`
3. Atualizar contatos em `src/components/Footer.tsx`
4. Configurar backend do formulário
5. Fazer deploy (Vercel/Netlify)

---

**Estrutura criada com a skill `cheer-tryout-landing-2026` do Claude Code**
