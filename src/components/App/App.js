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
import Total from 'Column/Total'
import HScroll from 'Component/HScroll'
import Loading from 'Component/Loading'
import { loadAccounts } from 'Action/accounts'
import { setEditAccount } from 'Action/forms'

const
  App = ({ accounts, children, editAccount, ...props }) => {
    let
      content = <Loading />

    if(Array.isArray(accounts)) {
      content = [
        ...children,
        <Title key='title-column' />,
        <HScroll key='scroll-area' accounts={ accounts } />,
        <Total key='total-column' accounts={ accounts } />
      ]

      if(editAccount) {
        props.setEditAccount(
          accounts
            .filter(acc => acc.number === parseInt(editAccount, 10))
            .pop()
        )
      }
    }
    else {
      props.loadAccounts()
    }

    return (<div className='container'>{ content }</div>)
  },

  state2Props = state => ({ 'accounts': state.accounts })

export default connect(
  state2Props,
  {
    loadAccounts,
    setEditAccount
  }
)(App)
