/**
 * src/components/Box/Box.js: pop-up box container for other components
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

import './Box.sass'

export default ({ children }) => (
  <div className='popup-box'>
    <div className='inner-box'>
      { children }
    </div>
  </div>
)
