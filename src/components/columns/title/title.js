/**
 * src/components/columns/title/title.js: title column component
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import { html } from 'snabbdom-jsx'
import { div, label, input } from '@cycle/dom'

import component from 'Component/helper'
import column from 'Component/columns/base'

const
  form = () => (
    <div className="dropdown form">

      <div className="input-group">
        <label>Account Type</label>
        <input type="text" id="acc_type" placeholder="T-Bill, FD or Savings" />
      </div>

      <div className="input-group">
        <label>Account Number</label>
        <input type="text" id="acc_number" />
      </div>

      <div className="input-group">
        <label>Invested Amount</label>
        <input type="number" id="acc_invested" />
      </div>

      <div className="input-group">
        <label>Interest Rate</label>
        <input type="number" id="acc_rate" />
      </div>

    </div>
  )

export default component(() => ({
  'model': src => {
    const
      months = [ ...Array(12).keys() ]
        .map(index => ({ 'text': new Date(`2017-${index + 1}-1`).toLocaleFormat('%B') }))

    return src.DOM.select('.action-add').events('click')
      // Simply toggle the current state
      .fold(ev => !ev, false)
      .map(toggle => ({
        'title': {
          'text': 'Account',
          'className': `action action-add ${toggle ? 'active' : ''}`,
          'icon': toggle ? 'times' : 'plus',
          'dialog': toggle ? form() : null
        },
        'header': [
          { 'text': 'Amount' },
          { 'text': 'Interest Rate' },
          { 'text': 'Revenue / Month' }
        ],
        months
      }))
  },

  'view': state$ => column({ 'props': state$ }).DOM
}))
