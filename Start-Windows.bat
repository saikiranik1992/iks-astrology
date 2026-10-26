@echo off
cd /d "%~dp0"
if "%EXACT_PREDICTIONS_API_KEY%"=="" (
  echo ExactPredictions key missing. Use PowerShell:
  echo $env:EXACT_PREDICTIONS_API_KEY="YOUR_KEY"
  echo Then run: mvn spring-boot:run
  pause
  exit /b 1
)
mvn spring-boot:run
pause
