/**
 * webpack-config/shared.js: Shared webpack configuration
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
import { DefinePlugin, IgnorePlugin, NamedModulesPlugin } from 'webpack'
import merge from 'webpack-merge'
import MinifyPlugin from 'babili-webpack-plugin'

export default env => {
  const
    baseConfig = {
      'context': resolve('src'),

      'output': {
        'path': resolve('dist'),
        'publicPath': './',
        'filename': '[name]'
      },

      'resolve': { 'alias': { 'App': resolve('src/') } },

      'module': {
        'loaders': [
          {
            'test': /\.js$/,
            'exclude': /node_modules/,
            'loaders': [ 'babel-loader' ]
          },
          {
            'test': /node_modules\/rc\/index\.js/,
            'loaders': [ 'shebang-loader' ]
          }
        ]
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
        new MinifyPlugin()
      ]
    },

    developmentConfig = {
      'performance': { 'hints': false },

      'plugins': [
        new DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('development') } }),
        new NamedModulesPlugin()
      ]
    }

  return merge(baseConfig, env.prod ? productionConfig : developmentConfig)
}
