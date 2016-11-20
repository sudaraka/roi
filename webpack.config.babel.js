/**
 * webpack.config.babel.js: Webpack configuration
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import { resolve } from 'path'
import ExtractText from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { IgnorePlugin, NamedModulesPlugin } from 'webpack'
import merge from 'webpack-merge'

export default env => {
  const
    baseConfig = {
      'context': resolve('src'),

      'entry': {
        'index.js': [
          './index.js',
          './main.sass'
        ]
      },

      'output': {
        'path': resolve('dist'),
        'publicPath': '/',
        'filename': '[name]'
      },

      'module': {
        'loaders': [
          {
            'test': /\.js$/,
            'exclude': /node_modules/,
            'loaders': [ 'babel-loader' ]
          },
          {
            'test': /\.sass$/,
            'exclude': /node_modules/,
            'loaders': ExtractText.extract([ 'css-loader', 'sass-loader' ])
          }
        ]
      },

      'plugins': [
        // Exclude moment.js locale from the build
        new IgnorePlugin(/locale/, /moment$/),

        new HtmlWebpackPlugin({
          'filename': 'index.html',
          'template': './index.html',
          'minify': {
            'collapseBooleanAttributes': true,
            'collapseInlineTagWhitespace': true,
            'collapseWhitespace': true,
            'decodeEntities': true,
            'removeAttributeQuotes': true,
            'removeComments': true,
            'removeEmptyAttributes': true,
            'removeRedundantAttributes': true,
            'removeScriptTypeAttributes': true,
            'removeStyleLinkTypeAttributes': true,
            'useShortDoctype': true
          }
        }),
        new ExtractText('styles.css')
      ]
    },

    productionConfig = {},

    developmentConfig = {
      'plugins': [
        new NamedModulesPlugin()
      ],

      'devtool': 'eval',

      'devServer': {
        'host': '127.0.0.1',
        'port': 5000
      }
    }

  return merge(baseConfig, env.prod ? productionConfig : developmentConfig)
}
