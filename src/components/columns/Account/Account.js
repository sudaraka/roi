/**
 * src/components/columns/Account/Account.js: account column component
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
import moment from 'moment'

import { numberFormat } from 'App/helper'
import Base from 'Column/Base'

export default ({ type, number, amount, interestRate, monthlyRevenue, matuarities }) => {
  const
    months = [ ...Array(12) ].map(
      (_, index) => {
        const
          matuarity = matuarities[index] || {}

        return {
          'text': numberFormat(matuarity.roi),
          'note': matuarity.isNext ? moment(matuarity.date).format('dddd, MMMM Do, YYYY') : null,
          'icon': matuarity.isNext ? 'flag' : null,
          'className': matuarity.isNext ? 'next' : null
        }
      }
    ),

    columnData = {
      'title': {
        'text': `${type}|${number}`,
        'className': 'action',
        'icon': 'pencil'
      },
      'header': [
        { 'text': numberFormat(amount) },
        { 'text': `${interestRate.toFixed(2)}%` },
        { 'text': numberFormat(monthlyRevenue) }
      ],
      months,
      'total': {
        'text': numberFormat(
          Object.values(matuarities)
            .reduce((sum, matuarity) => sum + matuarity.roi, 0)
        )
      }
    }

  return <Base { ...columnData } />
}
