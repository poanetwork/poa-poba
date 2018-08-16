import glamorous from 'glamorous'
import { logoImage } from '../styles/constants'

const Logo = glamorous.a('poa-logo', {
  display: 'inline-block',
  backgroundImage: logoImage,
  backgroundPosition: '0 0',
  width: '234px',
  height: '26px'
})

export default Logo
