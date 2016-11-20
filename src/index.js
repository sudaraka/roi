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

import { run } from '@cycle/xstream-run'
import { makeDOMDriver } from '@cycle/dom'
import { restartable } from 'cycle-restart'

import main from './components/main'

const
  drivers = { 'DOM': restartable(makeDOMDriver('#app'), { 'pauseSinksWhileReplaying': false }) }

run(main, drivers)

if(module.hot) {
  module.hot.accept()
}
