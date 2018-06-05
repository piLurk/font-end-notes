

module.exports = {
  mode:'production',
  module:{
    rules: [
        {
          test: /\.s?[ac]ss$/,
          use: [
            {loader: 'vue-style-loader', options: { sourceMap: false }}
            {'css-loader', options: { sourceMap: false }},
            {'postcss-loader', options: { sourceMap: false }},
            {'sass-loader', options: { sourceMap: false }},
          ],
        }
      ]
  },
  plugins: [
  ]
}