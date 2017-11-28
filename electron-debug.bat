rmdir .\electron-src\electron-vaadin\ /s /q
xcopy ..\jar .\electron-src\electron-vaadin\ /E /Y
cd electron-src
call .\node_modules\.bin\electron .
cd ..