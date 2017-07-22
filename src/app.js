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

import { app, BrowserWindow } from 'electron'

const
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

app
  .on('ready', () => {
    createWindow()
  })
