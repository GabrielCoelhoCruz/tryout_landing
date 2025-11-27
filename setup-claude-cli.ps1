# Script de Configuração - Claude CLI
# Execute como: .\setup-claude-cli.ps1

Write-Host "=== Configuração da Claude CLI ===" -ForegroundColor Cyan
Write-Host ""

# Verificar Python
Write-Host "[1/5] Verificando Python..." -ForegroundColor Yellow
$pythonPath = "C:\Users\Loira\AppData\Local\Programs\Python\Python312\python.exe"
if (Test-Path $pythonPath) {
    $pythonVersion = & $pythonPath --version
    Write-Host "✓ Python encontrado: $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Python não encontrado no caminho esperado" -ForegroundColor Red
    Write-Host "  Por favor, instale Python 3.8+ primeiro" -ForegroundColor Yellow
    exit 1
}

# Verificar pip
Write-Host "[2/5] Verificando pip..." -ForegroundColor Yellow
$pipPath = "C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts\pip.exe"
if (Test-Path $pipPath) {
    Write-Host "✓ pip encontrado" -ForegroundColor Green
} else {
    Write-Host "✗ pip não encontrado" -ForegroundColor Red
    exit 1
}

# Instalar/Verificar anthropic-cli
Write-Host "[3/5] Verificando anthropic-cli..." -ForegroundColor Yellow
$cliPath = "C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts\anthropic-cli.exe"
if (Test-Path $cliPath) {
    Write-Host "✓ anthropic-cli já está instalado" -ForegroundColor Green
} else {
    Write-Host "  Instalando anthropic-cli..." -ForegroundColor Yellow
    & $pythonPath -m pip install anthropic-cli
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ anthropic-cli instalado com sucesso" -ForegroundColor Green
    } else {
        Write-Host "✗ Erro ao instalar anthropic-cli" -ForegroundColor Red
        exit 1
    }
}

# Verificar se CLI funciona
Write-Host "[4/5] Testando CLI..." -ForegroundColor Yellow
try {
    $helpOutput = & $cliPath --help 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ CLI funcionando corretamente" -ForegroundColor Green
    } else {
        Write-Host "✗ Erro ao executar CLI" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Erro ao testar CLI: $_" -ForegroundColor Red
}

# Configurar PATH
Write-Host "[5/5] Configurando PATH..." -ForegroundColor Yellow
$scriptsPath = "C:\Users\Loira\AppData\Local\Programs\Python\Python312\Scripts"
$currentPath = [System.Environment]::GetEnvironmentVariable("Path", "User")

if ($currentPath -notlike "*$scriptsPath*") {
    Write-Host "  Adicionando ao PATH do usuário..." -ForegroundColor Yellow
    [System.Environment]::SetEnvironmentVariable("Path", "$currentPath;$scriptsPath", "User")
    Write-Host "✓ PATH configurado (será aplicado após reiniciar o terminal)" -ForegroundColor Green
} else {
    Write-Host "✓ PATH já contém o diretório Scripts" -ForegroundColor Green
}

# Adicionar ao PATH da sessão atual
$env:Path += ";$scriptsPath"
Write-Host "✓ PATH da sessão atual atualizado" -ForegroundColor Green

# Verificar API Key
Write-Host ""
Write-Host "=== Configuração da API Key ===" -ForegroundColor Cyan
$apiKey = [System.Environment]::GetEnvironmentVariable("ANTHROPIC_API_KEY", "User")
if ($apiKey) {
    Write-Host "✓ ANTHROPIC_API_KEY já configurada" -ForegroundColor Green
} else {
    Write-Host "⚠ ANTHROPIC_API_KEY não encontrada" -ForegroundColor Yellow
    Write-Host ""
    $setKey = Read-Host "Deseja configurar a API Key agora? (s/n)"
    if ($setKey -eq "s" -or $setKey -eq "S" -or $setKey -eq "sim") {
        $newKey = Read-Host "Cole sua API Key da Anthropic" -AsSecureString
        $keyPlainText = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
            [Runtime.InteropServices.Marshal]::SecureStringToBSTR($newKey)
        )
        [System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", $keyPlainText, "User")
        $env:ANTHROPIC_API_KEY = $keyPlainText
        Write-Host "✓ API Key configurada com sucesso" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "Para configurar manualmente, execute:" -ForegroundColor Yellow
        Write-Host '  [System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sua-chave-aqui", "User")' -ForegroundColor Gray
        Write-Host ""
        Write-Host "Ou obtenha uma chave em: https://console.anthropic.com/" -ForegroundColor Cyan
    }
}

# Resumo final
Write-Host ""
Write-Host "=== Resumo ===" -ForegroundColor Cyan
Write-Host "✓ Python: OK" -ForegroundColor Green
Write-Host "✓ pip: OK" -ForegroundColor Green
Write-Host "✓ anthropic-cli: Instalado" -ForegroundColor Green
Write-Host "✓ PATH: Configurado" -ForegroundColor Green
if ($apiKey -or $env:ANTHROPIC_API_KEY) {
    Write-Host "✓ API Key: Configurada" -ForegroundColor Green
} else {
    Write-Host "⚠ API Key: Não configurada" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Próximos Passos ===" -ForegroundColor Cyan
Write-Host "1. Reinicie o terminal para aplicar as mudanças no PATH" -ForegroundColor White
Write-Host "2. Teste a CLI com: anthropic-cli --help" -ForegroundColor White
Write-Host "3. Faça uma chamada de teste: anthropic-cli -g user 'Olá'" -ForegroundColor White
Write-Host ""
Write-Host "Para usar agora (sem reiniciar), use o caminho completo:" -ForegroundColor Yellow
Write-Host "  $cliPath --help" -ForegroundColor Gray
Write-Host ""

