import { headerHeight, footerHeight } from './constants'

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
  width: '40%',
  backgroundSize: 'cover'
}

// "content" wraps "header", "section" & "footer" in the markup
export const contentStyles = {
  display: 'grid',
  gridTemplateRows: `${headerHeight} 1fr ${footerHeight}`,
  gridTemplateColumns: '1fr',
  height: '100vh',
  width: '60%',
  paddingLeft: '50px',
  paddingRight: '50px',
  overflow: 'auto'
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
  maxWidth: '600px'
}

// "footer" wraps "footerText" and "socials" in markup
export const footerStyles = {
  gridRowStart: '3',
  gridRowEnd: '3',
  alignSelf: 'end',
  width: '100%',
  maxWidth: '600px',
  marginTop: '80px',
  display: 'flex'
}

export const footerTextStyles = {
  color: '#5c34a2',
  lineHeight: footerHeight,
  marginBottom: 0,
  textAlign: 'left',
  fontSize: '12px',
  margin: 0,
  flexGrow: 1,
  flexShrink: 0
}

export const socialsStyles = {
  flexGrow: 1,
  flexShrink: 0,
  marginBottom: 0,
  textAlign: 'right'
}
