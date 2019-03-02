import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from '../common/Spinner'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profiles

    let dashboardContent

    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      if (!isEmpty(profile)) {
        dashboardContent = <h4>TODO: Display Profile</h4>
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted"> Welcome {user.name}</p>
            <p> You have not setup a profile yet, please add some info.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        )
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4"> Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profiles: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profiles: state.profiles
})

export default connect(
  mapStateToProps,
  {
    getCurrentProfile
  }
)(Dashboard)
