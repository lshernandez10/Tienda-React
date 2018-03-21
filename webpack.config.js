/*
 ./webpack.config.js
*/
const path = require('path'); // path utility
const HtmlWebpackPlugin = require('html-webpack-plugin');
// init HTML Webpack Plugin
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
 template: './public/index.html', // archivo de nuestra vista
 inject: 'body' // donde insertaremos nuestro script
})
const config = {
 entry: './src/index.js', // archivo js que codearemos
 output: {
  path: path.resolve('./public'), //resolver el path de salida
  filename: 'bundle.js' // archivo js compilado
 },
 module: {
  loaders: [
   {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
   },
   {
    test: /\.jsx$/,
    loader: 'babel-loader',
    exclude: /node_modules/
   }
  ]
 },
 resolve: {
  extensions: ['.js', '.jsx']
 },
 plugins: [HtmlWebpackPluginConfig] // configuración de nuestra vista
}
module.exports = config; //exportamos a webpack nuestra configuración
