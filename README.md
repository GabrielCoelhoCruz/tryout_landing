# Landing Page Tryout Cheerleading 2026

Landing page e formulário de inscrição para o Tryout de Cheerleading 2026, desenvolvida com Next.js, React, TypeScript, Tailwind CSS, shadcn/ui e Framer Motion.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes de UI
- **Framer Motion** - Animações e transições
- **Lucide React** - Ícones

## 📋 Estrutura do Projeto

```
tryout_landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx             # Página inicial (landing)
│   │   ├── formulario/
│   │   │   └── page.tsx         # Página do formulário
│   │   └── globals.css          # Estilos globais
│   ├── components/
│   │   ├── ui/                  # Componentes UI base
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── checkbox.tsx
│   │   ├── SectionHero.tsx      # Hero principal
│   │   ├── BenefitCard.tsx      # Card de benefícios
│   │   ├── StatCard.tsx         # Card de estatísticas
│   │   ├── TeamCard.tsx         # Card de times
│   │   ├── JourneyTimeline.tsx  # Timeline da jornada
│   │   ├── TestimonialCard.tsx  # Card de depoimentos
│   │   ├── PhotoGrid.tsx        # Galeria de fotos
│   │   ├── InfoBlock.tsx        # Bloco de informações
│   │   ├── FaqAccordion.tsx     # Acordeão de FAQs
│   │   ├── CtaSection.tsx       # Seção de CTA
│   │   ├── TryoutForm.tsx       # Formulário completo
│   │   └── Footer.tsx           # Rodapé
│   └── lib/
│       └── utils.ts             # Utilitários
├── public/
│   └── photos/                  # Pasta para fotos da equipe
├── .claude/
│   └── skills/                  # Skills do Claude Code
└── package.json

```

## 🎨 Sistema de Design

O projeto segue um sistema de design personalizado com:

### Cores
- **Primária:** Roxo vibrante (#8B4C9F) - CTAs e destaques
- **Secundária 1:** Azul escuro (#1A1F3A) - Fundos hero
- **Secundária 2:** Ciano vibrante (#00D4FF) - Detalhes e bordas
- **Neutros:** Escalas de cinza para texto e fundos

### Tipografia
- **Display:** Bebas Neue (títulos e headlines)
- **Body:** Work Sans (textos e parágrafos)

### Animações
Todas as animações usam Framer Motion com:
- Easing personalizado (ease-out-expo)
- Durações variadas (150ms a 800ms)
- Stagger delays para efeitos sequenciais

## 🛠️ Como Usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Adicionar fotos

Adicione as fotos da equipe em `public/photos/`. Veja `public/photos/README.md` para detalhes sobre os arquivos necessários.

### 3. Executar em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### 4. Build para produção

```bash
npm run build
npm start
```

## 📄 Páginas

### Landing Page (`/`)

Contém 11 seções principais:

1. **Hero** - Chamada principal com CTA
2. **Benefícios** - Por que entrar na equipe
3. **Estatísticas** - Números e conquistas
4. **Times** - N2/N3 Coed, All Girl, All Boy
5. **Jornada** - Timeline do processo
6. **Depoimentos** - Histórias de atletas
7. **Galeria** - Fotos da equipe
8. **Informações** - Detalhes do tryout
9. **FAQ** - Perguntas frequentes
10. **CTA Final** - Chamada para o formulário
11. **Rodapé** - Contatos e localização

### Formulário (`/formulario`)

Formulário completo de inscrição com 4 seções:

1. **Dados Pessoais** - Nome, idade, contato
2. **Experiência** - Histórico esportivo
3. **Disponibilidade** - Horários e logística
4. **Saúde** - Condições médicas e autorizações

## 🎯 Características

- ✅ **Responsivo** - Mobile-first design
- ✅ **Acessível** - Navegação por teclado e ARIA labels
- ✅ **Animado** - Transições suaves com Framer Motion
- ✅ **Validação** - Validação de formulário em tempo real
- ✅ **Performance** - Otimizado para web vitals
- ✅ **SEO** - Metadata configurado

## 🔧 Personalização

### Cores

Edite as cores em `tailwind.config.ts` e `src/app/globals.css`:

```css
:root {
  --color-primary: #8B4C9F;
  --color-secondary-1: #1A1F3A;
  --color-secondary-2: #00D4FF;
  /* ... */
}
```

### Conteúdo

Todo o conteúdo está em `src/app/page.tsx` e `src/app/formulario/page.tsx`. Edite os arrays de dados para alterar textos, imagens e informações.

### Componentes

Todos os componentes estão em `src/components/` e podem ser customizados individualmente.

## 📱 Responsividade

O projeto usa breakpoints do Tailwind CSS:

- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px

## 🎭 Skill do Claude Code

Este projeto foi desenvolvido usando a skill `cheer-tryout-landing-2026` que define padrões de design e componentes específicos para landing pages de cheerleading.

## 📝 Licença

Este projeto é privado e proprietário.

## 🤝 Contato

Para dúvidas ou suporte, entre em contato com a equipe de desenvolvimento.
