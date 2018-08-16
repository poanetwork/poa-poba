import React from 'react'
import glamorous from 'glamorous'

import { Link } from 'react-router-dom'
import buttonStyle from '../styles/button'
import align from '../styles/align'
import { backIconStyles } from '../styles/icons'

const BackIcon = glamorous.i(backIconStyles, align.iconRight)

export default () => (
  <Link to="/" style={{ position: 'absolute', bottom: '102px' }}>
    <button style={buttonStyle}>
      Back <BackIcon />
    </button>
  </Link>
)
