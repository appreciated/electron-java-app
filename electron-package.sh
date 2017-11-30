echo "Check if electron-packager is installed"
npm list --depth 1 --global electron-packager > /dev/null 2>&1 || sudo npm install electron-packager -g
echo "Removing old build"
rm -r -f ./build/
mkdir -p ./build/
cd electron-src
echo "Installing node dependencies"
npm install
echo "Copying Jar"
mkdir -p ./electron-vaadin/
cp ../jar/*.jar ./electron-vaadin/
electron-packager . --icon=icon.ico  --ignore=README.md --ignore=.npmignore --ignore=.travis.yml --out ../build/
