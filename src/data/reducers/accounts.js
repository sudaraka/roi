/**
 * src/data/reducers/accounts.js: reducer for accounts
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

const
  INITIAL_STATE = null

export default (state = INITIAL_STATE, action) => {
  if(LOAD_ACCOUNTS === action.type) {
    return [ ...(action.payload || []) ]
  }

  if(UPDATE_ACCOUNT === action.type) {
    return [
      ...state.filter(acc => acc.number !== action.account.number),
      action.account
    ]
  }

  if(DELETE_ACCOUNT === action.type) {
    return [ ...state.filter(acc => acc.number !== action.account.number) ]
  }

  return state
}
