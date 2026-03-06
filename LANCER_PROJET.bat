@echo off
echo Lancement du projet School EPG...

start cmd /k "cd backend && npm run dev"
start cmd /k "cd frontend && npm run dev"

echo Serveurs lances ! Ouvrez votre navigateur.
pause
