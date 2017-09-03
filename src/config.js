/**
 * src/config.js: load application configuration and expose them
 *
 * Copyright 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import Configstore from 'configstore'

import { name } from '../package.json'

const
  appName = name.split('/').pop() || 'roi',
  DEFAULT_CONFIG = { 'db': { 'url': null } },
  config = new Configstore(appName, DEFAULT_CONFIG)

export default config.all
