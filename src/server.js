import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5001;

// stores the cuurent the path of the current directory
const __dirname = dirname(fileURLToPath(import.meta.url));

//serves the static files from public folder to the server
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));



