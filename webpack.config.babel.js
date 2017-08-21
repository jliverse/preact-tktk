import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import { resolve } from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MinifyPlugin from 'babel-minify-webpack-plugin';

const includeDebug = process.env.NODE_ENV === 'development';
const lessLoaders = [
  'style-loader',
  {
    loader: 'css-loader',
    options: { sourceMap: includeDebug }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: includeDebug
    }
  },
  'resolve-url-loader',
  {
    loader: 'less-loader',
    options: { sourceMap: includeDebug }
  }
].filter(Boolean);
const lessExtractLoader = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['postcss-loader', 'resolve-url-loader', 'less-loader'].filter(Boolean)
});

module.exports = {
  devtool: includeDebug ? 'source-map' : undefined,
  devServer: {
    port: process.env.PORT || 3080,
    host: process.env.HOST || '0.0.0.0'
  },
  entry: {
    app: ['./src/index']
  },
  output: {
    path: resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: includeDebug
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: { collapseWhitespace: !includeDebug }
    }),
    !includeDebug && new MinifyPlugin({}, { comments: false })
  ].filter(Boolean),
  module: {
    rules: [
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'raw-loader' },
      { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.(jpg|png|gif|svg)$/, use: 'url-loader' },
      { test: /\.(ttf)$/, use: 'file-loader' },
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        use: includeDebug ? lessLoaders : lessExtractLoader
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.less'],
    alias: {
      // NOTE: Convenience aliases are repeated in package.json moduleNameMapper.
      components: resolve(__dirname, 'src/components'),
      css: resolve(__dirname, 'src/css'),
      lib: resolve(__dirname, 'src/lib')
    }
  }
};
