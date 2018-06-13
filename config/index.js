// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/vue-admin/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    host: 'localhost',
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/*': {
        // target: 'https://m.baomaiduole.com/api',
        target: 'http://localhost:18391/',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: { '^/api': 'http://localhost:8080/'}},
      // '/api/*': { target: 'http://bmdl.api.chenzhen.shop/api', pathRewrite: { '^/api': '/'}},
      // '/bmdl/*': { target: 'http://localhost:18091/', pathRewrite: { '/bmdl': '/'}}
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  }
  // proxyTable: {
  //   '/api': {  //使用"/api"来代替"http://f.apiplus.c"
  //     target: 'http://f.apiplus.cn', //源地址
  //     changeOrigin: true, //改变源
  //     pathRewrite: {
  //       '^/api': 'http://f.apiplus.cn' //路径重写
  //       }
  //   }
  // }
}
