# Guia de Imagens - SkyHigh AllStar

Este documento lista todas as imagens compartilhadas e onde devem ser colocadas.

## 📋 Imagens Identificadas

### 1. Logo Escudo (SH) - **PRINCIPAL**
**Descrição:** Escudo com letras "S" e "H" entrelaçadas em laranja, borda laranja, fundo azul escuro com raios elétricos azuis.

**Onde colocar:**
- `public/logo/logo-shield.png` ou `logo-shield.svg`
- `public/logo/logo-shield-dark.png` (versão para fundos claros)
- `public/logo/logo-shield-light.png` (versão para fundos escuros)

**Cores extraídas:**
- Laranja: `#FF7F00`
- Azul escuro: `#0A1B4D`
- Azul elétrico: `#00BFFF`
- Azul muito escuro: `#0A0A2A`

**Uso:** Logo principal no header, favicon, compartilhamento social

---

### 2. Logo Texto "SKY HIGH"
**Descrição:** Texto "SKY HIGH" em laranja (#FF7F00) com borda metálica cinza (gradiente de #4A4A4A a #C0C0C0).

**Onde colocar:**
- `public/logo/logo-text.png` ou `logo-text.svg`

**Uso:** Header alternativo, marca d'água, assinaturas

---

### 3. Background Cósmico/Nebulosa
**Descrição:** Fundo com tons de azul escuro, azul elétrico e preto, efeito de nebulosa cósmica com partículas brilhantes (estrelas).

**Onde colocar:**
- `public/images/background-cosmic.jpg`

**Cores principais:**
- Azul profundo: `#0A1B4D`
- Azul elétrico: `#00BFFF`
- Preto/Azul muito escuro: `#0A0A2A`

**Uso:** Background do hero, seções escuras, overlays

**Especificações:**
- Resolução: 1920x1080px ou maior
- Formato: JPG (otimizado para web, máximo 500KB)

---

### 4. Foto de Competição
**Descrição:** Foto da equipe em competição no Campeonato Brasileiro de Cheerleading All Star, com uniformes azuis e detalhes laranja/coral.

**Onde colocar:**
- `public/photos/competition1.jpg`
- `public/photos/competition2.jpg` (se houver mais fotos)

**Uso:** Galeria de fotos, seção de conquistas, hero alternativo

**Especificações:**
- Resolução: Mínimo 1200x800px
- Proporção: 3:2 ou 4:3
- Tamanho: Máximo 2MB (otimizar)

---

## 📁 Estrutura de Pastas Criada

```
public/
├── logo/              # Logos da equipe
│   ├── logo-shield.png
│   ├── logo-shield.svg
│   ├── logo-text.png
│   └── README.md
│
├── images/            # Backgrounds e texturas
│   ├── background-cosmic.jpg
│   ├── texture-blue.jpg
│   └── README.md
│
├── photos/            # Fotos da equipe
│   ├── competition1.jpg
│   ├── training1.jpg
│   ├── team1.jpg
│   └── README.md
│
└── assets/            # Favicons e ícones
    ├── favicon.ico
    └── README.md
```

## 🎨 Paleta de Cores Extraída

Todas as cores já estão configuradas no `tailwind.config.ts`:

```typescript
primary: '#FF7F00'        // Laranja vibrante
secondary-1: '#0A1B4D'    // Azul escuro
secondary-2: '#00BFFF'    // Azul elétrico
dark: '#0A0A2A'           // Azul muito escuro
```

## 📝 Próximos Passos

1. **Adicionar os arquivos de imagem** nas pastas correspondentes
2. **Otimizar as imagens** para web (reduzir tamanho sem perder qualidade)
3. **Atualizar referências** nos componentes conforme necessário
4. **Gerar favicons** a partir do logo principal

## 🔧 Ferramentas Recomendadas

- **Otimização de imagens:** [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/)
- **Conversão SVG:** [CloudConvert](https://cloudconvert.com/)
- **Geração de favicons:** [RealFaviconGenerator](https://realfavicongenerator.net/)

## 📌 Notas Importantes

- Use **SVG** sempre que possível para logos (melhor qualidade e menor tamanho)
- **Otimize todas as imagens** antes de adicionar ao projeto
- Mantenha **nomes de arquivo consistentes** para facilitar referências
- Use **Next.js Image component** para melhor performance

