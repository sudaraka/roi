/**
 * src/components/columns/Cell/Cell.js: abstract cell (row in a column) of the
 * table
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

export default ({ text, className, icon, note, onCellClick }) => {
  const
    children = [
      <span>{  // eslint-disable-line react/jsx-key
        (text || '')
          .toString()
          .split('|')
          .reduce((arr, word) => [
            ...arr,
            word,
            <br />  // eslint-disable-line react/jsx-key
          ], [])
      }</span>,

      icon ? <i className={ `fa fa-${icon}` } /> : null,

      note ? <div className='popover'>{ note }</div> : null
    ]

  return <div className={ className } onClick={ onCellClick }>{ children }</div>
}
