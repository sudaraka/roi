/**
 * src/index.js: main web application entry point
 *
 * Copyright 2016, 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import { h, render } from 'preact'
import { Provider } from 'preact-redux'
import { Router } from 'preact-router'

import store from 'Data/store'
import setupSync from 'Action/sync'
import AccountForm from 'Form/Account'
import DeleteConfirm from 'Form/DeleteConfirm'
import App from 'Component/App'

setupSync(store)

render(
  <Provider store={ store }>
    <Router>
      <App path='/account'>
        <AccountForm />
      </App>
      <App path='/account/:targetAccount'>
        <AccountForm />
      </App>
      <App path='/delete/:targetAccount'>
        <DeleteConfirm />
      </App>

      <App default={ true } />
    </Router>
  </Provider>,
  document.querySelector('#app')
)
