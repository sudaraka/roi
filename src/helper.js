/**
 * src/helper.js: shared helper functions
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import moment from 'moment'

const
  numberFormat = num => (parseFloat(num) || '').toLocaleString('en', {
    'minimumFractionDigits': 2,
    'maximumFractionDigits': 2
  }),

  _nextMatuatiry = ({ amount, interestRate, investedDate, period }) => {
    const
      roi = amount * interestRate / 100 / 365 * period,
      date = moment(investedDate).add(period, 'days'),
      next = {
        amount,
        interestRate,
        period,
        'investedDate': date
      }

    if(date.isAfter(moment().add(1, 'year'))) {
      // Resulting date is more than 1 year after today
      // Terminal condition!

      return {}
    }

    if(date.isBefore(moment())) {
      // Resulting date has passed
      // Continue calculation without taking this occurrence in to account

      return { ..._nextMatuatiry(next) }
    }

    return {
      [`${date.month()}`]: {
        roi,
        date,
        'isNext': date.isBetween(moment(), moment().add(period, 'days'))
      },
      ..._nextMatuatiry(next)
    }
  },

  calculateReturns = account => ({
    ...account,
    'monthlyRevenue': account.amount * account.interestRate / 100 / 12,
    'matuarities': _nextMatuatiry(account)
  })

export { numberFormat, calculateReturns }
