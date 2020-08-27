/**
 * Sample Node.js server for React Native App.
 * https://github.com/SKrotkih/eMia-Node-js-Server
 *
 * @format
 * @flow
 */
const {Router} = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const router = Router()
const {Types} = require('mongoose')

// TODO: add auth parameter ', auth'. Should be:
// router.get('/posts', auth, async (req, res) => {

/**
  Get all posts
  GET /api/posts/posts
 */
router.get('/posts', async (req, res) => {
  try {
    const allPosts = await Post.find({})
    // the map does not work in this case:
    for (let i = 0; i < allPosts.length; i++) {
      allPosts[i].owner = await User.findById(allPosts[i].uid);
    }
    res.status(200).json(allPosts)
  } catch (error) {
    console.log('500', error);
    res.status(500).json({ message: `${error}` })
  }
})

/**
  Get all User's posts for User ID
  GET /api/posts/posts/:uid
 */
router.get('/posts/:uid', async (req, res) => {
  try {
    const uid = req.params.uid;
    const allPosts = await Post.find({uid: uid})
    for (let i = 0; i < allPosts.length; i++) {
      allPosts[i].owner = await User.findById(allPosts[i].uid);
    }
    res.status(200).json(allPosts)
  } catch (error) {
    console.log('500', error);
    res.status(500).json({ message: `${error}` })
  }
})

/**
  Get post for Post ID
  GET /api/posts/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
    const uid = post.uid;
    post.owner = await User.findById(uid);
    res.status(200).json(post)
  } catch (error) {
    console.log('500', error);
    res.status(500).json({ message: `${error}` })
  }
})

/**
  Add/Update post
  POST /api/posts/post
 */
router.post('/post', async (req, res) => {
  try {
    console.log("add/replace post");

    const {post} = req.body

    console.log('source', post);
    const postId = post._id;

    if (postId) {
      // Update post
      const resUpdate = await Post.replaceOne({_id: postId}, post);

      console.log(`UPDATED!!! [post ID=${postId}; ${resUpdate.n}; ${resUpdate.nModified}]`);

      res.status(200).json(post);
    } else {
      // Add new post
      const postObj = new Post(post);

      postObj.owner = Types.ObjectId(post.uid);

      console.log('obj post=', postObj);

      await postObj.save();

      console.log("SAVED!!!");

      res.status(200).json(postObj);
    }
  } catch (error) {

    console.log('500', error);

    res.status(500).json({ message: `${error}` })
  }
})

module.exports = router
