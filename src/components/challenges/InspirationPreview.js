import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { IMAGE_ENDPOINT } from '../../utils/api'


class InspirationPreview extends Component {
  render() {
    const { inspirations, removeInspiration } = this.props
    const inspirationsView = inspirations.map((inspiration, index) => (
      <div className='inpiration-preview' key={index}>
        <p>{inspiration.methodicalDescription}</p>
        { inspiration.inspirationImageData && inspiration.inspirationImageData.length > 0 &&
          <img
            src={
              inspiration.inspirationImageData.startsWith('data')
                ? inspiration.inspirationImageData
                : `${IMAGE_ENDPOINT}${inspiration.inspirationImageData}`
            }
            alt='inspiration'
            className='img-responsive'
          />
        }
        { (!inspiration.inspirationImageData || inspiration.inspirationImageData.length < 1) &&
          <span>{inspiration.inspirationText}</span>
        }
        <a href='#' onClick={(event) => removeInspiration(event, index)}>
          <i className='fa fa-trash-alt' />
        </a>
      </div>
    ))

    return (
      <div>
        {inspirationsView}
      </div>
    )
  }
}

export default withRouter(InspirationPreview)
