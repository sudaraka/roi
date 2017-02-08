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
import { connect } from 'preact-redux'

const
  HScroll = () => <div className='hscroll'>&nbsp;xxx</div>

export default connect(state => ({ ...state }))(HScroll)