require('dotenv').config()
const {Router} = require('express')
const router = Router()
const cloudinary = require('cloudinary')

// Example: http://localhost:5000/api/images/upload
router.post('/upload', async (req, res) => {
    try {

      console.log('HEADERS');
      console.log(req.headers);
      console.log('BODY');
      console.log(req.body);

      const values = Object.values(req.files)

      console.log(values);

      const promises = values.map((image) => {

        console.log(image.path);

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
