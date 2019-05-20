module.exports = {
  isHot: true,
  // http-proxy-middleware: https://github.com/chimurai/http-proxy-middleware
  proxy: {},
  // babel-loader config: https://github.com/babel/babel-loader
  babelLoader: {},
  // postcss-sprites: https://github.com/2createStudio/postcss-sprites
  spritesConfig: {
    // dpr: v => `${v / 48}rem`,
  },
  // url-loader: https://github.com/webpack-contrib/url-loader
  urlLoader: {},
  // workbox-webpack-plugin: https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
  sw: {},
  // fork-ts-checker-webpack-plugin: https://github.com/Realytics/fork-ts-checker-webpack-plugin#readme
  tsChecker: {},
  extraDependencies: [],
  // twig loader by default
  // set 'false', without any preprocessor only css
  tmplLoader: {},
  // sass-loader by default
  styleLoader: {
  },
  // html-loader options
  htmlLoaderOptions: {},
  // webpack resolve.alias
  alias: {},
  provide: {},
  routerConfig: {
    'project/index.html': '/fes/info',
  },
  // https://github.com/webpack-contrib/css-loader#modules
  cssModules: 'global',
  dev: {
    port: 3000,
    autoOpen: true,
    qrcode: true,
    sourceMap: true,
    devtool: 'cheap-module-source-map',
  },
  build: {
    foolMode: false, // false
    debug: false,
    publicPath: '/',
    outputhPath: {
      // isHash: true,
      // css: {
      //   path: 'static/css/',
      // },
      // others: 'static/media/',
      // img: 'static/media/',
      // js: {
      //   path: 'static/js/',
      //   filename: '[name].[contenthash:8].js',
      //   chunck: '[name].[chunkhash:8].chunk.js',
      // },
    },
    report: false,
    isTmpl: true,
    sourceMap: false,
    devtool: false,
    // https://github.com/jantimon/html-webpack-plugin#minification
    htmlMinify: false,
    // https://github.com/NMFR/optimize-css-assets-webpack-plugin
    optimizeCssAssetsPlugin: {},
  },
  tmpl: {
    port: 3100,
    autoOpen: false,
    qrcode: true,
  },
  preview: {
    port: 3030,
    autoOpen: false,
    qrcode: true,
  },
};
