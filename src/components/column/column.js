/**
 * src/components/column/column.js: abstract column of the table
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
import { i, div, section } from '@cycle/dom'

import component from '../helper'

export default component(() => ({
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
}))
