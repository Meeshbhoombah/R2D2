const path                = require('path')
,     webpack             = require('webpack')
,     HTMLWebpackPlugin   = require('html-webpack-plugin');


basePath = process.cwd();


module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      /* TODO: Aliases for Modules */
      src: path.resolve(basePath, 'src')
    }
  },

  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['react-hot-loader/babel', 'babel-preset-env'] 
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },


  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
   
    // build bundles in body of template 
    new HTMLWebpackPlugin({
      template: 'src/index.html'
    }),
    
    new webpack.DefinePlugin({
        'VERSION': JSON.stringify(require('./package.json').version)
    })
  ]
};
