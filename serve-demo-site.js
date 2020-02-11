const path = require('path');
const express = require('express');
const { camelCase, paramCase } = require('change-case');

const PORT = 4000;
const DEMO_PAGES = ['Button Demo', 'Spinner Demo', 'Icon Demo'];

const app = express();

const coreCss = `
body {
  font-size: 14px;
  font-family: 'Roboto'
}
`;

const indexPageHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <style>${coreCss}</style>
   <title>XComponent Demos</title>
</head>
<body>
   ${DEMO_PAGES.map(name => `<div><a href=${paramCase(name)}>${name}</a></div>`).join('')}
</body>
</html>
`;

const generateDemoPageHTML = name => `
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <style>${coreCss}</style>
   <title>${name}</title>
</head>
<body>
   <div id="app"></div>
   <script src="/static/js/demo.bundle.js"></script>
   <script>
      XComponentDemos.default.${camelCase(name)}();
   </script>
</body>
</html>
`;

app.use('/static/js', express.static(path.resolve(__dirname, 'lib')));
app.use('/', express.static(path.resolve(__dirname, 'demo-site')));
app.get('/', (req, res) => res.send(indexPageHTML));
DEMO_PAGES.forEach(name => app.get(`/${paramCase(name)}`, (req, res) => res.send(generateDemoPageHTML(name))));
app.listen(PORT, () => console.log(`Test server started at http://localhost:${PORT}`));