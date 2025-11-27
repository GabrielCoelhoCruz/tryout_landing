# Script para corrigir o alias 'claude' no PowerShell
# Execute como: .\fix-claude-alias.ps1

Write-Host "=== Configurando alias 'claude' ===" -ForegroundColor Cyan
Write-Host ""

$cliPath = "C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts\anthropic-cli.exe"
$scriptsPath = "C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts"

# 1. Adicionar ao PATH da sessão atual
Write-Host "[1/3] Adicionando ao PATH da sessão atual..." -ForegroundColor Yellow
if ($env:Path -notlike "*$scriptsPath*") {
    $env:Path += ";$scriptsPath"
    Write-Host "[OK] PATH da sessao atual atualizado" -ForegroundColor Green
} else {
    Write-Host "[OK] PATH ja contem o diretorio Scripts" -ForegroundColor Green
}

# 2. Criar funcao 'claude' na sessao atual
Write-Host "[2/3] Criando funcao 'claude' na sessao atual..." -ForegroundColor Yellow
function claude {
    & "C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts\anthropic-cli.exe" $args
}
Write-Host "[OK] Funcao 'claude' criada (valida apenas nesta sessao)" -ForegroundColor Green

# 3. Adicionar ao perfil do PowerShell para persistir
Write-Host "[3/3] Configurando perfil do PowerShell..." -ForegroundColor Yellow
$profilePath = $PROFILE

# Criar diretório do perfil se não existir
$profileDir = Split-Path -Parent $profilePath
if (-not (Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
}

# Verificar se já existe a função no perfil
$functionExists = $false
if (Test-Path $profilePath) {
    $profileContent = Get-Content $profilePath -Raw
    if ($profileContent -like "*function claude*") {
        $functionExists = $true
    }
}

if (-not $functionExists) {
    # Adicionar função ao perfil
    $functionCode = @"

# Alias para anthropic-cli
function claude {
    & "C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts\anthropic-cli.exe" `$args
}

"@
    
    Add-Content -Path $profilePath -Value $functionCode
    Write-Host "[OK] Funcao 'claude' adicionada ao perfil do PowerShell" -ForegroundColor Green
    Write-Host "  (sera carregada automaticamente em novas sessoes)" -ForegroundColor Gray
} else {
    Write-Host "[OK] Funcao 'claude' ja existe no perfil" -ForegroundColor Green
}

# Testar
Write-Host ""
Write-Host "=== Testando ===" -ForegroundColor Cyan
try {
    $testOutput = claude --help 2>&1 | Select-Object -First 3
    Write-Host "[OK] Comando 'claude' funcionando!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Exemplo de uso:" -ForegroundColor Yellow
    Write-Host "  claude -g user 'Ola, teste'" -ForegroundColor Gray
} catch {
    Write-Host "[ERRO] Erro ao testar: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Concluido ===" -ForegroundColor Cyan
Write-Host "Agora voce pode usar 'claude' diretamente!" -ForegroundColor Green
Write-Host ""
Write-Host "Nota: Se voce abrir um novo terminal, o alias ja estara disponivel." -ForegroundColor Yellow
Write-Host "      Nesta sessao atual, voce ja pode usar 'claude' agora mesmo." -ForegroundColor Yellow
Write-Host ""

