@echo off
cd /d %~dp0
powershell -ExecutionPolicy Bypass -File .\autocommit.ps1 -IntervaloMinutos 5
