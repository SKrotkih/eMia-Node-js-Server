const {Router} = require('express')
const User = require('../models/User')
const ObjectId = require("mongoose");
const router = Router()

// Get User data for id
// http://localhost:5000/api/users/:id
router.get(
  '/:uid',
  [],
  async (req, res) => {
    try {
      const uid = req.params.uid;
      const user = await User.findOne({_id: uid});
      const result = {'user': user};
      res.json(result)
    } catch (e) {
      res.status(500).json({message: 'Something went wrong. Please try it again.'})
    }
  }
)

// http://localhost:5000/api/users/user
router.post(
  '/user',
  [],
  async (req, res) => {
    try {
      const {user} = req.body

      if (user === undefined) {
        return res.status(400).json({ message: 'User data is not presented' })
      }
      await User.updateOne({"_id": user._id}, user)

      console.log(`Code: 200. The User was updated successfully. New data: ${JSON.stringify(user) }`);

      res.status(200).json(user)

    } catch (e) {

      console.log(`REGISTER: 500 Something went wrong. Please ry it again.`);

      res.status(500).json({ message: 'Something went wrong. Please ry it again.' })
    }
  })

module.exports = router
