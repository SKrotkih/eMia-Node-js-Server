const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(require('body-parser').json());

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/posts', require('./routes/post.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/images', require('./routes/image.upload.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'about.html'))
  })
}

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    throw e;
  }
}

start()
  .catch((error) => {
    console.log('Server Error', error.message)
    process.exit(1)
  })
