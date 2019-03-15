const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Models
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// Validation
const validatePostInput = require('../../validation/post')

// @route   GET api/posts
// @desc    Get post
// @access  Public
router.get('/', async (req, res) => {
  try {
    let posts = await Post.find().sort({ date: -1 })
    if (posts.length === 0) {
      return res.status(404).json({ nopostsfound: 'No posts found' })
    }

    return res.json(posts)
  } catch (error) {
    return error
  }
})

// @route   GET api/posts:id
// @desc    Get post by id
// @access  Public
router.get('/:id', async (req, res) => {
  let post = await Post.findById(req.params.id)

  if (post === null) {
    return res.status(404).json({ nopostfound: 'No post found with that ID' })
  }

  return res.json(post)
})

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    })

    const savedpost = await newPost.save()
    return res.json(savedpost)
  }
)

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let post = await Post.findById(req.params.id)

    if (post === null) {
      return res.status(404).json({ postnotfound: 'No post found' })
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ notauthorized: 'User not authorized' })
    }
    // Delete
    post = post.remove()
    return res.json({ success: true, post })
  }
)

// @route   POST api/posts/like:id
// @desc    Like a post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id)

      if (post === null)
        return res.status(404).json({ postnotfound: 'No post found' })

      const index = post.likes.findIndex(l => {
        return l.user === req.user.id
      })

      if (
        post.likes.filter(like => like.user.toString() === req.user.id).length >
        0
      ) {
        return res
          .status(400)
          .json({ alreadyliked: 'User already liked this post' })
      }

      if (index === -1) {
        post.likes.push({ user: req.user.id })
      } else {
        post.likes.splice(index, 1)
      }

      post = await post.save()

      res.json(post)
    } catch (err) {
      return res.json(err)
    }
  }
)

// @route   POST api/posts/unlike:id
// @desc    Unlike a post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let post = await Post.findById(req.params.id)

    if (post === null)
      return res.status(404).json({ postnotfound: 'No post found' })

    const removeIndex = post.likes.findIndex(l => {
      return l.user === req.user.id
    })

    post.likes.splice(removeIndex, 1)

    post = await post.save()

    res.json(post)
  }
)

// @route   POST api/posts/comments:id
// @desc    Add comment to a post
// @access  Private
router.post(
  '/comments/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    let post = await Post.findById(req.params.id)

    if (post === null) {
      return res.status(404).json({ postnotfound: 'Post not found' })
    }

    const newComment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    }

    post.comments.unshift(newComment)

    post = await post.save()
    return res.json(post)
  }
)

// @route   DELETE api/posts/comments:id
// @desc    Remove comment from a post
// @access  Private
router.delete(
  '/comments/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let post = await Post.findById(req.params.id)

    if (post === null) {
      return res.status(404).json({ postnotfound: 'Post not found' })
    }

    if (
      post.comments.filter(
        comment => comment._id.toString() === req.params.comment_id
      ).length === 0
    ) {
      return res
        .status(404)
        .json({ commentnotexists: 'Comment does not exist' })
    }

    const removeIndex = post.comments
      .map(item => item._id.toString())
      .indexOf(req.params.comment_id)

    post.comments.splice(removeIndex, 1)

    post = await post.save()
    return res.json(post)
  }
)

module.exports = router
