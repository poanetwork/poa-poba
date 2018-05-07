import React from 'react'
import { A, Div } from 'glamorous'

const socialStyles = {
  fontSize: '13px',
  '&:not(:first-child)': {
    marginLeft: '5px'
  },
  '& .fa-circle': {
    transition: '0.3s color',
    color: 'hsla(0,0%,100%,.2)'
  },
  '&:hover .fa-circle': {
    color: 'hsla(0,0%,100%,.4)'
  }
}

const Social = ({ company, url }) => (
  <A href={url} css={socialStyles}>
    <span className="fa-stack fa-lg">
      <i className="fa fa-circle fa-stack-2x" />
      <i className={`fa fa-${company} fa-inverse fa-stack-1x`} />
    </span>
  </A>
)

const Socials = () => (
  <Div position="absolute" right="0" top="50%" transform="translateY(-50%)" color="white">
    <Social company="twitter" url="https://twitter.com/poanetwork" />
    <Social company="telegram" url="https://t.me/oraclesnetwork" />
    <Social company="github" url="https://github.com/poanetwork" />
  </Div>
)

export default Socials
