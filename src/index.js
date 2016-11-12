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
import { div, section, makeDOMDriver } from '@cycle/dom'

import component from './component.js'

const
  drivers = { 'DOM': makeDOMDriver('#app') },

  column = component(() => ({
    'intent': src => src.props,

    'view': state$ => state$.map(state => section([ div(state.title) ]))
  })),

  hscroll = component(() => ({
    'intent': src => src.props.columns,

    'view': state$ => state$
      .map(title => column({ 'props': xs.of({ title }) }).DOM)
      .flatten()
      .fold((acc, col$) => [ ...acc, col$ ], [])
      .last()
      .map(columns => div('.hscroll', columns))
  })),

  main = () => {
    const
      titleColumn$ = column({ 'props': xs.of({ 'title': 'xxx' }) }).DOM,
      hscroll$ = hscroll({ 'props': { 'columns': xs.of('one', 'two', 'three', 'four', 'five') } }).DOM,
      totalColumn$ = column({ 'props': xs.of({ 'title': 'yyy' }) }).DOM

    return {
      'DOM': xs.combine(titleColumn$, hscroll$, totalColumn$)
        .map(col => div('.container', col))
    }
  }

run(main, drivers)
