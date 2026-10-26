# Safe local launcher. Key only in this PowerShell process environment (not a source file).
Set-Location $PSScriptRoot
if ([string]::IsNullOrWhiteSpace($env:EXACT_PREDICTIONS_API_KEY)) {
  $secure = Read-Host 'Enter your ExactPredictions Pro API key (hidden)' -AsSecureString
  $secret = [System.Net.NetworkCredential]::new('', $secure).Password
  if ([string]::IsNullOrWhiteSpace($secret)) { Write-Error 'API key missing'; exit 1 }
  $env:EXACT_PREDICTIONS_API_KEY = $secret
  Remove-Variable secret -ErrorAction SilentlyContinue
}
Write-Host 'Starting IKs Astrology locally. API key stays on this computer.'
Write-Host 'Once Spring Boot starts, open http://localhost:8080/ and choose Exact Predictions PRO.'
mvn spring-boot:run
