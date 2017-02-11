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

import { LOAD_ACCOUNTS } from 'Action/types'

const
  INITIAL_STATE = null

export default (state = INITIAL_STATE, action) => {
  if(LOAD_ACCOUNTS === action.type) {
    return [
      ...(action.accounts || [])
    ]
  }

  return state
}
