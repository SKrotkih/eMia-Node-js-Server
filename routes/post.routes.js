const {Router} = require('express')
const Post = require('../models/Post')
const router = Router()

// Get all posts
// TODO: add auth parameter ', auth'. Should be:
// router.get('/posts', auth, async (req, res) => {
router.get('/posts', async (req, res) => {
  try {
    const allPosts = await Post.find({})
    res.status(200).json(allPosts)
  } catch (error) {

    console.log('500', error);

    res.status(500).json({ message: `${error}` })
  }
})

router.post('/post', async (req, res) => {
  try {
    console.log("add post");

    const {post} = req.body

    console.log('source', post);

    const postObj = new Post(post);

    console.log('obj post=', postObj);

    await postObj.save();

    console.log("SAVED!!!");

    res.status(200).json(postObj);
  } catch (error) {

    console.log('500', error);

    res.status(500).json({ message: `${error}` })
  }
})

// Get all posts for user Id
router.get('/', async (req, res) => {
  try {
    const usersPosts = await Post.find({ owner: req.user.userId })
    res.status(200).json(usersPosts)
  } catch (error) {

    console.log('500', error);

    res.status(500).json({ message: `${error}` })
  }
})

// Get Post by post Id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {

    console.log('500', error);

    res.status(500).json({ message: `${error}` })
  }
})

module.exports = router
