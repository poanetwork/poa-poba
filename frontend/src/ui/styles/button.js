import colors from './colors'

const buttonStyles = {
  backgroundColor: colors.primary,
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
}

export default buttonStyles
