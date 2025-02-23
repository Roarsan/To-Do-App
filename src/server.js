import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

console.log(dirname(fileURLToPath(import.meta.url)));

