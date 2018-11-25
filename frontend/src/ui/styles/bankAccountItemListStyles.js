import colors from './colors'
import { breakpoints } from './constants'
import { accountItemListButtonStyles } from './button'

export const bankAccountListStyles = {
  paddingTop: '20px'
}

const baseAccountItemListVerticalGridStyles = {
  height: '100%',
  gridGap: '14px',
  gridTemplateColumns: 'auto',
  padding: '14px'
}
const baseAccountItemListHorizontalGridStyles = {
  gridGap: 0,
  height: '80px'
}

const baseAccountItemListStyles = {
  display: 'grid',
  border: `1px solid ${colors.accountItemListBorder}`,
  borderRadius: '5px',
  marginBottom: '1.5em',
  cursor: 'pointer',
  ':hover': {
    boxShadow: `0px 10px 30px 0 rgba(76, 43, 134, 0.2)`
  },
  [`@media(max-width: ${breakpoints.xs})`]: {
    ...baseAccountItemListVerticalGridStyles,
    gridTemplateAreas: `
      'icon'
      'info'
      'date'
      'remove'`
  },
  [`@media(min-width: ${breakpoints.xs})`]: {
    ...baseAccountItemListHorizontalGridStyles,
    gridTemplateColumns: '80px auto 100px 120px',
    gridTemplateAreas: `'icon info remove date'`
  },
  [`@media(min-width: ${breakpoints.md})`]: {
    width: '560px'
  },
  [`@media(max-width: ${breakpoints.md})`]: {
    width: '100%'
  }
}
export const bankAccountItemListStyles = {
  ...baseAccountItemListStyles,
  [`@media(max-width: ${breakpoints.xs})`]: {
    ...baseAccountItemListVerticalGridStyles,
    gridTemplateAreas: `
      'icon'
      'info'
      'remove'
      'date'`
  },
  [`@media(min-width: ${breakpoints.xs})`]: {
    ...baseAccountItemListHorizontalGridStyles,
    gridTemplateColumns: '80px auto 100px 120px',
    gridTemplateAreas: `'icon info remove date'`
  }
}
export const unverifiedBankAccountItemListStyles = {
  ...baseAccountItemListStyles,
  [`@media(max-width: ${breakpoints.xs})`]: {
    ...baseAccountItemListVerticalGridStyles,
    gridTemplateAreas: `
      'icon'
      'info'
      'verify'`
  },
  [`@media(min-width: ${breakpoints.xs})`]: {
    ...baseAccountItemListHorizontalGridStyles,
    gridTemplateColumns: '80px auto 130px',
    gridTemplateAreas: `'icon info verify'`
  }
}

export const infoWrapperStyles = {
  gridArea: 'info',
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridGap: 0
}
export const infoParagraphStyles = {
  width: '100%',
  height: 'auto',
  alignSelf: 'center',
  lineHeight: '1.5em',
  [`@media(max-width: ${breakpoints.xs})`]: {
    textAlign: 'center'
  },
  [`@media(min-width: ${breakpoints.xs})`]: {
    textAlign: 'left'
  }
}

export const dateWrapperStyles = {
  gridArea: 'date',
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridGap: 0
}
export const dateParagraphStyles = {
  color: colors.accountItemDateTextColor,
  height: 'auto',
  width: '100%',
  placeSelf: 'center',
  [`@media(max-width: ${breakpoints.xs})`]: {
    padding: '0',
    textAlign: 'center'
  },
  [`@media(min-width: ${breakpoints.xs})`]: {
    padding: '0 20px 0 0',
    textAlign: 'right'
  }
}

export const verifyButtonStyles = {
  ...accountItemListButtonStyles,
  gridArea: 'verify',
  [`@media(max-width: ${breakpoints.xs})`]: {
    height: '34px',
    justifySelf: 'center',
    margin: '0'
  }
}
export const removeButtonStyles = {
  ...accountItemListButtonStyles,
  gridArea: 'remove',
  width: '73px',
  [`@media(max-width: ${breakpoints.xs})`]: {
    justifySelf: 'center',
    margin: '0'
  }
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
