import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import PostItem from './PostItem'

const PostFeed = ({ posts }) =>
  _.map(posts, post => <PostItem post={post} key={post._id} />)

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostFeed
