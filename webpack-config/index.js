/**
 * webpack-config/index.js: Webpack configuration for web application (index.js)
 *
 * Copyright 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
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
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import merge from 'webpack-merge'

import sharedConfig from './shared'

export default env => {
  const
    baseConfig = {
      'target': 'electron-renderer',

      'entry': {
        'index.js': [
          './index.js',
          './main.sass'
        ]
      },

      'resolve': {
        'alias': {
          'Action': resolve('src/actions/'),
          'App': resolve('src/'),
          'Column': resolve('src/components/columns/'),
          'Component': resolve('src/components/'),
          'Data': resolve('src/data/'),
          'Form': resolve('src/components/forms/'),
          'Reducer': resolve('src/data/reducers/')
        }
      },

      'module': {
        'loaders': [
          {
            'test': /\.sass$/,
            'exclude': /node_modules/,
            'loaders': ExtractText.extract([
              'css-loader',
              'sass-loader'
            ])
          },
          {
            'test': /\.woff2/,
            'exclude': /node_modules/,
            'loaders': [ 'file-loader' ]
          }
        ]
      },

      'plugins': [
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

    productionConfig = {
      'plugins': [ new BundleAnalyzerPlugin({
        'analyzerMode': 'static',
        'openAnalyzer': false,
        'reportFilename': '../index-bundle-report.html'
      }) ]
    },

    developmentConfig = {}

  return merge(sharedConfig(env), baseConfig, env.prod ? productionConfig : developmentConfig)
}
