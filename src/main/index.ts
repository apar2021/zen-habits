import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import {
  createUser,
  getUser,
  getHabits,
  addHabit,
  updateHabit,
  deleteHabit,
  getNotes,
  saveNote,
  deleteNote,
} from './database';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload.js'),
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// User operations
ipcMain.handle('create-user', async (_, { username, email, password }) => {
  return createUser(username, email, password);
});

ipcMain.handle('login', async (_, { username, password }) => {
  return getUser(username, password);
});

// Habit operations
ipcMain.handle('get-habits', async (_, userId) => {
  return getHabits(userId);
});

ipcMain.handle('add-habit', async (_, { userId, title }) => {
  return addHabit(userId, title);
});

ipcMain.handle('update-habit', async (_, { habitId, completed, streak }) => {
  return updateHabit(habitId, completed, streak);
});

ipcMain.handle('delete-habit', async (_, habitId) => {
  return deleteHabit(habitId);
});

// Note operations
ipcMain.handle('get-notes', async (_, { userId, date }) => {
  return getNotes(userId, date);
});

ipcMain.handle('save-note', async (_, { userId, date, text }) => {
  return saveNote(userId, date, text);
});

ipcMain.handle('delete-note', async (_, { userId, date }) => {
  return deleteNote(userId, date);
}); 