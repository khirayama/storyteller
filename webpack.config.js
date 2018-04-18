const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/docs',
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

if (process.env.NODE_ENV === 'production') {
  config.output = {
    filename: 'index.js',
    path: __dirname + '/lib',
  };
} else {
  config.devtool = 'inline-source-map';
}

module.exports = config;
