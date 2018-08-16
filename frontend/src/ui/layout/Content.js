import glamorous from 'glamorous'

const Content = glamorous.div('content', {
  display: 'grid',
  gridTemplateRows: '82px 1fr 122px',
  gridTemplateColumns: '1fr',
  height: '100vh',
  width: '60%',
  paddingLeft: '50px',
  paddingRight: '50px',
  overflow: 'auto'
})

export default Content
