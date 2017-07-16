/**
 * webpack-config/app.js: Webpack configuration for desktop application (app.js)
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
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { DefinePlugin, IgnorePlugin, NamedModulesPlugin } from 'webpack'
import merge from 'webpack-merge'

export default env => {
  const
    baseConfig = {
      'target': 'electron-main',

      'context': resolve('src'),

      'entry': { 'app.js': './app.js' },

      'output': {
        'path': resolve('dist'),
        'publicPath': '/',
        'filename': '[name]'
      },

      'module': {
        'loaders': [ {
          'test': /\.js$/,
          'exclude': /node_modules/,
          'loaders': [ 'babel-loader' ]
        } ]
      },

      'plugins': [
        // Exclude moment.js locale from the build
        new IgnorePlugin(/locale/, /moment$/),
        new IgnorePlugin(/es5-ext/),
        new IgnorePlugin(/es6-(iterator|symbol)/)
      ]
    },

    productionConfig = {
      'plugins': [
        new DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
        new BundleAnalyzerPlugin({
          'analyzerMode': 'static',
          'openAnalyzer': false,
          'reportFilename': '../app-bundle-report.html'
        })
      ]
    },

    developmentConfig = {
      'plugins': [
        new DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('development') } }),
        new NamedModulesPlugin()
      ]
    }

  return merge(baseConfig, env.prod ? productionConfig : developmentConfig)
}
