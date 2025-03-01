import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Opens the database connection
const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
});


await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        tasks TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
`);

export default db;
