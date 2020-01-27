import path from 'path';
import express from 'express';
const PORT = 4000;
const app = express();
app.use('/static/js', express.static(path.resolve(__dirname, 'lib')));
app.use('/static', express.static(path.resolve(__dirname, 'public')));
app.all('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public/index.html')));
app.listen(PORT, () => console.log(`Test server started at http://localhost:${PORT}`));