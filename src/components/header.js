import { Link } from 'gatsby'
import React from 'react'
import headerStyles from './header.module.scss'

export const Header = () => (
  <header className={headerStyles.header}>
    <div className={headerStyles.logo}>
      <h2 style={{ color: '#fff' }}>
        {' '}
        {'J'}
        <span style={{ color: '#8C4EF8' }}> {'●'} </span>
      </h2>
    </div>

    <nav>
      <ul>
        <li>
          <Link
            className={headerStyles.linkItem}
            activeClassName={headerStyles.activeNav}
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={headerStyles.linkItem}
            activeClassName={headerStyles.activeNav}
            to="/about"
          >
            About me
          </Link>
        </li>
        <li>
          <Link
            className={headerStyles.linkItem}
            activeClassName={headerStyles.activeNav}
            to="/contact"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className={headerStyles.linkItem}
            activeClassName={headerStyles.activeNav}
            to="/blog"
          >
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  </header>
)
