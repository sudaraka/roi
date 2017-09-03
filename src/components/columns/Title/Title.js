/**
 * src/components/columns/Title/Title.js: title column component
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
import moment from 'moment'

import {
  MONTHS_PER_YEAR,
  SYNC_STATUS_NONE,
  SYNC_STATUS_PULL,
  SYNC_STATUS_PUSH
} from 'App/constants'
import Base from 'Column/Base'

import './Title.sass'

const
  STATUS_MAP = {
    [SYNC_STATUS_NONE]: null,
    [SYNC_STATUS_PUSH]: 'cloud-upload',
    [SYNC_STATUS_PULL]: 'cloud-download'
  },

  Title = ({ sync }) => {
    const
      months = [ ...Array(MONTHS_PER_YEAR) ].map(
        (_, index) => ({ 'text': moment(`17-${index + 1}-1`, 'YY-M-D').format('MMMM') })
      ),

      handleClick = () => {
        route('/account', true)
      },

      columnData = {
        'title': {
          'text': 'Account',
          'className': 'action action-add',
          'icon': 'plus',
          'onCellClick': handleClick
        },
        'header': [
          { 'text': 'Amount' },
          { 'text': 'Interest Rate' },
          { 'text': 'Revenue / Month' }
        ],
        months,
        'total': {
          'className': `sync ${SYNC_STATUS_NONE === sync ? '' : 'active'}`,
          'icon': STATUS_MAP[sync]
        }
      }

    return <Base { ...columnData } />
  },

  state2Props = ({ sync }) => ({ sync })

export default connect(
  state2Props
)(Title)
