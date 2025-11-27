# Exemplos de Uso - Claude CLI

## Comandos Básicos

### 1. Pergunta Simples
```powershell
anthropic-cli -g user "O que é inteligência artificial?"
```

### 2. Conversa com Contexto
```powershell
# Primeira mensagem
anthropic-cli -g user "Meu nome é João"

# Segunda mensagem (em uma nova chamada, sem histórico)
anthropic-cli -g user "Qual é o meu nome?"
```

### 3. Com System Message
```powershell
anthropic-cli -s "Você é um assistente de programação especializado em Python" -g user "Como criar uma lista em Python?"
```

### 4. Usando Modelo Específico
```powershell
# Modelo mais rápido (Haiku)
anthropic-cli -m claude-3-haiku-20240307 -g user "Resuma este texto: [texto aqui]"

# Modelo balanceado (Sonnet)
anthropic-cli -m claude-3-sonnet-20240229 -g user "Explique conceitos de machine learning"

# Modelo mais poderoso (Opus - padrão)
anthropic-cli -m claude-3-opus-20240229 -g user "Escreva um artigo completo sobre..."
```

### 5. Com Imagem
```powershell
anthropic-cli -i "caminho/para/imagem.png" -g user "Descreva o que você vê nesta imagem"
```

### 6. Com PDF
```powershell
anthropic-cli -i "documento.pdf" -g user "Resuma este documento"
```

### 7. Ajustando Parâmetros de Geração
```powershell
# Mais criativo (temperatura alta)
anthropic-cli -t 0.9 -g user "Escreva uma história criativa"

# Mais determinístico (temperatura baixa)
anthropic-cli -t 0.1 -g user "Explique um conceito técnico"

# Resposta mais longa
anthropic-cli -x 2048 -g user "Escreva um artigo detalhado sobre..."

# Combinando parâmetros
anthropic-cli -m claude-3-sonnet-20240229 -t 0.7 -x 1500 -g user "Crie conteúdo criativo e detalhado"
```

## Casos de Uso Comuns

### Análise de Código
```powershell
anthropic-cli -s "Você é um revisor de código experiente" -g user "Revise este código: [código aqui]"
```

### Tradução
```powershell
anthropic-cli -s "Você é um tradutor profissional" -g user "Traduza para português: Hello, how are you?"
```

### Geração de Código
```powershell
anthropic-cli -s "Você é um desenvolvedor Python experiente" -g user "Crie uma função que calcula o fatorial de um número"
```

### Resumo de Texto
```powershell
anthropic-cli -s "Você é um especialista em resumir textos" -g user "Resuma este texto em 3 parágrafos: [texto aqui]"
```

### Análise de Documentos
```powershell
anthropic-cli -i "contrato.pdf" -g user "Quais são os pontos principais deste contrato?"
```

### Análise de Imagens
```powershell
anthropic-cli -i "grafico.png" -g user "Analise os dados apresentados neste gráfico"
```

## Dicas e Truques

### 1. Usar com Pipe (Redirecionamento)
```powershell
# Ler conteúdo de arquivo e enviar
Get-Content "texto.txt" | anthropic-cli -g user $_

# Ou em uma linha
$texto = Get-Content "texto.txt" -Raw; anthropic-cli -g user $texto
```

### 2. Salvar Resposta em Arquivo
```powershell
anthropic-cli -g user "Explique Python" | Out-File -FilePath "resposta.txt"
```

### 3. Usar Variáveis
```powershell
$pergunta = "O que é machine learning?"
anthropic-cli -g user $pergunta
```

### 4. Combinar com Outros Comandos
```powershell
# Contar palavras na resposta
anthropic-cli -g user "Escreva um parágrafo sobre IA" | Measure-Object -Word
```

## Troubleshooting

### Erro: "API key not found"
```powershell
# Verificar se está configurada
$env:ANTHROPIC_API_KEY

# Configurar para a sessão atual
$env:ANTHROPIC_API_KEY = "sua-chave-aqui"

# Configurar permanentemente
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sua-chave-aqui", "User")
```

### Erro: "Command not found"
```powershell
# Usar caminho completo
C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts\anthropic-cli.exe --help

# Ou adicionar ao PATH da sessão
$env:Path += ";C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts"
```

### Erro: "Rate limit exceeded"
- Aguarde alguns minutos antes de fazer nova requisição
- Considere usar um modelo mais rápido (Haiku) para testes

## Modelos e Quando Usar

| Modelo | Velocidade | Custo | Uso Recomendado |
|--------|-----------|-------|-----------------|
| `claude-3-haiku-20240307` | Muito Rápido | Baixo | Tarefas simples, resumos rápidos |
| `claude-3-sonnet-20240229` | Rápido | Médio | Uso geral, balanceado |
| `claude-3-opus-20240229` | Mais Lento | Alto | Tarefas complexas, análise profunda |
| `claude-3-5-sonnet-20241022` | Rápido | Médio | Versão mais recente, melhor qualidade |

## Limites e Considerações

- **Max Tokens padrão:** 1024 tokens
- **Max Tokens máximo:** Depende do modelo (verifique documentação)
- **Rate Limits:** Dependem do seu plano na Anthropic
- **Custos:** Cada modelo tem custo diferente por token

## Recursos Adicionais

- Documentação completa: https://docs.anthropic.com/
- Console para monitorar uso: https://console.anthropic.com/
- Preços e limites: https://www.anthropic.com/pricing

