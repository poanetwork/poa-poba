import colors from './colors'

const buttonStyles = {
  width: '200px',
  height: '44px',
  padding: '0 15px',
  marginRight: '20px',
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
  lineHeight: '24px',
  letterSpacing: 'normal',
  textAlign: 'left',
  textTransform: 'none',
  // float: 'left',
  ':hover': {
    backgroundColor: '#34c3f8'
  },
  ':focus': {
    outline: 'unset'
  }
}

export const plaidButtonStyles = {
  ...buttonStyles,
  backgroundColor: colors.primary,
  boxShadow: '0px 5px 10px 0 rgba(92, 52, 162, 0.3)',
  border: `solid 1px ${colors.primary}`,
  color: '#ffffff'
}

export const accountItemListButtonStyles = {
  backgroundColor: 'white',
  color: colors.primary,
  border: `solid 1px ${colors.primary}`,
  alignSelf: 'center',
  justifySelf: 'end',
  marginRight: '20px',
  padding: 0,
  textAlign: 'center',
  textTransform: 'none',
  borderRadius: '3px',
  width: '59px',
  height: '34px',
  ':hover': {
    backgroundColor: colors.primary,
    color: 'white'
  }
}

export default buttonStyles
