# Electron Wrapper for Java Web Apps

Wrap an existing Java Web Application with Electron without touching your code.

## Uses

1. Node JS
2. Electron
3. Java VM

## Try it!

### Preparations

1. Download and install `npm` from https://nodejs.org/en/download/
2. By default the application is required to run on `localhost:8080` (configure if otherwise under `electron-src\main.js:78`).
3. By default `java` needs to be available via the path variable (you can ship your own jvm and set the path in the main.js) 
4. The provided Jar needs to be executable via `java -jar <file>.jar`  
5. Place your built Jar in the `jar` folder (__Don't place more than one Jar__ in the `jar` folder since only the first to be found will be executed)
  
### Features
- shows loading Animation (plain html site) until the Servlet Container has been started
  
### Customization
- Logging under `.\electron-src\main.js:74` 
- Loading animation in `.\electron-src\` replace the `loading.html` file
- Loading animation window size under `.\electron-src\main.js:58-59` 
- Icon under `.\electron-src\` replace the `icon.ico` file
- Main window title under `.\electron-src\main.js:103`
- Main window size under `.\electron-src\main.js:104-105`
- Special run parameters for the jar under `electron-src\main.js:67`

### Running debug version

#### Windows
`> electron-app-debug.bat`

#### Unix
`> ./electron-app-debug.bin`

### Building standalone app
     
#### Windows
`> electron-app-package.bat`  

Application will be bundled to `output/electron-vaadin-win32-x64`

#### Unix
`> ./electron-app-package.bin`  

Application will be bundled to `output/electron-vaadin-darwin-x64`
