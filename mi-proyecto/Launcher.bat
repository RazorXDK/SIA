@echo off

REM Iniciar backend
start cmd /k "cd /d C:\Users\Robert\Desktop\Angular\mi-proyecto\backend && node server.js"

REM Iniciar frontend Angular
start cmd /k "cd /d C:\Users\Robert\Desktop\Angular\mi-proyecto && ng serve -o"
