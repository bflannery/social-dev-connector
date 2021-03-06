import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { deletePost, addLike, removeLike } from '../../actions/postsActions'

export class PostItem extends Component {
  constructor() {
    super()

    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  onDeleteClick(e) {
    this.props.deletePost(e.target.value)
  }

  onLikeClick(id) {
    this.props.addLike(id)
  }

  onUnlikeClick(id) {
    this.props.removeLike(id)
  }

  findUserLike(likes) {
    const { auth } = this.props
    return likes.filter(like => like.user === auth.user.id).length > 0
  }

  render() {
    const { post, auth, showActions } = this.props
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/profile">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt="avatar"
              />
            </Link>
          </div>
          <div className="col-md-10">
            <div className="row">
              <p className="text-center">{post.name}</p>
            </div>
            <div className="row">
              <p className="text-center">{post.date}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <p className="lead col-md-11">{post.text}</p>
        </div>
        <div className="row">
          <div className="col-md-6 pull-left">
            <button
              value={post._id}
              onClick={this.onLikeClick.bind(this, post._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i
                className={classnames('fas fa-thumbs-up', {
                  'text-info': this.findUserLike(post.likes)
                })}
              />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
          </div>
          <div className="col-md-6 text-right">
            <span className="badge badge-light">
              {post.comments.length} Comment
              {post.comments.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className="row">
          <button
            value={post._id}
            onClick={this.onLikeClick.bind(this, post._id)}
            type="button"
            className="btn btn-light col-md-6"
          >
            Like
          </button>
          <button
            value={post._id}
            onClick={this.onLikeClick.bind(this, post._id)}
            type="button"
            className="btn btn-light col-md-6"
          >
            Comment
          </button>
        </div>
      </div>
    )
  }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {
    deletePost,
    addLike,
    removeLike
  }
)(PostItem)
