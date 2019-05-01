import React from 'react'
import '../styles/index.scss'
import '../styles/theme.scss'
import { Footer } from './footer'
import { Header } from './header'
import layoutStyles from './layout.module.scss'

const Layout = props => {
  const darkmode = true
  // const darkmode = false
  return (
    <div
      className={layoutStyles.container}
      style={{
        color: darkmode ? 'beige' : '#1d1c23',
        background: darkmode ? '#1d1c23' : '#0C0421',
      }}
    >
      <div className={layoutStyles.menu}>
        <Header />
      </div>

      <div className={layoutStyles.content}>{props.children}</div>

      <div className={layoutStyles.footer}>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
