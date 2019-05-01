import { Link } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import aboutStyles from './about.module.scss'

export default () => (
  <Layout>
    <div className={aboutStyles.wrapper}>
      <div>
        <img src="./profile.jpg" />
      </div>
      <div className={aboutStyles.about}>
        <h2 className="content-title">About me.</h2>
        <p className="about-me">
          I'm a UI/UX designer and full-stack developer an artist/creative
          director born in Cuba, living in Dallas, Texas. Through his 12+ year
          career, Magdiel has worked on, and lead, projects ranging from brand
          identity to conceptual art and environmental design. He is currently
          on staff at Fellowship Church in Grapevine, Texas. Magdiel's passion
          for excellence and creativity show in his artwork. He is in the
          process of a year long experimental design project that has gained him
          notoriety from respected publications across the globe. When he is not
          designing, Magdiel enjoys hanging out with friends, serving at
          Fellowship Church-Dallas campus and spending time with his wife.
        </p>
        <p className="description">
          want a personal, Business website?{' '}
          <Link to="/contact">Contact me.</Link>{' '}
        </p>
      </div>
    </div>
  </Layout>
)
