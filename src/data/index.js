/**
 * src/data/index.js: handle pouchdb operations and expose data to the
 * application
 *
 * Copyright 2016, 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import moment from 'moment'

import { calculateReturns } from 'App/helper'
import getDB from './db'

const
  DEFAULT_PERIOD = 91,

  DEFAULT_ACCOUNT = {
    'type': 'FD',
    'number': '',
    'amount': null,
    'interestRate': null,
    'investedDate': moment().format('YYYY-MM-DD'),
    'period': DEFAULT_PERIOD
  },

  { db, sync } = getDB('roi-accounts'),

  syncEvent = (event, f) => {
    if(!sync || 'function' !== typeof f) {
      return false
    }

    sync.on(event, f)

    return true
  },

  createAccount = ({
    type,
    number,
    amount,
    interestRate,
    investedDate,
    period = DEFAULT_PERIOD
  }) => db
    .post({
      type,
      number,
      'amount': parseFloat(amount) || 0,
      'interestRate': parseFloat(interestRate) || 0,
      investedDate,
      'period': period || DEFAULT_ACCOUNT.period
    })
    .catch(err => {
      console.error(err)

      return null
    })
    // Return the updated document from database to update the Redux store
    .then(getAccount),

  setAccount = account => db
    .get(account._id.toString())
    .then(doc => db.put({
      '_id': doc._id,
      '_rev': doc._rev,
      ...account
    }))
    .catch(err => {
      console.error(err)

      return null
    })
    // Return the updated document from database to update the Redux store
    .then(getAccount),

  getAccounts = () => db.allDocs({ 'include_docs': true })
    .catch(err => {
      console.error(err)

      return { 'rows': [] }
    })
    .then(result => [ ...result.rows.map(record => record.doc) ])
    .then(accounts => accounts.map(calculateReturns)),

  getAccount = result => {
    const
      { id } = result || { 'id': null }

    if(!id) {
      return null
    }

    return db.get(id)
      .catch(err => {
        console.error(err)

        return null
      })
      .then(calculateReturns)
  },

  removeAccount = account => db.remove(account)
    .catch(err => {
      console.error(err)

      return null
    })

export {
  DEFAULT_ACCOUNT,
  getAccounts,
  setAccount,
  createAccount,
  removeAccount,
  syncEvent
}
