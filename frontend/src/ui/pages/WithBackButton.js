import React from 'react'
import glamorous from 'glamorous'
import BackButton from '../containers/BackButton'
import {
  withBackButtonStyles,
  withBackButtonWrappedContentStyles,
  backButtonStyles
} from '../styles/withBackButton'

const WithBackButton = glamorous.div('with-back-button', withBackButtonStyles)
const WithBackButtonWrappedContent = glamorous.div(
  'with-back-button-wrapped-content',
  withBackButtonWrappedContentStyles
)

export default WrappedPageComponent => {
  return ({ ...props }) => {
    return (
      <WithBackButton>
        <WithBackButtonWrappedContent>
          <WrappedPageComponent {...props} />
        </WithBackButtonWrappedContent>
        <BackButton style={{ backButtonStyles }} />
      </WithBackButton>
    )
  }
}
