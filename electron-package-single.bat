:: Check if the electron packager is already installed. If not -> install it
call npm list --depth 1 --global electron-packager
if errorlevel 1 npm install electron-packager -g

:: Clean up build dir
rmdir build\ /s /q  2>nul
md build\ 2> nul

cd electron-src

xcopy ..\jar .\electron-vaadin\ /E /Y
:: Install node dependencies
call npm install
:: Package electron
call electron-packager . --icon=icon.ico --ignore=README.md --ignore=.npmignore --ignore=.travis.yml --out ../build/
