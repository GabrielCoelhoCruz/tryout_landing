---
name: cheer-tryout-landing-2026
description: Sistema de design e padrões de frontend para criar landing page e formulário do Tryout Cheerleading 2026. Estética esportiva intensa e competitiva, mas organizada e clara. Focado em destacar performance, dados da equipe e incentivar candidaturas para times N2/N3 (Coed, All Girl, All Boy). Baseado em modern-frontend-design.
---

# Cheer Tryout Landing 2026 Design System

Este skill fornece um sistema completo para criar a landing page e formulário do Tryout Cheerleading 2026, aplicando princípios de design moderno e evitando estéticas genéricas de IA. O design deve transmitir energia competitiva, credibilidade e empolgação, incentivando atletas a se inscreverem.

## Filosofia Central

**Cada página conta uma história de conquista.** O design não é apenas decoração - é a síntese de propósito esportivo, emoção competitiva e interação clara em uma experiência coesa que convence atletas a fazerem parte da equipe.

Antes de escrever qualquer código, estabeleça:
1. **Contexto**: Quem são os atletas? O que os motiva? Que emoção deve evocar?
2. **Conceito**: Qual é a metáfora central que guia todas as decisões de design?
3. **Compromisso**: Escolha uma direção ousada e execute com precisão em toda a interface.

## Processo de Design

### Fase 1: Descoberta e Conceito

**Contexto do Projeto:**
- **Usuários-alvo**: Atletas de cheerleading (e seus responsáveis) interessados em tryout; staff da equipe
- **Objetivo**: Converter visitantes em inscrições qualificadas, removendo dúvidas e transmitindo credibilidade + empolgação
- **Páginas**: Landing page (seções 1-11 do plano) + Formulário de inscrição (seções 1-6 do plano)

**Conceito Narrativo:**
- História: "Elevar o nível em 2026" - jornada do atleta desde inscrição até campeonatos
- Palavras-chave: Energia, Precisão, Equipe, Conquista, Segurança

**Direção Estética Escolhida:**
Híbrido entre:
- **Editorial/Magazine Esportivo**: Grids dinâmicos, números grandes, fotos em destaque, layout assimétrico
- **Soft Minimalism**: Espaçamento generoso, legibilidade perfeita, foco em dados e CTAs claros

**Evitar**: O "look AI genérico" (gradiente roxo padrão, Inter, cards genéricos, etc.)

### Fase 2: Definição do Sistema de Design

#### Paleta de Cores

Baseada na imagem de referência do perfil (ajustes finos durante implementação):

```css
:root {
  /* Cores Principais */
  --color-primary: #8B4C9F;  /* Roxo vibrante do uniforme - CTAs, títulos-chave */
  --color-primary-dark: #6B3A7F;
  --color-primary-light: #B87BCF;
  
  /* Cores Secundárias */
  --color-secondary-1: #1A1F3A;  /* Azul escuro profundo - fundos hero, rodapé */
  --color-secondary-2: #00D4FF;  /* Ciano vibrante - detalhes, bordas, overlines */
  --color-secondary-2-dark: #00A8CC;
  
  /* Neutros */
  --color-bg: #FAFAFA;  /* Fundo quase branco - áreas de leitura */
  --color-bg-alt: #FFFFFF;  /* Branco puro - cards, formulário */
  --color-ink: #0A0A0A;  /* Quase preto - texto principal */
  --color-ink-muted: #4A4A4A;  /* Cinza médio - textos auxiliares */
  --color-muted: #E5E5E5;  /* Cinza claro - bordas suaves */
  
  /* Estados */
  --color-success: #10B981;
  --color-error: #EF4444;
  --color-warning: #F59E0B;
}
```

**Uso por Seção:**
- Hero: Gradiente ou bloco usando primária + azul escuro
- Dados/Estatísticas: Fundo claro, números na primária/secundária
- Cards de Times: Fundo branco, borda sutil, hover com primária
- CTA Final: Bloco sólido com primária, botão em contraste (branco/azul escuro)

#### Tipografia

**Par de Fontes Esportivo + Legível:**

```css
:root {
  /* Display - Condensada, Esportiva */
  --font-display: 'Bebas Neue', 'Oswald', 'Impact', sans-serif;
  --font-display-weight: 400;
  
  /* Body - Limpa, Legível */
  --font-body: 'Work Sans', 'Nunito Sans', 'Inter', sans-serif;
  --font-body-weight: 400;
  --font-body-weight-bold: 600;
  
  /* Escala Tipográfica */
  --scale-base: clamp(1rem, 1.5vw, 1.125rem);
  --scale-ratio: 1.25;  /* Major third */
  
  /* Tamanhos */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: var(--scale-base);
  --text-lg: calc(var(--scale-base) * 1.25);
  --text-xl: calc(var(--scale-base) * 1.563);
  --text-2xl: calc(var(--scale-base) * 1.953);
  --text-3xl: calc(var(--scale-base) * 2.441);
  --text-4xl: calc(var(--scale-base) * 3.052);
  --text-5xl: calc(var(--scale-base) * 3.815);
}
```

**Hierarquia:**
- `h1`: Título hero (TRYOUT 2026) - Display, 4xl-5xl
- `h2`: Títulos de seções - Display, 3xl-4xl
- `h3`: Títulos de cards (N2 Coed, N3 All Girl) - Display, 2xl
- `body`: Textos curtos, diretos - Body, base-lg

#### Sistema Espacial e Grid

```css
:root {
  /* Unidade Base */
  --space-unit: 0.5rem;
  
  /* Escala de Espaçamento */
  --space-xs: calc(var(--space-unit) * 1);   /* 0.5rem */
  --space-sm: calc(var(--space-unit) * 2);   /* 1rem */
  --space-md: calc(var(--space-unit) * 4);   /* 2rem */
  --space-lg: calc(var(--space-unit) * 6);   /* 3rem */
  --space-xl: calc(var(--space-unit) * 8);   /* 4rem */
  --space-2xl: calc(var(--space-unit) * 12); /* 6rem */
  
  /* Grid */
  --grid-columns: 12;
  --container-max: 1440px;
  --container-padding: clamp(1rem, 4vw, 2rem);
  
  /* Ritmo Vertical */
  --section-spacing: var(--space-2xl);
}
```

**Layouts Específicos:**
- Hero: Grid texto (5-7 colunas) + foto (5-7 colunas)
- Cards: Grid responsivo (3-4 colunas desktop, 1-2 mobile)
- Formulário: Grid de 2 colunas (labels + inputs) em desktop, 1 coluna mobile

#### Animações e Timing

```css
:root {
  /* Curvas de Easing */
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-in-out-back: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Durações */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;
  
  /* Delays para Stagger */
  --stagger-delay: 80ms;
}
```

### Fase 3: Componentes Principais

#### SectionHero

Hero principal da landing com título, subtítulo, CTA e imagem.

```jsx
<SectionHero
  title="TRYOUT 2026"
  subtitle="Faça parte da equipe que está elevando o nível do cheerleading"
  ctaLabel="Inscreva-se agora"
  ctaLink="#formulario"
  image="/hero-tryout.jpg"
  imageAlt="Equipe em formação"
/>
```

**Características:**
- Grid assimétrico (texto + foto)
- Overlay escuro sutil na foto
- CTA principal destacado
- Animação de entrada orquestrada

#### BenefitCard

Card para seção "Por que entrar na nossa equipe?".

```jsx
<BenefitCard
  icon="🏆"
  title="Treinamento de Elite"
  description="Metodologia comprovada com técnicos certificados e acompanhamento individualizado"
/>
```

**Características:**
- Ícone + título + descrição (2-3 linhas)
- Hover: leve escala + borda colorida
- Grid responsivo (3-4 por linha desktop)

#### StatCard

Card para exibir estatísticas da equipe (campeonatos, anos, etc.).

```jsx
<StatCard
  number="15+"
  label="Campeonatos"
  description="Conquistas nacionais e internacionais"
  highlight={true}
/>
```

**Características:**
- Número grande (Display font, 4xl-5xl)
- Label curto
- Descrição opcional
- Destaque opcional com cor primária

#### TeamCard

Card para cada time (N2/N3 Coed, All Girl, All Boy).

```jsx
<TeamCard
  name="N2 Coed"
  level="Nível 2"
  category="Coed"
  description="Time misto de nível intermediário, ideal para atletas com experiência prévia"
  requirements={["Idade: 14-18 anos", "Experiência mínima: 1 ano", "Disponibilidade: 3x/semana"]}
  vacancies={5}
  image="/team-n2-coed.jpg"
/>
```

**Características:**
- Badge "Vagas limitadas" quando aplicável
- Lista de requisitos sintética
- Hover: escala + elevação + borda primária
- Link para mais detalhes

#### JourneyTimeline

Timeline visual das etapas do processo.

```jsx
<JourneyTimeline
  steps={[
    { icon: "📝", title: "Inscrição", description: "Preencha o formulário" },
    { icon: "🎯", title: "Tryout", description: "Demonstre suas habilidades" },
    { icon: "✅", title: "Resultado", description: "Acompanhe a seleção" },
    { icon: "🤝", title: "Integração", description: "Conheça a equipe" },
    { icon: "💪", title: "Treinos", description: "Prepare-se para competir" },
    { icon: "🏆", title: "Campeonatos", description: "Represente a equipe" }
  ]}
/>
```

**Características:**
- Layout horizontal (desktop) / vertical (mobile)
- Ícone + título + microdescrição
- Linha conectora entre etapas
- Animação de entrada progressiva

#### TestimonialCard

Card de depoimento de atletas/ex-atletas.

```jsx
<TestimonialCard
  name="Maria Silva"
  role="Flyer - N2 All Girl"
  tenure="2 anos na equipe"
  text="Entrar para esta equipe mudou minha vida. O nível de comprometimento e a qualidade do treinamento são incomparáveis."
  avatar="/avatar-maria.jpg"
/>
```

**Características:**
- Avatar circular
- Nome, posição, tempo de equipe
- Texto do depoimento
- Layout: grid ou carrossel

#### PhotoGrid

Galeria de fotos da equipe com títulos.

```jsx
<PhotoGrid
  photos={[
    { src: "/photo1.jpg", title: "Campeonato Nacional 2024", alt: "Equipe em competição" },
    { src: "/photo2.jpg", title: "Treino Semanal", alt: "Atletas em treinamento" },
    // ...
  ]}
  columns={3}
/>
```

**Características:**
- Grid responsivo (3-4 colunas desktop, 2 mobile)
- Título em hover ou overlay
- Proporções padronizadas (evitar layout quebrado)
- Lightbox opcional ao clicar

#### InfoBlock

Bloco de informações do tryout (data, local, etc.).

```jsx
<InfoBlock
  items={[
    { icon: "📅", title: "Data e Horário", content: "15 de Março, 2026 - 9h às 17h" },
    { icon: "📍", title: "Local", content: "Ginásio Principal - Rua X, 123" },
    { icon: "👥", title: "Faixa Etária", content: "14 a 25 anos" },
    { icon: "📋", title: "O que levar", content: "Roupa esportiva, documento de identidade" },
    { icon: "⚡", title: "Requisitos", content: "Experiência mínima de 6 meses" }
  ]}
/>
```

**Características:**
- Ícone + título + conteúdo
- Grid responsivo (2-3 colunas desktop)
- Ícones consistentes (emoji ou SVG)

#### FaqAccordion

Lista de perguntas frequentes com interação.

```jsx
<FaqAccordion
  items={[
    {
      question: "Preciso ter experiência prévia?",
      answer: "Sim, recomendamos experiência mínima de 6 meses em cheerleading ou ginástica artística."
    },
    // ...
  ]}
/>
```

**Características:**
- Abrir/fechar individual
- Acessibilidade (teclado, ARIA)
- Ícone de seta animado
- Espaçamento adequado entre itens

#### CtaSection

Seção de call-to-action final antes do formulário.

```jsx
<CtaSection
  title="Pronto para fazer parte da equipe?"
  subtitle="Inscreva-se agora e garante sua vaga no tryout 2026"
  ctaLabel="Preencher Formulário"
  ctaLink="#formulario"
  variant="primary" // primary | secondary
/>
```

**Características:**
- Bloco sólido com cor primária
- Texto forte + subtítulo
- Botão grande e contrastante
- Animação de entrada discreta

#### TryoutForm

Formulário completo de inscrição.

```jsx
<TryoutForm
  sections={[
    {
      id: "dados-pessoais",
      title: "Dados Pessoais",
      fields: [
        { name: "nome", label: "Nome Completo", type: "text", required: true },
        { name: "email", label: "E-mail", type: "email", required: true },
        // ...
      ]
    },
    {
      id: "experiencia",
      title: "Experiência e Perfil Esportivo",
      fields: [
        { name: "tempo-experiencia", label: "Tempo de experiência", type: "select", options: [...] },
        // ...
      ]
    },
    {
      id: "disponibilidade",
      title: "Disponibilidade e Logística",
      fields: [
        { name: "dias-treino", label: "Dias disponíveis", type: "checkbox-group", options: [...] },
        // ...
      ]
    },
    {
      id: "saude",
      title: "Saúde e Autorização",
      fields: [
        { name: "condicoes-medicas", label: "Condições médicas", type: "textarea" },
        { name: "autorizacao-responsavel", label: "Autorização do responsável", type: "checkbox", required: true },
        // ...
      ]
    }
  ]}
  onSubmit={handleSubmit}
/>
```

**Características:**
- Organização em seções/blocos
- Validação em tempo real
- Estados: loading, success, error
- Campos obrigatórios claramente marcados
- Progress indicator opcional

#### FormSuccess

Tela de confirmação após envio do formulário.

```jsx
<FormSuccess
  title="Inscrição realizada com sucesso!"
  message="Recebemos sua inscrição. Em breve entraremos em contato com mais informações sobre o tryout."
  contactInfo={{
    email: "tryout@equipe.com",
    phone: "(11) 99999-9999"
  }}
/>
```

**Características:**
- Mensagem clara e positiva
- Informações de contato
- Próximos passos explicados
- Ícone de sucesso visual

### Fase 4: Padrões de Interação

#### Animações de Entrada

Entrada orquestrada para hero e primeiras seções:

```css
@keyframes revealUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.hero > * {
  animation: revealUp 800ms var(--ease-out-expo) both;
}

.hero > *:nth-child(1) { animation-delay: 0ms; }
.hero > *:nth-child(2) { animation-delay: 80ms; }
.hero > *:nth-child(3) { animation-delay: 160ms; }
.hero > *:nth-child(4) { animation-delay: 240ms; }
```

#### Efeitos de Scroll

Animações discretas quando elementos entram no viewport:

```javascript
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, observerOptions);

document.querySelectorAll('[data-animate-on-scroll]').forEach(el => {
  observer.observe(el);
});
```

```css
[data-animate-on-scroll] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms var(--ease-out-expo), transform 600ms var(--ease-out-expo);
}

[data-animate-on-scroll].is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

#### Estados de Hover

Cards e elementos interativos:

```css
.card {
  transition: transform var(--duration-base) var(--ease-out-expo),
              box-shadow var(--duration-base) var(--ease-out-expo),
              border-color var(--duration-base) var(--ease-out-expo);
  border: 2px solid transparent;
}

.card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px rgba(139, 76, 159, 0.15);
  border-color: var(--color-primary);
}

.card:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
```

#### Estados de Formulário

Inputs com feedback visual:

```css
.form-input {
  border: 2px solid var(--color-muted);
  transition: border-color var(--duration-base), box-shadow var(--duration-base);
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(139, 76, 159, 0.1);
  outline: none;
}

.form-input:invalid:not(:placeholder-shown) {
  border-color: var(--color-error);
}

.form-input:valid:not(:placeholder-shown) {
  border-color: var(--color-success);
}

.form-error {
  color: var(--color-error);
  font-size: var(--text-sm);
  margin-top: var(--space-xs);
}
```

## Anti-Padrões Críticos

### Checklist "Evitar Look AI Genérico"

NUNCA faça todos estes juntos:
- ❌ Gradiente roxo/azul padrão de SaaS
- ❌ Fontes Inter/Roboto sem intenção
- ❌ Hero centralizado genérico + 3 colunas de features
- ❌ Cards com border-radius 16px em tudo
- ❌ Drop shadows em todos os cards
- ❌ #6366F1 como cor primária padrão
- ❌ Descrições genéricas sem dados concretos

### Armadilhas Comuns

1. **Sobre-animação**: Nem tudo precisa se mover. Escolha momentos estratégicos.
2. **Escolhas tímidas**: Comprometa-se totalmente com a direção estética.
3. **Complexidade desalinhada**: Designs minimalistas precisam de detalhes perfeitos.
4. **Ignorar contexto**: Uma página de tryout não deve parecer um site de música.
5. **Perseguir tendências**: Glass morphism em tudo é o novo gradiente roxo.

## Diretrizes Específicas do Projeto

### Dados e Credibilidade

- **Sempre use números reais**: "15+ campeonatos" não "muitos campeonatos"
- **Fotos reais da equipe**: Evite stock photos genéricas
- **Depoimentos específicos**: Nome, posição, tempo na equipe
- **Estatísticas visuais**: Gráficos simples, números grandes, badges de conquistas

### Hierarquia de Informação

1. **Hero**: Título impactante + CTA principal
2. **Benefícios/Dados**: Por que escolher esta equipe
3. **Times Disponíveis**: N2/N3 Coed, All Girl, All Boy claramente separados
4. **Processo**: Timeline do tryout
5. **Depoimentos**: Social proof
6. **Galeria**: Fotos da equipe em ação
7. **FAQ**: Remover dúvidas
8. **CTA Final**: Conduzir ao formulário
9. **Formulário**: Organizado, claro, sem fricção

### Responsividade

**Breakpoints:**
```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

**Estratégia Mobile-First:**
- Grid de 1 coluna em mobile
- Cards empilhados verticalmente
- Menu hambúrguer para navegação
- Formulário em 1 coluna
- Fotos em grid 2x2 ou carrossel

## Checklist de Qualidade

### Impacto Visual
- [ ] A landing parece uma página oficial de equipe competitiva?
- [ ] Os times N2/N3 e modalidades (Coed/All Girl/All Boy) estão claramente destacados?
- [ ] Os números e fotos transmitem credibilidade e vontade de participar?
- [ ] Evita todos os padrões genéricos de IA?

### Experiência do Usuário
- [ ] Fluxo claro: Hero → Benefícios → Times → FAQ → CTA → Formulário?
- [ ] Formulário organizado em blocos, sem sensação de "questionário infinito"?
- [ ] CTAs claros e em momentos estratégicos?
- [ ] Informações importantes (data, local, requisitos) facilmente encontradas?

### Excelência Técnica
- [ ] Totalmente responsivo (mobile-first)?
- [ ] Navegável por teclado (tab order, focus states)?
- [ ] Contraste de cores adequado (WCAG AA mínimo)?
- [ ] Performance otimizada (lazy loading de imagens, code splitting)?
- [ ] Estados de erro/sucesso bem desenhados?
- [ ] Validação de formulário clara e útil?

### Atenção aos Detalhes
- [ ] Estados de foco customizados definidos?
- [ ] Loading states para formulário?
- [ ] Micro-interações que melhoram usabilidade?
- [ ] Hierarquia tipográfica consistente?
- [ ] Espaçamento consistente entre seções?
- [ ] Fotos com alt text descritivo?

## Como Usar Este Skill

### Antes de Codar

1. **Confirmar paleta final**: Ajustar cores baseadas na imagem de referência real
2. **Escolher fontes exatas**: Display + Body (Google Fonts ou similar)
3. **Listar textos finais**: Revisar todos os textos por seção conforme plano
4. **Coletar assets**: Fotos reais da equipe, logos, ícones

### Durante Implementação

1. **Criar tokens primeiro**: Cores, tipografia, espaçamentos em CSS variables
2. **Implementar componentes base**: SectionHero, TeamCard, StatCard, CtaSection, TryoutForm
3. **Montar páginas**: Mapear seções do plano para componentes
4. **Adicionar interações**: Animações, hovers, estados de formulário
5. **Testar responsividade**: Verificar em múltiplos dispositivos

### Depois

1. **Refinar micro-interações**: Ajustar timing, easing, detalhes visuais
2. **Rodar checklist de qualidade**: Validar todos os pontos
3. **Testar acessibilidade**: Screen reader, navegação por teclado
4. **Otimizar performance**: Lazy loading, compressão de imagens, minificação

## Recursos e Referências

### Fontes Recomendadas

**Display (Esportiva):**
- Bebas Neue (Google Fonts)
- Oswald (Google Fonts)
- Impact (sistema)

**Body (Legível):**
- Work Sans (Google Fonts)
- Nunito Sans (Google Fonts)
- Inter (Google Fonts) - apenas se necessário

### Ícones

- Heroicons (SVG)
- Lucide (SVG)
- Emoji (para elementos informais)

### Imagens

- Fotos reais da equipe (prioridade)
- Formatos: WebP com fallback JPG
- Lazy loading obrigatório
- Alt text descritivo

## Lembrete Final

Você não está gerando "uma landing page" - está criando uma experiência que convence atletas a fazerem parte de uma equipe competitiva. Cada escolha deve servir ao conceito. Cada detalhe deve reforçar a história de conquista e empolgação.

Faça memorável. Faça distintivo. Faça parecer projetado com intenção, não gerado.

