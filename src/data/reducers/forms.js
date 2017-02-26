/**
 * src/data/reducers/forms.js: reducer for forms
 *
 * Copyright 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import { SET_FORM_ACCOUNT } from 'Action/types'

const
  INITIAL_STATE = { 'account': null }

export default (state = INITIAL_STATE, action) => {

  if(SET_FORM_ACCOUNT === action.type) {
    return ({
      ...state,
      'account': action.payload
    })
  }

  return state
}
