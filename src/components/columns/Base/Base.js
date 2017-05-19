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

import Cell from 'Column/Cell'

export default ({ title = '', header = [], months = [], total = '' }) => {
  const
    cells = [
      title,
      ...[
        ...header,
        ...Array(3 - header.length)
      ],
      ...[
        ...months,
        ...Array(12 - months.length)
      ],
      total
    ]

  return (
    <section>
      { cells.map((data = { 'text': '' }) => <Cell key={ data.text } { ...data } />) }
    </section>
  )
}
