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
import moment from 'moment'

import component from './component.js'

const
  drivers = { 'DOM': makeDOMDriver('#app') },

  column = component(() => ({
    'intent': src => src.props,

    'model': props$ => {
      const
        title$ = props$.map(props => props.title),

        months$ = props$
          .map(props => props.months || xs.of(...Array(12)))
          .flatten(),

        total$ = props$
          .map(props => props.total || xs.of(''))
          .flatten()

      return xs.merge(title$, months$, total$)
    },

    'view': rows$ => rows$
      .map(text => div(text))
      .fold((acc, row$) => [ ...acc, row$ ], [])
      .last()
      .map(rows => section(rows))
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
      months$ = xs.from([ ...Array(12).keys() ].map(index => moment(`16-${index + 1}-1`, 'YY-M-D').format('MMMM'))),

      titleColumn$ = column({
        'props': xs.of({
          'title': 'Account',
          'months': months$
        })
      }).DOM,

      hscroll$ = hscroll({ 'props': { 'columns': xs.of('one', 'two', 'three', 'four', 'five') } }).DOM,

      totalColumn$ = column({ 'props': xs.of({ 'title': 'yyy' }) }).DOM

    return {
      'DOM': xs.combine(titleColumn$, hscroll$, totalColumn$)
        .map(col => div('.container', col))
    }
  }

run(main, drivers)
