import { css } from 'glamor'

css.global('*', {
  boxSizing: 'border-box'
})

css.global('html, body', {
  margin: '0',
  color: '#333',
  lineHeight: '1',
  fontSize: '14px',
  fontFamily: "'Open Sans', sans-serif",
  WebkitFontSmoothing: 'antialiased'
})

// Font
css.fontFace({
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: '400',
  src:
    "local('Open Sans'), local('OpenSans'), url(https://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3ZBw1xU1rKptJj_0jans920.woff2) format('woff2')",
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000'
})

css.fontFace({
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: '600',
  src:
    "local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v14/MTP_ySUJH_bn48VBG8sNShampu5_7CjHW5spxoeN3Vs.woff2) format('woff2')",
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215'
})

css.fontFace({
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: '700',
  src:
    "local('Open Sans Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v13/k3k702ZOKiLJc3WVjuplzBampu5_7CjHW5spxoeN3Vs.woff2) format('woff2')",
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000'
})
