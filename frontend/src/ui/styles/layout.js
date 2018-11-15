import { headerHeight, footerHeight, breakpoints } from './constants'

// "main" wraps "sidebar" & "content" in the markup
export const mainStyles = {
  margin: '0',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'stretch',
  flexDirection: 'row',
  height: '100%'
}

export const sidebarStyles = {
  backgroundImage: 'url("/images/pic@3x.jpg")',
  backgroundSize: 'cover',
  [`@media(min-width: ${breakpoints.md})`]: {
    width: '40%'
  },
  [`@media(max-width: ${breakpoints.md})`]: {
    width: '0'
  }
}

// "content" wraps "header", "section" & "footer" in the markup
export const contentStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  height: '100vh',
  overflow: 'auto',
  [`@media(min-width: ${breakpoints.md})`]: {
    gridTemplateRows: `${headerHeight} 1fr ${footerHeight}`,
    paddingLeft: '50px',
    paddingRight: '50px',
    width: '60%'
  },
  [`@media(max-width: ${breakpoints.md})`]: {
    gridTemplateRows: `${headerHeight} 1fr 124px`,
    paddingLeft: '15px',
    paddingRight: '15px',
    width: '100%'
  }
}

export const headerStyles = {
  gridRowStart: '1',
  gridRowEnd: '1',
  alignSelf: 'start',
  height: headerHeight,
  padding: '23px 0',
  width: '100%'
}

export const sectionStyles = {
  gridRowStart: '2',
  gridRowEnd: '2',
  justifySelf: 'start',
  width: '100%',
  [`@media(min-width: ${breakpoints.md})`]: {
    maxWidth: '600px'
  }
}

// "footer" wraps "footerText" and "socials" in markup
export const footerStyles = {
  gridRowStart: '3',
  gridRowEnd: '3',
  alignSelf: 'end',
  height: '100%',
  width: '100%',
  display: 'flex',
  [`@media(max-width: ${breakpoints.md})`]: {
    padding: '40px 0 20px 0',
    flexDirection: 'column'
  },
  [`@media(min-width: ${breakpoints.md})`]: {
    maxWidth: '600px'
  }
}

export const footerTextStyles = {
  color: '#5c34a2',
  marginBottom: 0,
  fontSize: '12px',
  margin: 0,
  flexGrow: 1,
  flexShrink: 0,
  [`@media(min-width: ${breakpoints.md})`]: {
    lineHeight: footerHeight,
    textAlign: 'left'
  },
  [`@media(max-width: ${breakpoints.md})`]: {
    lineHeight: '24px',
    textAlign: 'center'
  }
}

export const socialsStyles = {
  flexGrow: 1,
  flexShrink: 0,
  marginBottom: 0,
  [`@media(min-width: ${breakpoints.md})`]: {
    textAlign: 'right'
  },
  [`@media(max-width: ${breakpoints.md})`]: {
    textAlign: 'center'
  }
}
