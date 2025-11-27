# Guia de Instalação e Configuração - Claude CLI

## Pré-requisitos

### 1. Python instalado
- Python 3.8 ou superior
- Verificar instalação:
  ```powershell
  python --version
  ```
  Ou usar o caminho completo:
  ```powershell
  C:\Users\Loira\AppData\Local\Programs\Python\Python312\python.exe --version
  ```

### 2. pip instalado
- Geralmente vem com Python
- Verificar:
  ```powershell
  pip --version
  ```

### 3. Chave API da Anthropic
- Obter em: https://console.anthropic.com/
- Criar conta se necessário
- Gerar uma chave API

## Instalação

### Passo 1: Instalar a CLI
```powershell
pip install anthropic-cli
```

### Passo 2: Verificar instalação
```powershell
# Usando caminho completo (funciona imediatamente)
C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts\anthropic-cli.exe --help

# Ou adicionar ao PATH da sessão atual
$env:Path += ";C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts"
anthropic-cli --help
```

### Passo 3: Configurar variável de ambiente (API Key)

**Opção A: Variável de ambiente permanente (recomendado)**
```powershell
# Definir para o usuário atual
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sua-chave-api-aqui", "User")

# Reiniciar o terminal para aplicar
```

**Opção B: Variável de ambiente da sessão atual**
```powershell
$env:ANTHROPIC_API_KEY = "sua-chave-api-aqui"
```

**Opção C: Arquivo .env (se suportado)**
Criar arquivo `.env` na raiz do projeto:
```
ANTHROPIC_API_KEY=sua-chave-api-aqui
```

## Configuração do PATH (Opcional mas Recomendado)

Para usar `anthropic-cli` diretamente sem o caminho completo:

### Windows PowerShell (sessão atual)
```powershell
$env:Path += ";C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts"
```

### Windows PowerShell (permanente - usuário atual)
```powershell
[System.Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts", "User")
```

### Windows CMD (permanente)
```cmd
setx PATH "%PATH%;C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts"
```

**Nota:** Após adicionar ao PATH permanentemente, feche e reabra o terminal.

## Verificação Final

Execute para confirmar que tudo está funcionando:
```powershell
# Verificar se o comando está disponível
anthropic-cli --help

# Testar uma chamada simples (requer API key configurada)
anthropic-cli -g user "Olá, teste"
```

## Uso Básico

### Sintaxe básica
```powershell
anthropic-cli -g <role> <content> [opções]
```

### Exemplos

**1. Mensagem simples:**
```powershell
anthropic-cli -g user "Explique o que é Python"
```

**2. Com modelo específico:**

```powershell
anthropic-cli -m claude-3-sonnet-20240229 -g user "Escreva um poema"
```

**3. Com system message:**
```powershell
anthropic-cli -s "Você é um assistente útil" -g user "Como fazer café?"
```

**4. Com imagem/PDF:**
```powershell
anthropic-cli -i caminho/para/imagem.png -g user "Descreva esta imagem"
```

**5. Com parâmetros avançados:**
```powershell
anthropic-cli -m claude-3-opus-20240229 -t 0.7 -x 2048 -g user "Escreva um artigo longo"
```

### Parâmetros disponíveis

| Parâmetro | Descrição | Padrão |
|-----------|-----------|--------|
| `-g, --message` | Mensagem com role e conteúdo | Obrigatório |
| `-m, --model` | Modelo Anthropic a usar | claude-3-opus-20240229 |
| `-s, --system` | Mensagem do sistema | - |
| `-t, --temperature` | Temperatura (0-1) | - |
| `-k, --top_k` | Top-k sampling | - |
| `-p, --top_p` | Top-p sampling | - |
| `-x, --max_tokens` | Máximo de tokens na resposta | 1024 |
| `-i, --image` | Caminho para imagem ou PDF | - |
| `-h, --help` | Mostrar ajuda | - |

## Troubleshooting

### Problema: "comando não reconhecido"
**Solução:** Use o caminho completo ou adicione ao PATH (veja seção acima)

### Problema: "API key não encontrada"
**Solução:** Configure a variável de ambiente `ANTHROPIC_API_KEY`

### Problema: "Módulo não encontrado"
**Solução:** Reinstale o pacote:
```powershell
pip uninstall anthropic-cli
pip install anthropic-cli
```

### Problema: Python não encontrado
**Solução:** Use o caminho completo do Python ou adicione ao PATH

## Modelos Disponíveis

- `claude-3-opus-20240229` (padrão)
- `claude-3-sonnet-20240229`
- `claude-3-haiku-20240307`
- `claude-3-5-sonnet-20241022` (mais recente)

## Recursos Adicionais

- Documentação Anthropic: https://docs.anthropic.com/
- Console Anthropic: https://console.anthropic.com/
- GitHub: https://github.com/anthropics/anthropic-sdk-python

## Scripts Úteis

### Criar alias no PowerShell (opcional)
Adicione ao seu perfil do PowerShell (`$PROFILE`):
```powershell
function claude {
    & "C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts\anthropic-cli.exe" $args
}
```

Para editar o perfil:
```powershell
notepad $PROFILE
```

