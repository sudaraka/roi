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
import moment from 'moment'

import component from '../helper'
import column from '../column'
import hscroll from '../hscroll'

export default component(() => ({
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
