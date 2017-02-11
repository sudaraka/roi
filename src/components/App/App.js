/**
 * src/components/App/App.js: main application component
 *
 * Copyright 2017 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import { h } from 'preact'
import { connect } from 'preact-redux'

import Title from 'Column/Title'
import Base from 'Column/Base'
import HScroll from 'Component/HScroll'

const
  App = () => (
    <div className='container'>
      <Title />
      <HScroll />
      <Base />
    </div>
  ),

  state2Props = state => ({ 'accounts': state.accounts })

export default connect(state2Props)(App)
