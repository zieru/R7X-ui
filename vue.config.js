const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const CompressionPlugin = require('compression-webpack-plugin')
const buildDate = JSON.stringify(new Date())
const { GenerateSW } = require('workbox-webpack-plugin')
const WebpackBar = require('webpackbar')
// const zlib = require('zlib')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    /* vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios' */
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    /* '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js' */
  ]
}

// vue.config.js
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

const vueConfig = {
   pwa: {
     manifestOptions: {
       start_url: '/',
       display: 'standalone'
     },
     name: 'Sabian'
   },
  configureWebpack: {
    optimization: {
       splitChunks: {
        minSize: 2500000,
        maxSize: 250000000
      }
    },
    // webpack plugins
    plugins: [
      new GenerateSW(),
      new WebpackBar(),
      new webpack.DefinePlugin({
      'process.env': {
          PACKAGE_VERSION: '"' + version + '"',
          PACKAGE_VERSION_BUILD_DATE: buildDate,
          NODE_ENV: '"production"'
        },
	'process.env.NODE_ENV': JSON.stringify('production')
      }),
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CompressionPlugin({
        compressionOptions: { level: 5 },
        deleteOriginalAssets: true
      })
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },

  chainWebpack: (config) => {
    // and this line
    config.plugin('CompressionPlugin').use(CompressionPlugin)
    config.resolve.alias
      .set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    config.plugins.delete('progress')
    // optionally replace with another progress output plugin
    // `npm i -D simple-progress-webpack-plugin` to use
    // config.plugin('simple-progress-webpack-plugin').use(require.resolve('simple-progress-webpack-plugin'), [
    //  {
     //   format: 'compact' // options are minimal, compact, expanded, verbose
     // }
    // ])
    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // less vars，customize ant design theme
            'primary-color': '#f5222d',
            'link-color': '#f5222d',
            'border-radius-base': '4px'
          },
          // DO NOT REMOVE THIS LINE
          javascriptEnabled: true
        }
      }
    }
  },

  devServer: {
    headers: {
	'Access-Control-Allow-Origin': '*'
	},
    overlay: {
      warnings: false,
      errors: true
    },
    // development server port 8000
    port: 8000
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    // proxy: {
    //   '/api': {
    //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
if (process.env.VUE_APP_PREVIEW === 'true') {
  // console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
}

module.exports = vueConfig
