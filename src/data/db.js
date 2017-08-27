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

export default name => {
  const
    db = new PouchDB(name)

  return db
}
