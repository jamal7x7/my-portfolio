import { Link } from 'gatsby'
import React from 'react'
import { animated, useSpring } from 'react-spring'
import Layout from '../components/layout'
import aboutStyles from './about.module.scss'

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
]
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export default () => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 10, tension: 1000, friction: 100 },
  }))

  return (
    <Layout>
      <div className={aboutStyles.wrapper}>
        <animated.div
          class={aboutStyles.card}
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}
        />
        {/* <div>
          <img src="./profile.jpg" />
       </div>*/}
        <div className={aboutStyles.about}>
          <h2 className="content-title">About me.</h2>
          <p className="about-me">
            I'm a UI/UX designer and full-stack developer an artist/creative
            director born in Cuba, living in Dallas, Texas. Through his 12+ year
            career, Magdiel has worked on, and lead, projects ranging from brand
            identity to conceptual art and environmental design. He is currently
            on staff at Fellowship Church in Grapevine, Texas. Magdiel's passion
            for excellence and creativity show in his artwork. He is in the
            process of a year long experimental design project that has gained
            him notoriety from respected publications across the globe. When he
            is not designing, Magdiel enjoys hanging out with friends, serving
            at Fellowship Church-Dallas campus and spending time with his wife.
          </p>
          <p className="description">
            want a personal, Business website?{' '}
            <Link to="/contact">Contact me.</Link>{' '}
          </p>
        </div>
      </div>
    </Layout>
  )
}
