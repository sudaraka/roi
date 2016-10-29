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

import { join } from 'path'
import { optimize } from 'webpack'

export default {
  'context': join(__dirname, 'src'),

  'entry': { 'index.js': './index.js' },

  'output': {
    'path': join(__dirname, 'dist'),
    'publicPath': '/',
    'filename': '[name]'
  },

  'plugins': [
    new optimize.OccurenceOrderPlugin(),
    new optimize.DedupePlugin(),
    new optimize.UglifyJsPlugin({
      'minimize': true,
      'comments': false,
      'compressor': { 'warnings': false }
    })
  ]
}
