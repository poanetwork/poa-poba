import { css } from 'glamor'

// react-plaid-link wraps its <button> in a div with display:block
css.global('.plaid-link-wrapper > div', {
  display: 'inline-block'
})

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
  color: '#333',
  marginTop: '100px',
  marginBottom: '15px',
  fontSize: '36px',
  fontWeight: '400',
  lineHeight: '64px',
  textAlign: 'left',
  textTransform: 'none'
})

css.global('h2', {
  color: '#333',
  marginTop: '70px',
  marginBottom: '5px',
  fontSize: '24px',
  fontWeight: '400',
  lineHeight: '64px'
})

css.global('p', {
  color: '#777777',
  marginTop: 0,
  marginBottom: '40px',
  align: 'left',
  fontSize: '14px',
  lineHeight: '24px'
})

css.global('p.main', {
  fontSize: '16px',
  lineHeight: '28px'
})
