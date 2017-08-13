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

import rc from 'rc'

import { name } from '../package.json'

const
  appName = name.split('/').pop() || 'roi',
  DEFAULT_CONFIG = { 'db': { 'url': null } }

export default rc(appName, DEFAULT_CONFIG)
