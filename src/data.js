/**
 * src/data.js: handle pouchdb operations and expose data to the application
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import PouchDB from 'pouchdb'

const
  dbAcc = new PouchDB('roi-accounts'),

  createAccount = ({ type, number, amount, interestRate, investedDate, period = 91 }) => {
    dbAcc.put({
      '_id': number.toString(),
      type,
      number,
      'amount': parseFloat(amount),
      'interestRate': parseFloat(interestRate),
      investedDate,
      'period': period || 91
    })
    .then(result => console.log(result))
    .catch(err => {
      console.error(err)
    })
  },

  getAccounts = () => dbAcc.allDocs({ 'include_docs': true })
    .catch(err => {
      console.error(err)

      return { 'rows': [] }
    })
    .then(result => [ ...result.rows.map(record => record.doc) ])

export { getAccounts, createAccount }
