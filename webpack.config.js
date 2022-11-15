const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/App.jsx',
  output: {
    filename: 'App.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
    ],
  },
};
