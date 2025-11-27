# Assets Gerais

Esta pasta contém outros assets visuais como ícones, favicons e elementos decorativos.

## Conteúdo:

### Favicon
- **arquivo:** `favicon.ico` ou `favicon.png`
- **Descrição:** Ícone do site (aparece na aba do navegador)
- **Tamanhos necessários:**
  - 16x16px (favicon.ico)
  - 32x32px
  - 180x180px (apple-touch-icon)
  - 512x512px (PWA)

### Ícones Sociais
- **arquivo:** `icon-social-*.png` ou `icon-social-*.svg`
- **Descrição:** Ícones para redes sociais (Instagram, Facebook, etc.)
- **Tamanho:** 64x64px ou SVG

### Placeholders
- **arquivo:** `placeholder-*.jpg`
- **Descrição:** Imagens placeholder enquanto as fotos reais não estão disponíveis
- **Uso:** Desenvolvimento e testes

## Como gerar favicons:

1. Use uma ferramenta online como [Favicon Generator](https://realfavicongenerator.net/)
2. Faça upload do logo principal (512x512px)
3. Baixe os arquivos gerados
4. Coloque nesta pasta

## Estrutura de favicons recomendada:

```
public/
├── favicon.ico (16x16)
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png (180x180)
└── android-chrome-512x512.png
```

