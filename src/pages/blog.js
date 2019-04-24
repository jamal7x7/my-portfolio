import { graphql, useStaticQuery } from "gatsby"
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
          <li className={blogStyles.container}>
            <h2> {v.node.frontmatter.title} </h2>
            <h4> {v.node.frontmatter.date} </h4>
            <h4> {v.node.excerpt} </h4>
          </li>
        ))}
      </ol>
    </Layout>
  )
}
