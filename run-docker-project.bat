@echo off
for %%a in ("%~dp0\.") do set "parent=%%~nxa"
set WORKDIR=%parent%

docker build -t %WORKDIR% .

docker run -p 3000:3000 %WORKDIR%