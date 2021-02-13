const path = require('path');
const express = require('express');
const compression = require('compression');
const fs = require('fs');
const app = express();

const indexHTML = fs.readFileSync(path.resolve(__dirname, 'index.html')).toString();

app.use(compression());
app.get('*', (_, res) => res.send(indexHTML));

exports.app = app;