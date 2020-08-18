const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Post = require('../models/Post')
const auth = require('../middleware/auth.middleware')
const router = Router()

// Get all posts
// TODO: add auth parameter ', auth'. Should be:
// router.get('/posts', auth, async (req, res) => {
router.get('/posts', async (req, res) => {
  try {

    console.log("allPosts request");

    const allPosts = await Post.find({})

    console.log("allPosts", allPosts);

    res.status(200).json(allPosts)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please try it again.' })
  }
})

router.post('/post', async (req, res) => {
  try {
    console.log("add post");

    const {post} = req.body

    console.log(post);

    const postObj = new Post(post);

    console.log(postObj);

    await postObj.save();

    console.log("SAVED!!!");

    res.status(200).json({ postObj })
  } catch (e) {
    res.status(500).json({ message: '//post request: something went wrong. Please try it again.' })
  }
})

// Get all posts for user Id
router.get('/', async (req, res) => {
  try {
    const usersPosts = await Post.find({ owner: req.user.userId })
    res.status(200).json(usersPosts)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please try it again.' })
  }
})

// Get Post by post Id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please try it again.' })
  }
})

module.exports = router
