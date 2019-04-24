import { Link } from "gatsby"
import React from "react"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <h1>About me.</h1>
    <h2>I'm a UI/UX designer and full-stack developer</h2>
    <p>
      want a personal, Business website? <Link to="/contact">Contact me.</Link>{" "}
    </p>
  </Layout>
)
