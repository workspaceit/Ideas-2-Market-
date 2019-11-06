import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
// import './challenges.css'
import { NewChallengeForm } from '../components';


class NewChallengeScreen extends Component {

    render() {
        return (
            <React.Fragment>
                <NewChallengeForm />
            </React.Fragment>
        )
    }
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewChallengeScreen))
