import colors from './colors'

const buttonStyles = {
  width: '200px',
  height: '44px',
  padding: '0 15px',
  position: 'relative',
  borderRadius: '5px',
  backgroundColor: colors.white,
  border: `solid 1px ${colors.primary}`,
  color: colors.primary,
  cursor: 'pointer',
  fontFamily: 'Nunito',
  fontSize: '16px',
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: '1.5',
  letterSpacing: 'normal',
  textAlign: 'left',
  textTransform: 'none',
  float: 'left',
  ':hover': {
    backgroundColor: '#34c3f8'
  },
  ':focus': {
    outline: 'unset'
  }
}

export default buttonStyles
