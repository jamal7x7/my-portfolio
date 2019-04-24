import { Link } from "gatsby"
import React from "react"
import headerStyles from "./header.module.scss"

export const Header = () => (
  <header>
    <h1>jamDev</h1>

    <nav>
      <ul>
        <li>
          <Link className={headerStyles.link} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about">About me</Link>
        </li>
        <li>
          <Link to="/contact">Contact me</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  </header>
)
