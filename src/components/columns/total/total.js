/**
 * src/components/columns/total/total.js: total column component
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
  'intent': src => src.accounts,

  'model': accounts$ => accounts$
    .fold((obj, acc) => ({
      ...obj,
      'amount': obj.amount + acc.amount,
      'monthlyRevenue': obj.monthlyRevenue + acc.monthlyRevenue,
      'months': obj.months.map((rev, index) => rev + (acc.matuarities[index] || { 'roi': 0 }).roi)
    }), {
      'amount': 0,
      'monthlyRevenue': 0,
      'months': [ ...Array(12) ].map(_ => 0)
    })
    .last()
    .map(data => ({
      ...data,
      'grandTotal': data.months.reduce((total, rev) => total + rev, 0)
    }))
    .map(data => ({
      'title': { 'text': 'Total' },
      'header': [
        { 'text': numberFormat(data.amount, 0) },
        { 'text': `${(data.grandTotal / data.amount * 100).toFixed(2)}%` },
        { 'text': numberFormat(data.monthlyRevenue, 0) }
      ],
      'months': data.months.map(rev => ({ 'text': numberFormat(rev, 0) })),
      'total': { 'text': numberFormat(data.grandTotal, 0) }
    })),

  'view': state$ => column({ 'props': state$ }).DOM
}))
