import React, { useEffect, useRef, useState } from 'react';

export default ({ show, time, theta0, color, logoURL, phi0, phib, hxb }) => {
  console.log(color.p)

  // let [show, setShow] = useState(0)
  let svgRef = useRef()
  // setPhi0(100)
  const [cte, setCte] = useState({
    hxb: 350,
    hyb: 200,
    phia: 0.25,
    phib: 0.15,
    // phib0: 0,
    p: '#FF0000',
    s: '#0000FF',
  })

  const [coo, setCoo] = useState({
    R: { ra: 150, rb: 40 },

    A: { x: 420, y: 300 },
    B: { x: 0, y: 0 },

    A1: { x: 0, y: 0 },
    A2: { x: 0, y: 0 },

    B1: { x: 0, y: 0 },
    B2: { x: 0, y: 0 },

    C1: { x: 0, y: 0 },
    C2: { x: 0, y: 0 },

    D1: { x: 0, y: 0 },
    D2: { x: 0, y: 0 },

    I: { x: 0, y: 0 },
    J: { x: 0, y: 0 },

    I1: { x: 0, y: 0 },
    I2: { x: 0, y: 0 },

    J1: { x: 0, y: 0 },
    J2: { x: 0, y: 0 },
  })

  useEffect(() => {
    // const handleChange = e => {
    // e.preventDefault()
    // let bound = svgRef.current.getBoundingClientRect()

    // let hxb = 350
    // let hyb = 200
    // let phib = 0.15
    // let phia = 0.25
    // let phi0 = 100
    // let phi0 = 0

    // let xa = 1100 + 10 * Math.cos(cte.phia * time + 10)
    let xa = 900
    // let ya = 400 + 30 * Math.sin(cte.phia * time + 70)
    let ya = 400

    let xb = xa + cte.hxb * Math.cos(phib * time + phi0)
    let yb = ya + cte.hyb * Math.sin(phib * time + phi0)
    // let xb = e.clientX - bound.left
    // let yb = e.clientY - bound.top

    let ra = coo.R.ra
    let rb = coo.R.rb

    let X = coo.B.x - coo.A.x
    let Y = coo.B.y - coo.A.y
    let theta = Math.atan2(Y, X)

    let H = Math.sqrt(X ** 2 + Y ** 2)

    let rho = 1 * Math.asin(rb / H) + 0.1
    let tho = 1 * Math.asin(ra / H) + 0.2

    let k = (0.003 * H) ** 1
    let xa1 = xa + ra * Math.sin(theta)
    let ya1 = ya - ra * Math.cos(theta)

    let xa2 = xa - ra * Math.sin(theta)
    let ya2 = ya + ra * Math.cos(theta)

    let xa3 = xa + ra * Math.cos(theta)
    let ya3 = ya + ra * Math.sin(theta)

    let xb1 = xb + rb * Math.sin(theta)
    let yb1 = yb - rb * Math.cos(theta)

    let xb2 = xb - rb * Math.sin(theta)
    let yb2 = yb + rb * Math.cos(theta)

    let xb3 = xb - rb * Math.cos(theta)
    let yb3 = yb - rb * Math.sin(theta)

    let xc1 = xa + ra * Math.cos(theta - rho)
    let yc1 = ya + ra * Math.sin(theta - rho)

    let xc2 = xa + ra * Math.cos(rho + theta)
    let yc2 = ya + ra * Math.sin(rho + theta)

    let xd1 = xb - rb * Math.cos(theta + tho)
    let yd1 = yb - rb * Math.sin(theta + tho)

    let xd2 = xb - rb * Math.cos(theta - tho)
    let yd2 = yb - rb * Math.sin(theta - tho)

    let xi = xa + (ra * Math.cos(theta)) / Math.cos(rho)
    let yi = ya + (ra * Math.sin(theta)) / Math.cos(rho)

    let xj = xb - (rb * Math.cos(theta)) / Math.cos(tho)
    let yj = yb - (rb * Math.sin(theta)) / Math.cos(tho)

    let xi1 = k * (xi - xc1) + xc1
    let yi1 = k * (yi - yc1) + yc1

    let xi2 = k * (xi - xc2) + xc2
    let yi2 = k * (yi - yc2) + yc2

    let xj1 = k * (xj - xd1) + xd1
    let yj1 = k * (yj - yd1) + yd1

    let xj2 = k * (xj - xd2) + xd2
    let yj2 = k * (yj - yd2) + yd2

    function precise(x) {
      return Number.parseFloat(x).toFixed(5)
    }

    setCoo({
      ...coo,
      k: precise(k),
      H: H,

      A: { x: precise(xa), y: precise(ya) },
      B: { x: precise(xb), y: precise(yb) },

      A1: { x: precise(xa1), y: precise(ya1) },
      A2: { x: precise(xa2), y: precise(ya2) },
      A3: { x: precise(xa3), y: precise(ya3) },

      B1: { x: precise(xb1), y: precise(yb1) },
      B2: { x: precise(xb2), y: precise(yb2) },
      B3: { x: precise(xb3), y: precise(yb3) },

      C1: { x: precise(xc1), y: precise(yc1) },
      C2: { x: precise(xc2), y: precise(yc2) },

      D1: { x: precise(xd1), y: precise(yd1) },
      D2: { x: precise(xd2), y: precise(yd2) },

      I: { x: precise(xi), y: precise(yi) },
      J: { x: precise(xj), y: precise(yj) },

      I1: { x: precise(xi1), y: precise(yi1) },
      I2: { x: precise(xi2), y: precise(yi2) },

      J1: { x: precise(xj1), y: precise(yj1) },
      J2: { x: precise(xj2), y: precise(yj2) },
    })
  })

  useEffect(() => {
    setCte({
      ...cte,
      p: color.p,
      s: color.s,
      // hxb: hxb / (0.01 * time + 1),
      hxb: hxb,
    })
  })

  const handleCteChange = e => {
    e.preventDefault()
    setCte({
      ...cte,
      cte: {
        phib: 10,
      },
    })
  }
  return (
    <svg
      ref={svgRef}

      // viewBox="0 0 1000 700"
      // height="700"
      // width="1000"
      // onMouseMove={e => handleChange(e)}
      // transform="matrix(1 0 0 -1 0 0)"
    >
      <defs>
        <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="77%" id="gradA">
          <stop stopColor="#C86DD7" offset="0%" />
          <stop stopColor="#8c4ef8" offset="50%">
            {/* <animate
							attributeName="stop-color"
							values="lightblue;orange;purple;purple;black;purple;purple;blue;lightblue"
							dur="14s"
							repeatCount="indefinite"
						/> */}
          </stop>
        </radialGradient>
        <radialGradient
          cx="50%"
          cy="50%"
          fx="50%"
          fy="50%"
          r="77%"
          id="gradChild"
        >
          <stop stopColor={cte.s} offset="0%" />
          <stop stopColor={cte.p} offset="60%" />
          <stop stopColor={cte.p} offset="100%" />
        </radialGradient>
        <radialGradient
          cx="50%"
          cy="50%"
          fx="50%"
          fy="50%"
          r="77%"
          id="glue"
          // gradientTransform="translate(53, 2)"
        >
          <stop stopColor="#C86DD7" offset="0%" />
          <stop stopColor="#8c4ef8" offset="50%" />
          <stop stopColor={color.p} offset="100%" />
        </radialGradient>
        <filter
          id="B"
          x="0"
          y="0"
          height="130%"
          width="130%"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="10 10"
            floodColor={color.p}
            floodOpacity="0"
          />
        </filter>
        <filter
          id="redShadow"
          x="0"
          y="0"
          height="130%"
          width="130%"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="20 20"
            floodColor="#C86DD7"
            floodOpacity={0.2 + Math.cos(0.2 * time) / 4}
          />
        </filter>
        &
        <filter id="gooo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="0" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
          />
        </filter>
      </defs>

      <g filter="url(#gooo)">
        <g>
          {coo.H <= 370 && coo.H >= 0 && (
            <path
              className="R1R2D2D1"
              d={`M ${coo.C1.x} ${coo.C1.y} 
              Q ${coo.A3.x} ${coo.A3.y} ${coo.C2.x} ${coo.C2.y}
              C ${coo.I2.x} ${coo.I2.y} ${coo.J2.x} ${coo.J2.y} ${coo.D2.x} ${
                coo.D2.y
              }
              Q ${coo.B3.x} ${coo.B3.y} ${coo.D1.x} ${coo.D1.y}
              C ${coo.J1.x} ${coo.J1.y} ${coo.I1.x} ${coo.I1.y} ${coo.C1.x} ${
                coo.C1.y
              }
            `}
              // stroke="#fff00f"
              // fill="url(#radialGradient-sticky)"
              fill="url(#glue)"
            />
          )}

          <circle
            className="B"
            cx={coo.B.x}
            cy={coo.B.y}
            r={coo.R.rb}
            opacity={show}
            // fill="#fa8072"
            // opacity="0"
            // fill="url(#gradChild)"
            fill={cte.p}
          />
          {/* <g x={coo.B.x} y={coo.B.y}>
            <circle
              className="underB"
              cx={coo.B.x}
              cy={coo.B.y}
              r={coo.R.rb}
              // fill="#61DAFB"
              fill="url(#gradChild)"
              // opacity={coo.k}
              // transform="translate(100,100) scale(0.07,0.07) "
              filter="url(#B)"
            />
        </g> */}
        </g>
        {/*<Tangents coo={coo} show={show} />*/}
        <circle
          className="dark"
          cx={coo.B.x}
          cy={coo.B.y}
          r={30}
          opacity={show}
          // fill="#fa8072"
          // opacity="0"
          // fill="url(#gradChild)"
          fill="#00000044"
        />
      </g>
      {/*<ReactLogo coo={coo} />*/}
    </svg>
  )
}

const Tangents = ({ coo, show }) => {
  return (
    <g opacity={show}>
      <path
        className="C2I2"
        d={`M ${coo.C2.x} ${coo.C2.y} 
          L ${coo.I2.x} ${coo.I2.y}`}
        stroke="red"
        fill="none"
      />

      <path
        className="C1I1"
        d={`M ${coo.C1.x} ${coo.C1.y} 
          L ${coo.I1.x} ${coo.I1.y}`}
        stroke="#00ff00"
        fill="none"
      />
      <path
        className="D2I2"
        d={`M ${coo.D2.x} ${coo.D2.y} 
          L ${coo.J2.x} ${coo.J2.y}`}
        stroke="#00fff0"
        fill="none"
      />
      <path
        className="C1I1"
        d={`M ${coo.D1.x} ${coo.D1.y} 
          L ${coo.J1.x} ${coo.J1.y}`}
        stroke="#00fff0"
        fill="none"
      />
      <path
        className="AB"
        d={`M ${coo.B.x} ${coo.B.y} 
          L ${coo.A.x} ${coo.A.y}`}
        stroke="#ffffffa0"
        fill="none"
      />
      <path
        className="A1A2"
        d={`M ${coo.A1.x} ${coo.A1.y} 
           L ${coo.A2.x} ${coo.A2.y}`}
        stroke="#ffffffa0"
        fill="none"
      />
      <path
        className="B1B2"
        d={`M ${coo.B1.x} ${coo.B1.y} 
          L ${coo.B2.x} ${coo.B2.y}`}
        stroke="#ffffffa0"
        fill="none"
      />
      <path
        d={`M ${coo.A.x} ${coo.A.y} 
            L ${coo.B.x} ${coo.A.y}
            L ${coo.B.x} ${coo.B.y}`}
        stroke="#ffff0011"
        fill="none"
      />
    </g>
  )
}
