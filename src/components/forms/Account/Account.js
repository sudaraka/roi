/**
 * src/components/forms/Account/Account.js: account form component
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

import Box from 'Component/Box'

const
  Account = (...args) => {
    console.log('ARGS:', args)

    return (
      <Box />
    )
  },

  state2Props = state => ({ ...state.forms })

export default connect(
  state2Props
)(Account)
