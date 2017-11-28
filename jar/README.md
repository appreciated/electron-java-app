### Readme

If you want to build electron app with a ready to go `<filename>.jar` (with SpringBoot, embedded Jetty ...) this directory is the place to drop your file.

#### Before starting the electron-jar-package script some requirements:

1. Make sure that the application runs on port 8080 (If you need another port you can change it under `electron-src\js\jar\main.js`).
2. The provided Jar needs to be executable via `java -jar <file>.jar` if no Java VM is installed you probably will run into some exceptions. As a test simply open the console and start you app with the command above. If it fails with `Can't execute jar- file: "no main manifest attribute"` you need to add a main manifest attribute ([Maven](https://stackoverflow.com/questions/9689793/cant-execute-jar-file-no-main-manifest-attribute), [Gradle](https://stackoverflow.com/questions/32567167/gradle-no-main-manifest-attribute)) 
3. __Don't place more than one Jar__ in this folder the first Jar to be found will be executed.
4. If your Jar requires some special parameters you can add them under `electron-src\js\jar\main.js`.
