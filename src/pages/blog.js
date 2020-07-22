import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import blogStyles from './blog.module.scss'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            html
            excerpt
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  // console.log('data', JSON.stringify(data, null, 4))

  return (
    <Layout>
      <h2 className="content-title">My personal blog</h2>
      <p
        className="description"
        style={{
          fontSize: '14px',
          margin: '0',
          color: '#777',
          fontWeight: '400',
          maxWidth: '400px',
        }}
      >
        I occasionally have interesting thoughts, tricks & tips about code,
        design, physics and more. Check in to the Blog to see what’s on my mind.
      </p>
      <br />
      <br />
      <br />

      <div>
        {data.allMarkdownRemark.edges.map(v => (
          <Link className={blogStyles.link} to={`/blog${v.node.fields.slug}`}>
            <li className={blogStyles.container}>
              <h2 style={{ color: '#8C4EF8' }}> {v.node.frontmatter.title} </h2>
              <p> {v.node.frontmatter.date} </p>
            </li>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

//  {<div dangerouslySetInnerHTML={{ __html: v.node.html }} />}
