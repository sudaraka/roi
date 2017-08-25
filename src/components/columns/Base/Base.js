/**
 * src/components/columns/Base/Base.js: abstract column of the table
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

import { MONTHS_PER_YEAR } from 'App/constants'
import Cell from 'Column/Cell'

export default ({ title = '', header = [], months = [], total = '' }) => {
  const
    HEADER_ROWS = 3,

    cells = [
      title,
      ...[
        ...header,
        ...Array(HEADER_ROWS - header.length)
      ],
      ...[
        ...months,
        ...Array(MONTHS_PER_YEAR - months.length)
      ],
      total
    ]

  /* eslint-disable react/no-array-index-key */
  return (
    <section>
      { cells.map((data = { 'text': '' }, index) => <Cell key={ index } { ...data } />) }
    </section>
  )
  /* eslint-enable react/no-array-index-key */
}
