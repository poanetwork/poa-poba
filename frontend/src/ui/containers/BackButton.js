import React from 'react'
import glamorous from 'glamorous'

import { Link } from 'react-router-dom'
import buttonStyle from '../styles/button'
import align from '../styles/align'

const BackIcon = glamorous.i('svg-background-element', {
  display: 'inline-block',
  background: `url("/images/svg/back.svg")`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100%',
  width: '18px'
})

export default () => (
  <Link to="/">
    <button style={buttonStyle}>
      Back
      <span style={align.iconRight}>
        <BackIcon />
      </span>
    </button>
  </Link>
)
