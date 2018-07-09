


const MiniCssExtractPlugin = require("mini-css-extract-plugin");
function cssLoaders( options ) {
  var options =  options || {};
  
  var cssLoader = {
    loader:'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader];
    if(loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    // 是否分离css文件
    if( options.cssExtract ) {
      // return ExtractTextPlugin.extract( {
      //   use: loaders,
      //   fallback: 'vue-style-loader'
      // })
      return MiniCssExtractPlugin.loader.concat( ['vue-style-loader'].concat(loaders))
    } else {
      return ['vue-style-loader'].concat(loaders);
    }
  }
  

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }

}

module.exports = function( options ) {

  var output = [];

  var loaders = cssLoaders( options );

  for(let extension in loaders) {
    var loader = loaders[extension];
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loader
    })
  }
  
  return output;

}