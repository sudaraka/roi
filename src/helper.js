/**
 * src/helper.js: shared helper functions
 *
 * Copyright 2016, 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
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
      DAYS_PER_YEAR = 365,
      MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000,
      MILLISECONDS_PER_YEAR = DAYS_PER_YEAR * MILLISECONDS_PER_DAY,

      roi = amount * interestRate / 100 / DAYS_PER_YEAR * period,
      periodInMilliseconds = period * MILLISECONDS_PER_DAY,
      date = investedDate.getTime() + periodInMilliseconds,
      now = (new Date()).getTime(),
      yearFromNow = now + MILLISECONDS_PER_YEAR,
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
  }),

  formatValue = (field, value) => {
    if([
      'amount',
      'interestRate'
    ].includes(field)) {
      return parseFloat(value)
    }

    return value
  }

export { numberFormat, calculateReturns, formatValue }
