/**
 * src/components/HScroll/HScroll.js: Horizontally scrollable middle area of the
 * table.
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

import { A_BEFORE_B, B_BEFORE_A } from 'App/constants'
import Account from 'Column/Account'

export default ({ accounts }) => {
  const
    typeOrder = type => ({
      'T-Bill': 1,
      'FD': 2,
      'Saving': 3
    }[type] || Number.MAX_SAFE_INTEGER),

    accountDisplayOrder = (a, b) => {
      const
        { 'type': typeA, 'number': numA } = a,
        { 'type': typeB, 'number': numB } = b

      if(typeOrder(typeA) < typeOrder(typeB)) {
        return A_BEFORE_B
      }
      else if(typeOrder(typeA) > typeOrder(typeB)) {
        return B_BEFORE_A
      }

      // Both account have the same type, continue to sort by account number

      if(numA < numB) {
        return A_BEFORE_B
      }
      else if(numA > numB) {
        return B_BEFORE_A
      }

      return 0
    },

    columns = [ ...accounts ]
      .sort(accountDisplayOrder)
      .map(acc => <Account key={ acc.number } { ...acc } />)

  return (
    <div className='hscroll'>
      { columns }
    </div>
  )
}
