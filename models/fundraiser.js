const mongoose = require('mongoose');
const fundraiserSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: String,
  goal: {
    type: Number,
    integer: true
  },
  collectedAmount: {
    type: Number,
    integer: true,
    default: 0
  },
  groupId: {
    type: mongoose.Schema.Types.Number,
    ref: 'Group'
  }
})
const Fundraiser = mongoose.model('fundraisers', fundraiserSchema);
module.exports = Fundraiser;