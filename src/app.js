/**
 * src/app.js: main desktop application entry point
 *
 * Copyright 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import { app, Menu, BrowserWindow } from 'electron'

import cfg from 'App/config'

const
  menuTemplate = [ {
    'label': 'roi',
    'submenu': [ { 'role': 'quit' } ]
  } ],

  createWindow = () => {
    let
      win = new BrowserWindow({
        'show': false,
        'autoHideMenuBar': true
      })

    win
      .on('ready-to-show', () => win.show())
      .on('close', () => (win = null))
      .loadURL(`file://${__dirname}/index.html`)

    return win
  }

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))

app
  .on('ready', () => {
    createWindow()
  })
  // Handle cert face related error during HTTPS communication
  .on('certificate-error', (e, webContents, url, err, cert, cb) => {  // eslint-disable-line max-params
    if(url.startsWith(cfg.db.url) && 'net::ERR_CERT_AUTHORITY_INVALID' === err) {
      // HTTPS call to external database (sync), and unauthorized error caused
      // due to using self-signed certificate.
      e.preventDefault()

      return cb(true)
    }

    // Default behavior, fail the HTTPS call
    return cb(false)
  })
