import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class TimeUpModal extends Component {

  render() {
    let sheet = document.createElement('style')
    sheet.innerHTML = "body {padding-right: 15px; overflow: hidden; } .session-start-page {filter: blur(1px);}";
    document.body.appendChild(sheet);
    return (
      // <div className="modal">
      //   <div className="ant-modal-header">
      //     <div className="ant-modal-title" id="rcDialogTitle0">
      //       <span>
      //         <i className="anticon anticon-check-circle" style="color: rgb(82, 196, 26);"></i>Time is up</span>
      //     </div>
      //   </div>
      //   <div className="ant-modal-body">Thank you very much for your participation!
      //       </div>
      //   <div className="ant-modal-footer">
      //     <a href="#" className="btn btn-primary">
      //       <span>Continue to survey</span>
      //     </a>
      //   </div>
      // </div>

      <div className="modal fade in" tabIndex="-1" role="dialog" style={{ display: 'block', paddingLeft: '15px', top: '60px' }} >
        <div className="modal-dialog" role="dialog">
          <div className="modal-content">
            <div className="modal-body">
              <p style={{padding: '10px'}}>
              <i className="glyphicon glyphicon-ok-sign" style={{color: 'rgb(82, 196, 26)'}}></i>
              &nbsp; Time is up
              </p>
              <p style={{padding: '20px 10px 0'}}>Thank you very much for you participation!</p>
            </div>
            <div className="modal-footer" style={{borderTop: '0'}}>
              {/* <Link className="btn btn-primary" to={this.props.link}>Continue to survey</Link> */}
              <a onClick={this.props.onSubmitSession} className="btn btn-primary" to={this.props.link}>Continue to survey</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TimeUpModal