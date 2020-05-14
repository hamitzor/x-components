const path = require('path');
const express = require('express');
const compression = require('compression');
const app = express();

const indexHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
   <title>Demo</title>
</head>
<body>
<div id="app"></div>
<script src="/static/js/demo.bundle.js"></script>
</body>
</html>
`;

app.use(compression());
app.use('/static/js', express.static(path.resolve(__dirname, 'lib')));
app.use('/', express.static(path.resolve(__dirname, 'demo-site')));
app.get('*', (req, res) => res.send(indexHTML));

exports.app = app;
