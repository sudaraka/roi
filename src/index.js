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

const
  drivers = { 'DOM': makeDOMDriver('#app') },

  identity = _ => _,

  component = (intent = identity) => (model = identity) => view => source => ({
    ...source,
    'DOM': view(model(intent(source)))
  }),

  column = source => {
    const
      intent = src => src.props,
      view = state$ => state$.map(state => section([ div(state.title) ]))

    return component(intent)()(view)(source)
  },

  hscroll = source => {
    const
      intent = src => src.props.columns,

      view = state$ => state$
        .map(title => column({ 'props': xs.of({ title }) }).DOM)
        .flatten()
        .fold((acc, col$) => [ ...acc, col$ ], [])
        .last()
        .map(columns => div('.hscroll', columns))

    return component(intent)()(view)(source)
  },

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
