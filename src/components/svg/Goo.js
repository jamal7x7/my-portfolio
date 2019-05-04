import React, { useState } from 'react'
import { animated, useSpring } from 'react-spring'
import GooStyles from './Goo.module.scss'

const Goo = () => {
  let [time, setTime] = useState(0)

  const mother = {
    x: 700,
    y: 100,
  }

  const node = {
    x: 400,
    y: 100,
  }

  const trans = () => {
    return `translate(${node.x}px, ${node.y}px)`
  }

  const props = useSpring({
    from: { left: `${mother.x}px`, top: `${mother.y}px` },
    to: async next => {
      while (1) {
        await next({ left: `${node.x}px`, top: `${node.y}px` })
        await next({ left: `${mother.x}px`, top: `${mother.y}px` })
      }
    },
    // to: { transform: 'translate(200px, 400px)' },
    config: { mass: 10, tension: 100, friction: 50 },
    // reset: true,
  })

  return (
    <>
      <svg>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
          />
        </filter>
      </svg>

      <div className={GooStyles.m}>
        <div
          className={GooStyles.mother}
          style={{ left: mother.x, top: mother.y }}
        />

        <animated.div className={GooStyles.node} style={props} />
      </div>
    </>
  )
}

export default Goo
