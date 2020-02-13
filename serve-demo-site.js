const path = require('path');
const express = require('express');

const PORT = 4000;
const COMPONENTS = ['Button', 'Spinner', 'Icon', 'TextInput'];

const app = express();

const coreCss = `
a.component-link{
   font-family: 'monospace'
}
div#app{
   padding: 10px;
}
div.container{
   display: flex;
   width: 100%
}
div.navigation{
   width: 10%;
   padding-left: 10px;
   padding-top: 15px;
   padding-bottom: 15px;
   background-color: #ddd
}
div.navigation div.header{
   font-weight: 500;
   margin-bottom: 10px
}
div.content{
   width: 80%
}
`;

const contentHTML = name => `
<div id="app"></div>
   <script src="/static/js/demo.bundle.js"></script>
   <script>
      XComponentDemos.default.${name}();
   </script>
`;

const layoutHTML = (title, content) => `
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <style>${coreCss}</style>
   <title>${title}</title>
</head>
<body>
<div class="container">
<div class="navigation">
<div class="header">Components</div>
<div>${COMPONENTS.sort().map(name => `<div><a class="component-link" href=${name}>${name}</a></div>`).join('')}</div>
</div>
<div class="content">${content}</div>
</div>
</body>
</html>
`;

app.use('/static/js', express.static(path.resolve(__dirname, 'lib')));
app.use('/', express.static(path.resolve(__dirname, 'demo-site')));
app.get('/', (req, res) => res.send(layoutHTML('X Components','')));
COMPONENTS.forEach(name => app.get(`/${name}`, (req, res) => res.send(layoutHTML(name, contentHTML(name)))));
app.listen(PORT, () => console.log(`Test server started at http://localhost:${PORT}`));