# Guia de Deploy no Vercel - SkyHigh AllStar Tryout 2026

## Status do Projeto

✅ **Projeto pronto para deploy!**
- Build de produção: **Passou com sucesso**
- Linting: **OK**
- Git: **Sincronizado com origin/main**
- Next.js: **15.5.6**

## Deploy no Vercel (Recomendado)

O Vercel é a plataforma oficial da equipe do Next.js e oferece deploy automático e gratuito.

### Passo 1: Criar Conta no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. **Conecte com sua conta do GitHub** (recomendado)

### Passo 2: Importar Projeto

1. No dashboard do Vercel, clique em **"Add New Project"**
2. Selecione **"Import Git Repository"**
3. Escolha o repositório do GitHub: `tryout_landing`
4. Clique em **"Import"**

### Passo 3: Configurações do Projeto

O Vercel detectará automaticamente que é um projeto Next.js e usará as configurações ideais:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

**Não é necessário alterar nada!**

### Passo 4: Deploy

1. Clique em **"Deploy"**
2. Aguarde alguns minutos (geralmente 2-3 min)
3. Pronto! Seu site estará no ar

## URL do Projeto

Após o deploy, você receberá:
- **URL de produção**: `https://seu-projeto.vercel.app`
- **URL de preview**: Para cada commit/branch

## Deploy Automático

✅ **O Vercel faz deploy automático sempre que você:**
- Faz push para a branch `main` (produção)
- Abre um Pull Request (preview)
- Faz push em qualquer branch (preview)

## Configurações Opcionais

### 1. Domínio Personalizado

1. No dashboard do projeto, vá em **"Settings" > "Domains"**
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções

### 2. Variáveis de Ambiente (Se necessário no futuro)

Se você adicionar integrações (formulários, analytics, etc.):

1. Vá em **"Settings" > "Environment Variables"**
2. Adicione as variáveis necessárias
3. Faça redeploy

### 3. Otimizações Aplicadas

O projeto já está otimizado com:
- ✅ Imagens otimizadas (Next.js Image)
- ✅ Fonts otimizados (Google Fonts via Next.js)
- ✅ CSS otimizado (Tailwind CSS)
- ✅ Build estático quando possível
- ✅ Code splitting automático

## Performance Esperada

Com a configuração atual:
- **Lighthouse Score**: 90-100 (Performance)
- **First Load JS**: ~160 KB (Excelente)
- **Time to Interactive**: < 2s

## Troubleshooting

### Se o build falhar:

1. **Verifique os logs** no dashboard do Vercel
2. **Rode localmente**: `npm run build`
3. **Limpe o cache**: Delete `.next` e `node_modules`, depois `npm install`

### Warning sobre metadataBase

O warning sobre `metadataBase` não impede o deploy. Para corrigir (opcional):

Adicione ao `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://seu-dominio.vercel.app'),
  // ... resto das configurações
}
```

## Comandos Úteis

```bash
# Testar build localmente
npm run build

# Rodar build de produção localmente
npm start

# Verificar se há problemas
npm run lint
```

## Estrutura de Rotas

O projeto possui as seguintes páginas:
- `/` - Home/Landing principal
- `/formulario` - Formulário de inscrição
- `/landing-improvedOpus` - Landing alternativa (pode ser removida)
- `/nova-home` - Home alternativa (pode ser removida)

## Próximos Passos Após Deploy

1. ✅ Testar todas as rotas
2. ✅ Verificar responsividade em diferentes dispositivos
3. ✅ Testar formulário de inscrição
4. ✅ Configurar domínio personalizado (opcional)
5. ✅ Adicionar Google Analytics (opcional)
6. ✅ Configurar backend para o formulário (se necessário)

## Links Importantes

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Next.js](https://nextjs.org/docs)
- [Status do Vercel](https://www.vercel-status.com/)

## Suporte

Se tiver problemas:
1. Verifique a documentação do Vercel
2. Acesse os logs de build no dashboard
3. Contate o suporte do Vercel (muito responsivo!)

---

**Tempo estimado de deploy**: 2-5 minutos
**Custo**: Gratuito (plano Hobby do Vercel)
