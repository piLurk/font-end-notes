var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  mode:'production',

  plugins: [
    new FriendlyErrorsPlugin()
  ]
}