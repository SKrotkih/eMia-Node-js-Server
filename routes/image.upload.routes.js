require('dotenv').config()
const {Router} = require('express')
const router = Router()
const cloudinary = require('cloudinary')

// Example: http://localhost:5000/api/images/upload
// It does not work. I don't have req.body so i use uploading on the Cloudinary directly from client.
router.post('/upload', async (req, res) => {
    try {
      const values = Object.values(req.files)
      const promises = values.map((image) => {
        cloudinary.uploader.upload(image.path);
      })
      Promise
        .all(promises)
        .then(results => res.status(200).json(results))
        .catch((err) => res.status(400).json(err))
    } catch (error) {
      console.log(`Upload Image error: ${error}`);
      res.status(500).json(error)
    }
  }
)

module.exports = router
