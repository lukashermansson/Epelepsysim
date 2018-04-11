import electron from 'electron';
// Module to control application life.
import { app, Menu, BrowserWindow } from 'electron';
import path from 'path';
import URL from 'url';

app.disableHardwareAcceleration();


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../../build/icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.webContents.setFrameRate(60);

  Menu.setApplicationMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL(URL.format({
    pathname: path.join(__dirname, '../HTML/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// when app has loaded
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // OSX recreation
  if (mainWindow === null) {
    createWindow();
  }
});
