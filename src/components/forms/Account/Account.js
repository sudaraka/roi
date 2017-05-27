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
import { route } from 'preact-router'

import Box from 'Component/Box'

import './Account.sass'

const
  handleCloseClick = () => {
    route('/', true)
  },

  Account = ({ typeList }) => (
    <Box>
      <form className='account-form'>
        <div className='form-block'>
          <label>Account Type</label>
          <select className='form-control'>
            { typeList.map(value => <option key={ value }>{ value }</option>) }
          </select>
        </div>

        <div className='form-block'>
          <label>Account Number</label>
          <input className='form-control' type='text' />
        </div>

        <div className='form-block'>
          <label>Invested Amount</label>
          <input className='form-control' type='number' min='0' />
        </div>

        <div className='form-block'>
          <label>Invested Date</label>
          <input className='form-control' type='date' />
        </div>

        <div className='form-block'>
          <label>Intrest Rate</label>
          <input className='form-control' type='number' max='100' min='0' />
        </div>

        <div className='form-block range-block'>
          <label>Matuarity Period</label>
          <div className='group'>
            <span>{ 91 } days</span>
            <input className='form-control' type='range' max='365' min='30' />
          </div>
        </div>

        <div className='button-block'>
          <button
            className='btn btn-secondary'
            type='button'
            onClick={ handleCloseClick }
          >Cancel</button>

          <button
            className='btn btn-success'
            type='button'
          >Save</button>
        </div>
      </form>
    </Box>
  ),

  state2Props = state => ({ ...state.forms })

export default connect(
  state2Props
)(Account)
