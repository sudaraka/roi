/**
 * src/components/columns/title/title.js: title column component
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

import component from 'Component/helper'
import column from 'Component/columns/base'

export default component(() => ({
  'intent': () => {
    const
      months = [ ...Array(12).keys() ]
        .map(index => ({ 'text': moment(`16-${index + 1}-1`, 'YY-M-D').format('MMMM') }))

    return xs.of({
      'title': {
        'text': 'Account',
        'className': 'action',
        'icon': 'plus'
      },
      'header': [
        { 'text': 'Amount' },
        { 'text': 'Interest Rate' },
        { 'text': 'Revenue / Month' }
      ],
      months
    })
  },

  'view': state$ => column({ 'props': state$ }).DOM
}))