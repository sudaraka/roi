/**
 * src/index.js: main application entry point
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

let
  rootElement

const
  init = () => {
    const
      { 'default': App } = require('Component/App')  // eslint-disable-line global-require

    rootElement = render(
      <Provider store={ store }>
        <Router>
          <App path='/' />
          <App path='/account'>
            <p>...add form...</p>
          </App>
          <App path='/account/:number'>
            <p>...edit form...</p>
          </App>
        </Router>
      </Provider>,
      document.querySelector('#app'),
      rootElement
    )
  }

init()

if(module.hot) {
  module.hot.accept('Component/App', init)
  module.hot.accept('Data/store', init)
}
