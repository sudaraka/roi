/**
 * src/components/columns/base/base.js: abstract column of the table
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
import { i, div, section, br } from '@cycle/dom'

import component from '../../helper'

export default component(() => ({
  'intent': src => src.props,

  'model': props$ => props$
    .map(props => xs.of(...[
      props.title,
      ...(props.header || Array(3)),
      ...(props.months || Array(12)),
      props.total || ''
    ]))
    .flatten(),

  'view': rows$ => rows$
    .map((row = { 'text': '' }) => {
      const
        children = (row.text || '')
          .toString()
          .split('|')
          .reduce((arr, word) => [ ...arr, word, br() ], [])

      return div(
        row.className ? `.${row.className}` : '',
        [
          ...children,
          row.icon ? i(`.fa fa-${row.icon}`) : ''
        ]
      )
    })
    .fold((acc, row$) => [ ...acc, row$ ], [])
    .last()
    .map(rows => section(rows))
}))
