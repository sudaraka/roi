/**
 * webpack.config.babel.js: Main webpack configuration
 *
 * Copyright 2016, 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import indexConfig from './webpack-config/index'
import appConfig from './webpack-config/app'

export default env => [
  indexConfig(env),
  appConfig(env)
]
