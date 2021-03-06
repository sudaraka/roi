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

import { LOAD_ACCOUNTS, UPDATE_ACCOUNT, DELETE_ACCOUNT } from 'Action/types'
import { getAccounts, createAccount, setAccount, removeAccount } from 'Data'

export const
  loadAccounts = () => dispatch => {
    getAccounts()
      .then(accounts => dispatch({
        'type': LOAD_ACCOUNTS,
        'payload': accounts
      }))
  },

  updateAccount = modifiedAccount => dispatch => {
    let
      accountResult = null

    if(modifiedAccount._id) {
      accountResult = setAccount(modifiedAccount)
    }
    else {
      accountResult = createAccount(modifiedAccount)
    }

    accountResult
      .then(account => {
        if(!account) {
          return
        }

        dispatch({
          'type': UPDATE_ACCOUNT,
          account
        })
      })
  },

  deleteAccount = account => dispatch => {
    removeAccount(account)
      .then(result => {
        if(!result || result.id !== account._id) {
          return
        }

        dispatch({
          'type': DELETE_ACCOUNT,
          account
        })
      })
  }
