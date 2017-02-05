/**
 * src/components/columns/Title/Title.js: title column component
 *
 * Copyright 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import { h } from 'preact'
import 'datejs'

import Base from 'Column/Base'

export default () => {
  const
    months = [ ...Array(12) ].map(
      (_, index) => ({ 'text': (new Date(`2017-${index + 1}-1`)).format('%B') })
    ),

    columnData = {
      'title': {
        'text': 'Account',
        'className': 'action action-add',
        'icon': 'plus'
      },
      'header': [
        { 'text': 'Amount' },
        { 'text': 'Interest Rate' },
        { 'text': 'Revenue / Month' }
      ],
      months
    }

  return <Base { ...columnData } />
}
