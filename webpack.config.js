const path = require('path');
const main = {
   entry: './src/index.js',
   devtool: 'source-map',
   output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'x-components.js',
      libraryTarget: 'commonjs2',
      library: 'X',
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
      aggregateTimeout: 300,
      ignored: /node_modules/,
   }
};

const demo = {
   entry: './demo/index.js',
   devtool: 'source-map',
   output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'demo.bundle.js',
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
      aggregateTimeout: 300,
      ignored: /node_modules/,
   }
};

module.exports = [demo, main];