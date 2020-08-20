const {Router} = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const router = Router()
const {Types} = require('mongoose')

// Get all posts
// TODO: add auth parameter ', auth'. Should be:
// router.get('/posts', auth, async (req, res) => {
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

router.post('/post', async (req, res) => {
  try {
    console.log("add post");

    const {post} = req.body

    console.log('source', post);

    const postObj = new Post(post);

    postObj.owner = Types.ObjectId(post.uid);

    console.log('obj post=', postObj);

    await postObj.save();

    console.log("SAVED!!!");

    res.status(200).json(postObj);
  } catch (error) {

    console.log('500', error);

    res.status(500).json({ message: `${error}` })
  }
})

// Get Post by post Id
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

module.exports = router
