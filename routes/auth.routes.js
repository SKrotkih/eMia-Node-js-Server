const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// npm run startserver
// http://localhost:5000/api/auth/test
router.get(
  '/users',
  [],
  async (req, res) => {
    try {

      const users = await User.find();
      let ids = [];
      users.forEach((user) => {
        ids.push({id: user});
      })

      res.json(ids)
    } catch (e) {
      res.status(500).json({message: 'Something went wrong. Please try it again.'})
    }
  }
)

// http://localhost:5000/api/auth/register
router.post(
  '/register',
  [
    check('email', 'The email is not valid').isEmail(),
    check('password', 'The password must be at least 6 symbols')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Data is wrong'
      })
    }

    const {email, password} = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'The User exists already' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })

    console.log(`REGISTER: ${email}; ${password}`);

    await user.save()

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    console.log(`REGISTER: 200 The User is registered successfully: ${JSON.stringify(user) }`);

    res.status(200).json({ uid: user.id, email, token })

  } catch (e) {

    console.log(`REGISTER: 500 Something went wrong. Please ry it again.`);

    res.status(500).json({ message: 'Something went wrong. Please ry it again.' })
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'The email is wrong. Please check it and try again').normalizeEmail().isEmail(),
    check('password', 'Please enter password').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Data is wrong. Please try it again'
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({ email })

    console.log(`LOGIN: ${email}; ${password}`);

    if (!user) {

      console.log('LOGIN: 400. The User is not found');

      return res.status(400).json({ message: 'The User is not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {

      console.log('LOGIN: 400. The password is wrong. Please try it again.');

      return res.status(400).json({ message: 'The password is wrong. Please try it again.' })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    console.log(`LOGIN. user= ${user}: token: ${token}`);

    res.status(200).json({ user: user, token })

  } catch (e) {

    console.log(e);

    res.status(500).json({ message: 'Something went wrong. Please try it again.' })
  }
})

module.exports = router
