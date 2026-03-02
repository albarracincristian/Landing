param(
    [int]$IntervaloMinutos = 5,
    [switch]$Push,
    [string]$PrefijoMensaje = "autocommit"
)

$ErrorActionPreference = "Stop"

try {
    $repoRoot = (git rev-parse --show-toplevel 2>$null).Trim()
} catch {
    Write-Error "No se detectó un repositorio git en este directorio."
    exit 1
}

Set-Location $repoRoot
Write-Host "Autocommit activo en: $repoRoot"
Write-Host "Intervalo: $IntervaloMinutos minuto(s)"
Write-Host "Push automático: $($Push.IsPresent)"

while ($true) {
    try {
        $estado = git status --porcelain

        if (-not [string]::IsNullOrWhiteSpace(($estado -join ""))) {
            git add -A

            $hayStaged = git diff --cached --name-only
            if (-not [string]::IsNullOrWhiteSpace(($hayStaged -join ""))) {
                $fecha = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
                $mensaje = "$PrefijoMensaje: actualización automática $fecha"
                git commit -m $mensaje | Out-Null
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Commit creado: $mensaje"

                if ($Push.IsPresent) {
                    git push | Out-Null
                    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Push realizado"
                }
            }
        }
    } catch {
        Write-Warning "Error en ciclo de autocommit: $($_.Exception.Message)"
    }

    Start-Sleep -Seconds ($IntervaloMinutos * 60)
}
