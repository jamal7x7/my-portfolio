import React from 'react'
import Layout from '../components/layout'
import blogPostStyles from './blog-post.module.scss'
import { graphql } from 'gatsby'

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div className={blogPostStyles.blogpost}>
        <h1>{post.frontmatter.title}</h1>

        <p>
          {post.frontmatter.date} <span style={{ color: '#8C4EF8' }}> ⧗ </span>{' '}
          {post.timeToRead} mn read
        </p>
        <br />

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        date
      }
    }
  }
`
