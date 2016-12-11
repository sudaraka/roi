/**
 * src/components/hscroll/hscroll.js: Horizontally scrollable middle area of the
 * table
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

import xs from 'xstream'
import { div } from '@cycle/dom'

import component from 'Component/helper'
import accountColumn from 'Component/columns/account'

export default component(() => ({
  'intent': src => src.props.accounts,

  'view': accounts$ => accounts$
    .map(acc => accountColumn({ 'props': { 'account': xs.of(acc) } }).DOM)
    .flatten()
    .fold((acc, col$) => [ ...acc, col$ ], [])
    .last()
    .map(columns => div('.hscroll', columns))
}))
