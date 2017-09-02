/**
 * src/data/db.js: database creation and synchronization functions
 * application
 *
 * Copyright 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import PouchDB from 'pouchdb-browser'

import cfg from 'App/config'

export default name => {
  let
    sync = null

  const
    db = new PouchDB(name)

  try {
    const
      { 'db': { url } } = cfg,
      remoteDB = new URL(`${url}/${name}`)

    if(remoteDB) {
      // Got valid database URL, Setup sync
      sync = db.sync(
        remoteDB.href,
        {
          'live': true,
          'retry': true,
          'ajax': {
            'rejectUnauthorized': false,
            'requestCert': true,
            'agent': false
          }
        }
      )
    }
  }
  catch(_) {
    // no-op
  }

  return {
    db,
    sync
  }
}
