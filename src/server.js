import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 5001;
dotenv.config();

// stores the current the path of the current directory
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

//serves the static files from public folder to the server
app.use(express.static(path.join(__dirname, '../public')));

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));