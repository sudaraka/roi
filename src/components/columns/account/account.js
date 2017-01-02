/**
 * src/components/columns/account/account.js: account column component
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import component from 'Component/helper'
import column from 'Component/columns/base'
import { numberFormat } from 'App/helper'

export default component(() => ({
  'intent': src => src.account,

  'model': account$ => account$
    .map(acc => {
      const
        months = [ ...Array(12).keys() ]
          .map(index => {
            const
              matuarity = acc.matuarities[index] || {}

            return {
              'text': numberFormat(matuarity.roi),
              'note': matuarity.isNext ? matuarity.date.toLocaleFormat('%A, %B %d, %Y') : null,
              'icon': matuarity.isNext ? 'flag' : null,
              'className': matuarity.isNext ? 'next' : null
            }
          })

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
        months,
        'total': {
          'text': numberFormat(
            Object.values(acc.matuarities)
              .reduce((sum, matuarity) => sum + matuarity.roi, 0)
          )
        }
      }
    }),

  'view': state$ => column({ 'props': state$ }).DOM
}))
