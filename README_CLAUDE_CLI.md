# 🚀 Guia Rápido - Claude CLI

Guia completo para instalação, configuração e uso da CLI do Claude (Anthropic).

## 📋 Índice

1. [Instalação Rápida](#instalação-rápida)
2. [Configuração](#configuração)
3. [Uso Básico](#uso-básico)
4. [Documentação Completa](#documentação-completa)

## ⚡ Instalação Rápida

### Método 1: Script Automatizado (Recomendado)

Execute o script PowerShell:
```powershell
.\setup-claude-cli.ps1
```

O script irá:
- ✅ Verificar Python e pip
- ✅ Instalar/verificar anthropic-cli
- ✅ Configurar PATH
- ✅ Configurar API Key (opcional)

### Método 2: Instalação Manual

```powershell
# 1. Instalar a CLI
pip install anthropic-cli

# 2. Verificar instalação
C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts\anthropic-cli.exe --help

# 3. Configurar API Key
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sua-chave-aqui", "User")

# 4. Adicionar ao PATH (opcional)
$env:Path += ";C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts"
```

## 🔑 Configuração

### 1. Obter API Key

1. Acesse: https://console.anthropic.com/
2. Crie uma conta ou faça login
3. Vá em "API Keys"
4. Crie uma nova chave
5. Copie a chave

### 2. Configurar API Key

**Opção A: Permanente (Recomendado)**
```powershell
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sua-chave-aqui", "User")
```
*Reinicie o terminal após configurar*

**Opção B: Sessão Atual**
```powershell
$env:ANTHROPIC_API_KEY = "sua-chave-aqui"
```

### 3. Verificar Configuração

```powershell
# Verificar se CLI está disponível
anthropic-cli --help

# Testar uma chamada
anthropic-cli -g user "Olá, teste"
```

## 💡 Uso Básico

### Comando Simples
```powershell
anthropic-cli -g user "O que é Python?"
```

### Com Modelo Específico
```powershell
anthropic-cli -m claude-3-sonnet-20240229 -g user "Explique machine learning"
```

### Com System Message
```powershell
anthropic-cli -s "Você é um assistente de programação" -g user "Como criar uma função?"
```

### Com Imagem/PDF
```powershell
anthropic-cli -i "imagem.png" -g user "Descreva esta imagem"
```

### Resposta Mais Longa
```powershell
anthropic-cli -x 2048 -g user "Escreva um artigo detalhado"
```

## 📚 Documentação Completa

- **[SETUP_CLAUDE_CLI.md](./SETUP_CLAUDE_CLI.md)** - Guia detalhado de instalação e configuração
- **[EXEMPLOS_USO.md](./EXEMPLOS_USO.md)** - Exemplos práticos e casos de uso

## 🛠️ Troubleshooting

### Problema: Comando não encontrado
```powershell
# Use o caminho completo
C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts\anthropic-cli.exe --help

# Ou adicione ao PATH
$env:Path += ";C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts"
```

### Problema: API Key não encontrada
```powershell
# Verificar
$env:ANTHROPIC_API_KEY

# Configurar
$env:ANTHROPIC_API_KEY = "sua-chave-aqui"
```

### Problema: Erro de instalação
```powershell
# Reinstalar
pip uninstall anthropic-cli
pip install anthropic-cli
```

## 📖 Recursos

- **Documentação Anthropic:** https://docs.anthropic.com/
- **Console Anthropic:** https://console.anthropic.com/
- **Preços:** https://www.anthropic.com/pricing

## ✅ Checklist de Instalação

- [ ] Python 3.8+ instalado
- [ ] pip instalado
- [ ] anthropic-cli instalado (`pip install anthropic-cli`)
- [ ] CLI testada (`anthropic-cli --help`)
- [ ] API Key configurada
- [ ] PATH configurado (opcional)
- [ ] Primeira chamada de teste realizada

## 🎯 Próximos Passos

1. Execute o script de setup: `.\setup-claude-cli.ps1`
2. Configure sua API Key
3. Teste com: `anthropic-cli -g user "Olá"`
4. Explore os exemplos em `EXEMPLOS_USO.md`

---

**Dúvidas?** Consulte a documentação completa em `SETUP_CLAUDE_CLI.md`

