import React from 'react'
import { i2mLogoWhite } from '../../resources'


const ThankYouScreen = () => {
  return (
    <div className="landing">
      <div className="landing-invert">
        <div className="col-md-8 center-block">
          <p className="logo-invert"><img src={i2mLogoWhite} alt="i2m" /></p>
          <div>
            <h2 className="landing-header"><span>Brainstorm Ideas for a New Technology</span><span className="fix-border"></span></h2>
            <h2 style={{ textAlign: 'center' }}>Thank You</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankYouScreen