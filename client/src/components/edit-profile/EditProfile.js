import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.toggleSocialIcons = this.toggleSocialIcons.bind(this)
  }

  componentDidMount() {
    this.props.getCurrentProfile()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    if (nextProps.profiles.profile) {
      const profile = nextProps.profiles.profile

      const skillsCSV = profile.skills.join(',')

      profile.company = !_.isEmpty(profile.company) ? profile.company : ''
      profile.website = !_.isEmpty(profile.website) ? profile.website : ''
      profile.location = !_.isEmpty(profile.location) ? profile.location : ''
      profile.githubusername = !_.isEmpty(profile.githubusername)
        ? profile.githubusername
        : ''
      profile.bio = !_.isEmpty(profile.bio) ? profile.bio : ''
      profile.social = !_.isEmpty(profile.social) ? profile.social : {}
      profile.twitter = !_.isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : ''
      profile.facebook = !_.isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : ''
      profile.linkedin = !_.isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : ''
      profile.youtube = !_.isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : ''
      profile.instagram = !_.isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : ''

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      })
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const profileData = _.omit(this.state, ['displaySocialInputs', 'errors'])
    this.props.createProfile(profileData, this.props.history)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  toggleSocialIcons() {
    this.setState(previousState => ({
      displaySocialInputs: !previousState.displaySocialInputs
    }))
  }

  render() {
    const { errors, displaySocialInputs } = this.state

    let socialInputs

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Page URL"
            name="youtube"
            icon="fab fa-instagram"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
        </div>
      )
    }

    const statusOptions = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Student', value: 'Student' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Developer', value: 'Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Frontend Engineer', value: 'Frontend Engineer' },
      { label: 'Backend Engineer', value: 'Backend Engineer' },
      { label: 'Fullstack Engineer', value: 'Fullstack Engineer' },
      { label: 'Instructor', value: 'Instructor' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Other', value: 'Other' }
    ]

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc"
                />
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={statusOptions}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for currently"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Austin, TX)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,Python"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest reporst and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={this.toggleSocialIcons}
                    className="btn btn-light"
                  >
                    Add Social Networks Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditProfile.propTypes = {
  profiles: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profiles: state.profiles,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  {
    createProfile,
    getCurrentProfile
  }
)(withRouter(EditProfile))
