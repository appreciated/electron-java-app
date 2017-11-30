npm list --depth 1 --global electron-packager
sudo npm install electron-packager -g
rm -r -f ./build/electron-vaadin-darwin-x64/
cd electron-src
npm install
mkdir -p ./electron-vaadin/
cp ../jar/*.jar ./electron-vaadin/
electron-packager . --icon=icon.ico  --ignore=README.md --ignore=.npmignore --ignore=.travis.yml --out ../build/
