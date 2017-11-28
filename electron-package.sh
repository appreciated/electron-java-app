./gradlew bundle
rm -R ./electron-src/electron-vaadin-darwin-x64/
cd electron-src
npm install
cp -R ../build/install/electron-vaadin/ ./electron-vaadin/
electron-packager . --icon=icon.ico  --ignore=README.md --ignore=.npmignore --ignore=.travis.yml
#mkdir -p ./electron-vaadin-darwin-x64/Resources/app/electron-vaadin/
cd ..