const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  body: {type: String, required: true},
  title: {type: String, required: true},
  url: {type: String},
  pictureUri: {type: String},
  uid: {type: String},
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Post', schema)
