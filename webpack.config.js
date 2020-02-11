const path = require('path');
const main = {
   entry: './src/index.js',
   devtool: 'source-map',
   output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'x-components.bundle.js',
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
         }
      ]
   },
   watchOptions: {
      ignored: /node_modules/,
   }
};

const demo = {
   entry: './src/demos/index.js',
   devtool: 'source-map',
   output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'demo.bundle.js',
      libraryTarget: 'umd',
      library: 'XComponentDemos'
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
         }
      ]
   },
   watchOptions: {
      ignored: /node_modules/,
   }
};

module.exports = [demo];