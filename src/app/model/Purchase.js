const mongoose = require('mongoose')

const Purchase = new mongoose.Schema({
  ad: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Ad',
    required: true
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Purchase', Purchase)
