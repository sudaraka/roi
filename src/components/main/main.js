/**
 * src/components/main/main.js: main application component
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
import { div } from '@cycle/dom'

import component from 'Component/helper'
import column from 'Component/columns/base'
import titleColumn from 'Component/columns/title'
import hscroll from 'Component/hscroll'

import { getAccounts } from 'App/data'
import { calculateReturns } from 'App/helper'

export default component(() => ({
  'intent': () => xs.of({
    'accounts': xs.fromPromise(getAccounts()),

    'totalColumn': xs.of({ 'title': { 'text': 'Total' } })
  }),

  'model': state$ => state$.map(state => ({
    ...state,

    'accounts': state.accounts
      .map(accounts => xs.from(accounts))
      .flatten()
      .map(calculateReturns)
  })),

  'view': state$ => state$
    .map(state => xs.combine(
      titleColumn().DOM,
      hscroll({ 'props': { 'accounts': state.accounts } }).DOM,
      column({ 'props': state.totalColumn }).DOM
    ))
    .flatten()
    .map(table => div('.container', table))
}))
