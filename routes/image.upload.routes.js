require('dotenv').config()
const {Router} = require('express')
const router = Router()
const cloudinary = require('cloudinary')

// I save images in Cloudinary server
// https://cloudinary.com/users/register/free
// Create file .env in the project root folder:
// CLOUD_NAME=your_cloud_name
// API_KEY=your_cloud_key
// API_SECRET=your_cloud_secret

// http://localhost:5000/api/images/upload
router.post(
  '/upload',
  [],
  async (req, res) => {
    try {
      const values = Object.values(req.files)
      const promises = values.map(image => cloudinary.uploader.upload(image.path))
      Promise
        .all(promises)
        .then(results => res.status(200).json(results))
        .catch((err) => res.status(400).json(err))
    } catch (e) {

      console.log(`REGISTER: 500 Something went wrong. Please ry it again.`);

      res.status(500).json({message: 'Something went wrong. Please ry it again.'})
    }
  }
)

module.exports = router
