import React from 'react'

let a = Math.random() * 1000
let b = Math.random() * 1000
export default ({ coo }) => {
	return (
		<svg width="36" height="40" viewBox="0 0 36 40">
			<g id="particle">
				<circle
					className="drop"
					cx={coo.A.x}
					cy={coo.A.y}
					r={coo.R.rb}
					fill="#877AFF">
					{/* <animate
						attributeType="XML"
						attributeName="cy"
						from={coo.A.y}
						to={a}
						dur="1s"
						repeatCount="indefinite"
					/>
					<animate
						attributeType="XML"
						attributeName="cx"
						from={coo.A.x}
						to={b}
						dur="1s"
						repeatCount="indefinite"
					/> */}
				</circle>
			</g>
		</svg>
	)
}
