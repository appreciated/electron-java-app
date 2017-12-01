if npm list --depth 1 --global electron-packager > /dev/null 2>&1; then sudo npm install electron-packager -g; fi
rm -r -f ./build/electron-vaadin-darwin-x64/
cd electron-src
npm install
mkdir -p ./electron-vaadin/
cp ../jar/*.jar ./electron-vaadin/
electron-packager . --all --icon=icon.ico  --ignore=README.md --ignore=.npmignore --ignore=.travis.yml --out ../build/