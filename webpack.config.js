const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new ExtractTextPlugin('style.css')
      ],
    module: {
      rules: [
        {
          use: 'babel-loader',
          test: /\.js$/
        }, {
          use: ExtractTextPlugin.extract({
            use: "css-loader",
            fallback: "style-loader"
          }),
          test: /\.css$/
        }
      ]
    }
}
