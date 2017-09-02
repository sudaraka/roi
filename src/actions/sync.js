/**
 * src/actions/sync.js: PouchDB sync related actions
 *
 * Copyright 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import { syncEvent } from 'Data'
import { loadAccounts } from 'Action/accounts'
import { SYNC_RELOAD_THESHOLD } from 'App/constants'

let
  loadTimer = null

const
  loadData = dispatch => () => {
    if(loadTimer) {
      clearTimeout(loadTimer)
    }

    loadTimer = setTimeout(
      () => dispatch(loadAccounts()),
      SYNC_RELOAD_THESHOLD
    )
  }

export default ({ dispatch }) => {
  const
    syncing = syncEvent('paused', loadData(dispatch))

  if(!syncing) {
    dispatch(loadAccounts())
  }
}
