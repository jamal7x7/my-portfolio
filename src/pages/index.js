import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
// import Blob from '../components/svg/Blob'
import TypedReact from '../components/Typed'
// import './App.sass'
import indexStyles from './index.module.scss'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)
  return (
    <Layout>
      <div className={indexStyles.text}>
        <br />
        <br />
        <br />
        {/* <Blob /> */}
        <br />
        <br />
        <h2 className="content-title">
          Hi, I'm
          <span
            className="textChangeOnHover"
            style={{ paddingLeft: '4px', paddingRight: '4px' }}
          >
            {data.site.siteMetadata.author}
          </span>{' '}
          and I do
        </h2>
        <h1 className="header-big">
          <TypedReact
            strings={[
              'Design ^1000',
              ' Development  ^60',
              'UI/UX  ^1000 ',
              'Code ^1000 ',
            ]}
          />
        </h1>
        <p className="description">
          have a cool webApp idea,a personal blog, an e-commerce <br />
          website that you want to build? <br />
          <Link className="button" to="/contact">
            LET'S TALK
          </Link>
        </p>
      </div>
    </Layout>
  )
}
