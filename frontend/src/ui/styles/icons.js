const baseSvgIconStyles = {
  display: 'inline-block',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
  // backgroundImage: `url("/images/svg/...")`,
}

// Main index buttons' icons styles
const baseSvgIconButtonStyles = {
  ...baseSvgIconStyles,
  height: '100%',
  width: '18px'
}

export const howItWorksIconStyles = {
  ...baseSvgIconButtonStyles,
  backgroundImage: `url("/images/svg/how-it-works.svg")`
}

export const myAccountsIconStyles = {
  ...baseSvgIconButtonStyles,
  backgroundImage: `url("/images/svg/my-accounts.svg")`
}

export const rightArrowIconStyles = {
  ...baseSvgIconButtonStyles,
  backgroundImage: `url("/images/svg/arrow.svg")`
}

export const backIconStyles = {
  ...baseSvgIconButtonStyles,
  backgroundImage: `url("/images/svg/back.svg")`
}

// Account items' icons styles
const baseAccountIconStyles = {
  ...baseSvgIconStyles,
  height: '40px',
  width: '40px'
}

export const verifiedAcountIconStyles = {
  ...baseAccountIconStyles,
  backgroundImage: `url("/images/svg/done.svg")`
}

export const unverifiedAcountIconStyles = {
  ...baseAccountIconStyles,
  backgroundImage: `url("/images/svg/clock.svg")`
}
