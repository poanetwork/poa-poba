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

export const removeIconStyles = {
  ...baseSvgIconButtonStyles,
  minHeight: '18px',
  backgroundImage: `url("/images/svg/remove.svg")`,
  ':hover': {
    backgroundImage: `url("/images/svg/remove-purple.svg")`
  }
}

export const generateClaimIconStyles = {
  ...baseSvgIconButtonStyles,
  minHeight: '18px',
  backgroundImage: `url("/images/svg/add.svg")`,
  ':hover': {
    backgroundImage: `url("/images/svg/add-purple.svg")`
  }
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

export const warningIconStyles = {
  ...baseAccountIconStyles,
  backgroundImage: `url("/images/svg/warning.svg")`
}

// Social icons styles
const baseSocalIconStyles = {
  ...baseSvgIconStyles,
  verticalAlign: 'middle',
  height: '20px',
  width: '20px'
}

export const twitterIconStyles = {
  ...baseSocalIconStyles,
  backgroundImage: `url("/images/socials/twitter.svg")`
}

export const mediumIconStyles = {
  ...baseSocalIconStyles,
  backgroundImage: `url("/images/socials/medium.svg")`
}

export const telegramIconStyles = {
  ...baseSocalIconStyles,
  backgroundImage: `url("/images/socials/telegram.svg")`
}

export const githubIconStyles = {
  ...baseSocalIconStyles,
  backgroundImage: `url("/images/socials/github.svg")`
}
