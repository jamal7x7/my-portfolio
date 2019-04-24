import React from "react"
import "../styles/index.scss"
import { Footer } from "./footer"
import { Header } from "./header"
import layoutStyles from "./layout.module.scss"

const Layout = props => (
  <div className={layoutStyles.container}>
    <div className={layoutStyles.head}>
      <Header />
      {props.children}
    </div>
    <Footer className={layoutStyles.foot} />
  </div>
)

export default Layout
