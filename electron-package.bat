call npm install electron-packager -g

:: Clean up build dir
rmdir output\electron-vaadin-win32-x64 /s /q  2>nul
rmdir electron-src\electron-vaadin-win32-x64 /s /q  2>nul

cd electron-src

:: Install node dependencies
call npm install
:: Package electron
call electron-packager . --icon=icon.ico --ignore=README.md --ignore=.npmignore --ignore=.travis.yml
:: Package Java Application
xcopy ..\jar .\electron-vaadin-win32-x64\electron-vaadin\ /E /Y

cd ..

:: Copy the built electron application to an independent dir
md output\ 2> nul
move electron-src\electron-vaadin-win32-x64 output\
PAUSE