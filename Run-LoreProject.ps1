<#
.SYNOPSIS
    Orchestrates the Lore Directory development server lifecycle.
.DESCRIPTION
    Starts the Vite dev server, opens the browser and ensures a clean state upon exit.
#>
#region Configuration
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$ProjectRoot = $PSScriptRoot
#endregion

#region Logic
try {
    Write-Host "⚔️  NERO OS : Initialisation des Archives du Lore..." -ForegroundColor Cyan
    Set-Location -Path $ProjectRoot

    Write-Host "🚀 Lancement du serveur d'archives..." -ForegroundColor Green
    
    # Ouverture anticipée de la page (Firefox ou navigateur par défaut)
    Write-Host "🌐 Ouverture des archives (http://localhost:3000)..." -ForegroundColor Yellow
    Start-Process "http://localhost:3000"

    # Lancement du serveur Vite (bloquant)
    npm run dev
}
catch {
    Write-Warning "⚠️  Interruption détectée ou erreur système : $($_.Exception.Message)"
}
finally {
    # Nettoyage natif PowerShell (Robuste sur Windows)
    try {
        Set-Location -Path $ProjectRoot
        Write-Host "`n🧹 Nettoyage des archives sacrées..." -ForegroundColor Yellow
        if (Test-Path -Path "dist") {
            Remove-Item -Path "dist" -Recurse -Force
        }
        Write-Host "✅ Secteur nettoyé. Fin de mission." -ForegroundColor Cyan
    }
    catch {
        Write-Warning "⚠️ Le nettoyage a rencontré un obstacle."
    }
}
#endregion
