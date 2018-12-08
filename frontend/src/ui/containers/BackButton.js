import React from 'react'
import glamorous from 'glamorous'

import { Link } from 'react-router-dom'
import { responsiveButtonStyles } from '../styles/button'
import align from '../styles/align'
import { backIconStyles } from '../styles/icons'

const BackIcon = glamorous.i(backIconStyles, align.iconRight)
const ResponsiveButton = glamorous.button(responsiveButtonStyles)

export default ({ to = '/' }) => (
  <Link to={to}>
    <ResponsiveButton>
      Back <BackIcon />
    </ResponsiveButton>
  </Link>
)
