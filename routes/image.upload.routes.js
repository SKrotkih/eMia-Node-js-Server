const {Router} = require('express')
const router = Router()
const cloudinary = require('cloudinary').v2;
const fs = require('fs')

// Example: http://localhost:5000/api/images/upload
router.post('/upload', async (req, res) => {
    try {
      const file = req.body.img;
      const name = req.body.name;
      const path = `tmp/${name}`;
      // Write received fire in temporary folder
      fs.writeFile(path, file, 'base64', (err) => {
        if (err) {
          console.log(err);
          throw err
        }
        console.log(`Start uploading image (${path}) to the Cloudinary server...`);
        // Upload file to the Cloudinary server
        cloudinary.uploader.upload(path)
          .then((results) => {
            console.log(`End uploading image (${path}) to the Cloudinary server`);
            res.status(200).json(results)
          })
          .catch((error) => {
            console.log(`Error while uploading image to the Cloudinary server: ${error}`);
            res.status(400).json(error)
          });
      })
    } catch (error) {
      console.log(`Upload Image error: ${error}`);
      res.status(500).json(error)
    }
  }
)

// Test read/write to file
function fsTest() {
  const fn = './test.txt';
  fs.writeFile(fn, 'TEST', err => {
    if (err) {
      console.log(err)
    } else {
      fs.readFile(fn, 'utf8', (err, data) => {
        console.log(data)
      })
    }
  })
}

module.exports = router
