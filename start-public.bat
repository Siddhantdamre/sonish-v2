@echo off
echo ==================================================
echo    Starting Sonish Public Tunnels (via localtunnel)
echo ==================================================

echo [1] Booting Backend Tunnel on Port 5000...
start cmd /k "npx localtunnel --port 5000"

echo [2] Booting Frontend Tunnel on Port 5173...
start cmd /k "npx localtunnel --port 5173"

echo ==================================================
echo  Please check the newly opened terminal windows 
echo  for your public URLs. You may need to update 
echo  your frontend API endpoint to match the backend URL.
echo ==================================================
pause
