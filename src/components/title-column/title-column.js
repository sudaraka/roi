/**
 * src/components/title-column/title-column.js: title columns component
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
import moment from 'moment'

import component from '../helper'
import column from '../column'

export default component(() => ({
  'intent': () => {
    const
      months$ = xs.from(
        [ ...Array(12).keys() ]
          .map(index => ({ 'text': moment(`16-${index + 1}-1`, 'YY-M-D').format('MMMM') }))
      )

    return xs.of({
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
    })
  },

  'view': state$ => column({ 'props': state$ }).DOM
}))
