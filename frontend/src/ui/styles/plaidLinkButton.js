import { css } from 'glamor'

export default css({
  backgroundColor: '#08b3f2',
  color: 'white',
  cursor: 'pointer',
  fontSize: '13px',
  textTransform: 'uppercase',
  padding: '0 15px',
  lineHeight: '36px',
  fontWeight: 700,
  borderWidth: 0,
  ':hover': {
    backgroundColor: '#34c3f8'
  },
  ':focus': {
    outline: 'unset'
  }
})
