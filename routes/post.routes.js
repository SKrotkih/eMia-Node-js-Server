const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Post = require('../models/Post')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')
    const {from} = req.body

    const code = shortid.generate()

    const existing = await Post.findOne({ from })

    if (existing) {
      return res.json({ post: existing })
    }

    const to = baseUrl + '/t/' + code

    const post = new Post({
      code, to, from, owner: req.user.userId
    })

    await post.save()

    res.status(201).json({ post })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please try it again.' })
  }
})

// Get all posts by user's Id
router.get('/', auth, async (req, res) => {
  try {
    const usersPosts = await Post.find({ owner: req.user.userId })
    res.json(usersPosts)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please try it again.' })
  }
})

// Get Post by post Id
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.json(post)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please try it again.' })
  }
})

module.exports = router
