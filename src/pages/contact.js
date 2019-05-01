import React from 'react'
import Layout from '../components/layout'

export default () => (
  <Layout>
    <h2 className="content-title">You can reach me throuth</h2>

    <br />
    <h3>
      <span className="content-title"> Email </span> :{' '}
      <span style={{ fontFamily: ' Merriweather', marginLeft: '20px' }}>
        jamal7x7@gmail.com
      </span>
    </h3>
    <h3>
      <a
        href="https://twitter/jamal7x7jamal"
        target="_blank"
        rel="noopener noreferrer"
      />
      <span className="content-title"> Twiter </span> :
      <span style={{ fontFamily: ' Merriweather', marginLeft: '20px' }}>
        {' '}
        @jamal7x7jamal{' '}
      </span>
    </h3>
    <h3>
      <span className="content-title"> Skype</span> :{' '}
      <span style={{ fontFamily: ' Merriweather', marginLeft: '20px' }}>
        jamal7x7
      </span>
    </h3>

    <br />
    <h2 className="content-title"> Or you can leave a message here</h2>
  </Layout>
)
