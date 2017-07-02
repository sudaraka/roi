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

import Account from 'Column/Account'

export default ({ accounts }) => {
  const
    typeOrder = type => ({
      'T-Bill': 1,
      'FD': 2,
      'Saving': 3
    }[type] || 9999),

    accountDisplayOrder = (a, b) => {
      const
        { 'type': typeA, 'number': numA } = a,
        { 'type': typeB, 'number': numB } = b

      if(typeOrder(typeA) < typeOrder(typeB)) {
        return -1
      }
      else if(typeOrder(typeA) > typeOrder(typeB)) {
        return 1
      }

      // Both account have the same type, continue to sort by account number

      if(numA < numB) {
        return -1
      }
      else if(numA > numB) {
        return 1
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
