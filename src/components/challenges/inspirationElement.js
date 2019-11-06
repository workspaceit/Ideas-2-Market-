import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { IMAGE_ENDPOINT } from '../../utils/api'


class InspirationElement extends Component {
  render() {
    const { inspiration } = this.props

    return (
      <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
        <div className='inpiration-preview'>
          <p>{inspiration.methodicalDescription}</p>
          {inspiration.inspirationImageData && inspiration.inspirationImageData.length > 0 &&
            <img
              style={{ display: 'inline' }}
              src={
                inspiration.inspirationImageData.startsWith('data')
                  ? inspiration.inspirationImageData
                  : `${IMAGE_ENDPOINT}${inspiration.inspirationImageData}`
              }
              alt='inspiration'
              className='img-responsive'
            />
          }
          {(!inspiration.inspirationImageData || inspiration.inspirationImageData.length < 1) &&
            <span>{inspiration.inspirationText}</span>
          }
        </div>
      </div>
    )
  }
}

export default withRouter(InspirationElement)
