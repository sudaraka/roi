/**
 * src/components/columns/Total/Total.js: total column component
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
import { numberFormat } from 'App/helper'
import Base from 'Column/Base'

const
  INITIAL_ACCOUNT_SUMMARY = {
    'amount': 0,
    'monthlyRevenue': 0,
    'months': [ ...Array(12) ].map(_ => 0)
  },

  accumiulateAccount = (obj, acc) => ({
    ...obj,
    'amount': obj.amount + acc.amount,
    'monthlyRevenue': obj.monthlyRevenue + acc.monthlyRevenue,
    'months': obj.months.map((rev, index) => rev + (acc.matuarities[index] || { 'roi': 0 }).roi)
  })

export default ({ accounts }) => {
  const
    totalData = accounts
      .reduce(accumiulateAccount, INITIAL_ACCOUNT_SUMMARY),

    grandTotal = totalData.months.reduce((sum, monthsTotal) => sum + monthsTotal, 0),

    columnData = {
      'title': { 'text': 'Total' },
      'header': [
        { 'text': numberFormat(totalData.amount) },
        { 'text': `${(grandTotal / totalData.amount * 100).toFixed(2)}%` },
        { 'text': numberFormat(totalData.monthlyRevenue) }
      ],
      'months': totalData.months.map(rev => ({ 'text': numberFormat(rev, 0) })),
      'total': { 'text': numberFormat(grandTotal) }
    }

  return <Base { ...columnData } />
}
