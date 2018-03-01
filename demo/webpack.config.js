module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  context: __dirname,
  entry: './entry.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                'react',
                'env',
                'stage-0'
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
  ]
}