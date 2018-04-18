const path = require('path');

const config = {
  entry: {
    basic: './basic/index.js',
    twitter: './twitter/index.js',
  },
  output: {
    filename: '[name]/bundle.js',
    path: path.join(__dirname, '../', 'docs'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
      },
    }],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
};

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'inline-source-map';
}

module.exports = config;
