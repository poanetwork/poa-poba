import glamorous from 'glamorous'

import { headerHeight } from './styles/constants'
import { fullWidth } from './styles/mixins'

const Main = glamorous.div(fullWidth, {
  width: '960px',
  margin: '0 auto',
  marginTop: headerHeight,
  position: 'absolute',
  top: 0,
  height: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center'
})

export default Main
