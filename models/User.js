const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  address: {type: String},
  email: {type: String},
  gender: {type: Number},
  uid: {type: String},
  tokenAndroid: {type: String},
  tokenIOS: {type: String},
  username: {type: String},
  yearbirth: {type: Number},
  password: {type: String, required: true},
  posts: [{ type: Types.ObjectId, ref: 'Post' }]
})

module.exports = model('User', schema)
