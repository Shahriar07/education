@echo off
rem Regenerate a video from its code, without the AI agent.
rem   Double-click: lists the videos and asks which one to render (all parts, join, 30 MB pieces).
rem   From a terminal in this folder, with the same options as make_video.py, for example:
rem     make_video.bat class6-ch10-goti-2
rem     make_video.bat class6-ch10-goti-2 --parts s05_p03 s07_p01
rem     make_video.bat class6-ch10-goti-2 --changed
rem     make_video.bat --list
rem     make_video.bat --help
setlocal
chcp 65001 >nul
set PYTHONIOENCODING=utf-8
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 -X utf8 make_video.py %*
) else (
  where python >nul 2>nul || (echo Python 3 not found. Install it from python.org and tick "Add python.exe to PATH". & pause & exit /b 1)
  python -X utf8 make_video.py %*
)
set RC=%errorlevel%
if "%~1"=="" pause
exit /b %RC%
