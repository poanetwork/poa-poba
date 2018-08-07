import React from 'react'
import glamorous from 'glamorous'

const BgSidebar = glamorous.div({
  backgroundImage: 'url("/images/pic@3x.png")',
  width: '40%',
  backgroundSize: 'cover'
})

const Sidebar = () => <BgSidebar />

export default Sidebar
