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
import {
  SYNC_RELOAD_THESHOLD,
  SYNC_STATUS_THRESHOLD,
  SYNC_STATUS_NONE
} from 'App/constants'
import { SET_SYNC_STATUS } from 'Action/types'

let
  loadTimer = null,
  syncTimer = null

const
  setSyncStatus = status => ({
    'type': SET_SYNC_STATUS,
    'payload': status
  }),

  loadData = dispatch => () => {
    clearTimeout(loadTimer)

    loadTimer = setTimeout(
      () => {
        dispatch(loadAccounts())

        clearTimeout(syncTimer)

        syncTimer = setTimeout(
          () => dispatch(setSyncStatus(SYNC_STATUS_NONE)),
          SYNC_STATUS_THRESHOLD
        )
      },
      SYNC_RELOAD_THESHOLD
    )
  }

export default ({ dispatch }) => {
  const
    syncing = syncEvent('paused', loadData(dispatch))

  if(syncing) {
    syncEvent('active', ({ direction }) => dispatch(setSyncStatus(direction)))
  }
  else {
    // Data sync is unavailable, manually load accounts from local DB.
    dispatch(loadAccounts())
  }
}
