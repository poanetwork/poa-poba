import glamorous from 'glamorous'
import { logoImage } from './styles/constants'

const Logo = glamorous.a('poa-logo', {
  display: 'block',
  float: 'left',
  backgroundImage: logoImage,
  width: '234px',
  height: '26px',
  backgroundPosition: '0 0'
})

export default Logo
