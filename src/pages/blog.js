import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import blogStyles from "./blog.module.scss"

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
  console.log("data", JSON.stringify(data, null, 4))

  return (
    <Layout>
      <h1>blog.</h1>

      <ol>
        {data.allMarkdownRemark.edges.map(v => (
          <Link className={blogStyles.link} to={`${v.node.fields.slug}`}>
            <li className={blogStyles.container}>
              <h2> {v.node.frontmatter.title} </h2>
              <h4> {v.node.frontmatter.date} </h4>
            </li>
          </Link>
        ))}
      </ol>
    </Layout>
  )
}

// {<div dangerouslySetInnerHTML={{ __html: v.node.html }} />}
