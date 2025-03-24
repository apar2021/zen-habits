import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';
import Store from 'electron-store';

const store = new Store();

// Initialize database
const dbPath = path.join(app.getPath('userData'), 'zen-habits.db');
const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    streak INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// User operations
export const createUser = (username: string, email: string, password: string) => {
  try {
    const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
    const result = stmt.run(username, email, password);
    return { success: true, userId: result.lastInsertRowid };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUser = (username: string, password: string) => {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
  return stmt.get(username, password);
};

// Habit operations
export const getHabits = (userId: number) => {
  const stmt = db.prepare('SELECT * FROM habits WHERE user_id = ?');
  return stmt.all(userId);
};

export const addHabit = (userId: number, title: string) => {
  const stmt = db.prepare('INSERT INTO habits (user_id, title) VALUES (?, ?)');
  const result = stmt.run(userId, title);
  return { success: true, habitId: result.lastInsertRowid };
};

export const updateHabit = (habitId: number, completed: boolean, streak: number) => {
  const stmt = db.prepare('UPDATE habits SET completed = ?, streak = ? WHERE id = ?');
  return stmt.run(completed, streak, habitId);
};

export const deleteHabit = (habitId: number) => {
  const stmt = db.prepare('DELETE FROM habits WHERE id = ?');
  return stmt.run(habitId);
};

// Note operations
export const getNotes = (userId: number, date: string) => {
  const stmt = db.prepare('SELECT * FROM notes WHERE user_id = ? AND date = ?');
  return stmt.get(userId, date);
};

export const saveNote = (userId: number, date: string, text: string) => {
  const existingNote = getNotes(userId, date);
  if (existingNote) {
    const stmt = db.prepare('UPDATE notes SET text = ? WHERE user_id = ? AND date = ?');
    return stmt.run(text, userId, date);
  } else {
    const stmt = db.prepare('INSERT INTO notes (user_id, date, text) VALUES (?, ?, ?)');
    return stmt.run(userId, date, text);
  }
};

export const deleteNote = (userId: number, date: string) => {
  const stmt = db.prepare('DELETE FROM notes WHERE user_id = ? AND date = ?');
  return stmt.run(userId, date);
}; 