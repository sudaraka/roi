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

const
  numberFormat = (num, empty = '') => (parseFloat(num) || empty).toLocaleString('en', {
    'minimumFractionDigits': 2,
    'maximumFractionDigits': 2
  }),

  _nextMatuatiry = ({ amount, interestRate, investedDate, period }) => {
    investedDate = investedDate.toDate ? investedDate.toDate() : new Date(investedDate)

    const
      roi = amount * interestRate / 100 / 365 * period,
      periodInMilliseconds = period * 24 * 60 * 60 * 1000,
      date = investedDate.getTime() + periodInMilliseconds,
      now = (new Date()).getTime(),
      yearFromNow = now + (365 * 24 * 60 * 60 * 1000),
      periodFromNow = now + periodInMilliseconds,
      next = {
        amount,
        interestRate,
        period,
        'investedDate': new Date(date)
      }

    if(date >= yearFromNow) {
      // Resulting date is more than 1 year after today
      // Terminal condition!

      return {}
    }

    if(date <= now) {
      // Resulting date has passed
      // Continue calculation without taking this occurrence in to account

      return { ..._nextMatuatiry(next) }
    }

    return {
      [`${new Date(date).getMonth()}`]: {
        roi,
        'date': new Date(date),
        'isNext': date >= now && date <= periodFromNow
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
