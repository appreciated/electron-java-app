# Electron Wrapper for Java Web Apps

Wrap an existing Java Web Application with Electron without touching your code.

## Uses

1. Node JS
2. Electron
3. Java VM

## Try it!

### Preparations

1. Download and install `npm` from https://nodejs.org/en/download/
2. By default the Java web application is required to run on `localhost:8080` (configure if otherwise under `electron-src\main.js:78`).
3. By default `java` needs to be available via the path variable (configure if otherwise the path in the main.js) 
4. The provided Jar needs to be executable via `java -jar <file>.jar`.  
5. Place your built [(Fat-)Jar](https://stackoverflow.com/questions/19150811/what-is-a-fat-jar) in the `jar` folder.
  
### Features
- Starts a (Fat-)Jar
- Shows during f.e. Servlet Container startup a loading Animation (can be replaced)
  
### What can be customized?
Basically everything but you will need to rebuilt the application most of the time f.e.:
- Logging (under `.\electron-src\main.js:74`)
- Loading animation (under `.\electron-src\` replace the `loading.html` file)
- Loading animation window size (under `.\electron-src\main.js:58-59`) 
- Application icon (under `.\electron-src\` replace the `icon.ico` file)
- Main window title (under `.\electron-src\main.js:103`)
- Main window size (under `.\electron-src\main.js:104-105`)
- Special run parameters to be passed to the jar (under `electron-src\main.js:67`)

### Running debug version

#### Windows
`> electron-app-debug.bat`

#### Unix
`> ./electron-app-debug.sh`

### Build application for host arch
     
#### Windows
`> electron-app-package.bat`  

Application will be bundled to `output/electron-vaadin-...` (pending on the system you compile on)

#### Unix
`> ./electron-app-package.sh`  

Application will be bundled to `output/electron-vaadin-...`  (pending on the system you compile on)

### Build application for all archs (Window 32 + 64 Bit, Darwin ...)
     
#### Windows
`> electron-app-package-all.bat`  

Application will be bundled multiple times for all archs `output/electron-vaadin-...`

#### Unix
`> ./electron-app-package-all.sh`  

Application will be bundled multiple times for all archs `output/electron-vaadin-...`

