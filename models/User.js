
/**
 * Sample Node.js server for React Native App.
 * https://github.com/SKrotkih/eMia-Node-js-Server
 *
 * @format
 * @flow
 */

/**
 Post. Mongo DB Schema.
 */
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  username: {type: String},
  avatarUrl: {type: String},
  address: {type: String},
  gender: {type: Number},
  tokenAndroid: {type: String},
  tokenIOS: {type: String},
  yearbirth: {type: Number},
  posts: [{ type: Types.ObjectId, ref: 'Post' }]
})

module.exports = model('User', schema)
