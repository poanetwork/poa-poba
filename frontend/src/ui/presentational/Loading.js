import React from 'react'
import { css } from 'glamor'
import glamorous from 'glamorous'

const fadeOut = css.keyframes({
  '0%': {
    opacity: '.2'
  },
  '20%': {
    opacity: 1,
    transform: 'scale(1)'
  },
  '100%': {
    opacity: '.2',
    transform: 'scale(0.3)'
  }
})

const LoadingContainer = glamorous.div('loading-container', {
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  zIndex: 1000000,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'rgba(35, 29, 115, 0.8)'
})

const LoadingInner = glamorous.div('loading-inner', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '234px',
  flexGrow: 0,
  flexShrink: 0,
  alignSelf: 'center',
  position: 'relative',
  paddingTop: '50px',
  '&:before': {
    content: "''",
    position: 'absolute',
    left: 0,
    top: 0,
    width: '234px',
    height: '26px',
    backgroundImage: 'url(/images/loading.png)',
    backgroundPosition: '0 0'
  }
})

const LoadingDot = glamorous.div(
  'loading-dot',
  {
    animationName: `${fadeOut}`,
    animationDuration: '2s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    opacity: '.2',
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    backgroundColor: '#fff'
  },
  ({ index }) => ({ animationDelay: `.${index}s` })
)

const Loading = ({ show }) => {
  if (show) {
    return (
      <LoadingContainer>
        <LoadingInner>
          <LoadingDot index={0} />
          <LoadingDot index={1} />
          <LoadingDot index={2} />
          <LoadingDot index={3} />
          <LoadingDot index={4} />
          <LoadingDot index={5} />
        </LoadingInner>
      </LoadingContainer>
    )
  }

  return null
}

export default Loading
