/**
 * Sample Node.js server for React Native App.
 * https://github.com/SKrotkih/eMia-Node-js-Server
 *
 * @format
 * @flow
 */

/**
 User. Mongo DB Schema
 mongoose docs: https://mongoosejs.com/docs/guide.html
 */
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  body: {type: String, required: true},
  title: {type: String, required: true},
  url: {type: String},
  pictureUri: {type: String},
  uid: {type: String},
  owner: {type: Types.ObjectId, ref: 'User'}
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

module.exports = model('Post', schema)
