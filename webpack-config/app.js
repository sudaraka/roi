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

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import merge from 'webpack-merge'

import sharedConfig from './shared'

export default env => {
  const
    baseConfig = {
      'target': 'electron-main',

      'entry': { 'app.js': './app.js' }
    },

    productionConfig = {
      'plugins': [ new BundleAnalyzerPlugin({
        'analyzerMode': 'static',
        'openAnalyzer': false,
        'reportFilename': '../app-bundle-report.html'
      }) ]
    },

    developmentConfig = {}

  return merge(sharedConfig(env), baseConfig, env.prod ? productionConfig : developmentConfig)
}
