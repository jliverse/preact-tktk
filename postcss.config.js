const includeDebug = process.env.NODE_ENV === 'development';

const minifyPlugin = !includeDebug && {
  'postcss-import': {},
  'postcss-clean': {
    restructuring: false
  }
};

module.exports = {
  plugins: Object.assign({}, minifyPlugin, {
    autoprefixer: {
      browsers: [
        'IE 11',
        'last 2 Edge versions',
        'last 2 iOS versions',
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Safari versions'
      ]
    }
  })
};
