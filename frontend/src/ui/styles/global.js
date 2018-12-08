import { css } from 'glamor'

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
  marginTop: '0',
  marginBottom: '0',
  paddingTop: '100px',
  paddingBottom: '15px',
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
  marginBottom: '14px',
  align: 'left',
  fontSize: '14px',
  lineHeight: '24px'
})

css.global('a', {
  color: '#5c34a2',
  textDecoration: 'none'
})

css.global('p.home-main', {
  fontSize: '16px',
  lineHeight: '28px',
  marginBottom: '37px'
})

css.global('p.home-secondary', {
  marginBottom: '27px'
})

css.global('.h100percent', {
  height: '100%'
})
