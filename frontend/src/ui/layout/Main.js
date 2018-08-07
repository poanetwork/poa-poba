import glamorous from 'glamorous'

import { fullWidth } from '../styles/mixins'

const Main = glamorous.div(fullWidth, {
  margin: '0',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'stretch',
  flexDirection: 'row',
  height: '100%'
})

export default Main
