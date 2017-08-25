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
  MONTHS_PER_YR = 12,
  SECS_PER_MIN = 60,
  MINS_PER_HR = 60,
  HRS_PER_DAY = 24,
  DAYS_PER_YEAR = 365,
  MSS_PER_SEC = 1000,
  PERCENT = 100,

  numberFormat = (num, empty = '') => (parseFloat(num) || empty).toLocaleString('en', {
    'minimumFractionDigits': 2,
    'maximumFractionDigits': 2
  }),

  _nextMatuatiry = ({ amount, interestRate, investedDate, period }) => {
    const
      MILLISECONDS_PER_DAY = HRS_PER_DAY * MINS_PER_HR * SECS_PER_MIN * MSS_PER_SEC,
      MILLISECONDS_PER_YEAR = DAYS_PER_YEAR * MILLISECONDS_PER_DAY,

      _investedDate = investedDate.toDate ? investedDate.toDate() : new Date(investedDate),
      roi = amount * interestRate / PERCENT / DAYS_PER_YEAR * period,
      periodInMilliseconds = period * MILLISECONDS_PER_DAY,
      date = _investedDate.getTime() + periodInMilliseconds,
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
    'monthlyRevenue': account.amount * account.interestRate / PERCENT / MONTHS_PER_YR,
    'matuarities': _nextMatuatiry(account)
  }),

  formatValue = (field, value) => {
    if([
      'amount',
      'interestRate'
    ].includes(field)) {
      return parseFloat(value)
    }

    if([ 'period' ].includes(field)) {
      return parseInt(value, 10)
    }

    return value
  }

export { numberFormat, calculateReturns, formatValue }
