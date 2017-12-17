const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


/*********************************
* Entry
*********************************/
function siteScripts(name) {
  return `./src/${name}.site.js`;
}

function siteStyles(name) {
  return `./src/sass/${name}.site.scss`;
}

function siteScriptsAndStyles(name) {
  return [
    siteScripts(name),
    siteStyles(name)
  ];
}

module.exports = {
  entry: {
    "main": siteScriptsAndStyles("main")
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: "/dist",
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          publicPath: "../",
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: { sourceMap: true }
            },
            {
              loader: "postcss-loader",
              options: { sourceMap: true }
            },
            {
              loader: "sass-loader",
              options: { sourceMap: true }
           }
          ]
        })
      },
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] },
      files: ['./dist/*']
    }),
    new ExtractTextPlugin({
      filename: '/css/[name].css',

    }),
  ],
  watch: true,
  devtool: 'source-map',
};