# Configuração do Context7 MCP

## Instalação Concluída ✅

O servidor MCP do Context7 foi instalado e configurado com sucesso!

## O que foi feito:

1. ✅ Verificado Node.js (v22.13.1) - compatível
2. ✅ Instalado o pacote `@upstash/context7-mcp` via npx
3. ✅ Criado arquivo de configuração `.cursor/mcp.json`

## Arquivo de Configuração

O arquivo `.cursor/mcp.json` foi criado com a seguinte configuração:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": [
        "-y",
        "@upstash/context7-mcp"
      ]
    }
  }
}
```

## Próximos Passos

1. **Reinicie o Cursor**: Feche e reabra o Cursor para que ele reconheça a nova configuração MCP.

2. **Verificação**: Após reiniciar, você pode verificar se o Context7 está funcionando:
   - O servidor MCP será iniciado automaticamente quando necessário
   - Você pode usar o Context7 em seus prompts adicionando `use context7` ao final

## Como Usar

Para usar o Context7 em seus prompts, adicione `use context7` ao final de suas instruções:

```
Crie um componente React com TypeScript. use context7
```

Isso permitirá que o Context7 forneça documentação atualizada e exemplos de código diretamente no contexto do assistente de IA.

## Configuração Opcional: API Key

Se você tiver uma API key do Context7, pode configurá-la como variável de ambiente:

**Windows PowerShell:**
```powershell
[System.Environment]::SetEnvironmentVariable("CONTEXT7_API_KEY", "sua-chave-api-aqui", "User")
```

**Ou para a sessão atual:**
```powershell
$env:CONTEXT7_API_KEY = "sua-chave-api-aqui"
```

## Recursos

- Documentação Context7: https://www.context7.com/
- Pacote npm: https://www.npmjs.com/package/@upstash/context7-mcp

