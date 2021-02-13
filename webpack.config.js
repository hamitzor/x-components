const path = require('path');

const demo = {
   entry: './src/demos/index.js',
   devtool: 'source-map',
   output: {
      path: path.resolve(__dirname, 'dist'),
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
      ignored: /node_modules/,
   }
};

module.exports = [demo];
