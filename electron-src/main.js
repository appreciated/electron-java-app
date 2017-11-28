const {
    app, session, protocol, BrowserWindow, Menu, globalShortcut
} = require('electron');
const path = require('path');
let mainWindow = null;
let serverProcess = null;
var otherInstanceOpen = app.makeSingleInstance(function(commandLine, workingDirectory) {
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.show();
        mainWindow.focus();
    }
    return true;
});
if(otherInstanceOpen){app.quit();return;}
var fs = require("fs");
var files = fs.readdirSync("./electron-vaadin");
var filename = null;
for (var i in files) {
    if (path.extname(files[i]) === ".jar") {
        filename = path.basename(files[i]);
        break;
    }
}
if (!filename) {
	setTimeout( function () {app.exit()}, 1000);
    throw new Error("The Application could not be started");
}
// Provide API for web application
global.callElectronUiApi = function (args) {
    console.log('Electron called from web app with args "' + args + '"');
    if (args) {
        if (args[0] === 'exit') {
            console.log('Kill server process');
            const kill = require('tree-kill');
            kill(serverProcess.pid, 'SIGTERM', function (err) {
                console.log('Server process killed');
                serverProcess = null;
                mainWindow.close();
            });
        }
        if (args[0] === 'minimize') {
            mainWindow.minimize();
        }
        if (args[0] === 'maximize') {
            if (!mainWindow.isMaximized()) {
                mainWindow.maximize();
            } else {
                mainWindow.unmaximize();
            }
        }
    }
};
app.on('window-all-closed', function () {
    app.quit();
});
app.on('ready', function () {
    let loading = new BrowserWindow({
        show: false
        , frame: false
        , width: 300
        , height: 150
    });
    loading.loadURL(app.getAppPath() + '/loading.html');
    loading.webContents.once('dom-ready', () => {
        loading.show();
    });
    platform = process.platform;
    if (platform === 'win32') {
        serverProcess = require('child_process').spawn('java.exe', ['-jar', filename], {
            cwd: './electron-vaadin'
        });
    } else if (platform === 'darwin') {
        serverProcess = require('child_process').spawn(app.getAppPath() + '/electron-vaadin/bin/electron-vaadin');
    }
    serverProcess.stdout.pipe(fs.createWriteStream('./jvm.log', {flags: 'a'})); // logging
    serverProcess.on('error', (code, signal) => {
	    setTimeout( function () {app.exit()}, 1000);
	    throw new Error("The Application could not be started");
    });
    console.log("Server PID: " + serverProcess.pid);
    let appUrl = 'http://localhost:8080';

    function setupVaadinFilesService() {
        protocol.registerFileProtocol('vaadin', (request, callback) => {
            console.log(`Vaadin Request URL: ${request.url}`);
            let urlPath = request.url.substr('vaadin://'.length);
            if (urlPath.indexOf('?') >= 0) {
                urlPath = urlPath.substr(0, urlPath.indexOf('?'));
            }
            if (urlPath.indexOf('#') >= 0) {
                urlPath = urlPath.substr(0, urlPath.indexOf('#'));
            }
            console.log(`Vaadin Request Path: ${urlPath}`);
            const fsPath = path.normalize(`${__dirname}/electron-vaadin/VAADIN/${urlPath}`);
            console.log(`Vaadin Request File: ${fsPath}`);
            callback({
                path: fsPath
            });
        }, (error) => {
            if (error) console.error('Failed to register protocol');
        });
    }
    const openWindow = function () {
        setupVaadinFilesService();
        mainWindow = new BrowserWindow({
            title: 'Title'
            , width: 1200
            , height: 800
            , frame: true
        });
        mainWindow.loadURL(appUrl);
        mainWindow.webContents.once('dom-ready', () => {
                console.log('main loaded')
                mainWindow.show()
                loading.hide()
                loading.close()
            })
            // uncomment to show debug tools
            // mainWindow.webContents.openDevTools();
        mainWindow.on('closed', function () {
            mainWindow = null;
        });
        mainWindow.on('close', function (e) {
            if (serverProcess) {
                var choice = require('electron').dialog.showMessageBox(this, {
                    type: 'question'
                    , buttons: ['Yes', 'No']
                    , title: 'Confirm'
                    , message: 'Are you sure you want to quit?'
                });
                if (choice == 1) {
                    e.preventDefault();
                }
            }
        });
    };
    const startUp = function () {
        const requestPromise = require('minimal-request-promise');
        requestPromise.get(appUrl).then(function (response) {
            console.log('Server started!');
            openWindow();
        }, function (response) {
            console.log('Waiting for the server start...');
            setTimeout(function () {
                startUp();
            }, 200);
        });
    };
    startUp();
    // Register a shortcut listener.
    const ret = globalShortcut.register('CommandOrControl+Shift+`', () => {
        console.log('Bring to front shortcut triggered');
        if (mainWindow) {
            mainWindow.focus();
        }
    })
});
app.on('will-quit', () => {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
});
