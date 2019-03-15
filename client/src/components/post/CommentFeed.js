import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem'

const CommentFeed = ({ comments, postId }) =>
  _.map(comments, comment => (
    <CommentItem comment={comment} key={comment._id} postId={postId} />
  ))

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
}

export default CommentFeed
