# Imagens e Backgrounds

Esta pasta contém imagens de fundo, texturas e elementos visuais para a landing page.

## Imagens disponíveis:

### 1. Background Cósmico/Nebulosa
- **arquivo:** `background-cosmic.jpg` ou `background-cosmic.png`
- **Descrição:** Fundo com tons de azul escuro, azul elétrico e preto, com efeito de nebulosa cósmica e partículas brilhantes
- **Cores principais:** Azuis profundos (#0A1B4D, #00BFFF) e preto (#0A0A2A)
- **Uso:** Background do hero, seções escuras, overlays
- **Formato:** JPG (para fotos) ou PNG (para gráficos)
- **Tamanho recomendado:** 1920x1080px (Full HD) ou maior para retina displays

### 2. Textura/Gradiente Azul
- **arquivo:** `texture-blue.jpg` ou `texture-blue.png`
- **Descrição:** Textura ou gradiente baseado nas cores da equipe
- **Uso:** Backgrounds sutis, overlays, seções

### 3. Padrão de Raios Elétricos
- **arquivo:** `lightning-pattern.svg` ou `lightning-pattern.png`
- **Descrição:** Padrão decorativo de raios elétricos azuis (#00BFFF)
- **Uso:** Elementos decorativos, separadores, backgrounds sutis
- **Formato:** SVG (preferível) ou PNG

## Especificações técnicas:

### Backgrounds:
- **Resolução:** Mínimo 1920x1080px (Full HD)
- **Formato:** JPG (para fotos) ou PNG (para gráficos com transparência)
- **Tamanho de arquivo:** Máximo 500KB (otimizar para web)
- **Otimização:** Use ferramentas como TinyPNG ou ImageOptim antes de adicionar

### Padrões/Texturas:
- **Formato:** SVG (preferível para padrões repetitivos)
- **Tamanho:** Variável, dependendo do uso

## Como usar no código:

```tsx
// Background em uma seção
<section 
  className="bg-cover bg-center"
  style={{ backgroundImage: 'url(/images/background-cosmic.jpg)' }}
>
  {/* Conteúdo */}
</section>

// Com Next.js Image component (recomendado)
import Image from 'next/image'

<Image
  src="/images/background-cosmic.jpg"
  alt="Background cósmico"
  fill
  className="object-cover"
/>
```

## Referências nos componentes:

As imagens são referenciadas em:
- `src/components/SectionHero.tsx` - Background do hero
- `src/app/page.tsx` - Backgrounds de seções específicas

