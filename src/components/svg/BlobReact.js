import React, { useRef } from 'react'
import ReactLogo from './Logos/ReactLogo'

export default ({ coo, show, stop, time, theta0 }) => {
  let svgRef = useRef()
  // setPhi0(100)
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
          <stop stopColor="#C86DD7" offset="0%" />>
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
          id="radialGradient-2"
        >
          <stop stopColor="#0084FF" offset="0%" />
          <stop stopColor="#61DAFB" offset="60%" />
          <stop stopColor="#61DAFB" offset="100%" />
        </radialGradient>
        <radialGradient
          cx="50%"
          cy="50%"
          fx="50%"
          fy="50%"
          r="77%"
          id="s"
          // gradientTransform="translate(53, 2)"
        >
          <stop stopColor="#C86DD7" offset="0%" />
          <stop stopColor="#8c4ef8" offset="50%" />
          <stop stopColor="#61DAFB" offset="100%" />
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
            flood-color="#61DAFB"
            flood-opacity="0"
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
            flood-color="#C86DD7"
            flood-opacity={0.2 + Math.cos(0.2 * time) / 4}
          />
        </filter>
        &
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
          />
        </filter>
      </defs>

      <g>
        <g filter="url(#goo)">
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
              fill="url(#s)"
            />
          )}
          <circle
            className="A"
            cx={coo.A.x}
            cy={coo.A.y}
            r={coo.R.ra}
            fill="url(#gradA)"
            // filter="url(#redShadow)"
            opacity="1"
          >
            {/* <animateTransform
						attributeName="transform"
						begin="0s"
						dur="20s"
						type="rotate"
						from={`0 ${coo.A.x} ${coo.A.y}`}
						to={`360 ${coo.A.x} ${coo.A.y}`}
						repeatCount="indefinite"
					/> */}
          </circle>

          <circle
            className="B"
            cx={coo.B.x}
            cy={coo.B.y}
            r={coo.R.rb}
            // fill="#fa8072"
            // opacity="0"
            fill="url(#radialGradient-1)"
          />
          <g x={coo.B.x} y={coo.B.y}>
            <circle
              className="underB"
              cx={coo.B.x}
              cy={coo.B.y}
              r={coo.R.rb}
              // fill="#61DAFB"
              fill="url(#radialGradient-2)"
              // opacity={coo.k}
              // transform="translate(100,100) scale(0.07,0.07) "
              filter="url(#B)"
            />
          </g>
        </g>
        {/*<Tangents coo={coo} show={show} />*/}
        <ReactLogo coo={coo} />
      </g>
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
