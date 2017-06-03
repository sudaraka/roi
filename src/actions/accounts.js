/**
 * src/actions/accounts.js: account related actions
 *
 * Copyright 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import { LOAD_ACCOUNTS, UPDATE_ACCOUNT } from 'Action/types'
import { calculateReturns } from 'App/helper'
import { getAccounts, setAccount } from 'Data'

export const
  loadAccounts = () => dispatch => {
    getAccounts()
      .then(accounts => accounts.map(calculateReturns))
      .then(accounts => dispatch({
        'type': LOAD_ACCOUNTS,
        'payload': accounts
      }))
  },

  updateAccount = modifiedAccount => dispatch => {
    setAccount(modifiedAccount)
      .then(account => dispatch({
        'type': UPDATE_ACCOUNT,
        account
      }))
  }
