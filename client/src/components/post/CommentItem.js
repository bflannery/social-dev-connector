import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteComment } from '../../actions/postsActions'

export class CommentItem extends Component {
  constructor() {
    super()

    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  onDeleteClick(e) {
    const { deleteComment, postId } = this.props
    deleteComment(postId, e.target.value)
  }

  render() {
    const { comment, auth } = this.props
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/profile">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt="avatar"
              />
            </Link>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                type="button"
                value={comment._id}
                className="btn btn-danger mr-1"
                onClick={this.onDeleteClick}
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {
    deleteComment
  }
)(CommentItem)
