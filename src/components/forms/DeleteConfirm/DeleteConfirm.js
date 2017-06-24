/**
 * src/components/forms/DeleteConfirm/DeleteConfirm.js: delete confirm dialog component
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
import { route } from 'preact-router'

import Box from 'Component/Box'
import { deleteAccount } from 'Action/accounts'

const
  DeleteConfirm = ({ account, ...props }) => {
    const
      buttons = [
        {
          'text': 'No',
          'style': 'success',
          'onClick': () => route('/', true)
        },
        {
          'text': 'Yes',
          'style': 'danger',
          'onClick': () => {
            props.deleteAccount(account)

            route('/', true)
          }
        }
      ]

    return (
      <Box buttons={ buttons }>
        <p>{`Delete ${account.type} account ${account.number}?` }</p>
      </Box>
    )
  },

  state2Props = state => ({ ...state.forms })

export default connect(
  state2Props,
  { deleteAccount }
)(DeleteConfirm)
