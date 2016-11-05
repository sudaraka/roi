/**
 * src/index.js: main application entry point
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import xs from 'xstream'
import { run } from '@cycle/xstream-run'
import { section, makeDOMDriver } from '@cycle/dom'

const
  drivers = { 'DOM': makeDOMDriver('#app') },

  main = () => ({ 'DOM': xs.of(section('Column 1')) })

run(main, drivers)
