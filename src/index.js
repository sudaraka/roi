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
import { i, div, section, makeDOMDriver } from '@cycle/dom'
import moment from 'moment'

import component from './component.js'

const
  drivers = { 'DOM': makeDOMDriver('#app') },

  column = component(() => ({
    'intent': src => src.props,

    'model': props$ => {
      const
        title$ = props$.map(props => props.title),

        header$ = props$
          .map(props => props.header || xs.of(...Array(3)))
          .flatten(),

        months$ = props$
          .map(props => props.months || xs.of(...Array(12)))
          .flatten(),

        total$ = props$
          .map(props => props.total || xs.of(''))
          .flatten()

      return xs.merge(title$, header$, months$, total$)
    },

    'view': rows$ => rows$
      .map((row = { 'text': '' }) => div(
        row.className ? `.${row.className}` : '',
        [
          row.text,
          row.icon ? i(`.fa fa-${row.icon}`) : ''
        ]
      ))
      .fold((acc, row$) => [ ...acc, row$ ], [])
      .last()
      .map(rows => section(rows))
  })),

  hscroll = component(() => ({
    'intent': src => src.props.columns,

    'view': state$ => state$
      .map(text => column({ 'props': xs.of({ 'title': { text } }) }).DOM)
      .flatten()
      .fold((acc, col$) => [ ...acc, col$ ], [])
      .last()
      .map(columns => div('.hscroll', columns))
  })),

  main = component(() => ({
    'intent': () => {
      const
        months$ = xs.from(
          [ ...Array(12).keys() ]
            .map(index => ({ 'text': moment(`16-${index + 1}-1`, 'YY-M-D').format('MMMM') }))
        )

      return xs.of({
        'titleColumn': xs.of({
          'title': {
            'text': 'Account',
            'className': 'action',
            'icon': 'plus'
          },
          'header': xs.of(
            { 'text': 'Amount' },
            { 'text': 'Interest Rate' },
            { 'text': 'Revenue / Month' }
          ),
          'months': months$
        }),

        'accounts': xs.of('one', 'two', 'three', 'four', 'five'),

        'totalColumn': xs.of({ 'title': { 'text': 'Total' } })
      })
    },

    'view': state$ => state$
      .map(state => xs.combine(
        column({ 'props': state.titleColumn }).DOM,
        hscroll({ 'props': { 'columns': state.accounts } }).DOM,
        column({ 'props': state.totalColumn }).DOM
      ))
      .flatten()
      .map(table => div('.container', table))
  }))

run(main, drivers)
