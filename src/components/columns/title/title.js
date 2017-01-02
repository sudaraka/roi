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

import { div } from '@cycle/dom'

import component from 'Component/helper'
import column from 'Component/columns/base'

export default component(() => ({
  'model': src => {
    const
      months = [ ...Array(12).keys() ]
        .map(index => ({ 'text': new Date(`2017-${index + 1}-1`).toLocaleFormat('%B') }))

    return src.DOM.select('.action-add').events('click')
      // Simply toggle the current state
      .fold(ev => !ev, false)
      .map(toggle => ({
        'title': {
          'text': 'Account',
          'className': 'action action-add',
          'icon': 'plus',
          'dialog': toggle ? div('Popover dialog') : null
        },
        'header': [
          { 'text': 'Amount' },
          { 'text': 'Interest Rate' },
          { 'text': 'Revenue / Month' }
        ],
        months
      }))
  },

  'view': state$ => column({ 'props': state$ }).DOM
}))
