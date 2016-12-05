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

import component from '../helper'
import column from '../column'
import { numberFormat } from '../../helper'

export default component(() => ({
  'intent': src => src.props.account,

  'model': account$ => account$
    .map(acc => {
      const
        months = [ ...Array(12).keys() ]
          .map(index => ({ 'text': numberFormat((acc.matuarities[index] || {}).roi) }))

      return {
        'title': {
          'text': `${acc.type}|${acc._id}`,
          'className': 'action',
          'icon': 'pencil'
        },
        'header': [
          { 'text': numberFormat(acc.amount) },
          { 'text': `${acc.interestRate.toFixed(2)}%` },
          { 'text': numberFormat(acc.monthlyRevenue) }
        ],
        months
      }
    }),

  'view': state$ => column({ 'props': state$ }).DOM
}))
