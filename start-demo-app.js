const app = require('./demo-app').app;
const port = process.argv[2] ? process.argv[2] : 4000;
app.listen(port, () => console.log(`Test server started at http://localhost:${port}`));