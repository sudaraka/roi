/**
 * src/actions/forms.js: form related actions
 *
 * Copyright 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import { SET_FORM_ACCOUNT, UPDATE_FORM_ACCOUNT } from 'Action/types'
import { formatValue } from 'App/helper'

export const
  setFormAccount = account => ({
    'type': SET_FORM_ACCOUNT,
    'payload': account
  }),

  updateFormAccount = (field, value) => ({
    'type': UPDATE_FORM_ACCOUNT,
    'payload': { [field]: formatValue(field, value) }
  })
