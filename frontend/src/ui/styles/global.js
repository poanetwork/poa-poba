import { css } from 'glamor'
import { H1 } from 'glamorous'
import React from 'react'

css.global('*', {
  boxSizing: 'border-box'
})

css.global('html, body', {
  margin: '0',
  color: '#333',
  lineHeight: '1',
  fontSize: '14px',
  fontFamily: "'Nunito', sans-serif",
  WebkitFontSmoothing: 'antialiased'
})

css.global('h1', {
  marginTop: '100px',
  marginBottom: '20px',
  fontSize: '36px',
  lineHeight: '1.5em',
  textAlign: 'left',
  textTransform: 'uppercase',
  fontWeight: '700'
})

css.global('h2', {
  marginTop: '70px',
  marginBottom: '30px',
  fontSize: '24px',
  lineHeight: '1.5em'
})
