@echo off
rem Chapter 9 video 1: one click from setup to pull request.
rem   1. creates ..\.venv once (playwright, imageio-ffmpeg)
rem   2. renders all parts, joins them, splits into 30 MB pieces for sending
rem   3. commits the captions and parts list, pushes branch ch09-alo-3d, opens the pull request
rem Stops at the first failure. Safe to run again: setup is skipped when done, and every part is re-rendered.
setlocal
chcp 65001 >nul
set PYTHONIOENCODING=utf-8
cd /d "%~dp0"
set "BRANCH=ch09-alo-3d"
set "VENV=..\.venv"
set "PY=%VENV%\Scripts\python.exe"

echo.
echo === Checking ===
git rev-parse --abbrev-ref HEAD > "%TEMP%\ch09_branch.txt" 2>nul || (echo git not found or not a repository & goto :fail)
set /p CUR=<"%TEMP%\ch09_branch.txt"
if /i not "%CUR%"=="%BRANCH%" (echo You are on branch %CUR%. Run: git checkout %BRANCH% & goto :fail)

if not defined CHROME_PATH set "CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME_PATH%" if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" set "CHROME_PATH=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME_PATH%" (echo Chrome not found. Install Google Chrome or set CHROME_PATH. & goto :fail)
echo Chrome: %CHROME_PATH%

echo.
echo === Step 1: Python environment ===
if exist "%PY%" (
  echo %VENV% already exists, skipping creation
) else (
  where py >nul 2>nul && (py -3 -m venv "%VENV%") || (python -m venv "%VENV%")
  if not exist "%PY%" (echo Could not create %VENV%. Install Python 3 from python.org and tick "Add to PATH". & goto :fail)
)
"%PY%" -m pip install --disable-pip-version-check -q playwright imageio-ffmpeg || goto :fail
"%PY%" -c "import playwright, imageio_ffmpeg; print('packages ok')" || goto :fail

echo.
echo === Step 2: Render ===
if not exist out mkdir out
echo start> out\render-start.log
"%PY%" -X utf8 render.py info || goto :fail
echo Rendering every part. This takes a while; keep the PC awake and plugged in.
"%PY%" -X utf8 render.py clip all || goto :fail
"%PY%" -X utf8 -c "import json,os,sys;i=json.load(open('out/info.json',encoding='utf-8'));m=os.path.getmtime('out/render-start.log');bad=[p['name'] for p in i if not os.path.exists('out/'+p['name']+'.mp4') or os.path.getmtime('out/'+p['name']+'.mp4')<m];print('NOT RENDERED:',' '.join(bad)) if bad else print('all',len(i),'parts rendered');sys.exit(1 if bad else 0)" || goto :fail
"%PY%" -X utf8 render.py join || goto :fail
"%PY%" -X utf8 render.py chunks || goto :fail
echo Video: %CD%\out\video.mp4
echo Pieces to send: %CD%\out\send

echo.
echo === Step 3: Commit, push, pull request ===
git add out || goto :fail
git diff --cached --quiet && (echo Nothing new to commit) || (git commit -q -F out\commit-msg.txt || goto :fail)
git push -u origin %BRANCH% || (echo Push failed. Sign in to GitHub when asked, then run this file again. & goto :fail)
where gh >nul 2>nul && gh auth status >nul 2>nul && (
  gh pr view %BRANCH% >nul 2>nul && (echo A pull request already exists: & gh pr view %BRANCH% --web) || (gh pr create --base main --head %BRANCH% --title "Chapter 9 video 1 in 3D: light and how we see (lessons 1-3)" --body-file out\pr-body.md || goto :fail)
) || (
  echo GitHub CLI not available. Opening the pull request page; paste the text from out\pr-body.md as the description.
  start "" "https://github.com/Shahriar07/education/compare/main...%BRANCH%?expand=1"
)

echo.
echo === Done ===
pause
exit /b 0

:fail
echo.
echo *** Stopped: see the message above. Fix it and run render-all.bat again. ***
pause
exit /b 1
