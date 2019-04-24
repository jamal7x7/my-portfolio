import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import Layout from "../components/layout"

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
      <h1>Hello.{data.site.siteMetadata.title}</h1>
      <h1>
        I'm {data.site.siteMetadata.author}, a UI/UX designer and full-stack
        developer living in Morocco{" "}
      </h1>
      <h2>
        Want a Designer/Developer? <Link to="/contact">Contact me.</Link>{" "}
      </h2>
    </Layout>
  )
}
