import colors from './colors'
import { accountItemListButtonStyles } from './button'

export const bankAccountListStyles = {
  paddingTop: '20px'
}

const baseAccountItemListStyles = {
  display: 'grid',
  border: `1px solid ${colors.accountItemListBorder}`,
  borderRadius: '5px',
  gridTemplateColumns: '80px auto 100px 120px',
  gridTemplateAreas: `'icon info remove date'`,
  gridGap: 0,
  marginBottom: '1.5em',
  width: '560px',
  height: '80px',
  cursor: 'pointer',
  ':hover': {
    boxShadow: `0px 10px 30px 0 rgba(76, 43, 134, 0.2)`
  }
}
export const bankAccountItemListStyles = {
  ...baseAccountItemListStyles,
  gridTemplateColumns: '80px auto 100px 120px',
  gridTemplateAreas: `'icon info remove date'`
}
export const unverifiedBankAccountItemListStyles = {
  ...baseAccountItemListStyles,
  gridTemplateColumns: '80px auto 130px',
  gridTemplateAreas: `'icon info  verify'`
}

export const infoWrapperStyles = {
  gridArea: 'info',
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridGap: 0
}
export const infoParagraphStyles = {
  width: '100%',
  textAlign: 'left',
  height: 'auto',
  alignSelf: 'center',
  lineHeight: '1.5em'
}

export const dateWrapperStyles = {
  gridArea: 'date',
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridGap: 0,
}
export const dateParagraphStyles = {
  color: colors.accountItemDateTextColor,
  height: 'auto',
  padding: '0 20px 0 0',
  width: '100%',
  textAlign: 'right',
  placeSelf: 'center'
}

export const verifyButtonStyles = {
  ...accountItemListButtonStyles,
  gridArea: 'verify'
}
export const removeButtonStyles = {
  ...accountItemListButtonStyles,
  gridArea: 'remove',
}

export const verifiedMessageStyles = {
  textAlign: 'center',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: colors.verifiedMessageColor,
  placeSelf: 'center',
  width: '70%',
  margin: 'auto auto'
}
