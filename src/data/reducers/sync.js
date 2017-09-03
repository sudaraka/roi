/**
 * src/data/reducers/sync.js: reducer for synchronization ststus
 *
 * Copyright 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import { SET_SYNC_STATUS } from 'Action/types'
import { SYNC_STATUS_NONE } from 'App/constants'

const
  INITIAL_STATE = SYNC_STATUS_NONE

export default (state = INITIAL_STATE, action) => {
  if(SET_SYNC_STATUS === action.type) {
    return action.payload
  }

  return state
}
