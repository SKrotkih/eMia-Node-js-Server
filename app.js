const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary').v2;

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '15MB' }))
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', require('./routes/auth.router'))
app.use('/api/posts', require('./routes/post.router'))
app.use('/api/users', require('./routes/users.router'))
app.use('/api/images', require('./routes/image.upload.router'))

const isItProduction = process.env.NODE_ENV === 'production';

if (isItProduction) {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'about.html'))
  })
}

require('dotenv').config();
console.log('api_key=', process.env.api_key);

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

async function start() {
  try {
    await mongoose.connect(process.env.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    if (isItProduction) {
      const http = require("http");
      const server = http.createServer((req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Foo', 'bar');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('ok');
      });
    } else {
      const PORT = process.env.port || 5000;
      app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    }
  } catch (e) {
    throw e;
  }
}

start()
  .catch((error) => {
    console.log('Server Error', error.message)
    process.exit(1)
  })



