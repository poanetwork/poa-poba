import glamorous from 'glamorous'
import { logoImage } from './styles/constants'

const Logo = glamorous.a(
  {
    display: 'block',
    float: 'left',
    backgroundImage: logoImage
  },
  ({ size = 'big' }) =>
    size === 'big'
      ? {
          width: '196px',
          height: '35px',
          backgroundPosition: '0 -24px'
        }
      : {
          width: '136px',
          height: '24px',
          backgroundPosition: '0 0',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)'
        }
)

export default Logo
